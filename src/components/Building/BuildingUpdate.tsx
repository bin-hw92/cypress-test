import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEdit, faSave, faTimesCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { BuildingUpdateProps } from '../../types/building';

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
      .config-container {
        display: flex;
        position: relative;
        padding: 0.625rem 0;
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
          top: 1.625rem;
          width: 100%;
          border-bottom: 1px dashed #cccccc;
        }
      }
      .card-box {
        width: calc(100% - 1.25rem);
        padding: 0 0.625rem;

        .card-box-input-container {
            display: inline-flex;
            width: 100%;
            border: 1px solid #777777;
            border-top-left-radius: 0.35rem;
            border-top-right-radius: 0.35rem;
        }
        .card-box-input {
          padding: 0.5rem 0.625rem;
          width: calc(100% - 3.75rem);
          font-size: 0.875rem;
          color: #333333;
          border: none;
          border-top-left-radius: 0.35rem;
          border-right: 1px solid dimgray;

          &:focus-visible {
            outline: 1.5px solid #044dac;
            border-radius: 0.18775rem;
            z-index: 3;
          }
        }
        .card-box-input-button {
          cursor: pointer;
          margin: auto;
          color: #333333;
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
              height: 1.5rem;
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
          &.detail {
            min-height: 23.5rem; 
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

const BuildingUpdate = ({
  buildingItem,
  buildingTypeItem,
  commonroomInputRef,
  editableCommonroom,
  handleChange,
  handleAddCommonroom,
  handleRemoveCommonroom,
  handleEditableCommonroom,
  handleChangeCommonroom,
  handleUpdateBuilding,
  toggle,
}:BuildingUpdateProps) => {
  
  return (
          <FormCardWrap>
            <FormCardTitle>
              <h1>빌딩 수정</h1>
              <FontAwesomeIcon icon={faXmark} onClick={() => toggle()}/>
            </FormCardTitle>
            <div className='inline-flex'>
              <div className='w-100'>
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
                <div className='card-box'>
                  <p>
                    <b>공용도어</b>
                  </p>
                  <div className='card-box-input-container'>
                    <input ref={commonroomInputRef} className='card-box-input' name='commonrommInput' placeholder='공용도어 이름을 입력 해주세요.'></input>
                    <div className='card-box-input-button' onClick={handleAddCommonroom}>
                      <FontAwesomeIcon icon={faPlus} className='icon-item-add'/>
                    </div>
                  </div>
                  <div className='card-box-text-container'>
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
            <div className='card-foot'>
              <div className='form-item-cancel'>
                <button className='btn-item-cancel' id='building-update-cancel-btn' onClick={() => toggle()}>
                  <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>취소</span>
                </button>
              </div>
              <div className='form-item-add center'>
                <button className='btn-item-add' id='building-update-add-btn' onClick={handleUpdateBuilding}>
                  <FontAwesomeIcon icon={faSave} style={{paddingRight:'2px'}}/><span>저장</span>
                </button>
              </div>
            </div>
          </FormCardWrap>
  );
};

export default BuildingUpdate;