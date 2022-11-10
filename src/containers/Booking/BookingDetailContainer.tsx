import React, { Fragment, useState, useEffect, useCallback, ChangeEvent } from 'react';
import BookingCancelContainer from './BookingCancelContainer';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeField, changeResult, initialize, selectBookingAction, updateBookingAction } from '../../stores/booking';
import BookingDetail from '../../components/Booking/BookingDetail';
import styled from 'styled-components';
import UserkeyListContainer from '../Userkey/UserkeyListContainer';
import { BookingDetailContainerProps } from '../../types/booking';

/* styled */
const FormTabWrap = styled.nav`
  display: inline-flex;
  margin: 16px auto 0 auto;

  ul {
    display: inline-flex;
    list-style: none;
    margin: auto;
    padding: 0;

    .tab-item {
      position: relative;
      bottom: -1px;
      margin: auto;
      padding: 0 15px;
      height: 36px;
      min-width: 130px;
      color: #555555;
      line-height: 35px;
      text-align: center;
      border: 1px solid #cccccc;
      border-top-left-radius: 0.35rem;
      border-top-right-radius: 0.35rem;
      border-bottom: 1px solid #ffffff;
      background-color: #ffffff;
      cursor: default;

      &.inactive {
        color: #555555;
        border: 1px solid #cccccc;
        border-bottom: 0;
        background-color: #edf3f4;
        cursor: pointer;
        
        &:hover {    
          text-decoration: underline;
          text-underline-position: under;
        }
      }
    }
  }
`;

