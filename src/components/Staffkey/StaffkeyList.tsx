import React, { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Table from '../Commons/Table';
import { dateFormatter, roomsFormatter, staffKeyTypeFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { StaffkeyListProps } from '../../types/staff';
import { useNameTableChange, useOrigin } from '../../lib/useInfoChange';

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
const ContentButtonForm = styled.div`
  padding-top: 1.25rem;
  text-align: right;

  .center {
    display: block;
    padding-top: 0;

    .detail {
      right: 0;
    }
    .pl20 {
      padding-left: 1.25rem;
    }
  }
`;
const ContentButton = styled.button`
  height: 2.3rem;
  min-width: 5rem;
  padding: 0.5rem;
  border-radius: .35rem;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: #044dac;
  border: 0px;
  cursor: pointer;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 
  0 2px 4px -2px rgb(0 0 0 / 30%);

  :hover {
    background-color: #4c9ffe;
  }
  :disabled {
    background-color: #949494;
    cursor: default;
  }
`;


const StaffkeyList = ({
  staffkeyListItems,
  staffRole,
  userRole,
  handleSelectStaffkeyDelete,
  handleGoBack,
  handleModal,
}:StaffkeyListProps) => {
 
  return (
    <Fragment>
      <FormCardDetail>
        <FormCardTitle>
          <div className='form-item-cancel'>
            <button className='btn-item-close bgc-unset bsd-unset' onClick={handleGoBack}>
              <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>스태프 목록으로</span>
            </button>
          </div>
        </FormCardTitle>
        <Table
          columns={[
            {
              key: 'grantee.name',
              text: '스태프',
              width: '10%',
              formatter: {
                func: userRole === 'master'? useOrigin : useNameTableChange,
                params: ['grantee.name'],
              },
            },
            {
              key: 'grantor.name',
              text: '발급자',
              width: '10%',
              formatter: {
                func: userRole === 'master'? useOrigin : useNameTableChange,
                params: ['grantor.name'],
              },
              // grantor.id가 mf_staff_permission.id가 아니라 mf_staff.id로 나와서 조회할 수 없음.
              // linker: {
              //   func: (staffId) => history.push(`/staff/${staffId}`),
              //   params: ['grantor.id'],
              // },
            },
            {
              key: 'start_at',
              text: '시작일자',
              width: '12%',
              formatter: {
                func: dateFormatter,
                params: ['start_at'],
              },
            },
            {
              key: 'end_at',
              text: '종료일자',
              width: '12%',
              formatter: {
                func: dateFormatter,
                params: ['end_at'],
              },
            },
            {
              key: 'rooms',
              text: '객실',
              width: '9%',
              formatter: {
                func: roomsFormatter,
                params: ['rooms'],
              },
            },
            {
              key: 'type',
              text: '키타입',
              width: '8%',
              formatter: {
                func: (type:any) => staffKeyTypeFormatter(type),
                params: ['type'],
              },
            },
            {
              key: 'card_no',
              text: '카드번호',
              width: '8%',
            },
            {
              key: 'exchangekey',
              text: '교환코드',
              width: '8%',
            },
            {
              key: 'seq_num',
              text: '시컨스',
              width: '6%',
            },
            {
              key: 'created_at',
              text: '생성일자',
              width: '12%',
              formatter: {
                func: dateFormatter,
                params: ['created_at'],
              },
            },
            {
              key: 'button',
              text: '',
              width: '5%',
              items: [
                {
                  text: '스태프키 삭제',
                  disabled: {
                    func: (type:any) => type !== 'mobilekey',
                    params: ['type'],
                  },
                  action: {
                    func: handleSelectStaffkeyDelete,
                    params: ['id'],
                  },
                },
              ],
            },
          ]}
          datas={staffkeyListItems}
          userRole={userRole}
        />
      </FormCardDetail>
      {userRole === 'master' &&
        <ContentButtonForm>
          <ContentButton onClick={handleModal} hidden={staffRole === 'master'}>
            <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
            <span>키 발급</span>
          </ContentButton>
        </ContentButtonForm>
      }
    </Fragment>
  );
};

export default StaffkeyList;