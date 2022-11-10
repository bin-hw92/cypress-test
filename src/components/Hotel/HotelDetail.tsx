import React, { Fragment } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPlus, faMinus, faEdit, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import timezoneItems from '../../assets/timezone.json';
import styled from 'styled-components';
import { HotelDetailProps } from '../../types/hotel';

/* styled */
const FormCardDetail = styled.div`
padding: 0 20px 30px 20px;
width: 100%;
border: 1px solid #cccccc;
border-radius: 0.3rem;
background: #ffffff;
box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);
box-sizing: border-box;

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
        height: 100%;
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
            width: 100%;
            height: 10rem;
            color: #555555;
            border: 1px solid #777777;
            border-top: 0px;
            border-bottom-left-radius: 0.35rem;
            border-bottom-right-radius: 0.35rem;
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
                width: calc(100% - 6.5rem);
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
              .card-box-input-button {
                margin: auto;
                color: #555555;
                cursor: pointer;
                
                .disabled {
                  color: #999999;
                }
              }
              
              :before {
                content: '';
                position: absolute;
                right: 5.3125rem;
                width: 1px;
                height: 100%;
                border-right: 1px solid #cccccc;
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
    flex-direction: row-reverse;

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

const HotelDetail = ({
  hotelItem,
  hotelListTotal,
  commonroomInputRef,
  editableCommonroom,
  notifyChannelListItems,
  handleModal,
  handleChange,
  handleAddCommonroom,
  handleRemoveCommonroom,
  handleEditableCommonroom,
  handleChangeCommonroom,
  handleSelectHotel,
  handleUpdateHotel,
}:HotelDetailProps) => {

  return (
    <Fragment>
        <FormCardDetail id='hotel-detail-wrap'>
          <FormCardTitle>
            <div className='form-dropdown detail'>
              <Dropdown onClick={e => e.stopPropagation()}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <FontAwesomeIcon icon={faEllipsisV}/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {/* <div
                    className={`dropdown-item-delete center ${hotelListTotal === 1 ? 'disabled':''}`}
                    onClick={handleModal}
                  >
                    <span>단지 삭제</span>
                  </div> */}
                  <div
                    className={`dropdown-item-delete center`}
                    onClick={handleModal}
                  >
                    <span>단지 삭제</span>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </FormCardTitle>
          <div>
            <div className='inline-flex'>
              <div className='w-50'>
                <div className='card-text'>
                  <p>
                    <b>단지이름</b>
                    <span className='required'>*</span>
                  </p>
                  <input
                    className='card-text-input'
                    placeholder='단지 이름을 입력 해주세요.'
                    value={hotelItem.name}
                    name='name'
                    onChange={handleChange}
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>타임존</b>
                    <span className='required'>*</span>
                  </p>
                  <select
                    className='card-text-select'
                    value={hotelItem.timezone}
                    name='timezone'
                    onChange={handleChange}
                  >
                    {timezoneItems.map((timezoneItem, index) => (
                      <option key={index} value={timezoneItem.code}>{timezoneItem.code}</option>
                    ))}
                  </select>
                </div>
                <div className='card-text'>
                  <p>
                    <b>주소</b>
                  </p>
                  <input
                    className='card-text-input'
                    placeholder='주소를 입력 해주세요.'
                    value={hotelItem.address}
                    name='address'
                    onChange={handleChange}
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>비고</b>
                  </p>
                  <input
                    className='card-text-input'
                    placeholder='단지에 대한 설명을 입력 해주세요.'
                    value={hotelItem.desc}
                    name='desc'
                    onChange={handleChange}
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>슬림키 사용</b>
                  </p>
                  <select
                    className='card-text-select'
                    value={hotelItem.useSlimkey? 'O' : 'X'}
                    name='useSlimkey'
                    onChange={handleChange}
                  >
                    <option value='O'>O</option>
                    <option value='X'>X</option>
                  </select>
                </div>
                <div className='card-text'>
                  <p>
                    <b>알림 채널</b>
                  </p>
                  <select
                    className='card-text-select'
                    value={hotelItem.notifyChannelId? hotelItem.notifyChannelId : ''}
                    name='notifyChannelId'
                    onChange={handleChange}
                  >
                    <option value=''>없음</option>
                    {notifyChannelListItems?
                      notifyChannelListItems.map((notifyChannelListItem, index) => (
                      <option key={index} value={notifyChannelListItem.id}>{notifyChannelListItem.name}</option>
                    )):''}
                  </select>
                </div>
                <div className='card-text'>
                  <p>
                    <b>호텔스토리<br/>체크아웃버튼</b>
                  </p>
                  <select
                    className='card-text-select'
                    value={hotelItem.apphotelstory? 'O' : 'X'}
                    name='apphotelstory'
                    onChange={handleChange}
                  >
                    <option value='O'>O</option>
                    <option value='X'>X</option>
                  </select>
                </div>
                <div className='card-text'>
                  <p>
                    <b>OvalKey<br/>엘리베이터버튼</b>
                  </p>
                  <select
                    className='card-text-select'
                    value={hotelItem.appElevatorBtn? 'O' : 'X'}
                    name='appElevatorBtn'
                    onChange={handleChange}
                  >
                    <option value='O'>O</option>
                    <option value='X'>X</option>
                  </select>
                </div>

                <div className='config-container'>
                  <p className='config-title'>핀코드 설정</p>
                  <div className='config-line'></div>
                </div>
                <div className='card-text'>
                  <p>
                    <b>핀코드 버전</b>
                  </p>
                  <select
                    className='card-text-select'
                    value={hotelItem.pincodeVersion}
                    name='pincodeVersion'
                    onChange={handleChange}
                  >
                    <option value='V2'>V2</option>
                    <option value='V3'>V3</option>
                    <option value='V4'>V4</option>
                  </select>
                </div>
                <div className='card-text'>
                  <p>
                    <b>핀코드 길이</b>
                  </p>
                  <select
                    className='card-text-select'
                    value={hotelItem.pincodeLength}
                    name='pincodeLength'
                    onChange={handleChange}
                    disabled={_.includes(['V2', 'V3'], hotelItem.pincodeVersion)}
                  >
                    <option value='4'>4</option>
                    <option value='6'>6</option>
                    <option value='8'>8</option>
                  </select>
                </div>
                <div hidden={hotelItem.pincodeVersion !== 'V2'}>
                  <div className='card-text'>
                    <p>
                      <b>일단위 핀코드 기준시간</b>
                    </p>
                    <select
                      className='card-text-select'
                      value={hotelItem.pincodeDayTypeOffset}
                      name='pincodeDayTypeOffset'
                      onChange={handleChange}
                      disabled={hotelItem.pincodeVersion !== 'V2'}
                    >
                      {new Array(24).fill(0).map((value, index) => (
                        <option
                          key={index}
                          label={index < 10 ? `0${index}:00` : `${index}:00`}
                          value={index < 10 ? `0${index}00` : `${index}00`}
                        />
                      ))}
                    </select>
                  </div>
                </div>
                <div hidden={hotelItem.pincodeVersion !== 'V3'}>
                  <div className='card-text'>
                    <p>
                      <b>무한 핀코드 사용</b>
                    </p>
                    <select
                      className='card-text-select'
                      value={hotelItem.allowInfinityPincode? 'O' : 'X'}
                      name='allowInfinityPincode'
                      onChange={handleChange}
                      disabled={hotelItem.pincodeVersion !== 'V3'}
                    >
                      <option value='O'>O</option>
                      <option value='X'>X</option>
                    </select>
                  </div>
                </div>
                <div hidden={hotelItem.pincodeVersion !== 'V4'}>
                  <div className='card-text'>
                    <p>
                      <b>핀코드 인증 타임아웃<br/>(분 단위, 1 ~ 600)</b>
                    </p>
                    <input
                      className='card-text-input'
                      placeholder='핀코드 인증 타임아웃 시간을 입력 해주세요.'
                      value={hotelItem.pincodeAuthTimeoutMin}
                      name='pincodeAuthTimeoutMin'
                      onChange={handleChange}
                      disabled={hotelItem.pincodeVersion !== 'V4'}
                    />
                  </div>
                </div>
              </div>
              <div className='w-50 bl-1-dashed-gray'>
                <div className='card-box detail'>
                  <p>
                    <b>공용도어</b>
                  </p>
                  <div className='w-100p'>
                    <div className='card-box-input-container'>
                      <input ref={commonroomInputRef} className='card-box-input' placeholder='공용도어 이름을 입력 해주세요.'></input>
                      <div className='card-box-input-button' onClick={handleAddCommonroom}>
                        <FontAwesomeIcon icon={faPlus} className='icon-item-add'/>
                      </div>
                    </div>
                    <div className='card-box-text-container detail'>
                      {hotelItem.commonrooms.map((commonroom, index) => (
                        <div className='card-box-text' key={index}>
                          <input
                            className='card-text-input'
                            placeholder='공용도어 이름을 입력 해주세요.'
                            value={commonroom.name}
                            onChange={e => handleChangeCommonroom({id: commonroom.id? commonroom.id : index, name: e.target.value})}
                            disabled={editableCommonroom !== index}
                          />
                          <div className='card-box-input-button' onClick={() => handleEditableCommonroom(index)}>
                            <FontAwesomeIcon icon={faEdit} className={`icon-item-edit ${editableCommonroom !== index ? 'disabled':''}`}/>
                          </div>
                          <div className='card-box-input-button' onClick={() => handleRemoveCommonroom(index)}>
                            <FontAwesomeIcon icon={faMinus} className='icon-item-cancel'/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FormCardDetail>
        <FormFootWrap>
          <button className='btn-item-cancel' onClick={handleSelectHotel}>
            <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
          </button>
          <button className='btn-item-add' onClick={handleUpdateHotel}>
            <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
          </button>
        </FormFootWrap>
    </Fragment>
  );
};

export default HotelDetail;