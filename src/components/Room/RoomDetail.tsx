import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEllipsisV, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { doorlockStatusFormatter, dateFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { RoomDetailProps } from '../../types/room';

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

const RoomDetail = ({
  roomItem,
  userRole,
  handleChange,
  handleUpdateRoom,
  handleSelectRoom,
  handleModal,
  handleGoBack,
}:RoomDetailProps) => {
  const strengthItems = [
    { key: '-30dBm', value: 0 },
    { key: '-20dBm', value: 1 },
    { key: '-16dBm', value: 2 },
    { key: '-12dBm', value: 3 },
    { key: '-8dBm', value: 4 },
    { key: '-4dBm', value: 5 },
    { key: '0dBm', value: 6 },
    { key: '4dBm', value: 7 },
  ];

  return (
    <>
      <FormCardDetail id='room-detail-wrap'>
        <FormCardTitle>
          <div className='form-item-cancel'>
            <button className='btn-item-close bgc-unset bsd-unset' onClick={handleGoBack}>
              <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>객실 목록으로</span>
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
                    className={`dropdown-item-delete center ${roomItem.status === 'installed' ? 'disabled':''}`}
                    onClick={handleModal}
                  >
                    <span>객실 삭제</span>
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
                  <b>객실이름</b>
                  <span className='required'>*</span>
                </p>
                <input
                  className='card-text-input'
                  placeholder='객실이름을 입력 해주세요.'
                  name='name'
                  value={roomItem.name}
                  onChange={handleChange}
                />
              </div>
              <div className='card-text'>
                <p>
                  <b>빌딩</b>
                </p>
                <input
                  className='card-text-input'
                  name='buildingName'
                  value={roomItem.buildingName || '-'}
                  disabled
                />
              </div>
              <div className='card-text'>
                <p>
                  <b>층</b>
                </p>
                <input
                  className='card-text-input'
                  name='floorName'
                  value={roomItem.floorName || '-'}
                  disabled
                />
              </div>
              <div className='card-text'>
                <p>
                  <b>객실상태</b>
                </p>
                <input
                  className='card-text-input'
                  name='status'
                  //status 값이 없으면 created로 호출
                  value={doorlockStatusFormatter(roomItem.status? roomItem.status : 'created') || '-'}
                  disabled
                />
              </div>
              <div className='card-text'>
                <p>
                  <b>RMS ID</b>
                </p>
                <input
                  className='card-text-input'
                  placeholder='RMS ID를 입력 해주세요.'
                  name='rmsId'
                  value={roomItem.rmsId}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='w-50 bl-1-dashed-gray'>
              <div className='card-text'>
                <p>
                  <b>키택 사용 권한</b>
                </p>
                <select
                  className='card-text-select'
                  name='allowKeytag'
                  value={roomItem.allowKeytag? 'O' : 'X'}
                  onChange={handleChange}
                >
                  <option value={'X'}>사용 불가능</option>
                  <option value={'O'}>사용 가능</option>
                </select>
              </div>
              <div className='card-text'>
                <p>
                  <b>Advertise 신호 세기</b>
                </p>
                <select
                  className='card-text-select'
                  name='advertiseStrength'
                  value={roomItem.advertiseStrength}
                  onChange={handleChange}
                  disabled={!roomItem.allowKeytag}
                >
                  <option value='' hidden>Advertise 신호 세기를 선택 해주세요.</option>
                  {strengthItems.map((advertiseStrengthItem, index) => (
                    <option key={index} value={advertiseStrengthItem.value}>{advertiseStrengthItem.key}</option>
                  ))}
                </select>
              </div>
              <div className='card-text'>
                <p>
                  <b>Connected 신호 세기</b>
                </p>
                <select
                  className='card-text-select'
                  value={roomItem.connectedStrength}
                  onChange={handleChange}
                  disabled={!roomItem.allowKeytag}
                >
                  <option value='' hidden>Connected 신호 세기를 선택 해주세요.</option>
                  {strengthItems.map((advertiseStrengthItem, index) => (
                    <option key={index} value={advertiseStrengthItem.value}>{advertiseStrengthItem.key}</option>
                  ))}
                </select>
              </div>
              <div className='card-text'>
                <p>
                  <b>생성일자</b>
                </p>
                <input
                  className='card-text-input'
                  value={dateFormatter(roomItem.createdAt? roomItem.createdAt : '')}
                  disabled
                />
              </div>
              <div className='card-text'>
                <p>
                  <b>수정일자</b>
                </p>
                <input
                  className='card-text-input'
                  value={dateFormatter(roomItem.updatedAt? roomItem.updatedAt : '')}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </FormCardDetail>
      <FormFootWrap>
        <div className='form-item-cancel'>
          <button className='btn-item-cancel' onClick={handleSelectRoom}>
            <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
          </button>
        </div>
        {userRole === 'master' &&
          <div className='form-item-add center detail'>
            <button className='btn-item-add' onClick={handleUpdateRoom}>
              <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
            </button>
          </div>
        }
      </FormFootWrap>
    </>
  );
};

export default RoomDetail;