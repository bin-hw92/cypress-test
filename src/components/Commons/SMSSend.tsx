import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEnvelope, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { SMSSendProps } from '../../types/sms';
import styled from 'styled-components';

/* styled */
const DeleteWrap = styled.div`
  .modal-btn-cancel {
    margin-top: 1.5625rem;
    padding: 0.5rem;
    height: 2.5rem;
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
    svg {
      padding-right: 3px;
    }
  }
  .modal-btn-confirm {
    margin-top: 1.5625rem;
    padding: 0.5rem;
    height: 2.5rem;
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
    svg {
      padding-right: 3px;
    }
  }
`;

export const SMSSend = ({
  isResend,
  smsSendItem,
  typeFormatter,
  handleClose,
  handleSendSMS
}:SMSSendProps) => {

  return (
    <DeleteWrap id='sms-wrap'>
        {!isResend ? (
          <>
            <p className='mb-4 mt-0' style={{fontSize:'18px', color:'#28a745'}}>
              키 발급이 완료 되었습니다.
            </p>
            <FontAwesomeIcon icon={faCheckCircle} style={{marginBottom:'1.5rem', fontSize:'5em', color:'#28a745'}}/>
          </>
        ) : ''}
        <p className='mb-0 mt-0' style={{fontSize:'16px'}}>
          SMS를 보내시겠습니까?
        </p>
        <p className='mb-0 mt-4' style={{fontSize:'16px'}}>
          {typeFormatter(smsSendItem.type)}는
          <span style={{fontWeight:'bold', color:'#7e7ff3'}}> {smsSendItem.value} </span>
          입니다.
        </p>
        <button className='modal-btn-cancel' onClick={() => handleClose()}>
          <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/>취소
        </button>
        <button className='modal-btn-confirm' onClick={() => handleSendSMS()}>
          <FontAwesomeIcon icon={faEnvelope} style={{paddingRight:'3px'}}/>확인
        </button>
    </DeleteWrap>
  );
}
