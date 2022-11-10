import React, { Fragment } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEllipsisV, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import countryInfo from '../../assets/countries.json';
import { dateFormatter, staffStatusFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { StaffDetailProps } from '../../types/staff';
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
          min-height: 62px;
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

const StaffDetail = ({
  staffItem,
  selectMasterCount,
  userRole,
  hotelRole,
  userPhoneNumber,
  handleChange,
  handleModal,
  handleGoBack,
  handleSelectStaff,
  handleUpdateStaff,
  handleSelectStaffSignup,
}:StaffDetailProps) => {
  const countryInfoList = Object.values(countryInfo);
  const roleItems = [
    { key: '마스터', value: 'master' },
    { key: '관리 스태프', value: 'manager' },
    { key: '하우스키핑', value: 'housekeeping' },
    { key: '스태프 모바일키', value: 'manager_mobilekey' },
    { key: '도어락 세팅', value: 'doorlock_setting' },
  ];
  const roleManagerItems = [
    { key: '하우스키핑', value: 'housekeeping' },
  ];
  const newPhone = staffItem.countryNumber + Number.parseInt(staffItem.phoneNumber);

  return (
    <Fragment>
      <FormCardDetail id='staff-detail-wrap'>
        <div className='form-card-tab-detail btlr-0'>
          <FormCardTitle>
            <div className='form-item-cancel'>
              <button className='btn-item-close bgc-unset bsd-unset' onClick={handleGoBack}>
                <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>스태프 목록으로</span>
              </button>
            </div>
            <div className='form-dropdown detail'>
              {userRole === 'master' &&
                <Dropdown onClick={e => e.stopPropagation()}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FontAwesomeIcon icon={faEllipsisV}/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div
                      className={`dropdown-item-delete ${staffItem.status === 'granted' || hotelRole === 'manager' ? 'disabled':''}`}
                      onClick={() => handleSelectStaffSignup()}
                    >
                      <span>가입 승인</span>
                    </div>
                    <div 
                      className={`dropdown-item-delete ${((staffItem.role === 'master' && selectMasterCount === 1) || (staffItem.role === 'master' && staffItem.status !== 'granted')) 
                      || (hotelRole === 'manager' && (staffItem.role === 'master' || staffItem.role === 'manager_mobilekey' || staffItem.role === 'doorlock_setting')) 
                      || (hotelRole === 'manager' && staffItem.role === 'manager' && userPhoneNumber !== newPhone)? 'disabled':''}`}
                      onClick={handleModal}>
                      <span>스태프 삭제</span>
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
                    <b>스태프이름</b>
                    <span className='required'>*</span>
                  </p>
                  <input
                    className='card-text-input'
                    placeholder='스태프이름을 입력 해주세요.'
                    value={useNameDetailChange(staffItem.name, userRole)}
                    name='name'
                    onChange={handleChange}
                    disabled={userRole !== 'master'}
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>가입상태</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={staffItem.status? staffStatusFormatter(staffItem.status) : ''}
                    name='status'
                    disabled
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>전화번호</b>
                    <span className='required'>*</span>
                  </p>
                  <select
                    className='card-text-select'
                    value={staffItem.countryNumber}
                    name='countryNumber'
                    disabled
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
                    placeholder='전화번호를 입력 해주세요(숫자만).'
                    value={usePhoneDetailChange(staffItem.phoneNumber, userRole)}
                    name='phoneNumber'
                    maxLength={11}
                    disabled
                  />
                </div>
              </div>
              <div className='w-50'>
                <div className='card-text'>
                  <p>
                    <b>권한</b>
                    <span className='required'>*</span>
                  </p>
                  <select
                    className='card-text-select'
                    value={staffItem.role}
                    name='role'
                    onChange={handleChange}
                  >
                    <option value='' hidden>권한을 선택 해주세요.</option>
                    {hotelRole === 'manager'? 
                      roleManagerItems.map((role, index) => (
                        <option key={index} value={role.value}>{role.key}</option>
                      ))
                    :
                      roleItems.map((role, index) => (
                        <option key={index} value={role.value}>{role.key}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='card-text'>
                  <p>
                    <b>생성일자</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={dateFormatter(staffItem.createdAt? staffItem.createdAt : '')}
                    name='createdAt'
                    disabled
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>수정일자</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={dateFormatter(staffItem.updatedAt? staffItem.updatedAt : '')}
                    name='updatedAt'
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
          <button className='btn-item-cancel' onClick={handleSelectStaff}>
            <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
          </button>
        </div>
        {userRole === 'master' && <>
          {hotelRole === 'manager' && (staffItem.role === 'housekeeping' || (staffItem.role === 'manager' && userPhoneNumber === newPhone)) &&
            <div className='form-item-add center detail'>
              <button className='btn-item-add' onClick={handleUpdateStaff}>
                <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
              </button>
            </div>
          }
          {hotelRole === 'master' &&
            <div className='form-item-add center detail'>
              <button className='btn-item-add' onClick={handleUpdateStaff}>
                <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
              </button>
            </div>
          }
        </>}
        
      </FormFootWrap>
    </Fragment>
  );
};

export default StaffDetail;