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
              <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>????????? ????????????</span>
            </button>
          </div>
        </FormCardTitle>
        <Table
          columns={[
            {
              key: 'grantee.name',
              text: '?????????',
              width: '10%',
              formatter: {
                func: userRole === 'master'? useOrigin : useNameTableChange,
                params: ['grantee.name'],
              },
            },
            {
              key: 'grantor.name',
              text: '?????????',
              width: '10%',
              formatter: {
                func: userRole === 'master'? useOrigin : useNameTableChange,
                params: ['grantor.name'],
              },
              // grantor.id??? mf_staff_permission.id??? ????????? mf_staff.id??? ????????? ????????? ??? ??????.
              // linker: {
              //   func: (staffId) => history.push(`/staff/${staffId}`),
              //   params: ['grantor.id'],
              // },
            },
            {
              key: 'start_at',
              text: '????????????',
              width: '12%',
              formatter: {
                func: dateFormatter,
                params: ['start_at'],
              },
            },
            {
              key: 'end_at',
              text: '????????????',
              width: '12%',
              formatter: {
                func: dateFormatter,
                params: ['end_at'],
              },
            },
            {
              key: 'rooms',
              text: '??????',
              width: '9%',
              formatter: {
                func: roomsFormatter,
                params: ['rooms'],
              },
            },
            {
              key: 'type',
              text: '?????????',
              width: '8%',
              formatter: {
                func: (type:any) => staffKeyTypeFormatter(type),
                params: ['type'],
              },
            },
            {
              key: 'card_no',
              text: '????????????',
              width: '8%',
            },
            {
              key: 'exchangekey',
              text: '????????????',
              width: '8%',
            },
            {
              key: 'seq_num',
              text: '?????????',
              width: '6%',
            },
            {
              key: 'created_at',
              text: '????????????',
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
                  text: '???????????? ??????',
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
            <span>??? ??????</span>
          </ContentButton>
        </ContentButtonForm>
      }
    </Fragment>
  );
};

export default StaffkeyList;