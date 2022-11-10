import React, { Fragment } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEllipsisV, faPlus, faMinus, faEdit, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { BuildingDetailProps } from '../../types/building';

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
      .config-container {
        display: flex;
        position: relative;
        padding-top: 16px;
        padding-right: 3.75rem;
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
            top: 2rem;
            width: 100%;
            border-bottom: 1px dashed #cccccc;
          }
          
          :before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 11.25rem;
            height: 100%;
            background: #e3e8f0;
          }
      }

      .card-box.detail {
        display: flex;
        width: calc(100% - 3.75rem);
        height: 100%;
        box-sizing: border-box;

        p {
          margin: 0;
          padding: 1rem 0.875rem;
          width: 11.25rem;
          color: #555555;
          background: #e3e8f0;
          box-sizing: inherit;
        }
        .w-100p {
          margin-left: 2.5rem;
          width: calc(100% - 13.75rem);

          .card-box-input-container {
            display: inline-flex;
            margin-top: 0.625rem;
            width: 100%;
            border: 1px solid #777777;
            border-top-left-radius: 0.35rem;
            border-top-right-radius: 0.35rem;
    
            .card-box-input {
              padding: 0.325rem 0.625rem;
              width: calc(100% - 3.75rem);
              height: 1.8rem;
              font-size: 0.875rem;
              color: #333333;
              border: none;
              border-top-left-radius: 0.35rem;
              border-right: 1px solid #777777;
              
              &:focus-visible {
                outline: 1.5px solid #044dac;
                border-radius: 0.18775rem;
                z-index: 3;
              }
            }
            .card-box-input-button {
              margin: auto;
              color: #333333;
              cursor: pointer;
            }
          }

          .card-box-text-container {
            width: 100%;
            height: 10rem;
            color: #555555;
            border: 1px solid #777777;
            border-top: 0px;
            border-bottom-left-radius: 0.35rem;
            border-bottom-right-radius: 0.35rem;
            box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);
            overflow-y: auto;

            .card-box-text {
              display: inline-flex;
              position: relative;
              width: 100%;
              border-bottom: 1px solid #777777;
  
              input {
                margin: 0.125rem;
                padding: 0.2rem 0.5rem;
                width: calc(100% - 6.5rem);
                height: 1.8rem;
                color: #555555;
                border: 0;
                background-color: #ffffff;
                
                :disabled {
                  color: #999999;
                }
                &:focus-visible {
                  outline: 1.5px solid #044dac;
                  border-radius: 0.18775rem;
                  z-index: 3;
                }
              }
              .card-box-input-button {
                margin: auto;
                color: #555555;
                cursor: pointer;

                .disabled {
                  color: #999999;
                }
              }
              
              :before {
                content: '';
                position: absolute;
                right: 5.3125rem;
                width: 1px;
                height: 100%;
                border-right: 1px solid #cccccc;
              }
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

const BuildingDetail = ({
  buildingItem,
  buildingTypeItem,
  commonroomInputRef,
  editableCommonroom,
  userRole,
  dateFormatter,
  handleChange,
  handleAddCommonroom,
  handleRemoveCommonroom,
  handleEditableCommonroom,
  handleChangeCommonroom,
  handleUpdateBuilding,
  handleSelectBuilding,
  handleModal,
  handleGoBack,
}:BuildingDetailProps) => {

  return (
    <Fragment>
      <FormCardDetail id='building-detail-wrap'>
        <FormCardTitle>
          <div className='form-item-cancel'>
            <button className='btn-item-close bgc-unset bsd-unset' onClick={handleGoBack}>
              <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>빌딩 목록으로</span>
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
                    <span>빌딩 삭제</span>
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
                  <b>빌딩이름</b>
                  <span className='required'>*</span>
                </p>
                <input
                  className='card-text-input'
                  placeholder='빌딩이름을 입력 해주세요.'
                  value={buildingItem.name}
                  name='name'
                  onChange={handleChange}
                />
              </div>
              <div className='card-text'>
                <p>
                  <b>타입</b>
                </p>
                <select
                  className='card-text-select'
                  value={buildingItem.buildingtypeId}
                  name='buildingtypeId'
                  onChange={handleChange}
                >
                  <option value='' hidden>타입을 선택 해주세요.</option>
                  {buildingTypeItem.map((buildingtypeItem, index) => (
                    <option key={index} value={buildingtypeItem.id}>{buildingtypeItem.name}</option>
                  ))}
                </select>
              </div>
              <div className='card-text'>
                <p>
                  <b>생성일자</b>
                </p>
                <input
                  className='card-text-input'
                  value={buildingItem.createdAt? dateFormatter(buildingItem.createdAt) : ''}
                  disabled
                />
              </div>
              <div className='card-text'>
                <p>
                  <b>수정일자</b>
                </p>
                <input
                  className='card-text-input'
                  value={buildingItem.updatedAt? dateFormatter(buildingItem.updatedAt) : ''}
                  disabled
                />
              </div>
            </div>
            <div className='w-50 bl-1-dashed-gray'>
              <div className='card-box detail'>
                <p>
                  <b>공용도어</b>
                </p>
                <div className='w-100p'>
                  <div className='card-box-input-container'>
                    <input ref={commonroomInputRef} className='card-box-input' placeholder='공용도어 이름을 입력 해주세요.'></input>
                    <div className='card-box-input-button' onClick={handleAddCommonroom}>
                      <FontAwesomeIcon icon={faPlus} className='icon-item-add'/>
                    </div>
                  </div>
                  <div className='card-box-text-container detail' style={{height:'calc(15.5rem - 61.5px)'}}>
                    {buildingItem.commonrooms.map((commonroom, index) => (
                      <div className='card-box-text' key={index}>
                        <input
                          className='card-text-input'
                          placeholder='공용도어 이름을 입력 해주세요.'
                          value={commonroom.name}
                          onChange={e => handleChangeCommonroom({id: commonroom.id? commonroom.id : index, name: e.target.value})}
                          disabled={editableCommonroom !== index}
                        />
                        <div className='card-box-input-button' onClick={() => handleEditableCommonroom(index)}>
                          <FontAwesomeIcon icon={faEdit} className={`icon-item-edit ${editableCommonroom !== index ? 'disabled':''}`}/>
                        </div>
                        <div className='card-box-input-button' onClick={() => handleRemoveCommonroom(index)}>
                          <FontAwesomeIcon icon={faMinus} className='icon-item-cancel'/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormCardDetail>
      <FormFootWrap>
        <div className='form-item-cancel'>
          <button className='btn-item-cancel' onClick={handleSelectBuilding}>
            <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
          </button>
        </div>
        {userRole === 'master' &&
          <div className='form-item-add center detail'>
            <button className='btn-item-add' onClick={handleUpdateBuilding}>
              <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
            </button>
          </div>
        }
      </FormFootWrap>
    </Fragment>
  );
};

export default BuildingDetail;