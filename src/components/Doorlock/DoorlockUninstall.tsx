import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { DoorlockUninstallProps } from '../../types/doorlock';

/* styled */
const DeleteWrap = styled.div`
  p {
    font-size: 0.875rem;

    span {
      font-weight: bold;
      color: #4c9ffe;
    }
  }
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

const DoorlockUninstall = ({
  doorlockName,
  handleUninstallDoorlock,
  toggle,
}:DoorlockUninstallProps) => {
 
  return (
    <DeleteWrap>
      <FontAwesomeIcon icon={faQuestionCircle} style={{fontSize:'5em', color:'orange'}}/>
      <p className='mb-0 mt-4' style={{fontSize:'16px'}}>
        선택하신 도어락[
        <span style={{fontWeight:'bold', color:'#7e7ff3'}}>{doorlockName || '-'}</span>
        ]을 설치 삭제 하시겠습니까?<br/>
      </p>
      <button className='modal-btn-cancel' onClick={() => toggle()}>
        <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/>취소
      </button>
      <button className='modal-btn-confirm' onClick={handleUninstallDoorlock}>
        <FontAwesomeIcon icon={faSave} style={{paddingRight:'3px'}}/>확인
      </button>
    </DeleteWrap>
  );
}

export default DoorlockUninstall;