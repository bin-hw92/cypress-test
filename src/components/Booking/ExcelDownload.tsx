import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimesCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { ExcelDownloadProps } from '../../types/booking';
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

const ExcelDownload = ({
  handleExportDataToExcel,
  toggle,
}:ExcelDownloadProps) => {

  return (
    <DeleteWrap id='excel-download-wrap'>
      <FontAwesomeIcon icon={faQuestionCircle} style={{fontSize:'5em', color:'orange'}}/>
      <p className='mb-0 mt-4' style={{fontSize:'16px'}}>
        예약 정보를 다운로드 하시겠습니까?<br/>
      </p>
      <button className='modal-btn-cancel' onClick={() => toggle()}>
        <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
      </button>
      <button className='modal-btn-confirm' onClick={() => handleExportDataToExcel()}>
        <FontAwesomeIcon icon={faSave} style={{paddingRight:'3px'}}/><span>확인</span>
      </button>
    </DeleteWrap>
  );
}

export default ExcelDownload;