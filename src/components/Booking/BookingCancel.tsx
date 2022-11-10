import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import styled from 'styled-components';
import { BookingCancelProps } from '../../types/booking';

/* styled */
const BookingCnacelWrap = styled.div`
  .booking-cancel-content {
    margin: 10px 30px;
    text-align: left;
    border: 1px solid #777777;
    padding: 5px;
    color: #555555;

    p {
      margin: 5px;
    }
  }
  .modal-btn-cancel {
    margin-top: 1.5625rem;
    padding: 0.5rem;
    height: 2.5rem;
    min-width: 5rem;
    font-size: 0.875rem;
    font-weight: bold;
    color: #ffffff;
    border: 0px;
    border-radius: 0.35rem;
    background-color: #dc343f;
    cursor: pointer;
    box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);

    :hover {
        background: #ef4b56;
    }
    svg {
      padding-right: 3px;
    }
  }
  .modal-btn-confirm {
    margin-top: 1.5625rem;
    padding: 0.5rem;
    height: 2.5rem;
    min-width: 5rem;
    font-size: 0.875rem;
    font-weight: bold;
    color: #ffffff;
    border: 0px;
    border-radius: 0.35rem;
    background-color: #044dac;
    cursor: pointer;
    box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);

    :hover {
        background: #4c9ffe;
    }
    svg {
      padding-right: 3px;
    }
  }
`;

const BookingCancel = ({
  bookingItem,
  handleCancelBooking,
  toggle,
}:BookingCancelProps) => {
 
  return (
    <BookingCnacelWrap id='booking-cancel-wrap'>
        <p className='mb-0 mt-0'>
          선택하신 예약을 삭제 하시겠습니까 ?<br/>
        </p>
        <div className='booking-cancel-content'>
          <p>{`객실이름: ${bookingItem.roomName || '-'}`}</p>
          <p>{`예약자명: ${bookingItem.userName || '-'}`}</p>
          <p>{`입실일자: ${moment(bookingItem.checkinAt).format('YYYY-MM-DD HH:mm') || '-'}`}</p>
          <p>{`퇴실일자: ${moment(bookingItem.checkoutAt).format('YYYY-MM-DD HH:mm') || '-'}`}</p>
        </div>
        <button className='modal-btn-cancel' onClick={() => toggle()}>
          <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/>취소
        </button>
        <button className='modal-btn-confirm' onClick={handleCancelBooking}>
          <FontAwesomeIcon icon={faSave} style={{paddingRight:'3px'}}/>확인
        </button>
    </BookingCnacelWrap>
  );
}

export default BookingCancel;