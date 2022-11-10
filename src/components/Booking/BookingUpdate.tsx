import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimesCircle, faXmark } from '@fortawesome/free-solid-svg-icons'
import countryInfo from '../../assets/countries.json';
import styled from 'styled-components';
import { BookingUpdateProps } from '../../types/booking';

/* styled */
const FormCardWrap = styled.div`
width: 100%;
margin: auto;
border-radius: 0.3rem;

  .inline-flex {
    display: flex;
    position: relative;
    margin: 0 1.25rem;
    width: calc(100% - 40px);
    height: 100%;
    text-align: left;
    border: 1px solid #cccccc;
    border-radius: 0.35rem;

    .w-100 {
      flex: 1;
      padding: 1.25rem 0;
      width: 100%;

      .card-text {
        display: flex;
        width: calc(100% - 1.25rem);
        padding: 0 0.625rem;
        align-items: center;
        
        p {
          margin: 0;
          padding: 1rem 0.875rem;
          width: 30%;
          min-height: 27px;
          font-size: 0.875rem;
          color: #555555;
          line-height: 1.8rem;
          border-bottom: 1px solid #e3e8f0;
          background: #e3e8f0;
          box-sizing: inherit;

          span {
            font-size: 12px;
          }
          .required {
            margin-left: 3px;
            font-size: 0.875rem !important;
            color: #ef4b56;
          }
        }
      }
      .card-text-input {
        margin: 0.625rem 0 0.625rem 1.25rem;
        padding: 0 0.5rem;
        width: 70%;
        height: 2.5rem;
        font-size: 0.875rem;
        color: #333333;
        line-height: 1.2;
        border: 1px solid #777777;
        border-radius: 0.18775rem;
        box-sizing: border-box;

        :disabled {
          color: #777777;
          border: 1px solid #cccccc;
          background: #eeeeee;
        }
        &:focus-visible {
          outline: 1.5px solid #044dac;
        }
      }
      .card-text-date {
        margin: 0.625rem 0 0.625rem 1.25rem;
        width: 70%;
        box-sizing: border-box;
        
        input {
          padding: 1px 0.5rem;
          width: 100%;
          height: 2.5rem;
          font-size: 0.875rem;
          color: #333333;
          line-height: 1.2;
          border: 1px solid #777777;
          border-radius: 0.18775rem;
          box-sizing: border-box;
          
          :disabled {
            color: #777777;
            border: 1px solid #cccccc;
            background: #eeeeee;
          }
          &:focus-visible {
            outline: 1.5px solid #044dac;
          }
        }
      }
      .card-text-select {
        margin: 0.625rem auto 0.625rem 1.25rem;
        padding: 0 0.5rem;
        width: 70%;
        height: 2.5rem;
        font-size: 0.875rem;
        color: #333333;
        border: 1px solid #777777;
        border-radius: 0.18775rem;
        box-sizing: border-box;

        option {
          :disabled {
            color: #999999;
            background: #eeeeee;
          }
        }

        :disabled {
          color: #777777;
          border: 1px solid #cccccc;
          background: #eeeeee;
        }
        &:focus-visible {
          outline: 1.5px solid #044dac;
        }
      }
    }
  }
.card-foot {
  display: inline-flex;
  margin: 0 1.25rem;
  padding: 1.25rem 0;
  width: calc(100% - 40px);
  height: 2rem;
  justify-content: space-between;

  .btn-item-cancel {
    padding: 0.5rem;
    height: 2.3rem;
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
  }
  .btn-item-add {
    padding: 0.5rem;
    height: 2.3rem;
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
  }
}
`;
const FormCardTitle = styled.div`
  display: inline-flex;
  position: relative;
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
  width: 100%;
  text-align: left;
  color: #ffffff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  background: #044dac;
  box-sizing: border-box;

  .detail {
    position: relative;
    height: 36px;
    width: calc(100% - 40px);
    padding: 0.675rem 0;
    margin: 0 1.25rem;
    
    .filter {
        position: absolute;
        bottom: 10px;
        right: 0;
    }
  }
  h1 {
    margin: 0;
    font-size: 18px;

    span {
        margin: 0 5px;
        font-size: 0.875rem;
        color: #e6e5e8;
    }
  }
  svg {
    position: absolute;
    top: 1rem;
    right: 1.25rem;
    font-size: 1.625rem;
    cursor: pointer;
  }
`;

