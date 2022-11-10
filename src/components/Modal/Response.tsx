import React from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import '../../assets/css/modal.css';
import { ResponseFailModalProps, ResponseSuccessModalProps } from '../../types/commons';
import styled from 'styled-components';

/* Styled */
const ModalWrap = styled(Modal)`
position: fixed;
top: 0;
left: 0;
z-index: 1050;
display: none;
width: 100%;
height: 100%;
overflow: hidden;
outline: 0;

&.modal-open {
  overflow-x: hidden;
  overflow-y: auto;
}
`;
const FormWrap = styled.div`
  padding: 2rem;
  width: 100%;
  margin: auto;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 0.3rem;
  box-sizing: border-box;

  .modal-btn-close {
    margin: 1rem 1rem 0 1rem;
    padding: 0.5rem;
    height: 2.3rem;
    width: 5rem;
    font-size: 0.875rem;
    font-weight: bold;
    color: #ffffff;
    border: 0px;
    border-radius: 0.35rem;
    background-color: #6c6969;
    cursor: pointer;
    box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);

    :hover {
        background: #949494;
    }
  }
`;
export const ResponseSuccessModal = ({
  isOpen,
  toggle,
  message,
}:ResponseSuccessModalProps) => {
  return (
    <ModalWrap
      show={isOpen}
      onHide={() => toggle()}
      centered
      size='sm'
    >
      <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
        <FormWrap>
        <FontAwesomeIcon icon={faCheckCircle} style={{fontSize:'5em', color:'#28a745'}}/>
        <p className='mb-0 mt-4' style={{fontSize:'15px'}}>
          {message}
        </p>
        <button className='modal-btn-close' onClick={() => toggle()}>
          <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/>닫기
        </button>
        </FormWrap>
      </ModalBody>
    </ModalWrap>
  );
}

export const ResponseFailModal = ({
  isOpen,
  toggle,
  message,
  subMessage,
}:ResponseFailModalProps) => {
  return (
    <ModalWrap
      show={isOpen}
      onHide={() => toggle()}
      centered
      size='sm'
    >
      <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
      <FormWrap>
        <FontAwesomeIcon icon={faExclamationCircle} className='response-fail'/>
        <p className='response-fail-msg'>
          {message}
        </p>
        <p className='response-fail-sub-msg' hidden={!subMessage}>
          {subMessage}
        </p>
        <button className='modal-btn-close' onClick={() => toggle()}>
          <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/>닫기
        </button>
        </FormWrap>
      </ModalBody>
    </ModalWrap>
  );
}
