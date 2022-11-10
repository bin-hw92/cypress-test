import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimesCircle, faXmark } from '@fortawesome/free-solid-svg-icons'
import countryInfo from '../../assets/countries.json';
import styled from 'styled-components';
import { UserkeyIssueProps } from '../../types/userkey';
import moment from 'moment';

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
          min-height: 29px;
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
      .card-text-date-V4 {
        display: flex;
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
        select {
          width: 20%;
          margin-left 14px;
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
    padding: 0.675rem 0;
    margin: 0 1.25rem;
    height: 36px;
    width: calc(100% - 40px);
    
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

const UserkeyIssue = ({
  keyIssueItem,
  limitCheckInOutAt,
  pincodeVersion,
  limitCheckInAt,
  limitCheckOutAt,
  checkinAtV4HH,
  checkinAtV4MM,
  toggle,
  handleChange,
  handleChangeDate,
  handleIssueKey,
  handleChangeKeyType,
  handleChangePincodeType,
  hnadleChangeDateV4,
  validateStartAt,
  validateEndAt,
}:UserkeyIssueProps) => {
  const countryInfoList = Object.values(countryInfo);
  const keyTypeList = [
    { key: '핀코드', value: 'pincode' },
    { key: '모바일키', value: 'mobilekey' },
  ];
  const pincodeTypeV2List = [
    { key: '일단위', value: 'day' },
    { key: '시간단위', value: 'hour' },
    { key: '10분단위', value: '10mins' },
  ];
  const pincodeTypeV3List = [
    { key: '시간단위', value: 'hour' },
  ];
  const howToIssueV2List = [
    { key: '복사 발급', value: 'X' },
    { key: '신규 발급', value: 'O' },
  ];
  const howToIssueList = [
    { key: '복사 발급', value: 'X' },
  ];

  const setTimeInterval = () => {
    const formatter = {
      'day': 60,
      'hour': 60,
      '10mins': 10,
    };
    return formatter[keyIssueItem.type] || 60;
  };
  const hourV4 = moment(keyIssueItem.checkinAt).hour() > 9? moment(keyIssueItem.checkinAt).hour() : `0${moment(keyIssueItem.checkinAt).hour()}`;
  const minuteV4 = moment(keyIssueItem.checkinAt).minute() > 9?  moment(keyIssueItem.checkinAt).minute() : `0${moment(keyIssueItem.checkinAt).minute()}`;

  return (
    <Fragment>
        <FormCardWrap id='userkey-issue'>
          <FormCardTitle>
            <h1>키 발급</h1>
            <FontAwesomeIcon icon={faXmark} onClick={() => toggle()}/>
          </FormCardTitle>
          <div className='inline-flex'>
            <div className='w-100'>
              <div className='card-text'>
                <p>
                  <b>키 타입</b>
                  <span className='required'>*</span>
                </p>
                <select
                  className='card-text-select'
                  value={keyIssueItem.keyType}
                  name='keyType'
                  onChange={e => handleChangeKeyType(e.target.value)}
                >
                  {keyTypeList.map((keyType, index) => (
                    <option key={index} value={keyType.value}>{keyType.key}</option>
                  ))}
                </select>
              </div>
              <div hidden={keyIssueItem.keyType !== 'pincode' || pincodeVersion === 'V4'}>
                <div className='card-text'>
                  <p>
                    <b>핀코드 타입</b>
                    <span className='required'>*</span>
                  </p>
                  <select
                    className='card-text-select'
                    value={keyIssueItem.type}
                    name='type'
                    onChange={e => handleChangePincodeType(e.target.value)}
                  >
                    {pincodeVersion === 'V3'? 
                      pincodeTypeV3List.map((type, index) => (
                        <option key={index} value={type.value}>{type.key}</option>
                      ))
                    :
                      pincodeTypeV2List.map((type, index) => (
                        <option key={index} value={type.value}>{type.key}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              {/* 핀코드 V4 일 경우 */}
              {pincodeVersion === 'V4' && keyIssueItem.keyType === 'pincode' && <>
              <div className='card-text'>
              <p>
                <b>시작일자</b>
                <span className='required'>*</span>
              </p>
              <div className='card-text-date-V4'>
                <DatePicker
                  disabled={keyIssueItem.keyType === 'pincode' && !keyIssueItem.type}
                  dateFormat='yyyy-MM-dd'
                  placeholderText='시작 날짜를 선택 해주세요.'
                  selected={keyIssueItem.checkinAt? keyIssueItem.checkinAt : undefined}
                  selectsStart
                  minDate={limitCheckInOutAt.minCheckinAt}
                  maxDate={limitCheckOutAt}
                  endDate={keyIssueItem.checkoutAt}
                  showTimeSelect={false}
                  filterTime={validateStartAt}
                  timeCaption='Time'
                  name='checkinAt'
                  onChange={(date:Date) => handleChangeDate(date, 'checkinAt')}
                  withPortal
                />
                <select name='checkinAt-hh' onChange={e => hnadleChangeDateV4('HH', e)} defaultValue={hourV4}>
                  <option value='00'>00</option>
                  {checkinAtV4HH.map((value, index) => {
                    const hh_value = value > 9? value : `0${value}`;
                    return <option key={hh_value} value={hh_value}>{hh_value}</option>
                    })}
                </select>
                <select name='checkinAt-mm' onChange={e => hnadleChangeDateV4('MM', e)} defaultValue={minuteV4}>
                  <option value='00'>00</option>
                  {checkinAtV4MM.map((value, index) => {
                    const mm_value = value > 9? value : `0${value}`;
                    return <option key={mm_value} value={mm_value}>{mm_value}</option>
                    })}
                </select>
              </div>
            </div>
            <div className='card-text'>
              <p>
                {/* <FontAwesomeIcon icon={faHourglassEnd}/> */}
                <b>종료일자</b>
                <span className='required'>*</span>
              </p>
              <div className='card-text-date'>
                <DatePicker
                  disabled={true}
                  dateFormat='yyyy-MM-dd HH:mm'
                  placeholderText='종료 날짜를 선택 해주세요.'
                  selected={keyIssueItem.checkoutAt? keyIssueItem.checkoutAt : undefined}
                  selectsEnd
                  minDate={limitCheckInAt}
                  maxDate={limitCheckInOutAt.maxCheckoutAt}
                  startDate={keyIssueItem.checkinAt}
                  showTimeSelect={false}
                  filterTime={validateEndAt}
                  timeFormat='HH:mm'
                  timeIntervals={setTimeInterval()}
                  timeCaption='Time'
                  name='checkoutAt'
                  onChange={(date:Date) => handleChangeDate(date, 'checkoutAt')}
                  withPortal
                />
              </div>
            </div>
            </>}
            {/* 핀코드 V4가 아닐 경우 */}
            {(pincodeVersion !== 'V4' || keyIssueItem.keyType !== 'pincode') && <>
              <div className='card-text'>
              <p>
                <b>시작일자</b>
                <span className='required'>*</span>
              </p>
              <div className='card-text-date'>
                <DatePicker
                  disabled={keyIssueItem.keyType === 'pincode' && !keyIssueItem.type}
                  dateFormat='yyyy-MM-dd HH:mm'
                  placeholderText='시작 날짜를 선택 해주세요.'
                  selected={keyIssueItem.checkinAt? keyIssueItem.checkinAt : undefined}
                  selectsStart
                  minDate={limitCheckInOutAt.minCheckinAt}
                  maxDate={limitCheckOutAt}
                  endDate={keyIssueItem.checkoutAt}
                  showTimeSelect={pincodeVersion === 'V4' || keyIssueItem.keyType === 'mobilekey'? true : keyIssueItem.type === 'day'? false : true }
                  filterTime={validateStartAt}
                  timeFormat='HH:mm'
                  timeIntervals={setTimeInterval()}
                  timeCaption='Time'
                  name='checkinAt'
                  onChange={(date:Date) => handleChangeDate(date, 'checkinAt')}
                  withPortal
                />
              </div>
            </div>
            <div className='card-text'>
              <p>
                {/* <FontAwesomeIcon icon={faHourglassEnd}/> */}
                <b>종료일자</b>
                <span className='required'>*</span>
              </p>
              <div className='card-text-date'>
                <DatePicker
                  disabled={!keyIssueItem.checkinAt}
                  dateFormat='yyyy-MM-dd HH:mm'
                  placeholderText='종료 날짜를 선택 해주세요.'
                  selected={keyIssueItem.checkoutAt? keyIssueItem.checkoutAt : undefined}
                  selectsEnd
                  minDate={limitCheckInAt}
                  maxDate={limitCheckInOutAt.maxCheckoutAt}
                  startDate={keyIssueItem.checkinAt}
                  showTimeSelect={pincodeVersion === 'V4' || keyIssueItem.keyType === 'mobilekey'? true : keyIssueItem.type === 'day'? false : true }
                  filterTime={validateEndAt}
                  timeFormat='HH:mm'
                  timeIntervals={setTimeInterval()}
                  timeCaption='Time'
                  name='checkoutAt'
                  onChange={(date:Date) => handleChangeDate(date, 'checkoutAt')}
                  withPortal
                />
              </div>
            </div>
            </>}
              <div className='card-text'>
                <p>
                  {/* <FontAwesomeIcon icon={faUserAlt}/> */}
                  <b>예약자명</b>
                  <span className='required'>*</span>
                </p>
                <input
                  className='card-text-input'
                  placeholder='예약자명을 입력 해주세요.'
                  value={keyIssueItem.userName}
                  name='userName'
                  onChange={e => handleChange('keyIssueItem', e)}
                />
              </div>
              <div className='card-text'>
                <p>
                  <b>전화번호</b>
                  <span className='required'>*</span>
                </p>
                <select
                  className='card-text-select'
                  value={keyIssueItem.countryNumber}
                  name='countryNumber'
                  onChange={e => handleChange('keyIssueItem', e)}
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
                  value={keyIssueItem.phoneNumber}
                  maxLength={11}
                  name='phoneNumber'
                  onChange={e => handleChange('keyIssueItem', e)}
                />
              </div>
              <div className='card-text'>
                <p>
                  {/* <FontAwesomeIcon icon={faBookOpen}/> */}
                  <b>발급방법</b>
                  <span className='required'>*</span>
                </p>
                <select
                  className='card-text-select'
                  value={keyIssueItem.isNew? 'O' : 'X'}
                  name='isNew'
                  onChange={e => handleChange('keyIssueItem', e)}
                >
                  {pincodeVersion === 'V2' || keyIssueItem.keyType === 'mobilekey'?
                    howToIssueV2List.map((howToIssue, index) => (
                      <option key={index} value={howToIssue.value}>{howToIssue.key}</option>
                    ))
                  :
                    howToIssueList.map((howToIssue, index) => (
                      <option key={index} value={howToIssue.value}>{howToIssue.key}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
          <div className='card-foot'>
            <div className='form-item-cancel'>
              <button className='btn-item-cancel' id='userkey-issue-cancel-btn' onClick={() => toggle()}>
                <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
              </button>
            </div>
            <div className='form-item-add center'>
              <button className='btn-item-add' id='userkey-issue-add-btn' onClick={handleIssueKey}>
                <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
              </button>
            </div>
          </div>
        </FormCardWrap>

    </Fragment>
  );
};

export default UserkeyIssue;