import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { NotifyTemplatePreviewProps } from '../../types/notifyTemplate';

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

      .card-box {
        display: flex;
        width: 100%;
        padding: 0 0.625rem;
        align-items: stretch;
        flex-direction: column;
        box-sizing: border-box;
        
        p {
          margin: 0;
          padding: 1rem 0.875rem;
          width: 100%;
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
      .card-box-textarea-container {
        margin-bottom: 0.625rem;
        width: 100%;
        font-size: 0.875rem;
        color: #333333;
        line-height: 1.2; 

        .card-box-textarea {
          padding: 0.5rem;
          width: 100%;
          height: 15rem;
          border: 1px solid #777777;
          border-radius: 0.18775rem;
          resize: none;
          box-sizing: border-box;

          :disabled {
            color: #555555;
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
.card-foot {
  display: inline-flex;
  margin: 0 1.25rem;
  padding: 1.25rem 0;
  width: calc(100% - 40px);
  height: 2rem;
  justify-content: center;

  .btn-item-close {
    padding: 0.5rem;
    height: 2.3rem;
    min-width: 5rem;
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

const NotifyTemplatePreview = ({
  notifyTemplatePreview,
  toggle,
}:NotifyTemplatePreviewProps) => {

  return (
    <Fragment>
      <FormCardWrap>
        <FormCardTitle>
          <h1>알림 템플릿 미리보기</h1>
          <FontAwesomeIcon icon={faXmark} onClick={() => toggle()}/>
        </FormCardTitle>
        <div className='inline-flex'>
          <div className='w-100'>
            <div className='card-box'>
              <p>
                <b>템플릿</b>
                <span className='required'>*</span>
              </p>
              <div className='card-box-textarea-container'>
                <textarea
                  className='card-box-textarea preview'
                  value={notifyTemplatePreview.templateRendered? notifyTemplatePreview.templateRendered : ''}
                  disabled
                />
              </div>
            </div>
            <div className='card-box'>
              <p>
                <b>대체 템플릿</b>
              </p>
              <div className='card-box-textarea-container'>
                <textarea
                  className='card-box-textarea preview'
                  value={notifyTemplatePreview.templateAltRendered? notifyTemplatePreview.templateAltRendered : ''}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className='card-foot center'>
          <div className='form-item-close'>
            <button className='btn-item-close' id='notifyTemplate-preview-close-btn' onClick={() => toggle()}>
              <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>닫기</span>
            </button>
          </div>
        </div>
      </FormCardWrap>
    </Fragment>
  );
};

export default NotifyTemplatePreview;