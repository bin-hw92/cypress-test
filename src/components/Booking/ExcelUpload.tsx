import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimesCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { ExcelUploadProps } from '../../types/booking';

/* styled */
const FormCardWrap = styled.div`
width: 100%;
margin: auto;
border-radius: 0.3rem;

  .inline-flex {
    display: flex;
    position: relative;
    margin: 0 1.25rem;
    width: calc(100% - 20px);
    height: 100%;
    text-align: left;
    border: 1px solid #cccccc;
    border-radius: 0.35rem;

    .file-upload-body {
      width: 100%;

      .file-wrap {
        margin: 1rem;
        
        .file-upload-file-header {
          display: flex;
          position: relative;
          margin: 0 0 5px 0;

          .file-upload-file-header-label {
            margin: 0 0 5px 0;
            color: #4682b4;
            font-weight: bold;
            height: 26px;
            line-height: 26px;

            .required {
              margin-left: 3px;
              font-size: 0.875rem !important;
              color: #ef4b56;
            }
          }
        }
        .file-upload-select-wrap {
          margin: 0;

          label {
            display: inline-block;
            padding: 8px 12px;
            width: calc(100% - 24px);
            color: #555555;
            font-size: 0.875rem;
            cursor: pointer;
            background-color: #ffffff;
            box-shadow: 0 0 1px 0 rgb(0 0 0 / 30%), 0 2px 3px -2px rgb(0 0 0 / 20%);
            border: unset;
          }
          input[type="file"] {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0,0,0,0);
            border: 0;
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
    height: 36px;
    width: calc(100% - 40px);
    padding: 0.675rem 0;
    margin: 0 1.25rem;
    
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
        font-size: 16px;
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

const ExcelUpload = ({
  selectedFileName,
  handleSetFile,
  handleCreateBooking,
  toggle,
}:ExcelUploadProps) => {

  return (
    <Fragment>
      <FormCardWrap id='excel-upload-wrap'>
        <FormCardTitle>
          <h1>예약 생성 업로드</h1>
            <FontAwesomeIcon icon={faXmark} onClick={() => toggle()}/>
        </FormCardTitle>
        <div className='inline-flex'>
          <div className='file-upload-body'>

            <div className='file-wrap'>
              <div className='file-upload-file-header'>
                <p className='file-upload-file-header-label'>파일 선택<span className='required'> *</span></p>
              </div>
              <div className='file-upload-select-wrap'>
                <label htmlFor='file-label'>{selectedFileName || '파일을 선택 해주세요. (엑셀만 가능)'}</label>
                <input type='file' id='file-label' className='upload-hidden' onChange={(e) => handleSetFile(e)}/>
              </div>
            </div>
          </div>
        </div>
        {/* <input className='modal-form-input' type='file' onChange={e => setFile(e.target.files[0])}></input> */}
        <div className='card-foot'>
          <div className='form-item-cancel'>
            <button className='btn-item-cancel' onClick={() => toggle()}>
              <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
            </button>
          </div>
          <div className='form-item-add center'>
            <button className='btn-item-add' onClick={() => handleCreateBooking()}>
              <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>확인</span>
            </button>
          </div>
        </div>
      </FormCardWrap>
    </Fragment>
  );
}

export default ExcelUpload;