import React, { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Table from '../Commons/Table';
import { dateFormatter, pincodeTypeFormatter } from '../../lib/formatter';
import { pincodeTypeStateProps } from '../../types/formatter';
import styled from 'styled-components';
import { UserkeyListProps } from '../../types/userkey';
import { useNamePhoneTableChange, useOrigin } from '../../lib/useInfoChange';

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

const UserkeyList = ({
  userkeyListItems,
  pincodeVersion,
  userRole,
  handleGoBack,
  handleKeyIssue,
  handleSelectMobilekeyDelete,
  handleSelectSMSSend,
}:UserkeyListProps) => {

  return (
    <Fragment>
      <FormCardDetail>
        <FormCardTitle>
          <div className='form-item-cancel'>
            <button className='btn-item-close bgc-unset bsd-unset' onClick={handleGoBack}>
              <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>?????? ????????????</span>
            </button>
          </div>
        </FormCardTitle>
        <Table
          columns={[
            {
              key: 'user_name',
              text: '????????????',
              width: '18%',
              formatter: {
                func: userRole === 'master'? useOrigin : useNamePhoneTableChange,
                params: ['user_name', 'phone_number'],
              },
            },
            {
              key: 'checkin_at',
              text: '????????????',
              width: '12%',
              formatter: {
                func: dateFormatter,
                params: ['checkin_at'],
              },
            },
            {
              key: 'checkout_at',
              text: '????????????',
              width: '12%',
              formatter: {
                func: dateFormatter,
                params: ['checkout_at'],
              },
            },
            {
              key: 'phone_number',
              text: '?????????',
              width: '12%',
              formatter: {
                func: (cardNo:string, pincode:string, pincodeType:pincodeTypeStateProps) => cardNo ? '?????????' : pincode ? `?????????${pincodeVersion !== 'V4'? `(${pincodeTypeFormatter(pincodeType)})` : ''}` : '????????????',
                params: ['card_no', 'pincode', 'type'],
              },
            },
            {
              key: 'card_no',
              text: '????????????',
              width: '7%',
            },
            {
              key: 'exchangekey',
              text: '????????????',
              width: '7%',
              formatter: {
                func: (exchangekey:string) => userRole === 'master'? exchangekey : '-',
                params: ['exchangekey'],
              },
            },
            {
              key: 'pincode',
              text: '?????????',
              width: '7%',
              formatter: {
                func: (pincode:string) => userRole === 'master'? pincode : '-',
                params: ['pincode'],
              },
            },
            {
              key: 'seq_num',
              text: '?????????',
              width: '8%',
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
                  text: '??? ??????',
                  disabled: {
                    func: (pincode:string) => pincode,
                    params: ['pincode'],
                  },
                  action: {
                    func: handleSelectMobilekeyDelete,
                    params: ['user_id', 'pincode'],
                  },
                },
                {
                  text: 'SMS ?????????',
                  disabled: {
                    func: (pincode:string, exchangekey:string) => !pincode && !exchangekey,
                    params: ['pincode', 'exchangekey'],
                  },
                  action: {
                    func: handleSelectSMSSend,
                    params: ['id','pincode','user_id', 'exchangekey',],
                  },
                },
              ],
            },
          ]}
          datas={userkeyListItems}
          userRole={userRole}
        />
      </FormCardDetail>
      {userRole === 'master' &&
        <ContentButtonForm>
          <ContentButton onClick={handleKeyIssue}>
            <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
            <span>??? ??????</span>
          </ContentButton>
        </ContentButtonForm>
      }
    </Fragment>
  );
};

export default UserkeyList;