const BookingDetailContainer = ({
  isOpen,
  bookingView,
  listBooking,
  handleViewChange,
}:BookingDetailContainerProps) => {
  const dispatch = useDispatch();
  const { hotelItem, bookingItem, userkeyListItems, bookingUpdateSuccess, bookingUpdateError, detailField, userRole } = useSelector(({ hotel, booking, bookingList, header }:RootState) => ({
    hotelItem: hotel.hotel,
    bookingItem: booking.booking,
    userkeyListItems: booking.userkeyListItems,
    bookingUpdateSuccess: booking.bookingUpdateSuccess,
    bookingUpdateError: booking.bookingUpdateError,
    detailField: bookingList.detailField,
    userRole: header.userRole,
  }));

  const [ isOpenBookingCancelModal, setIsOpenBookingCancelModal ] = useState<boolean>(false);
  const [ isOpenBookingUpdateSuccessModal, setIsOpenBookingUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenBookingUpdateFailModal, setIsOpenBookingUpdateFailModal ] = useState<boolean>(false);
  const [ messageBookingUpdateFail, setMessageBookingUpdateFail ] = useState<string>('');

  const handleSelectBooking = useCallback(() => {
    dispatch(selectBookingAction({bookingId: detailField.bookingId}));
  }, [detailField.bookingId, dispatch]);

  const handleModal = () => {
    setIsOpenBookingCancelModal(true);
  }

  //인풋 변경 이벤트 핸들러
  const handleChange = useCallback((form:string, e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const value2 = name === 'roomIds'? [e.target.value] : value;
    dispatch(
        changeField({
            form: form,
            key: name,
            value: value2,
        })
    );
},[dispatch]);

  //변경 이벤트 날짜
  const handleChangeDate = useCallback((date:Date, form:string, name:string) => {
    dispatch(
        changeField({
            form: form,
            key: name,
            value: date,
        })
    );
  },[dispatch]);

  const handleGoBack = () => {
    listBooking();
    handleViewChange('booking', 'list');
    dispatch(initialize());
  }

  const handleDoorlockType = useCallback((type:'detail'|'keyList') => {
    handleViewChange('booking', type);
  },[handleViewChange]);

  const reload = () => {
    listBooking();
    handleViewChange('booking', 'list');
  };

  const handleUpdateBooking = useCallback(() => {
    const reqNum = bookingItem.countryNumber + Number.parseInt(bookingItem.phoneNumber);
    dispatch(updateBookingAction({...bookingItem, bookingId: detailField.bookingId, phoneNumber: reqNum}));
  },[detailField.bookingId, bookingItem, dispatch]);

  useEffect(() => {
    if(bookingUpdateError){
      if (!bookingUpdateError.response) setMessageBookingUpdateFail(bookingUpdateError.message);
      else setMessageBookingUpdateFail(`${bookingUpdateError.response.data.code}, ${bookingUpdateError.response.data.message}`);

      if(bookingUpdateError.response.data.code === 401 || bookingUpdateError.response.data.code === 419) reload();
      else setIsOpenBookingUpdateFailModal(true);
      dispatch(
        changeResult({
          key: 'bookingUpdateError',
          value: null,
        })
      );
    }
    if(bookingUpdateSuccess){
      setIsOpenBookingUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenBookingUpdateSuccessModal(false);
        handleSelectBooking();
        dispatch(
          changeResult({
            key: 'bookingUpdateSuccess',
            value: false,
          })
        );
      }, 1500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[bookingUpdateSuccess, bookingUpdateError, handleSelectBooking, dispatch]);

  useEffect(() => {
    try {
      if (isOpen && detailField.bookingId) handleSelectBooking();
    } catch (error) {
      throw error;
    }
  }, [isOpen, detailField.bookingId, handleSelectBooking]);

  return (
    <Fragment>
        <FormTabWrap>
          <ul>
            <li className={`tab-item ${bookingView !== 'detail' ? 'inactive':''}`}
              onClick={() => handleDoorlockType('detail')}
            >예약 정보</li>
            <li className={`tab-item ${bookingView !== 'keyList' ? 'inactive':''}`}
              onClick={() => handleDoorlockType('keyList')}
            >키 목록</li>
          </ul>
        </FormTabWrap>
        <div hidden={bookingView !== 'detail'}>
          <BookingDetail
              bookingItem={bookingItem}
              userRole={userRole}
              handleChange={handleChange}
              handleChangeDate={handleChangeDate}
              handleGoBack={handleGoBack}
              handleSelectBooking={handleSelectBooking}
              handleUpdateBooking={handleUpdateBooking}
              handleModal={handleModal}
          />
        </div>
        <div hidden={bookingView !== 'keyList'}>
          <div className='form-card-tab-detail btlr-0'>
            <UserkeyListContainer
              buildingId={bookingItem.buildingId? bookingItem.buildingId :''}
              bookingId={bookingItem.bookingId? bookingItem.bookingId :''}
              roomId={bookingItem.roomId? bookingItem.roomId :''}
              roomName={bookingItem.roomName? bookingItem.roomName :''}
              userkeyListItems={userkeyListItems}
              allowInfinityPincode={hotelItem.allowInfinityPincode}
              userRole={userRole}
              reload={handleSelectBooking}
              handleGoBack={handleGoBack}
            />
          </div>
        </div>
        <BookingCancelContainer
          isOpen={isOpenBookingCancelModal}
          toggle={() => setIsOpenBookingCancelModal(!isOpenBookingCancelModal)}
          reload={reload}
          bookingId={detailField.bookingId}
        />
        <ResponseSuccessModal
          isOpen={isOpenBookingUpdateSuccessModal}
          toggle={() => setIsOpenBookingUpdateSuccessModal(!isOpenBookingUpdateSuccessModal)}
          message='예약 정보 수정이 완료 되었습니다.'
        />
        <ResponseFailModal
          isOpen={isOpenBookingUpdateFailModal}
          toggle={() => setIsOpenBookingUpdateFailModal(!isOpenBookingUpdateFailModal)}
          message={messageBookingUpdateFail || '예약 정보 수정에 실패 하였습니다.'}
        />
    </Fragment>
  );
};

export default BookingDetailContainer;