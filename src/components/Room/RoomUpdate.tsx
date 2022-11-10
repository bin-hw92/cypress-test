import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimesCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { RoomUpdateProps } from '../../types/room';

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

const RoomUpdate = ({
  roomItem,
  handleChange,
  handleUpdateRoom,
  toggle,
}:RoomUpdateProps) => {
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
      <FormCardWrap id='room-update'>
        <FormCardTitle>
          <h1>객실 수정</h1>
          <FontAwesomeIcon icon={faXmark} onClick={() => toggle()}/>
        </FormCardTitle>
        <div className='inline-flex'>
          <div className='w-100'>
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
                name='connectedStrength'
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
          </div>
        </div>
        <div className='card-foot'>
          <div className='form-item-cancel'>
            <button className='btn-item-cancel' id='room-update-cancel-btn' onClick={() => toggle()}>
              <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
            </button>
          </div>
          <div className='form-item-add center'>
            <button className='btn-item-add' id='room-update-add-btn' onClick={handleUpdateRoom}>
              <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
            </button>
          </div>
        </div>
      </FormCardWrap>
  );
};

export default RoomUpdate;