const BookingUpdate = ({
  bookingItem,
  handleChange,
  handleChangeDate,
  handleSetMaxDate,
  handleUpdateBooking,
  toggle,
}:BookingUpdateProps) => {
  const countryInfoList = Object.values(countryInfo);

  return (
    <Fragment>
        <FormCardWrap>
          <FormCardTitle>
            <h1>예약 수정</h1>
            <FontAwesomeIcon icon={faXmark} onClick={() => toggle()}/>
          </FormCardTitle>
          <div className='inline-flex'>
            <div className='w-100'>
              <div className='card-text'>
                <p>
                  <b>예약자명</b>
                  <span className='required'>*</span>
                </p>
                <input
                  className='card-text-input'
                  placeholder='예약자명을 입력 해주세요.'
                  value={bookingItem.userName}
                  name='userName'
                  onChange={e => handleChange('booking', e)}
                />
              </div>
              <div className='card-text'>
                <p>
                  <b>전화번호</b>
                  <span className='required'>*</span>
                </p>
                <select
                  className='card-text-select'
                  value={bookingItem.countryNumber}
                  name='countryNumber'
                  onChange={e => handleChange('booking', e)}
                >
                  {countryInfoList.map((country, index) => (
                    <option key={`country-index-${index}`} value={country.phone}>{`${country.name} ( +${country.phone} )`}</option>
                  ))}
                </select>
              </div>
              <div className='card-text'>
                <p></p>
                <input
                  className='card-text-input'
                  placeholder='전화번호를 입력 해주세요.'
                  value={bookingItem.phoneNumber}
                  maxLength={11}
                  name='phoneNumber'
                  onChange={e => handleChange('booking', e)}
                />
              </div>
              <div className='card-text'>
                <p>
                  <b>입실일자</b>
                  <span className='required'>*</span>
                </p>
                <div className='card-text-date'>
                  <DatePicker
                    dateFormat='yyyy-MM-dd HH:mm'
                    placeholderText='입실일자를 선택 해주세요.'
                    selected={bookingItem.checkinAt? bookingItem.checkinAt : undefined}
                    selectsStart
                    minDate={new Date()}
                    endDate={bookingItem.checkoutAt}
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeIntervals={60}
                    timeCaption='Time'
                    name='checkinAt'
                    onChange={(date:Date) => handleChangeDate(date, 'booking', 'checkinAt')}
                    withPortal
                  />
                </div>
              </div>
              <div className='card-text'>
                <p>
                  <b>퇴실일자</b>
                  <span className='required'>*</span>
                </p>
                <div className='card-text-date'>
                  <DatePicker
                    disabled={!bookingItem.checkinAt}
                    dateFormat='yyyy-MM-dd HH:mm'
                    placeholderText='퇴실일자를 선택 해주세요.'
                    selected={bookingItem.checkoutAt? bookingItem.checkoutAt : undefined}
                    selectsEnd
                    minDate={bookingItem.checkinAt}
                    maxDate={handleSetMaxDate()}
                    startDate={bookingItem.checkinAt}
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeIntervals={60}
                    timeCaption='Time'
                    name='checkoutAt'
                    onChange={(date:Date) => handleChangeDate(date, 'booking', 'checkoutAt')}
                    withPortal
                  />
                </div>
              </div>
              <div className='card-text'>
                <p>
                  {/* <FontAwesomeIcon icon={faClipboard}/> */}
                  <b>비고</b>
                </p>
                <input
                  className='card-text-input'
                  placeholder='예약에 대한 설명을 작성 해주세요.'
                  value={bookingItem.desc}
                  name='desc'
                  onChange={e => handleChange('booking', e)}
                />
              </div>
            </div>
          </div>
          <div className='card-foot'>
            <div className='form-item-cancel'>
              <button className='btn-item-cancel' id='booking-update-cancel-btn' onClick={() => toggle()}>
                <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
              </button>
            </div>
            <div className='form-item-add center'>
              <button className='btn-item-add' id='booking-update-add-btn' onClick={handleUpdateBooking}>
                <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
              </button>
            </div>
          </div>
        </FormCardWrap>
    </Fragment>
  );
};

export default BookingUpdate;