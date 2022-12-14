import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimesCircle, faDisplay, faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { HotelNotifyTemplateCreateProps } from '../../types/hotelnotify';

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
    .card-box {
      margin-top: 0.625rem;
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

const HotelNotifyTemplateCreate = ({
  hotelId,
  hotelnotifyItems,
  notifyTemplateItem,
  hotelListItems,
  hotelNotifyTemplateContextItems,
  notifyTemplateListItems,
  handleChange,
  handleCreateHotelNotifyTemplate,
  handlePreviewNotifyTemplate,
  handleSelectNotifyTemplate,
  toggle,
}:HotelNotifyTemplateCreateProps) => {

  return (
        <FormCardWrap>
          <FormCardTitle>
            <h1>?????? ?????? ????????? ??????</h1>
            <FontAwesomeIcon icon={faXmark} onClick={() => toggle()}/>
          </FormCardTitle>
          <div className='inline-flex'>
            <div className='w-100'>
              <div className='card-text'>
                <p>
                  <b>??????</b>
                </p>
                <select
                  className='card-text-select'
                  value={hotelId? hotelId : hotelnotifyItems.hotelId}
                  name='hotelId'
                  onChange={handleChange}
                  disabled={hotelId !== null}
                >
                  <option value=''>????????? ?????? ????????????.</option>
                  {hotelListItems?
                    hotelListItems.map((hotel, index) => (
                    <option key={index} value={hotel.id}>{hotel.name}</option>
                  )):''}
                </select>
              </div>
              <div className='card-text'>
                <p>
                  <b>???????????????</b>
                  <span className='required'>*</span>
                </p>
                <select
                  className='card-text-select'
                  value={hotelnotifyItems.notifyContext}
                  name='notifyContext'
                  onChange={handleChange}
                >
                  <option value='' hidden>????????? ????????? ?????? ????????????.</option>
                  {hotelNotifyTemplateContextItems? 
                    hotelNotifyTemplateContextItems.map((notifyContext, index) => (
                    <option key={index} value={notifyContext.code}>{notifyContext.display}</option>
                  )):''}
                </select>
              </div>
              <div className='card-text'>
                <p>
                  <b>?????????ID</b>
                  <span className='required'>*</span>
                </p>
                <select
                  className='card-text-select'
                  value={hotelnotifyItems.notifyTemplateId}
                  name='notifyTemplateId'
                  onChange={(e) => handleSelectNotifyTemplate(e.target.value)}
                >
                  <option value='' hidden>???????????? ?????? ????????????.</option>
                  {notifyTemplateListItems?
                    notifyTemplateListItems.map((notifyTemplate, index) => (
                    <option key={index} value={notifyTemplate.id}>{notifyTemplate.id}</option>
                  )):''}
                </select>
              </div>
              <div className='card-box'>
                <p>
                  <b>?????????</b>
                </p>
                <div className='card-box-textarea-container'>
                  <textarea
                    className='card-box-textarea'
                    disabled
                    value={notifyTemplateItem.template}
                  />
                </div>
              </div>
              <div className='card-box'>
                <p>
                  <b>?????? ?????????</b>
                </p>
                <div className='card-box-textarea-container'>
                  <textarea
                    className='card-box-textarea'
                    disabled
                    value={notifyTemplateItem.templateAlt}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='card-foot'>
            <div className='form-item-cancel'>
              <button className='btn-item-cancel' id='hotelNotify-create-cancel-btn' onClick={() => toggle()}>
                <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>??????</span>
              </button>
            </div>
            <div className='form-item-add center'>
              <button className='btn-item-add mr-10' id='hotelNotify-create-preview-btn' onClick={handlePreviewNotifyTemplate}>
                <FontAwesomeIcon icon={faDisplay} style={{paddingRight:'3px'}}/><span>????????????</span>
              </button>
              <button className='btn-item-add' id='hotelNotify-create-add-btn' onClick={handleCreateHotelNotifyTemplate}>
                <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>??????</span>
              </button>
            </div>
          </div>
        </FormCardWrap>
  );
};

export default HotelNotifyTemplateCreate;