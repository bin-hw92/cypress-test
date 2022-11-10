import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { cancelBookingAction, changeResult, selectBookingAction } from '../../stores/booking';
import BookingCancel from '../../components/Booking/BookingCancel';
import { BookingCancelContainerProps } from '../../types/booking';

const BookingCancelContainer = ({
  isOpen,
  toggle,
  reload,
  bookingId,
}:BookingCancelContainerProps) => {
  const dispatch = useDispatch();
  const { bookingItem, bookingCancelSuccess, bookingCancelError } = useSelector(({ booking }:RootState) => ({
    bookingItem: booking.booking,
    bookingCancelSuccess: booking.bookingCancelSuccess,
    bookingCancelError: booking.bookingCancelError,
  }));
  const [isOpenBookingCancelSuccessModal, setIsOpenBookingCancelSuccessModal] = useState<boolean>(false);
  const [isOpenBookingCancelFailModal, setIsOpenBookingCancelFailModal] = useState<boolean>(false);
  const [ messageBookingCancelFail, setMessageBookingCancelFail ] = useState<string>('');

  const handleSelectBooking = useCallback(() => {
    dispatch(selectBookingAction({bookingId}));
  },[bookingId, dispatch]);

  const handleCancelBooking = useCallback(() => {
    dispatch(cancelBookingAction({bookingId}));
  },[bookingId, dispatch]);

  useEffect(() => {
    if(isOpen){
      if(bookingCancelError){
        toggle();
        if (!bookingCancelError.response) setMessageBookingCancelFail(bookingCancelError.message);
        else setMessageBookingCancelFail(`${bookingCancelError.response.data.code}, ${bookingCancelError.response.data.message}`);

        if(bookingCancelError.response.data.code === 401 || bookingCancelError.response.data.code === 419) reload();
        else setIsOpenBookingCancelFailModal(true);
        dispatch(changeResult({
          key: 'bookingCancelError',
          value: null,
        }));
      }
      if(bookingCancelSuccess){
        toggle();
        setIsOpenBookingCancelSuccessModal(true);
        setTimeout(() => {
          setIsOpenBookingCancelSuccessModal(false);
          reload();
        }, 1500);
        dispatch(changeResult({
          key: 'bookingCancelSuccess',
          value: false,
        }));
      }
    }
  },[bookingCancelSuccess, bookingCancelError, toggle, reload, dispatch, isOpen]);

  useEffect(() => {
    if (isOpen && bookingId) handleSelectBooking();
  }, [bookingId, handleSelectBooking, isOpen]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <BookingCancel 
            bookingItem={bookingItem}
            handleCancelBooking={handleCancelBooking}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenBookingCancelSuccessModal}
        toggle={() => setIsOpenBookingCancelSuccessModal(!isOpenBookingCancelSuccessModal)}
        message='예약 삭제가 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenBookingCancelFailModal}
        toggle={() => setIsOpenBookingCancelFailModal(!isOpenBookingCancelFailModal)}
        message={messageBookingCancelFail || '예약 삭제에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default BookingCancelContainer;