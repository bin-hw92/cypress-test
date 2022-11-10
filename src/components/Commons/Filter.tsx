import React, { Fragment } from 'react';
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FilterProps } from '../../types/commons';
import Select from 'react-select';

/* styled */
const FilterWrap = styled.div`
  display: flex;

  .detail-page {
    right: 8px;
    bottom: 5px;
  }
  .xsm {
    width: 80px;
  }
  .sm {
    width: 100px;
  }
  .md {
    width: 120px;
  }
  .lg {
    width: 140px;
  }
  .xlg {
    width: 160px;
  }
  .filter-item-wrap {
    display: inline-flex;
    position: relative;

    .filter-item-remove-button {
      position: absolute;
      top: 0.578125rem;
      right: 0.375rem;
      color: #333333;
      font-size: 0.75rem;
      cursor: pointer;
    }
    :first-child input,
    :first-child select,
    .first {
      border-top-left-radius: .25rem;
      border-bottom-left-radius: .25rem;
    }
    input {
      height: 1.75rem;
      border: 1px solid #cccccc;
      border-right: 0px;
      padding: 0px 0.625rem;
      color: #333333;
      font-size: 0.875rem;

      &:focus-visible {
        outline: 1.5px solid #044dac;
      }
    }
    select {
      position: relative;
      top: 0.4px;
      height: 1.875rem;
      min-width: 5rem;
      border: 1px solid #cccccc;
      border-right: 0px;
      padding: 0px 0.625rem 0px;
      color: #333333;
      font-size: 0.875rem;

      :valid {
        -webkit-appearance: none;
      }
      :invalid {
        color: #757575;
      }
      &:focus-visible {
        outline: 1.5px solid #044dac;
      }
    }
    .react-datepicker {
      display: flex;
      width: none;
    }

    .select__control  {
      min-height: 1.875rem;
      font-size: 0.8125rem;
      border-radius: 0;
      
      &:focus-visible {
        border-radius: 0;
      }

      &.select__control > div {
        height: 1.25rem;
        min-height: 1.25rem;
        align-items: start;
        overflow: visible;

        .select__single-value {
          max-width: 90%;
        }

        .select__input-container  {
          margin-top: -1px;
          padding-top: 0px;

          input {
            height: 1.25rem;

            :after {
              height: 1.25rem;
            }
          } 
        }
      }
    }
    .select__menu {
      font-size: 0.8125rem;
    }
    .select__indicators {
      display: none;
    }
  }
`

const DatePickerWrap = styled(DatePicker)`
  .react-datepicker-wrapper {
    width: unset;
  }
  .react-datepicker__input-container input {
    width: 100%;
    border: none;
    color: #e6e5e8;
    height: 1.8rem;
    padding: 0 0 0 2px;
    border-bottom: 1px dotted rgba(255, 255, 255, 0.22);
    font-size: 0.875rem;
  }
  .react-datepicker__input-container input {
    height: 1.75rem;
    width: 10.625rem;
    padding: 0px 0.625rem 0px;
    color: rgb(207, 207, 207);
    border: 1px solid #1c2025;
    font-size: 0.875rem;
  }
`
const InitButton = styled.button`
  height: 1.875rem;
  background-color: #f0f0f0;
  color: #282C34;
  font-size: 0.875rem;
  font-weight: bold;
  border: 1px solid #cccccc;
  border-top-right-radius: .25rem;
  border-bottom-right-radius: .25rem;
  padding: 0.0625rem 0.3125rem;
  cursor: pointer;

  :hover {
    background-color: rgb(207, 207, 207);
    transition-duration: 0.3s;
  }
`

