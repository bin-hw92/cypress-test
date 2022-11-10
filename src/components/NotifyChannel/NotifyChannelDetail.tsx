import React, { Fragment } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEllipsisV, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { dateFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { NotifyChannelDetailProps } from '../../types/notifyChannel';
import BreadcrumbContainer from '../../containers/Commons/BreadcrumbContainer';

/* styled */
const FormCardDetail = styled.div`
padding: 0 20px 30px 20px;
width: calc(100% - 40px);
border: 1px solid #cccccc;
border-radius: 0.3rem;
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
      .config-container {
        display: flex;
        position: relative;
        padding-top: 16px;
        padding-right: 3.75rem;
        width: 100%;
        box-sizing: border-box;
          
        .config-title {
          margin: auto;
          padding: 0.3125rem 1.25rem;
          font-weight: 700;
          text-align: center;
          color: #555555;
          background-color: #e3e8f0;
          z-index: 1;
        }
        .config-line {
          position: absolute;
          top: 2rem;
          width: 100%;
          border-bottom: 1px dashed #cccccc;
        }
        
        :before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 11.25rem;
          height: 100%;
          background: #e3e8f0;
        }
      }
      .card-box.detail {
        display: flex;
        width: calc(100% - 3.75rem);
        box-sizing: border-box;

        p {
          margin: 0;
          padding: 1rem 0.875rem;
          width: 11.25rem;
          color: #555555;
          background: #e3e8f0;
          box-sizing: inherit;
        }
        .w-100p {
          margin-left: 2.5rem;
          width: calc(100% - 13.75rem);

          .card-box-input-container {
            display: inline-flex;
            margin-top: 0.625rem;
            width: 100%;
            border: 1px solid #777777;
            border-top-left-radius: 0.35rem;
            border-top-right-radius: 0.35rem;
    
            .card-box-input {
              padding: 0.325rem 0.625rem;
              width: calc(100% - 3.75rem);
              height: 1.8rem;
              font-size: 0.875rem;
              color: #333333;
              border: none;
              border-top-left-radius: 0.35rem;
              border-right: 1px solid #777777;
              
              &:focus-visible {
                outline: 1.5px solid #044dac;
                border-radius: 0.18775rem;
                z-index: 3;
              }
            }
            .card-box-input-button {
              margin: auto;
              color: #333333;
              cursor: pointer;
            }
          }

          .card-box-text-container {
            margin: 0.625rem 0;
            width: 100%;
            height: 10rem;
            color: #555555;
            border: 1px solid #777777;
            border-radius: 0.35rem;
            box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);
            overflow-y: auto;

            .card-box-text {
              display: inline-flex;
              position: relative;
              width: 100%;
              border-bottom: 1px solid #777777;
  
              input {
                margin: 0.125rem;
                padding: 0.2rem 0.5rem;
                width: 100%;
                height: 1.8rem;
                color: #555555;
                border: 0;
                background-color: #ffffff;
                
                :disabled {
                  color: #999999;
                }
                &:focus-visible {
                  outline: 1.5px solid #044dac;
                  border-radius: 0.18775rem;
                  z-index: 3;
                }
              }
            }
            &.detail {
              min-height: 23.5rem; 
            }
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
        background-color: #e3e8f0;
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

const NotifyChannelDetail = ({
  notifyChannelItem,
  breadcrumbItems,
  userRole,
  handleChange,
  handleSelectNotifyChannel,
  handleUpdateNotifyChannel,
  handleModal,
  moveToListPage,
}:NotifyChannelDetailProps) => {
  const channelTypeItems = [
    { key: 'AWS SMS', value: 'aws_sms' },
    { key: 'Surem', value: 'surem' },
    { key: 'LG U+ SMS', value: 'lguplus_sms' },
  ];

  return (
    <Fragment>
      <div className='content-title2'>
        <BreadcrumbContainer breadcrumbItems={breadcrumbItems} />
      </div>
      <FormCardDetail id='notifyChannel-detail-wrap'>
        <div className='form-card-tab-detail btlr-0'>
          <FormCardTitle>
          <div className='form-item-cancel'>
            <button className='btn-item-close bgc-unset bsd-unset' onClick={moveToListPage}>
              <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>채널 목록으로</span>
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
                      <span>채널 삭제</span>
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
                    <b>ID</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={notifyChannelItem.channelId}
                    disabled
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>이름</b>
                    <span className='required'>*</span>
                  </p>
                  <input
                    className='card-text-input'
                    placeholder='이름을 입력 해주세요.'
                    value={notifyChannelItem.name}
                    name='name'
                    onChange={handleChange}
                  />
                </div>
                <div className='config-container'>
                  <p className='config-title'>세부 설정</p>
                  <div className='config-line'></div>
                </div>
                <div className='card-text'>
                  <p>
                    <b>타입</b>
                    <span className='required'>*</span>
                  </p>
                  <select
                    className='card-text-select'
                    value={notifyChannelItem.type}
                    name='type'
                    onChange={handleChange}
                  >
                    {channelTypeItems.map((type, index) => (
                      <option key={index} value={type.value}>{type.key}</option>
                    ))}
                  </select>
                </div>
                <div hidden={notifyChannelItem.type !== 'surem'}>
                  <div className='card-text'>
                    <p>
                      <b>user_code</b>
                      <span className='required'>*</span>
                    </p>
                    <input
                      className='card-text-input'
                      placeholder='user_code를 입력 해주세요.'
                      value={notifyChannelItem.config.user_code}
                      name='user_code'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='card-text'>
                    <p>
                      <b>dept_code</b>
                      <span className='required'>*</span>
                    </p>
                    <input
                      className='card-text-input'
                      placeholder='dept_code를 입력 해주세요.'
                      value={notifyChannelItem.config.dept_code}
                      name='dept_code'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='card-text'>
                    <p>
                      <b>calling_number</b>
                      <span className='required'>*</span>
                    </p>
                    <input
                      className='card-text-input'
                      placeholder='calling_number를 입력 해주세요.'
                      value={notifyChannelItem.config.calling_number}
                      name='calling_number'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='card-text'>
                    <p>
                      <b>yellowid_key</b>
                      <span className='required'>*</span>
                    </p>
                    <input
                      className='card-text-input'
                      placeholder='yellowid_key를 입력 해주세요.'
                      value={notifyChannelItem.config.yellowid_key}
                      name='yellowid_key'
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className='w-50 bl-1-dashed-gray'>
                <div className='card-text'>
                  <p>
                    <b>Default 사용</b>
                  </p>
                  <select
                    className='card-text-select'
                    value={notifyChannelItem.isDefault? 'O' : 'X'}
                    name='isDefault'
                    onChange={handleChange}
                  >
                    <option value='X'>X</option>
                    <option value='O'>O</option>
                  </select>
                </div>
                <div className='card-text'>
                  <p>
                    <b>생성일자</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={notifyChannelItem.createdAt? dateFormatter(notifyChannelItem.createdAt):''}
                    disabled
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>수정일자</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={notifyChannelItem.updatedAt? dateFormatter(notifyChannelItem.updatedAt):''}
                    disabled
                  />
                </div>
                <div className='card-box detail'>
                  <p>
                    <b>단지 목록</b>
                  </p>
                  <div className='w-100p'>
                    <div className='card-box-text-container detail h-18rem'>
                      {notifyChannelItem.hotels?
                        notifyChannelItem.hotels.map((hotel, index) => (
                        <div className='card-box-text' key={index}>
                          <input
                            className='card-text-input'
                            placeholder=''
                            value={hotel.name}
                            disabled
                          />
                        </div>
                      )):''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormCardDetail>
      <FormFootWrap>
        <div className='form-item-cancel'>
          <button className='btn-item-cancel' onClick={handleSelectNotifyChannel}>
            <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
          </button>
        </div>
        {userRole === 'master' &&
          <div className='form-item-add center detail'>
            <button className='btn-item-add' onClick={handleUpdateNotifyChannel}>
              <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
            </button>
          </div>
        }
      </FormFootWrap>
    </Fragment>
  );
};

export default NotifyChannelDetail;