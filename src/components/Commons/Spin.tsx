import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { SpinProps } from '../../types/commons';

/* styled */
const SpinWrap = styled.article`
  position: fixed;
  background: rgba(204,204,204,0.3) !important;
  width: 100%;
  height: 100%;
  z-index: 1060;

  .in-modal {
    position: absolute;

    .spinner-border {
      top: 40%;
      left: 45%;
    }
  }

  .text-success {
    color: #4c9ffe !important;
  }

  .spinner-border {
    display: inline-block;
    position: absolute;
    top: calc(50% - 1.5rem);
    left: calc(50% - 1.5rem);
    width: 3rem;
    height: 3rem;
    vertical-align: text-bottom;
    border: .5em solid;
    border-right: .5em solid transparent;
    border-radius: 50%;
    animation: spinner-border .75s linear infinite;
  }

  @keyframes spinner-border {
    100% {
      transform: rotate(1turn);
    }
  }
`;

const Spin = ({
  isSpin,
  isModal,
}:SpinProps) => {
  return (
      <SpinWrap className={`${isModal ? 'in-modal':''}`} hidden={!isSpin}>
        <Spinner animation='border' variant='success' role='status'/>
      </SpinWrap>
  );
}

export default Spin;