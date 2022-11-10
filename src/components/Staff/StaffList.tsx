import React, { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Filter from '../Commons/Filter';
import Table from '../Commons/Table';
import { dateFormatter, staffRoleFormatter, staffStatusFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { StaffListProps } from '../../types/staff';
import { useNameTableChange, useOrigin, usePhoneTableChange } from '../../lib/useInfoChange';

/* styled */
const ContentTitle = styled.div`
  position: absolute;
  top: -3.1875rem;
  right: 0;
  height: 2rem;
`;
const ContentButtonForm = styled.div`
  float: right;
  margin: 1.25rem 0;

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

const StaffList = ({
  staffListItems,
  filterItem,
  selectMasterCount,
  userRole,
  userPhoneNumber,
  hotelRole,
  handleFilter,
  handleinitFilter,
  handleModal,
  handleModalUser,
  handleStaffDetail,
}:StaffListProps) => {
  const roleItems = [
    { key: '마스터', value: 'master' },
    { key: '관리 스태프', value: 'manager' },
    { key: '하우스키핑', value: 'housekeeping' },
    { key: '스태프 모바일키', value: 'manager_mobilekey' },
    { key: '도어락 세팅', value: 'doorlock_setting' },
  ];
  const statusItems = [
    { key: '가입 승인중', value: 'granting' },
    { key: '가입 완료됨', value: 'granted' },
  ];
  return (
    <Fragment>
      <ContentTitle>
        <Filter
          columns={[
            {
              key: 'name',
              size: 'lg',
              placeholder: '스태프이름',
              value: filterItem.name,
              action: handleFilter,
            },
            {
              key: 'role',
              type: 'select',
              size: 'xlg',
              placeholder: '권한',
              value: filterItem.role,
              action: handleFilter,
              selectItems: roleItems,
              selectItemKey: 'key',
              selectItemValue: 'value',
              isRemoveButton: true,
            },
            {
              key: 'status',
              type: 'select',
              size: 'xlg',
              placeholder: '가입상태',
              value: filterItem.status,
              action: handleFilter,
              selectItems: statusItems,
              selectItemKey: 'key',
              selectItemValue: 'value',
              isRemoveButton: true,
            },
          ]}
          init={handleinitFilter}
        />
      </ContentTitle>
      {userRole === 'master'? (
        <ContentButtonForm>
          <ContentButton onClick={() => handleModal('create', '', '', '', '', '')}>
            <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
            <span>스태프 생성</span>
          </ContentButton>
        </ContentButtonForm>
        ) : (<div style={{paddingTop: '1.25rem'}}></div>)
      }
      <Table
        columns={[
          {
            key: 'view',
            text: '상세보기',
            width: '8%',
            moveToPage: {
              func: handleStaffDetail,
              params: ['id'],
            },
          },
          {
            key: 'name',
            text: '스태프이름',
            width: '17%',
            formatter: {
              func: userRole === 'master'? useOrigin : useNameTableChange,
              params: ['name'],
            },
          },
          {
            key: 'phone_number',
            text: '전화번호',
            width: '15%',
            formatter: {
              func: userRole === 'master'? useOrigin : usePhoneTableChange,
              params: ['phone_number'],
            },
          },
          {
            key: 'role',
            text: '권한',
            width: '15%',
            formatter: {
              func: staffRoleFormatter,
              params: ['role'],
            },
          },
          {
            key: 'status',
            text: '가입상태',
            width: '10%',
            formatter: {
              func: staffStatusFormatter,
              params: ['status'],
            },
          },
          {
            key: 'cardkey_count',
            text: '카드키 갯수',
            width: '10%',
          },
          {
            key: 'mobilekey_count',
            text: '모바일키 갯수',
            width: '10%',
          },
          {
            key: 'created_at',
            text: '생성일자',
            width: '15%',
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
                text: '스태프 수정',
                disabled: {
                  func: (role:string, phone_number:string) => (role === 'master' && hotelRole !== 'master') || (hotelRole === 'manager' && (phone_number !== userPhoneNumber && (role === 'manager' || role === 'manager_mobilekey' || role === 'doorlock_setting'))),
                  params: ['role', 'phone_number'],
                },
                action: {
                  func: (staffId:string, phone_number:string, role:string) => handleModal('update', staffId, '', role, phone_number, ''),
                  params: ['id', 'phone_number', 'role'],
                },
              },
              {
                text: '키 발급',
                disabled: {
                  func: (role:string, phone_number:string) => role === 'master' || (hotelRole === 'manager' && (phone_number !== userPhoneNumber && (role === 'manager' || role === 'manager_mobilekey' || role === 'doorlock_setting'))),
                  params: ['role', 'phone_number'],
                },
                action: {
                  func: (staffId:string, role:string, phone_number:string) => handleModalUser('issue', staffId, '', '', '', role, phone_number),
                  params: ['id', 'role', 'phone_number'],
                },
              },
              {
                text: '가입 승인',
                disabled: {
                  func: (status:string) => status === 'granted' || hotelRole === 'manager',
                  params: ['status'],
                },
                action: {
                  func: (staffPhoneNumber:string, staffName:string, status:string) => handleModalUser('signup', '', staffName, staffPhoneNumber, status, '', ''),
                  params: ['phone_number', 'name', 'status'],
                },
              },
              {
                text: '스태프 삭제',
                disabled: {
                  func: (role:string, phone_number:string, status:string) => ((role === 'master' && selectMasterCount === 1) || (role === 'master' && status !== 'granted')) || (hotelRole === 'manager' && (phone_number !== userPhoneNumber && (role === 'master' || role === 'manager' || role === 'manager_mobilekey' || role === 'doorlock_setting'))),
                  params: ['role', 'phone_number', 'status'],
                },
                action: {
                  func: (staffId:string, staffName:string, role:string, phone_number: string, status:string) => handleModal('delete', staffId, staffName, role, phone_number, status),
                  params: ['id', 'name', 'role', 'phone_number', 'status'],
                },
              },
            ],
          },
        ]}
        datas={staffListItems}
        userRole={userRole}
      />
      {userRole === 'master' &&
        <ContentButtonForm>
          <ContentButton onClick={() => handleModal('create', '', '', '', '', '')}>
            <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
            <span>스태프 생성</span>
          </ContentButton>
        </ContentButtonForm>
      }
    </Fragment>
  );
};

export default StaffList;