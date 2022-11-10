import React, { Fragment } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faSave, faTimesCircle, faDisplay, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { dateFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { NotifyTemplateDetailProps } from '../../types/notifyTemplate';
import BreadcrumbContainer from '../../containers/Commons/BreadcrumbContainer';

/* styled */
const FormCardDetail = styled.div`
padding: 0 20px 30px 20px;
width: calc(100% - 40px);
border: 1px solid #cccccc;
border-radius: 0.3rem;
background: #ffffff;
box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);

  .inline-flex {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #cccccc;
    border-radius: 0.35rem;

    .w-50 {
      flex: 1;
      width: 50%;

      .card-text {
        display: flex;
        padding-right: 3.75rem;
        width: 100%;
        align-items: center;
        box-sizing: border-box;

        p {
          margin: 0;
          padding: 1rem 0.875rem;
          width: 11.25rem;
          color: #555555;
          line-height: 1.8rem;
          border-bottom: 1px solid #e3e8f0;
          background: #e3e8f0;
          box-sizing: inherit;

          .required {
            margin-left: 3px;
            color: #ef4b56;
          }
        }
        .card-text-input {
          margin: 0.625rem 0 0.625rem 2.5rem;
          padding: 0.625rem 0.5rem;
          width: calc(100% - 13.75rem);
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
          margin: 0.625rem auto 0.625rem 2.5rem;
          padding: 0.625rem 0.5rem;
          width: calc(100% - 13.75rem);
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
        display: flex;
        padding-right: 3.75rem;
        width: 100%;
        align-items: stretch;
        box-sizing: border-box;

        p {
          margin: 0;
          padding: 1rem 0.875rem;
          width: 11.25rem;
          color: #555555;
          line-height: 1.8rem;
          border-bottom: 1px solid #e3e8f0;
          background: #e3e8f0;
          box-sizing: inherit;

          .required {
            margin-left: 3px;
            color: #ef4b56;
          }
        }
        .card-box-textarea-container {
          margin: 0.625rem 0 0.625rem 2.5rem;
          width: calc(100% - 13.75rem);
          font-size: 0.875rem;
          color: #333333;
          line-height: 1.2;
          box-sizing: inherit;

          .card-box-textarea {
            padding: 0.625rem 0.5rem;
            width: 100%;
            height: 14.49rem;
            border: 1px solid #777777;
            border-radius: 0.18775rem;
            resize: none;

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
    }
  }
`;
const FormFootWrap = styled.div`
display: inline-flex;
padding: 1.25rem 0;
width: 100%;
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
`;
const FormCardTitle = styled.div`
    display: inline-flex;
    position: relative;
    padding: 1.25rem 0 0.675rem 0;
    width: 100%;
    height: 2rem;
    text-align: left;
    justify-content: space-between;

    button {
      padding: 3px 14px;
      border-radius: 1rem;
      cursor: pointer;
      
      :hover {
        background-color: #e3e8f0;
      }
    }
    .dropdown-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 7rem;
      padding: 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: #555555;
      border: 1px solid #cccccc;
      border-radius: 0.35rem;
      background-color: #ffffff;
      background-clip: padding-box;
      box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 
      0 2px 4px -2px rgb(0 0 0 / 30%);
      z-index: 1000;
      
      &.show {
        display: block;
      }
      .dropdown-item-delete {
        display: block;
        cursor: pointer;
        padding: 8px 20px;
        text-align: left;
        
        :hover {
          background: #edf3f4;
        }

        &.disabled {
          color: #999999;
          background: #eeeeee;
          cursor: default;
        }
      }
    }
`;

const NotifyTemplateDetail = ({
  breadcrumbItems,
  notifyTemplateItem,
  templateId,
  userRole,
  handleChange,
  handleModal,
  moveToListPage,
  handleSelectNotifyTemplate,
  handleUpdateNotifyTemplate,
  handlePreviewNotifyTemplate,
}:NotifyTemplateDetailProps) => {

  return (
    <Fragment>
      <div className='content-title2'>
        <BreadcrumbContainer breadcrumbItems={breadcrumbItems}/>
      </div>
      <FormCardDetail id='notifyTemplate-detail-wrap'>
        <div className='form-card-tab-detail btlr-0'>
          <FormCardTitle>
            <div className='form-item-cancel'>
              <button className='btn-item-close bgc-unset bsd-unset' onClick={moveToListPage}>
                <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>템플릿 목록으로</span>
              </button>
            </div>
            <div className='form-dropdown detail'>
              {userRole === 'master' &&
                <Dropdown onClick={e => e.stopPropagation()}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FontAwesomeIcon icon={faEllipsisV}/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className='dropdown-item-delete center' onClick={handleModal}>
                      <span>템플릿 삭제</span>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              }
            </div>
          </FormCardTitle>
          <div>
            <div className='inline-flex'>
              <div className='w-50'>
                <div className='card-text'>
                  <p>
                    <b>ID</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={templateId? templateId:''}
                    disabled
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>설명</b>
                    <span className='required'>*</span>
                  </p>
                  <input
                    className='card-text-input'
                    placeholder='설명을 입력 해주세요.'
                    value={notifyTemplateItem.desc}
                    name='desc'
                    onChange={handleChange}
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>템플릿코드</b>
                  </p>
                  <input
                    className='card-text-input'
                    placeholder='템플릿코드를 입력 해주세요.'
                    value={notifyTemplateItem.templateCode}
                    name='templateCode'
                    onChange={handleChange}
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>날짜형식</b>
                  </p>
                  <input
                    className='card-text-input'
                    placeholder='날짜형식을 입력 해주세요.'
                    value={notifyTemplateItem.dateFormat}
                    name='dateFormat'
                    onChange={handleChange}
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>언어코드</b>
                  </p>
                  <input
                    className='card-text-input'
                    placeholder='언어코드를 입력 해주세요.'
                    value={notifyTemplateItem.locale}
                    name='locale'
                    onChange={handleChange}
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>LMS 사용</b>
                  </p>
                  <select
                    className='card-text-select'
                    value={notifyTemplateItem.isLMS? 'O' : 'X'}
                    name='isLMS'
                    onChange={handleChange}
                  >
                    <option value='X'>X</option>
                    <option value='O'>O</option>
                  </select>
                </div>
                <div className='card-text'>
                  <p>
                    <b>호텔 수</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={notifyTemplateItem.hotelTemplateCount}
                    disabled
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>생성일자</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={notifyTemplateItem.createdAt? dateFormatter(notifyTemplateItem.createdAt):''}
                    disabled
                  />
                </div>
                <div className='card-text'>
                  <p>
                    <b>수정일자</b>
                  </p>
                  <input
                    className='card-text-input'
                    value={notifyTemplateItem.updatedAt? dateFormatter(notifyTemplateItem.updatedAt):''}
                    disabled
                  />
                </div>
              </div>
              <div className='w-50 bl-1-dashed-gray'>
                <div className='card-box d-flex'>
                  <p>
                    <b>템플릿</b>
                    <span className='required'>*</span>
                  </p>
                  <div className='card-box-textarea-container'>
                    <textarea
                      className='card-box-textarea detail'
                      placeholder='템플릿을 입력 해주세요.'
                      value={notifyTemplateItem.template}
                      name='template'
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='card-box d-flex'>
                  <p>
                    <b>대체 템플릿</b>
                  </p>
                  <div className='card-box-textarea-container'>
                    <textarea
                      className='card-box-textarea detail'
                      placeholder='대체 템플릿을 입력 해주세요.'
                      value={notifyTemplateItem.templateAlt}
                      name='templateAlt'
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormCardDetail>
      <FormFootWrap>
        <div className='form-item-cancel'>
          <button className='btn-item-cancel' onClick={handleSelectNotifyTemplate}>
            <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
          </button>
        </div>
        <div className='form-item-add center detail'>

          {userRole === 'master' && <>
            <button className='btn-item-add mr-10' onClick={handlePreviewNotifyTemplate}>
            <FontAwesomeIcon icon={faDisplay} style={{paddingRight:'3px'}}/><span>미리보기</span>
          </button>
            <button className='btn-item-add' onClick={handleUpdateNotifyTemplate}>
              <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
            </button>
          </>}
          {userRole !== 'master' && 
            <button className='btn-item-add' onClick={handlePreviewNotifyTemplate}>
              <FontAwesomeIcon icon={faDisplay} style={{paddingRight:'3px'}}/><span>미리보기</span>
            </button>
          }
        </div>
      </FormFootWrap>
    </Fragment>
  );
};

export default NotifyTemplateDetail;