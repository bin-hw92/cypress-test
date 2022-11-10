import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Filter from '../Commons/Filter';
import Table from '../Commons/Table';
import doorlockLogFormatter from './DoorlockLogFormatter';
import styled from 'styled-components';
import { DoorlockLogListProps } from '../../types/doorlock';

/* styled */
const FormCardDetail = styled.div`
padding: 0 20px 30px 20px;
width: calc(100%; - 40px);
border: 1px solid #cccccc;
border-radius: 0.3rem;
border-top-left-radius: 0;
background: #ffffff;
box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);
`;
const FormCardTitle = styled.div`
display: inline-flex;
position: relative;
padding: 1.25rem 0 0.675rem 0;
width: 100%;
height: 2rem;
text-align: left;
justify-content: space-between;

  .btn-item-close {
    padding: 3px 14px;
    border-radius: 1rem;
    cursor: pointer;
    
    :hover {
      background-color: #ffffff;
    }
  }

  .filter-item-wrap {
    select {
      top: 0.5px;
      right: 0;
    }
  }
`;

const DoorlockLogList = ({
  doorlockLogListItems,
  filterItem,
  sortItem,
  handleGoBack,
  handleFilter,
  handleinitFilter,
  changeSort
}:DoorlockLogListProps) => {

  return (
    <FormCardDetail>
      <FormCardTitle>
        <div className='form-item-cancel'>
          <button className='btn-item-close bgc-unset bsd-unset' onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>도어락 목록으로</span>
          </button>
        </div>
        <Filter
          columns={[
            {
              key: 'logType',
              type: 'select',
              placeholder: '타입',
              value: filterItem.logType,
              action: handleFilter,
              selectItems: doorlockLogFormatter.logFormatterTypeList,
              selectItemKey: 'text',
              selectItemValue: 'value',
              isRemoveButton: true,
            },
          ]}
          init={handleinitFilter}
        />
      </FormCardTitle>
      <Table
        columns={[
          {
            key: 'log_id',
            text: '로그ID',
            width: '8%',
            sort: {
              func: changeSort,
              params: 'log_id',
              selected: sortItem.sort === 'log_id',
              order: sortItem.sort === 'log_id' ? sortItem.order : 'desc',
            },
          },
          {
            key: 'log_type',
            text: '타입',
            width: '14%',
            formatter: {
              func: doorlockLogFormatter.formatType,
              params: ['log_type'],
            },
          },
          {
            key: 'log_message',
            text: '내용',
            width: '54%',
            formatter: {
              func: doorlockLogFormatter.formatMessage,
              params: ['log_type', 'log_message'],
            },
          },
          {
            key: 'log_event_date',
            text: '이벤트 발생일자',
            width: '12%',
            formatter: {
              func: doorlockLogFormatter.formatTime,
              params: ['log_event_date'],
            },
            sort: {
              func: changeSort,
              params: 'log_event_date',
              selected: sortItem.sort === 'log_event_date',
              order: sortItem.sort === 'log_event_date' ? sortItem.order : 'desc',
            },
          },
          {
            key: 'created_at',
            text: '로그 생성일자',
            width: '12%',
            formatter: {
              func: doorlockLogFormatter.formatTime,
              params: ['created_at'],
            },
            sort: {
              func: changeSort,
              params: 'created_at',
              selected: sortItem.sort === 'created_at',
              order: sortItem.sort === 'created_at' ? sortItem.order : 'desc',
            },
          },
        ]}
        datas={doorlockLogListItems}
      />
    </FormCardDetail>
  );
};

export default DoorlockLogList;