import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import addDays from 'date-fns/addDays';
import parseISO from 'date-fns/parseISO';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import BookingUpdate from '../../components/Booking/BookingUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeField, changeResult, selectBookingAction, updateBookingAction } from '../../stores/booking';
import { BookingUpdateContainerProps } from '../../types/booking';

const BookingUpdateContainer = ({
  isOpen,
  toggle,
  reload,
  bookingId,
}:BookingUpdateContainerProps) => {  
  const dispatch = useDispatch();
  const { bookingItem, bookingUpdateSuccess, bookingUpdateError } = useSelector(({ booking }:RootState) => ({
      bookingItem: booking.booking,
      bookingUpdateSuccess: booking.bookingUpdateSuccess,
      bookingUpdateError: booking.bookingUpdateError,
  }));
  const [ isOpenBookingUpdateSuccessModal, setIsOpenBookingUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenBookingUpdateFailModal, setIsOpenBookingUpdateFailModal ] = useState<boolean>(false);
  const [ messageBookingUpdateFail, setMessageBookingUpdateFail ] = useState<string>('');

  const handleSelectBooking = useCallback(() => {
    dispatch(selectBookingAction({bookingId}));
  },[bookingId, dispatch]);

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

  const handleSetMaxDate = () => {
    return addDays(parseISO(bookingItem.checkinAt), 15);
  };

  const handleUpdateBooking = useCallback(() => {
    const reqNum = bookingItem.countryNumber + Number.parseInt(bookingItem.phoneNumber);
    dispatch(updateBookingAction({...bookingItem, bookingId, phoneNumber: reqNum}));
  },[bookingId, bookingItem, dispatch]);

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
      return;
    }
    if(bookingUpdateSuccess){
      toggle();
      setIsOpenBookingUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenBookingUpdateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'bookingUpdateSuccess',
          value: null,
        })
      );
    }
  },[bookingUpdateSuccess, bookingUpdateError, toggle, reload, dispatch]);

  useEffect(() => {
    if (isOpen && bookingId) handleSelectBooking();
  }, [bookingId, handleSelectBooking, isOpen]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <BookingUpdate 
              bookingItem={bookingItem}
              handleChange={handleChange}
              handleChangeDate={handleChangeDate}
              handleSetMaxDate={handleSetMaxDate}
              handleUpdateBooking={handleUpdateBooking}
              toggle={toggle}
          />
        </ModalBody>
      </Modal>
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

export default BookingUpdateContainer;