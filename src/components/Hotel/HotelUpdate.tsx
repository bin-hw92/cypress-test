import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faMinus, faSave, faTimesCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import timezoneItems from '../../assets/timezone.json';
import styled from 'styled-components';
import { HotelUpdateProps } from '../../types/hotel';

/* styled */
const FormCardWrap = styled.div`
width: 100%;
margin: auto;
border-radius: 0.3rem;
  
  .detail {
    width: 96%;
    margin: 16px 32px 60px;
  }
  .tab {
    background-color: unset;
  }
  .border {
    width: calc(100% - 3.75rem);
    margin: 1.75rem;
    border: 2px solid dimgray;
    border-radius: 0.35rem;
    position: relative;
  }

  .inline-flex {
    display: flex;
    position: relative;
    margin: 0 1.25rem;
    width: calc(100% - 40px);
    height: 100%;
    text-align: left;
    border: 1px solid #cccccc;
    border-radius: 0.35rem;

    &.detail {
      margin-top: 1.75rem;
    }
    &.tab {
      border-top-left-radius: 0;
    }
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
        margin: 0.625rem auto 0.625rem 1.25rem;
        padding: 0 0.5rem;
        width: 70%;
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
      .config-container {
        display: flex;
        position: relative;
        padding: 0.625rem 0;
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
          top: 1.625rem;
          width: 100%;
          border-bottom: 1px dashed #cccccc;
        }
      }
      .card-box {
        width: calc(100% - 1.25rem);
        padding: 0 0.625rem;

        .card-box-input-container {
          display: inline-flex;
          width: 100%;
          border: 1px solid #777777;
          border-top-left-radius: 0.35rem;
          border-top-right-radius: 0.35rem;
        }
        .card-box-input {
          padding: 0.5rem 0.625rem;
          width: calc(100% - 3.75rem);
          font-size: 0.875rem;
          color: #333333;
          border: none;
          border-top-left-radius: 0.35rem;
          border-right: 1px solid dimgray;

          &:focus-visible {
            outline: 1.5px solid #044dac;
            border-radius: 0.18775rem;
            z-index: 3;
          }
        }
        .card-box-input-button {
          cursor: pointer;
          margin: auto;
          color: #333333;
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

const HotelUpdate = ({
  hotelItem,
  commonroomInputRef,
  editableCommonroom,
  notifyChannelListItems,
  handleAddCommonroom,
  handleChange,
  handleRemoveCommonroom,
  handleEditableCommonroom,
  handleChangeCommonroom,
  handleUpdateHotel,
  toggle,
}:HotelUpdateProps) => {
  return (
          <FormCardWrap id='hotel-update'>
            <FormCardTitle>
              <h1>단지 수정</h1>
              <FontAwesomeIcon icon={faXmark} onClick={() => toggle()}/>
            </FormCardTitle>
            <div className='inline-flex'>
              <div className='w-100'>
                <div className='card-text'>
                  <p>
                    <b>단지이름</b>
                    <span className='required'>*</span>
                  </p>
                  <input
                    className='card-text-input'
                    placeholder='단지이름을 입력 해주세요.'
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
                    name='address'
                    value={hotelItem.address}
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
                    name='desc'
                    value={hotelItem.desc}
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
                    <option value={'O'}>O</option>
                    <option value={'X'}>X</option>
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
                    <b>호텔스토리 체크아웃버튼</b>
                  </p>
                  <select
                    className='card-text-select'
                    value={hotelItem.apphotelstory? 'O' : 'X'}
                    name='apphotelstory'
                    onChange={handleChange}
                  >
                    <option value={'O'}>O</option>
                    <option value={'X'}>X</option>
                  </select>
                </div>
                <div className='card-text'>
                  <p>
                    <b>OvalKey 엘리베이터버튼</b>
                  </p>
                  <select
                    className='card-text-select'
                    value={hotelItem.appElevatorBtn? 'O' : 'X'}
                    name='appElevatorBtn'
                    onChange={handleChange}
                  >
                    <option value={'O'}>O</option>
                    <option value={'X'}>X</option>
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
                      <option value={'O'}>O</option>
                      <option value={'X'}>X</option>
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
                      name='pincodeAuthTimeoutMin'
                      value={hotelItem.pincodeAuthTimeoutMin}
                      onChange={handleChange}
                      disabled={hotelItem.pincodeVersion !== 'V4'}
                    />
                  </div>
                </div>
                <div className='config-container'>
                  <p className='config-title'>공용도어</p>
                  <div className='config-line'></div>
                </div>
                <div className='card-box'>
                  <div className='card-box-input-container'>
                    <input ref={commonroomInputRef} className='card-box-input' name='commonrommInput' placeholder='공용도어 이름을 입력 해주세요.'></input>
                    <div className='card-box-input-button' onClick={handleAddCommonroom}>
                      <FontAwesomeIcon icon={faPlus} className='icon-item-add'/>
                    </div>
                  </div>
                  <div className='card-box-text-container'>
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
            <div className='card-foot'>
              <div className='form-item-cancel'>
                <button className='btn-item-cancel' id='hotel-update-cancel-btn' onClick={() => toggle()}>
                  <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
                </button>
              </div>
              <div className='form-item-add center'>
                <button className='btn-item-add' id='hotel-update-add-btn' onClick={handleUpdateHotel}>
                  <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
                </button>
              </div>
            </div>
          </FormCardWrap>
  );
};

export default HotelUpdate;