import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimesCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { NotifyChannelCreateProps } from '../../types/notifyChannel';

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

const NotifyChannelCreate = ({
  notifyChannelItem,
  handleChange,
  handleCreateNotifyChannel,
  toggle,
}:NotifyChannelCreateProps) => {
  const channelTypeItems = [
    { key: 'AWS SMS', value: 'aws_sms' },
    { key: 'Surem', value: 'surem' },
    { key: 'LG U+ SMS', value: 'lguplus_sms' },
  ];

  return (
    <Fragment>
      <FormCardWrap id='notify-channel-create'>
        <FormCardTitle>
          <h1>알림 채널 생성</h1>
          <FontAwesomeIcon icon={faXmark} onClick={() => toggle()}/>
        </FormCardTitle>
        <div className='inline-flex'>
          <div className='w-100'>
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
                <option value='' hidden>타입을 선택 해주세요.</option>
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
        </div>
        <div className='card-foot'>
          <div className='form-item-cancel'>
            <button className='btn-item-cancel' id='notifyChannel-create-cancel-btn' onClick={() => toggle()}>
              <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
            </button>
          </div>
          <div className='form-item-add center'>
            <button className='btn-item-add' id='notifyChannel-create-add-btn' onClick={handleCreateNotifyChannel}>
              <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
            </button>
          </div>
        </div>
      </FormCardWrap>
    </Fragment>
  );
};

export default NotifyChannelCreate;