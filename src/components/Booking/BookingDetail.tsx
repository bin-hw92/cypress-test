import React, { Fragment } from 'react';
import { Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEllipsisV, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { dateFormatter } from '../../lib/formatter';
import countryInfo from '../../assets/countries.json';
import styled from 'styled-components';
import { BookingDetailProps } from '../../types/booking';
import { useNameDetailChange, usePhoneDetailChange } from '../../lib/useInfoChange';

/* styled */
const FormCardDetail = styled.div`
padding: 0 20px 30px 20px;
width: calc(100%; - 40px);
border: 1px solid #cccccc;
border-radius: 0.3rem;
border-top-left-radius: 0;
background: #ffffff;
box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);

  .inline-flex {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #cccccc;
    border-radius: 0.35rem;

    .w-50 {
      flex: 1;
      width: 50%;

      .card-text {
        display: flex;
        padding-right: 3.75rem;
        width: 100%;
        align-items: center;
        box-sizing: border-box;

        p {
          margin: 0;
          padding: 1rem 0.875rem;
          width: 11.25rem;
          min-height: 61px;
          color: #555555;
          line-height: 1.8rem;
          border-bottom: 1px solid #e3e8f0;
          background: #e3e8f0;
          box-sizing: inherit;

          .required {
            margin-left: 3px;
            color: #ef4b56;
          }
        }
        .card-text-input {
          margin: 0.625rem 0 0.625rem 2.5rem;
          padding: 0.625rem 0.5rem;
          width: calc(100% - 13.75rem);
          font-size: 0.875rem;
          color: #333333;
          line-height: 1.2;
          border: 1px solid #777777;
          border-radius: 0.18775rem;
          box-sizing: inherit;
          
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
          margin: 0.625rem 0 0.625rem 2.5rem;
          width: calc(100% - 13.75rem);
          box-sizing: inherit;
          
          input {
            padding: 0.625rem 0.5rem;
            width: 100%;
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
          margin: 0.625rem auto 0.625rem 2.5rem;
          padding: 0.625rem 0.5rem;
          width: calc(100% - 13.75rem);
          height: 2.5rem;
          font-size: 0.875rem;
          color: #333333;
          border: 1px solid #777777;
          border-radius: 0.18775rem;
          box-sizing: inherit;

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
  }
`;
const FormFootWrap = styled.div`
display: inline-flex;
padding: 1.25rem 0;
width: 100%;
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
`;
const FormCardTitle = styled.div`
  display: inline-flex;
  position: relative;
  padding: 1.25rem 0 0.675rem 0;
  width: 100%;
  height: 2rem;
  text-align: left;
  justify-content: space-between;

  button {
    padding: 3px 14px;
    border-radius: 1rem;
    cursor: pointer;
    
    :hover {
      background-color: #ffffff;
    }
  }
  .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 7rem;
    padding: 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: #555555;
    border: 1px solid #cccccc;
    border-radius: 0.35rem;
    background-color: #ffffff;
    background-clip: padding-box;
    box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 
    0 2px 4px -2px rgb(0 0 0 / 30%);
    z-index: 1000;
    
    &.show {
      display: block;
    }
    .dropdown-item-delete {
      display: block;
      cursor: pointer;
      padding: 8px 20px;
      text-align: left;
      
      :hover {
        background: #edf3f4;
      }

      &.disabled {
        color: #999999;
        background: #eeeeee;
        cursor: default;
      }
    }
  }
`;

const BookingDetail = ({
  bookingItem,
  userRole,
  handleChange,
  handleChangeDate,
  handleGoBack,
  handleSelectBooking,
  handleUpdateBooking,
  handleModal,
}:BookingDetailProps) => {
  const countryInfoList = Object.values(countryInfo);

  return (
    <Fragment>
      <FormCardDetail id='booking-detail-wrap'>
        <div className='form-card-tab-detail btlr-0'>
          <FormCardTitle>
            <div className='form-item-cancel'>
              <button className='btn-item-close bgc-unset bsd-unset' onClick={handleGoBack}>
                <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>예약 목록으로</span>
              </button>
            </div>
            <div className='form-dropdown detail'>
              {userRole === 'master' &&
                <Dropdown onClick={e => e.stopPropagation()}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FontAwesomeIcon icon={faEllipsisV}/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className='dropdown-item-delete center' onClick={handleModal}>
                      <span>예약 삭제</span>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              }
            </div>
          </FormCardTitle>
          <div>
            <div className='inline-flex'>
              <div className='w-50'>
                <div className='card-text'>
                  <p>
                    {/* <FontAwesomeIcon icon={faBuilding}/> */}
                    <b>빌딩</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={bookingItem.buildingName || '-'}
                    disabled
                  />
                </div>
                <div className='card-text'>
                  <p>
                    {/* <FontAwesomeIcon icon={faBed}/> */}
                    <b>객실</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={bookingItem.roomName || '-'}
                    disabled
                  />
                </div>
                <div className='card-text'>
                  <p>
                    {/* <FontAwesomeIcon icon={faUserAlt}/> */}
                    <b>예약자명</b>
                    <span className='required'>*</span>
                  </p>
                  <input
                    className='card-text-input'
                    placeholder='예약자명을 입력 해주세요.'
                    value={useNameDetailChange(bookingItem.userName, userRole)}
                    name='userName'
                    onChange={e => handleChange('booking', e)}
                    disabled={userRole !== 'master'}
                  />
                </div>
                <div className='card-text'>
                  <p>
                    {/* <FontAwesomeIcon icon={faPhone}/> */}
                    <b>전화번호</b>
                    <span className='required'>*</span>
                  </p>
                  <select
                    className='card-text-select'
                    value={bookingItem.countryNumber}
                    name='countryNumber'
                    onChange={e => handleChange('booking', e)}
                    disabled={userRole !== 'master'}
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
                    value={usePhoneDetailChange(bookingItem.phoneNumber, userRole)}
                    maxLength={11}
                    name='phoneNumber'
                    onChange={e => handleChange('booking', e)}
                    disabled={userRole !== 'master'}
                  />
                </div>
              </div>
              <div className='w-50 bl-1-dashed-gray'>
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
                    placeholder='예약에 대한 설명을 입력 해주세요.'
                    value={bookingItem.desc}
                    name='desc'
                    onChange={e => handleChange('booking', e)}
                  />
                </div>
                <div className='card-text'>
                  <p>
                    {/* <FontAwesomeIcon icon={faHammer}/> */}
                    <b>생성일자</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={bookingItem.createdAt?dateFormatter(bookingItem.createdAt):''}
                    disabled
                  />
                </div>
                <div className='card-text'>
                  <p>
                    {/* <FontAwesomeIcon icon={faWrench}/> */}
                    <b>수정일자</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={bookingItem.updatedAt?dateFormatter(bookingItem.updatedAt):''}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormCardDetail>
      <FormFootWrap>
        <div className='form-item-cancel'>
          <button className='btn-item-cancel' onClick={handleSelectBooking}>
            <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
          </button>
        </div>
        {userRole === 'master' &&
          <div className='form-item-add center detail'>
            <button className='btn-item-add' onClick={handleUpdateBooking}>
              <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
            </button>
          </div>
        }
      </FormFootWrap>
    </Fragment>
  );
};

export default BookingDetail;