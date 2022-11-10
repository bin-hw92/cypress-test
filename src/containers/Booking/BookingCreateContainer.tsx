import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, addHours, addMinutes, parseISO, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import { SMSSendContainer } from '../Commons/SMSSendContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { cancelBookingAction, changeField, changeResult, createBookingAction, initialize, issueUserMobilekeyAction, issueUserPincodeAction } from '../../stores/booking';
import BookingCreate from '../../components/Booking/BookingCreate';
import { listRoomAction, initialize as initializeRoom } from '../../stores/roomList';
import { listBuildingAction } from '../../stores/buildingList';
import { listCommonRoomAction, initialize as initializeCommon, listCommonRoomBuildingAction } from '../../stores/commonroom';
import { changeAllField } from '../../stores/sms';
import { BookingCreateContainerProps, checkProps } from '../../types/booking';
import { MultiValue } from 'react-select';
import { selectRoomIdAction } from '../../stores/room';
import moment from 'moment';

const BookingCreateContainer = ({
  isOpen,
  toggle,
  reload,
}:BookingCreateContainerProps) => {
  const hotelId = localStorage.getItem('hotel_id');
  const dispatch = useDispatch();
  const { hotelItem, bookingItem, keyIssueItem, limitCheckInOutAt, buildingItems, roomItems, commonroomListItems, commonroomBuildingListItems, bookingCreateSuccess, bookingCreateError, userMobileKeyItem, userMobileKeyError, userPincodeItem, userPincodeError, roomDoorlockItems } = useSelector(({ hotel, booking, buildingList, roomList, commonroom, room }:RootState) => ({
      hotelItem: hotel.hotel,
      bookingItem: booking.booking,
      keyIssueItem: booking.keyIssueItem,
      limitCheckInOutAt: booking.limitCheckInOutAt,
      buildingItems: buildingList.buildingListItems,
      roomItems: roomList.roomListItems,
      commonroomListItems: commonroom.commonroomItems,
      commonroomBuildingListItems: commonroom.commonroomBuildingItems,
      bookingCreateSuccess: booking.bookingCreateSuccess,
      bookingCreateError: booking.bookingCreateError,
      userMobileKeyItem: booking.userMobileKeyItem, 
      userMobileKeyError: booking.userMobileKeyError, 
      userPincodeItem: booking.userPincodeItem, 
      userPincodeError: booking.userPincodeError,
      roomDoorlockItems: room.room.doorlock,
  }));
  const [ isOpenBookingCreateSuccessModal, setIsOpenBookingCreateSuccessModal ] = useState<boolean>(false);
  const [ isOpenRequiredParameterFailModal, setIsOpenRequiredParameterFailModal ] = useState<boolean>(false);
  const [ isOpenBookingCreateFailModal, setIsOpenBookingCreateFailModal ] = useState<boolean>(false);
  const [ messageBookingCreateFail, setMessageBookingCreateFail ] = useState<string>('');
  const [ isOpenKeyIssueSuccessModal, setIsOpenKeyIssueSuccessModal ] = useState<boolean>(false);
  const [ isOpenKeyIssueFailModal, setIsOpenKeyIssueFailModal ] = useState<boolean>(false);
  const [ messageKeyIssueFail, setMessageKeyIssueFail ] = useState<string>('');
  const [ activePage, setActivePage ] = useState<number>(1);
  const [ selectedBuildingId, setSelectedBuildingId ] = useState<string>('');
  const [ selectedRoomId, setSelectedRoomId ] = useState<string>('');
  const [ selectedBookingId, setSelectedBookingId ] = useState<string>('');
  const [ commonroomItems, setCommonroomItems ] = useState<any[]>([]);
  const [ limitCheckInAt, setLimitCheckInAt ] = useState<Date|undefined>();
  const [ limitCheckOutAt, setLimitCheckOutAt ] = useState<Date|undefined>();
  const [ isSlimkeyCheck, setIsSlimkeyCheck ] = useState<boolean>(false);
  const checkinAtV4HH = Array.from({length: 23}, (v,i)=> i+1);
  const checkinAtV4MM = Array.from({length: 59}, (v,i)=> i+1);

  const handleListBuilding = useCallback(() => {
    dispatch(listBuildingAction({}));
  },[dispatch]);

  const handleListRoom = useCallback(() => {
    dispatch(listRoomAction({buildingId: selectedBuildingId}));
  },[dispatch, selectedBuildingId]);

  const handleListCommonroom = useCallback(() => {
    dispatch(listCommonRoomAction({}));
  },[dispatch]);
  
  const handleListBuildingCommonroom = useCallback(() => {
    dispatch(listCommonRoomBuildingAction({buildingId: selectedBuildingId}));
  },[dispatch, selectedBuildingId]);

  const handleSelectRoom = useCallback(() => {
    dispatch(selectRoomIdAction({buildingId: selectedBuildingId, roomId: selectedRoomId}));
  },[dispatch, selectedBuildingId, selectedRoomId]);

  //인풋 변경 이벤트 핸들러
  const handleChange = useCallback((form:string, e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const value2 = name === 'roomIds'? [e.target.value] : name === 'isNew'? value === 'O'? true : false : value;
    dispatch(
        changeField({
            form: form,
            key: name,
            value: value2,
        })
    );
    if(name === 'buildingId') setSelectedBuildingId(value);
    if(name === 'roomIds') setSelectedRoomId(value);
},[dispatch]);

  //변경 이벤트 날짜
  const handleChangeDate = useCallback((date:Date, form:string, name:string) => {
    if(form === 'keyIssueItem'){
      if(name === 'checkinAt'){
        const value = date < limitCheckInOutAt.minCheckinAt? limitCheckInOutAt.minCheckinAt : date;
        dispatch(changeField({
          form: 'keyIssueItem',
          key: name,
          value: value,
        }));
        //시작일이 종료일보다 크거나 같은 경우
        if(value >= keyIssueItem.checkoutAt){
          dispatch(changeField({
            form: 'keyIssueItem',
            key: 'checkoutAt',
            value: keyIssueItem.type === 'day'? addDays(value, 1) : 
            keyIssueItem.type === 'hour'? addHours(value, 1) : addMinutes(value, 10),
          }));
        }
        //V3: 무한 X, 시작과 종료 차이가 120시간 이상 차이 날 경우, V2: 일은 14일 이상, 시간은 24시간, 분은 300분 이상 차이 날 경우
        if((roomDoorlockItems?.pincodeVersion === 'V3' && !hotelItem.allowInfinityPincode && differenceInHours(keyIssueItem.checkoutAt, value) > 120) ||
          (roomDoorlockItems?.pincodeVersion === 'V2' &&
            ((differenceInDays(keyIssueItem.checkoutAt, value) > 14 && keyIssueItem.type === 'day')||
            (differenceInHours(keyIssueItem.checkoutAt, value) > 24 && keyIssueItem.type === 'hour')||
            (differenceInMinutes(keyIssueItem.checkoutAt, value) > 300 && keyIssueItem.type === '10mins')))
          ){
          dispatch(changeField({
            form: 'keyIssueItem',
            key: 'checkoutAt',
            value: roomDoorlockItems?.pincodeVersion === 'V3'? addHours(value, 120) : keyIssueItem.type === 'day'? addDays(value, 14) : 
              keyIssueItem.type === 'hour'? addHours(value, 24) : addMinutes(value, 300),
          }));
        }
        setLimitCheckInAt(keyIssueItem.type === 'day'? addDays(value, 1) : 
          keyIssueItem.type === 'hour'? addHours(value, 1) : addMinutes(value, 10)
        );
      }
      if(name === 'checkoutAt'){
        const value = date > limitCheckInOutAt.maxCheckoutAt? limitCheckInOutAt.maxCheckoutAt : date;
        //V3: 무한 X, 시작과 종료 차이가 120시간 이상 차이 날 경우, V2: 일은 14일 이상, 시간은 24시간, 분은 300분 이상 차이 날 경우
        if((roomDoorlockItems?.pincodeVersion === 'V3' && !hotelItem.allowInfinityPincode && differenceInHours(value, keyIssueItem.checkinAt) > 120) ||
            (roomDoorlockItems?.pincodeVersion === 'V2' &&
              ((differenceInDays(value, keyIssueItem.checkinAt) > 14 && keyIssueItem.type === 'day')||
              (differenceInHours(value, keyIssueItem.checkinAt) > 24 && keyIssueItem.type === 'hour')||
              (differenceInMinutes(value, keyIssueItem.checkinAt) > 300 && keyIssueItem.type === '10mins'))
            )
          ){
          dispatch(changeField({
            form: 'keyIssueItem',
            key: name,
            value: roomDoorlockItems?.pincodeVersion === 'V3'? addHours(keyIssueItem.checkinAt, 120) : keyIssueItem.type === 'day'? addDays(keyIssueItem.checkinAt, 14) : 
            keyIssueItem.type === 'hour'? addHours(keyIssueItem.checkinAt, 24) : addMinutes(keyIssueItem.checkinAt, 300),
          }));
        }else{
          //V4랑 나머지 상황 다
          dispatch(changeField({
            form: 'keyIssueItem',
            key: name,
            value: value,
          }));
        }
      }
    }else{
      //DatePicker에서 날짜 선택 없이 바로 시간 체크 시 00:00:00.111 이런식으로 초 단위 보다 낮은 단위가 따라 붙음
      //그럴 경우 new Date 시 초 단위 뒤에 시간은 반올림 처리가 진행 (키 발급 시 00초가 되어야 하는데 1초가 되면서 에러 발생)
      const check_year = moment(date).year();
      const check_month = moment(date).month()+1;
      const check_date = moment(date).date();
      const check_hour = moment(date).hour();
      const check_minute = moment(date).minute();
      const Day = `${check_year}-${check_month < 10? '0'+check_month : check_month}-${check_date < 10? '0'+check_date : check_date} ${check_hour < 10? '0'+check_hour : check_hour}:${check_minute < 10? '0'+check_minute : check_minute}`;
      dispatch(changeField({
        form: form,
        key: name,
        value: new Date(Day),
      }));
    }
  },[limitCheckInOutAt.minCheckinAt, limitCheckInOutAt.maxCheckoutAt, dispatch, keyIssueItem.checkoutAt, keyIssueItem.type, keyIssueItem.checkinAt, roomDoorlockItems?.pincodeVersion, hotelItem.allowInfinityPincode]);

  const hnadleChangeDateV4 = (type:string, e:ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const check_year = moment(keyIssueItem.checkinAt).year();
    const check_month = moment(keyIssueItem.checkinAt).month()+1;
    const check_date = moment(keyIssueItem.checkinAt).date();
    const check_hour = moment(keyIssueItem.checkinAt).hour();
    const check_minute = moment(keyIssueItem.checkinAt).minute();
    const new_day = `${check_year}-${check_month < 10? '0'+check_month : check_month}-${check_date < 10? '0'+check_date : check_date}`;
    const new_date = type === 'HH'? `${new_day} ${value}:${check_minute < 10? '0'+check_minute : check_minute}`
     : `${new_day} ${check_hour < 10? '0'+check_hour : check_hour}:${value}`;

    dispatch(changeField({
      form: 'keyIssueItem',
      key: 'checkinAt',
      value: new Date(new_date),
    }));
    const authTimeOut = typeof hotelItem.pincodeAuthTimeoutMin === 'string'? 0 : hotelItem.pincodeAuthTimeoutMin;
    dispatch(changeField({
      form: 'keyIssueItem',
      key: 'checkoutAt',
      value: addMinutes(new Date(new_date), authTimeOut),
    }));
  }

  const handleChangeCommonroom = useCallback((selectedCommonrooms:MultiValue<any>) => {
    if(hotelItem.useSlimkey) return;
    dispatch(
      changeField({
          form: 'booking',
          key: 'commonroomIds',
          value: selectedCommonrooms ? selectedCommonrooms.map((commonroom) => commonroom.value) : [],
      })
    );
  },[dispatch, hotelItem.useSlimkey]);

  const validateStartAt = (time:Date) => {
    const selectedDate = new Date(time);
    return (limitCheckInOutAt.minCheckinAt.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() < limitCheckInOutAt.maxCheckoutAt.getTime());
  }

  const validateEndAt = (time:Date) => {
    const selectedDate = new Date(time);
    return (keyIssueItem.checkinAt.getTime() < selectedDate.getTime()) && (selectedDate.getTime() <= limitCheckInOutAt.maxCheckoutAt.getTime());
  }

  const handleChangeKeyType = (keyType:string) => {
    dispatch(
      changeField({
          form: 'keyIssueItem',
          key: 'keyType',
          value: keyType,
      })
    );
    if (keyType === 'mobilekey'){
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'checkinAt',
        value: limitCheckInOutAt.minCheckinAt,
      }));
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'checkoutAt',
        value: limitCheckInOutAt.maxCheckoutAt,
      }));
      setLimitCheckInAt(addHours(limitCheckInOutAt.minCheckinAt, 1));
      setLimitCheckOutAt(addHours(limitCheckInOutAt.maxCheckoutAt, -1));
    }else{ 
      handleChangePincodeType('day');
    }
  };

  const handleChangePincodeType = (pincodeType:string) => {
    dispatch(changeField({
      form: 'keyIssueItem',
      key: 'type',
      value: pincodeType,
    }));
    if(pincodeType === 'day'){
      const diff_day = differenceInDays(bookingItem.checkoutAt, limitCheckInOutAt.minCheckinAt);
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'checkinAt',
        value: limitCheckInOutAt.minCheckinAt,
      }));
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'checkoutAt',
        value: addDays(limitCheckInOutAt.minCheckinAt, diff_day>14? 14 : diff_day),
      }));
      setLimitCheckInAt(addDays(limitCheckInOutAt.minCheckinAt, 1));
      setLimitCheckOutAt(addDays(limitCheckInOutAt.maxCheckoutAt, -1));
    }else if(pincodeType === 'hour'){
      const add1Days = addDays(limitCheckInOutAt.minCheckinAt, 1);
      dispatch(changeField({
          form: 'keyIssueItem',
          key: 'checkinAt',
          value: limitCheckInOutAt.minCheckinAt,
      }));
      dispatch(changeField({
          form: 'keyIssueItem',
          key: 'checkoutAt',
          value: add1Days > bookingItem.checkoutAt ?
          bookingItem.checkoutAt : add1Days,
      }));
      setLimitCheckInAt(addHours(limitCheckInOutAt.minCheckinAt, 1));
      setLimitCheckOutAt(addHours(limitCheckInOutAt.maxCheckoutAt, -1));
    }else if(pincodeType === '10mins'){
      const add5Hours = addHours(limitCheckInOutAt.minCheckinAt, 5);
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'checkinAt',
        value: limitCheckInOutAt.minCheckinAt,
      }));
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'checkoutAt',
        value: add5Hours > bookingItem.checkoutAt ?
        bookingItem.checkoutAt : add5Hours,
      }));
      setLimitCheckInAt(addMinutes(limitCheckInOutAt.minCheckinAt, 10));
      setLimitCheckOutAt(addMinutes(limitCheckInOutAt.maxCheckoutAt, -10));
    }else{
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'checkinAt',
        value: '',
      }));
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'checkoutAt',
        value: '',
      }));
    }
  };

  const handleSetMaxDate = () => {
    return addDays(parseISO(bookingItem.checkinAt), 15);
  };

  //체크용
  const validateCreateBookingItem = ({userName, phoneNumber, checkinAt, checkoutAt, roomIds}:checkProps) => {
    return userName && phoneNumber && checkinAt && checkoutAt && (roomIds !== undefined && roomIds.length > 0);
  };
  //체크용
  const validateIssueKeyItem = ({userName, phoneNumber, checkinAt, checkoutAt}:checkProps) => {
    return userName && phoneNumber && checkinAt && checkoutAt;
  };

  //예약 처음 등록
  const handleCreateBooking = useCallback(() => {
    if (!validateCreateBookingItem(bookingItem)){
      setIsOpenRequiredParameterFailModal(true); 
      return;
    } 
    const reqNum = bookingItem.countryNumber + Number.parseInt(bookingItem.phoneNumber);
    dispatch(createBookingAction({...bookingItem, phoneNumber: reqNum}));
  },[bookingItem, dispatch]);

  //등록 성공, 실패
  useEffect(() => {
    if(bookingCreateError){
      if (!bookingCreateError.response) setMessageBookingCreateFail(bookingCreateError.message);
      else setMessageBookingCreateFail(`${bookingCreateError.response.data.code}, ${bookingCreateError.response.data.message}`);

      if(bookingCreateError.response.data.code === 401 || bookingCreateError.response.data.code === 419) reload();
      else setIsOpenBookingCreateFailModal(true);
    }
    if(bookingCreateSuccess){
      setSelectedBookingId(bookingItem.bookingId? bookingItem.bookingId : '');
      //V3가 있을 수 있어서, 키 발급으로 이동 시 변경 처리
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'type',
        value: roomDoorlockItems?.pincodeVersion !== 'V2'? 'hour' : 'day',
      }));
      if (!keyIssueItem.checkoutAt && roomDoorlockItems?.pincodeVersion === 'V2'){
        const diff_day = differenceInDays(limitCheckInOutAt.maxCheckoutAt, limitCheckInOutAt.minCheckinAt);
        dispatch(changeField({
          form: 'keyIssueItem',
          key: 'checkoutAt',
          value: addDays(limitCheckInOutAt.minCheckinAt, diff_day > 14? 14 : diff_day),
        }));
        setLimitCheckInAt(addDays(limitCheckInOutAt.minCheckinAt, 1));
        setLimitCheckOutAt(addDays(limitCheckInOutAt.maxCheckoutAt, -1));
      }
      if (!keyIssueItem.checkoutAt && roomDoorlockItems?.pincodeVersion === 'V3'){
        const diff_hour = differenceInHours(limitCheckInOutAt.maxCheckoutAt, limitCheckInOutAt.minCheckinAt);
        dispatch(changeField({
          form: 'keyIssueItem',
          key: 'checkoutAt',
          value: hotelItem.allowInfinityPincode? limitCheckInOutAt.maxCheckoutAt : addHours(limitCheckInOutAt.minCheckinAt, diff_hour > 120? 120 : diff_hour),
        }));
        setLimitCheckInAt(addHours(limitCheckInOutAt.minCheckinAt, 1));
        setLimitCheckOutAt(addHours(limitCheckInOutAt.maxCheckoutAt, -1));
      }
      if (!keyIssueItem.checkoutAt && roomDoorlockItems?.pincodeVersion === 'V4'){
        const authTimeOut = typeof hotelItem.pincodeAuthTimeoutMin === 'string'? 0 : hotelItem.pincodeAuthTimeoutMin;
        dispatch(changeField({
          form: 'keyIssueItem',
          key: 'checkoutAt',
          value: addMinutes(new Date(limitCheckInOutAt.minCheckinAt), authTimeOut),
        }));
        setLimitCheckInAt(addHours(limitCheckInOutAt.minCheckinAt, 1));
        setLimitCheckOutAt(addHours(limitCheckInOutAt.maxCheckoutAt, -1));
      }
      setActivePage(2);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[bookingCreateError, bookingCreateSuccess, bookingItem.bookingId, dispatch]);

  const handleCancelBooking = useCallback((flag:string|undefined) => {
    dispatch(cancelBookingAction({bookingId: selectedBookingId}));
    setSelectedBookingId('');
    setActivePage(1);
    dispatch(changeResult({
      key: 'bookingCreateSuccess',
      value: false,
    }));
    dispatch(changeResult({
      key: 'bookingCancelSuccess',
      value: false,
    }));
    dispatch(changeResult({
      key: 'bookingCreateError',
      value: null,
    }));
    dispatch(changeResult({
      key: 'bookingCancelError',
      value: null,
    }));
    dispatch(changeResult({
      key: 'userMobileKeyError',
      value: null,
    }));
    dispatch(changeResult({
      key: 'userPincodeError',
      value: null,
    }));
    if(flag === 'close'){
      toggle();
    }
  },[dispatch, selectedBookingId, toggle]);

  const handleIssueKey = useCallback(() => {
    const reqNum = keyIssueItem.countryNumber + Number.parseInt(keyIssueItem.phoneNumber);
    if (!validateIssueKeyItem(keyIssueItem)) setIsOpenRequiredParameterFailModal(true);
    if (keyIssueItem.keyType === 'mobilekey') dispatch(issueUserMobilekeyAction({bookingId: selectedBookingId, ...keyIssueItem, phoneNumber: reqNum}));
    else dispatch(issueUserPincodeAction({bookingId: selectedBookingId, ...keyIssueItem, phoneNumber: reqNum}));
  },[dispatch, keyIssueItem, selectedBookingId]);
  
  //issueMobileKey 등록 성공, 실패
  useEffect(() => {
    if(isOpen){
      if(userMobileKeyError){      
        if (!userMobileKeyError.response) setMessageKeyIssueFail(userMobileKeyError.message);
        else setMessageKeyIssueFail(`${userMobileKeyError.response.data.code}, ${userMobileKeyError.response.data.message}`);

        if(userMobileKeyError.response.data.code === 401 || userMobileKeyError.response.data.code === 419) reload();
        else setIsOpenKeyIssueFailModal(true);
      }
      //sms 전역상태로 전송
      if(userMobileKeyItem){
        dispatch(changeAllField({
          sms: {
            type: 'mobilekey',
            value: userMobileKeyItem.exchangekey,
            keyId: userMobileKeyItem.user_id,
          }
        }));
        setIsOpenKeyIssueSuccessModal(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isOpen, userMobileKeyItem, userMobileKeyError, dispatch]);

  //issuePincodekey 등록 성공, 실패
  useEffect(() => {
    if(isOpen){
      if(userPincodeError){
        if (!userPincodeError.response) setMessageKeyIssueFail(userPincodeError.message);
        else setMessageKeyIssueFail(`${userPincodeError.response.data.code}, ${userPincodeError.response.data.message}`);

        if(userPincodeError.response.data.code === 401 || userPincodeError.response.data.code === 419) reload();
        else setIsOpenKeyIssueFailModal(true);
      }
      //sms 전역상태로 전송
      if(userPincodeItem){
        dispatch(changeAllField({
          sms: {
            type: 'pincode',
            value: userPincodeItem.pincode,
            keyId: userPincodeItem.pincode_id,
          }
        }));
        setIsOpenKeyIssueSuccessModal(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isOpen, userPincodeItem, userPincodeError, dispatch]);

  const handleReload = () => {
    reload();
    toggle();
    setActivePage(1);
    setIsSlimkeyCheck(false);
    setSelectedBuildingId('');
    dispatch(initialize());
  }
  
  const handleToggle = () => {
    toggle();
    setActivePage(1);
    setIsSlimkeyCheck(false);
    setSelectedBuildingId('');
    dispatch(initializeRoom()); //객실 초기화
    dispatch(initializeCommon()); //공동도어 초기화
    dispatch(initialize());
  }

  //공용도어 (단지 공용도어 넣기)
  useEffect(() => {
    if(commonroomListItems?.length){
      const newCommonItem = commonroomListItems.map((commonroom:any) => {
        return commonroom.status === 'installed' && !commonroom.building_id? {value: commonroom.id, label: commonroom.name,  isDisabled: commonroom.status !== 'installed', building_id: null}: '';
      });
      setCommonroomItems(newCommonItem.filter(common => common !== ''));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[commonroomListItems]);

  //빌딩 공용도어 넣기
  useEffect(() => {
    if(commonroomBuildingListItems?.length){
      //이전 빌딩 공용도어 빼고 다시 계산
      const newCommonroomItems = commonroomItems.map((commonroom:any) => {
        return !commonroom.building_id? {value: commonroom.value, label: commonroom.label,  isDisabled: commonroom.isDisabled, building_id: null }: '';
      });
      //현재 선택된 빌딩 공용도어 정리
      const newCommonItem = commonroomBuildingListItems.map((commonroom:any) => {
        return commonroom.status === 'installed'? {value: commonroom.id, label: commonroom.name,  isDisabled: commonroom.status !== 'installed', building_id: commonroom.building_id}: '';
      });
      //두개의 공용도어 합치기
      const result = newCommonroomItems.filter(common => common !== '').concat(newCommonItem.filter(common => common !== ''));
      setCommonroomItems(result);
    }else{
      //이전 빌딩 공용도어 빼고 다시 계산
      const newCommonroomItems = commonroomItems.map((commonroom:any) => {
        return !commonroom.building_id? {value: commonroom.value, label: commonroom.label,  isDisabled: commonroom.isDisabled, building_id: null }: '';
      });
      setCommonroomItems(newCommonroomItems.filter(common => common !== ''));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[commonroomBuildingListItems]);

  useEffect(() => {
    if (isOpen) handleListCommonroom();
  }, [handleListCommonroom, isOpen]);

  useEffect(() => {
    if (isOpen && selectedBuildingId){
      handleListRoom();
      handleListBuildingCommonroom();
      if(hotelItem.useSlimkey) setIsSlimkeyCheck(true);
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedBuildingId]);
  
  useEffect(() => {
    if (isOpen && selectedRoomId) handleSelectRoom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedRoomId]);

  useEffect(() => {
    if (isOpen && hotelId){
      handleListBuilding();
      dispatch(initialize()); //예약 초기화
      dispatch(initializeRoom()); //객실 초기화
      dispatch(initializeCommon()); //공동도어 초기화
      setSelectedBuildingId('');
      setSelectedRoomId('');
      setIsSlimkeyCheck(false);
    } 
  }, [isOpen, hotelId, handleListBuilding, dispatch]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <BookingCreate
              bookingItem={bookingItem}
              keyIssueItem={keyIssueItem}
              limitCheckInOutAt={limitCheckInOutAt}
              selectedBuildingId={selectedBuildingId}
              buildingItems={buildingItems}
              roomItems={roomItems}
              commonroomItems={commonroomItems}
              activePage={activePage}
              pincodeVersion={roomDoorlockItems?.pincodeVersion}
              limitCheckInAt={limitCheckInAt}
              limitCheckOutAt={limitCheckOutAt}
              isSlimkeyCheck={isSlimkeyCheck}
              checkinAtV4HH={checkinAtV4HH}
              checkinAtV4MM={checkinAtV4MM}
              toggle={handleToggle}
              handleChange={handleChange}
              handleChangeDate={handleChangeDate}
              handleChangeCommonroom={handleChangeCommonroom}
              handleSetMaxDate={handleSetMaxDate}
              handleCreateBooking={handleCreateBooking}
              handleCancelBooking={handleCancelBooking}
              handleIssueKey={handleIssueKey}
              handleChangeKeyType={handleChangeKeyType}
              handleChangePincodeType={handleChangePincodeType}
              hnadleChangeDateV4={hnadleChangeDateV4}
              validateStartAt={validateStartAt}
              validateEndAt={validateEndAt}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenBookingCreateSuccessModal}
        toggle={() => setIsOpenBookingCreateSuccessModal(!isOpenBookingCreateSuccessModal)}
        message='예약 생성이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenRequiredParameterFailModal}
        toggle={() => setIsOpenRequiredParameterFailModal(!isOpenRequiredParameterFailModal)}
        message='필수 입력값을 확인 해주세요.'
      />
      <ResponseFailModal
        isOpen={isOpenBookingCreateFailModal}
        toggle={() => setIsOpenBookingCreateFailModal(!isOpenBookingCreateFailModal)}
        message={messageBookingCreateFail || '예약 생성에 실패 하였습니다.'}
      />
      <ResponseFailModal
        isOpen={isOpenKeyIssueFailModal}
        toggle={() => setIsOpenKeyIssueFailModal(!isOpenKeyIssueFailModal)}
        message={messageKeyIssueFail || '키 발급에 실패 하였습니다.'}
      />
      <SMSSendContainer
        isOpen={isOpenKeyIssueSuccessModal}
        toggle={() => setIsOpenKeyIssueSuccessModal(!isOpenKeyIssueSuccessModal)}
        bookingId={selectedBookingId}
        reload={handleReload}
      />
    </Fragment>
  );
};

export default BookingCreateContainer;