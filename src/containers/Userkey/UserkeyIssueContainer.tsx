import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { addDays, addHours, addMinutes, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseFailModal } from '../../components/Modal/Response';
import { SMSSendContainer } from '../Commons/SMSSendContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeField, changeResult, issueUserMobilekeyAction, issueUserPincodeAction, selectBookingAction } from '../../stores/booking';
import { changeAllField } from '../../stores/sms';
import UserkeyIssue from '../../components/Userkey/UserkeyIssue';
import { UserkeyIssueContainerProps } from '../../types/userkey';
import { selectRoomIdAction } from '../../stores/room';
import moment from 'moment';

const UserkeyIssueContainer = ({
  isOpen,
  toggle,
  reload,
  buildingId,
  bookingId,
  roomId,
  roomName,
  allowInfinityPincode,
}:UserkeyIssueContainerProps) => {
  const dispatch = useDispatch();
  const { bookingItem, keyIssueItem, limitCheckInOutAt, userMobileKeyItem, userMobileKeyError, userPincodeItem, userPincodeError, roomDoorlockItems, pincodeAuthTimeoutMin } = useSelector(({ booking, room, hotel }:RootState) => ({
    bookingItem: booking.booking,
    keyIssueItem: booking.keyIssueItem,
    limitCheckInOutAt: booking.limitCheckInOutAt,
    userMobileKeyItem: booking.userMobileKeyItem, 
    userMobileKeyError: booking.userMobileKeyError, 
    userPincodeItem: booking.userPincodeItem, 
    userPincodeError: booking.userPincodeError,
    roomDoorlockItems: room.room.doorlock,
    pincodeAuthTimeoutMin: hotel.hotel.pincodeAuthTimeoutMin,
  }));
  const [ isOpenKeyIssueSuccessModal, setIsOpenKeyIssueSuccessModal ] = useState<boolean>(false);
  const [ isOpenKeyIssueFailModal, setIsOpenKeyIssueFailModal ] = useState<boolean>(false);
  const [ messageKeyIssueFail, setMessageKeyIssueFail ] = useState<string>('');
  const [ limitCheckInAt, setLimitCheckInAt ] = useState<Date|undefined>();
  const [ limitCheckOutAt, setLimitCheckOutAt ] = useState<Date|undefined>();
  const checkinAtV4HH = Array.from({length: 23}, (v,i)=> i+1);
  const checkinAtV4MM = Array.from({length: 59}, (v,i)=> i+1);

  const handleSelectBooking = useCallback(() => {
    dispatch(selectBookingAction({bookingId}));
  },[bookingId, dispatch]);

  const handleSelectRoom = useCallback(() => {
    if(buildingId) dispatch(selectRoomIdAction({buildingId, roomId}));
  },[buildingId, dispatch, roomId]);
  
  //인풋 변경 이벤트 핸들러
  const handleChange = useCallback((form:string, e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const value2 = name === 'isNew'? value === 'O'? true : false : value;
    dispatch(
        changeField({
            form: form,
            key: name,
            value: value2,
        })
    );
  },[dispatch]);

  //변경 이벤트 날짜
  const handleChangeDate = useCallback((date:Date, name:string) => {
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
      if((roomDoorlockItems?.pincodeVersion === 'V3' && !allowInfinityPincode && differenceInHours(keyIssueItem.checkoutAt, value) > 120) ||
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
      if((roomDoorlockItems?.pincodeVersion === 'V3' && !allowInfinityPincode && differenceInHours(value, keyIssueItem.checkinAt) > 120) ||
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
  },[limitCheckInOutAt, dispatch, keyIssueItem.checkoutAt, keyIssueItem.type, keyIssueItem.checkinAt, roomDoorlockItems?.pincodeVersion, allowInfinityPincode]);

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
    const authTimeOut = typeof pincodeAuthTimeoutMin === 'string'? 0 : pincodeAuthTimeoutMin;
    dispatch(changeField({
      form: 'keyIssueItem',
      key: 'checkoutAt',
      value: addMinutes(new Date(new_date), authTimeOut),
    }));
  }

  const validateStartAt = (time:Date) => {
    const selectedDate = new Date(time);
    return (limitCheckInOutAt.minCheckinAt.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() < limitCheckInOutAt.maxCheckoutAt.getTime());
  }

  const validateEndAt = (time:Date) => {
    const selectedDate = new Date(time);
    return (keyIssueItem.checkinAt.getTime() < selectedDate.getTime()) && (selectedDate.getTime() <= limitCheckInOutAt.maxCheckoutAt.getTime());
  }


  const handleChangeKeyType = (keyType:string) => {
    dispatch(changeField({
      form: 'keyIssueItem',
      key: 'keyType',
      value: keyType,
    }));
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
        value: addDays(limitCheckInOutAt.minCheckinAt, diff_day > 14? 14 : diff_day),
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

  const handleIssueKey = useCallback(() => {
    const reqNum = keyIssueItem.countryNumber + Number.parseInt(keyIssueItem.phoneNumber);
    if (keyIssueItem.keyType === 'mobilekey') dispatch(issueUserMobilekeyAction({bookingId, ...keyIssueItem, phoneNumber: reqNum}));
    else dispatch(issueUserPincodeAction({bookingId, ...keyIssueItem, phoneNumber: reqNum}));
  },[keyIssueItem, dispatch, bookingId]);

  //취소 버튼 클릭 시
  const handleToggle = () => {
    dispatch(changeResult({
      key: 'userMobileKeyError',
      value: null,
    }));
    dispatch(changeResult({
      key: 'userPincodeError',
      value: null,
    }));
    toggle();
  };
  
  //issueMobileKey 등록 성공, 실패
  useEffect(() => {
    if(isOpen){
      if(userMobileKeyError){
        if (!userMobileKeyError.response) setMessageKeyIssueFail(userMobileKeyError.message);
        else setMessageKeyIssueFail(`${userMobileKeyError.response.data.code}, ${userMobileKeyError.response.data.message}`);

        if(userMobileKeyError.response.data.code === 401 || userMobileKeyError.response.data.code === 419) reload();
        else setIsOpenKeyIssueFailModal(true);
      }
      if(userMobileKeyItem){
        dispatch(changeAllField({
          sms: {
            type: 'mobilekey',
            value: userMobileKeyItem.exchangekey,
            keyId: userMobileKeyItem.user_id,
          }
        }));
        dispatch(changeResult({
            key: 'userMobileKeyItem',
            value: null,
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
      if(userPincodeItem){
        dispatch(changeAllField({
          sms: {
            type: 'pincode',
            value: userPincodeItem.pincode,
            keyId: userPincodeItem.pincode_id,
          }
        }));
        dispatch(changeResult({
            key: 'userPincodeItem',
            value: null,
        }));
        setIsOpenKeyIssueSuccessModal(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isOpen, userPincodeItem, userPincodeError, dispatch]);

  useEffect(() => {
    if (isOpen && bookingId) handleSelectBooking();
  }, [bookingId, handleSelectBooking, isOpen]);
  
  useEffect(() => {
    if (isOpen && keyIssueItem && roomDoorlockItems?.pincodeVersion !== 'V2'){
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'type',
        value: roomDoorlockItems?.pincodeVersion !== 'V2'? 'hour' : 'day',
      }));
    }
  }, [keyIssueItem, isOpen, dispatch, roomDoorlockItems?.pincodeVersion]);
    
  useEffect(() => {
    const maxCheckoutAt = limitCheckInOutAt.maxCheckoutAt? limitCheckInOutAt.maxCheckoutAt : 0;
    const minCheckinAt = limitCheckInOutAt.minCheckinAt? limitCheckInOutAt.minCheckinAt : 0;
    if (isOpen && !keyIssueItem.checkoutAt && roomDoorlockItems?.pincodeVersion === 'V2'){
      const diff_day = differenceInDays(maxCheckoutAt, minCheckinAt);
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'checkoutAt',
        value: addDays(minCheckinAt, diff_day > 14? 14 : diff_day),
      }));
      setLimitCheckInAt(addDays(minCheckinAt, 1));
      setLimitCheckOutAt(addDays(maxCheckoutAt, -1));
    }
    if (isOpen && !keyIssueItem.checkoutAt && roomDoorlockItems?.pincodeVersion === 'V3'){
      const diff_hour = differenceInHours(maxCheckoutAt, minCheckinAt);
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'checkoutAt',
        value: allowInfinityPincode? limitCheckInOutAt.maxCheckoutAt : addHours(minCheckinAt, diff_hour > 120? 120 : diff_hour),
      }));
      setLimitCheckInAt(addHours(minCheckinAt, 1));
      setLimitCheckOutAt(addHours(maxCheckoutAt, -1));
    }
    if (isOpen && !keyIssueItem.checkoutAt && roomDoorlockItems?.pincodeVersion === 'V4'){
      const authTimeOut = typeof pincodeAuthTimeoutMin === 'string'? 0 : pincodeAuthTimeoutMin;
      dispatch(changeField({
        form: 'keyIssueItem',
        key: 'checkoutAt',
        value: addMinutes(new Date(limitCheckInOutAt.minCheckinAt), authTimeOut),
      }));
      setLimitCheckInAt(addHours(minCheckinAt, 1));
      setLimitCheckOutAt(addHours(maxCheckoutAt, -1));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitCheckInOutAt, isOpen, dispatch, roomDoorlockItems?.pincodeVersion]);
  
  useEffect(() => {
    if (buildingId) handleSelectRoom();
  }, [handleSelectRoom, buildingId]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <UserkeyIssue 
              keyIssueItem={keyIssueItem}
              limitCheckInOutAt={limitCheckInOutAt}
              pincodeVersion={roomDoorlockItems? roomDoorlockItems.pincodeVersion : ''}
              limitCheckInAt={limitCheckInAt}
              limitCheckOutAt={limitCheckOutAt}
              checkinAtV4HH={checkinAtV4HH}
              checkinAtV4MM={checkinAtV4MM}
              toggle={handleToggle}
              handleChange={handleChange}
              handleChangeDate={handleChangeDate}
              handleIssueKey={handleIssueKey}
              handleChangeKeyType={handleChangeKeyType}
              handleChangePincodeType={handleChangePincodeType}
              hnadleChangeDateV4={hnadleChangeDateV4}
              validateStartAt={validateStartAt}
              validateEndAt={validateEndAt}
          />
        </ModalBody>
      </Modal>
      <SMSSendContainer
        isOpen={isOpenKeyIssueSuccessModal}
        toggle={() => setIsOpenKeyIssueSuccessModal(!isOpenKeyIssueSuccessModal)}
        bookingId={bookingId}
        reload={() => {
          reload();
          toggle();
        }}
      />
      <ResponseFailModal
        isOpen={isOpenKeyIssueFailModal}
        toggle={() => setIsOpenKeyIssueFailModal(!isOpenKeyIssueFailModal)}
        message={messageKeyIssueFail || '키 발급에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default UserkeyIssueContainer;