const Filter = ({
  columns,
  init,
  customClassName,
}:FilterProps) => {
  return (
    <Fragment>
      <FilterWrap className={` ${customClassName || ''}`}>
        {columns.map((column:any, index:number) => {
          switch(column.type) {
            case 'select':
              return (
                <div key={index} className='filter-item-wrap'>
                  <select
                    required
                    className={column.size || ''}
                    value={column.value}
                    onChange={e => column.action(_.set({}, column.key, e.target.value), false)} //디바운싱 사용 구분을 위해 false 추가(true시 사용)
                  >
                    <option value='' hidden>{column.placeholder}</option>
                    {column.selectItems.map((item:any, index:number) => (
                      <option key={index} value={item[column.selectItemValue]}>{item[column.selectItemKey]}</option>
                    ))}
                  </select>
                  <span
                    className='filter-item-remove-button'
                    hidden={!column.value || !column.isRemoveButton}
                    onClick={() => column.action(_.set({}, column.key, ''), false)} //디바운싱 사용 구분을 위해 false 추가(true시 사용)
                  >
                    <FontAwesomeIcon icon={faTimes}/>
                  </span>
                </div>
              )
              case 'hotel-select':
                return (
                  <div key={index} className='filter-item-wrap'>
                  <Select
                      styles={{
                        menu: (provided) => ({...provided, backgroundColor:'#ffffff'}),
                        option: (provided, state) => ({...provided, backgroundColor:'#ffffff', color:state.isDisabled ? '#999999':'#333333', '&:hover':{backgroundColor:state.isDisabled ? '#eeeeee':'#ffffff'}})
                      }}
                      placeholder='단지'
                      value={Object.keys(column.value).length === 0 || column.value.value === undefined ? '' : column.value}
                      onChange={(state) => column.action(_.set({}, column.key, state), false)} //디바운싱 사용 구분을 위해 false 추가(true시 사용)
                      options={column.selectItems}
                      className={column.size || ''}
                      classNamePrefix="select"
                    />
                    <span
                      className='filter-item-remove-button'
                      hidden={Object.keys(column.value).length === 0 || column.value.value === undefined || !column.isRemoveButton}
                      onClick={() => column.action(_.set({}, column.key, ''), false)} //디바운싱 사용 구분을 위해 false 추가(true시 사용)
                    >
                      <FontAwesomeIcon icon={faTimes}/>
                    </span>
                  </div>
                )
            case 'datePicker':
              return (
                <div key={index} className='filter-item-wrap'>
                  <DatePickerWrap
                    key={index}
                    dateFormat={column.dateFormat || 'yyyy-MM-dd HH:mm'}
                    placeholderText={column.placeholder}
                    selected={column.value}
                    selectsStart={column.selectsStart}
                    selectsEnd={column.selectsEnd}
                    minDate={column.minDate}
                    maxDate={column.maxDate}
                    startDate={column.startDate}
                    endDate={column.endDate}
                    showTimeSelect={column.showTimeSelect}
                    timeFormat='HH:mm'
                    timeIntervals={60}
                    timeCaption='Time'
                    onChange={date => column.action(_.set({}, column.key, date), false)} //디바운싱 사용 구분을 위해 false 추가(true시 사용)
                    disabled={column.disabled}
                  />
                  <span
                    className='filter-item-remove-button'
                    hidden={!column.value || !column.isRemoveButton}
                    onClick={() => column.action(_.set({}, column.key, ''), false)} //디바운싱 사용 구분을 위해 false 추가(true시 사용)
                  >
                    <FontAwesomeIcon icon={faTimes}/>
                  </span>
                </div>
              )
            default: 
              return (
                <div key={index} className='filter-item-wrap'>
                  <input
                    className={column.size || ''}
                    placeholder={column.placeholder}
                    value={column.value}
                    onChange={e => column.action(_.set({}, column.key, e.target.value), true)} //디바운싱 사용 구분을 위해 true 추가
                    hidden={column.hidden}
                  />
                  <span
                    className='filter-item-remove-button'
                    hidden={!column.value}
                    onClick={() => column.action(_.set({}, column.key, ''), false)} //디바운싱 사용 구분을 위해 false 추가(true시 사용)
                  >
                    <FontAwesomeIcon icon={faTimes}/>
                  </span>
                </div>
              )
          }
        }
        )}
        <InitButton onClick={() => init()}>
          <FontAwesomeIcon icon={faEraser} style={{color:'#282C34', paddingRight:'3px'}}/>
          Clear
        </InitButton>
      </FilterWrap>
    </Fragment>
  );
};

export default Filter;