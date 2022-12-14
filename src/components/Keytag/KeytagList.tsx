import React, { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Table from '../Commons/Table';
import { dateFormatter, keytagModeFormatter, keytagStatusFormatter, languageTypeFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { KeytagListProps } from '../../types/keytag';

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
  float: right;
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

const KeytagList = ({
  keytagListItems,
  userRole,
  handleModal,
  handleGoBack,
}:KeytagListProps) => {

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
              key: 'name',
              text: '??????',
              width: '15%',
            },
            {
              key: 'status',
              text: '??????',
              width: '6%',
              formatter: {
                func: keytagStatusFormatter,
                params: ['status'],
              },
            },
            {
              key: 'delay_ms',
              text: '????????? ??????',
              width: '6%',
            },
            {
              key: 'keytag_op_mode',
              text: '?????? ??????',
              width: '12%',
              formatter: {
                func: keytagModeFormatter,
                params: ['keytag_op_mode'],
              },
            },
            {
              key: 'enter_alarm_count',
              text: '?????? ??? ?????? ??????',
              width: '8%',
            },
            {
              key: 'exit_alarm_count',
              text: '?????? ??? ?????? ??????',
              width: '8%',
            },
            {
              key: 'language_type',
              text: '?????? ??????',
              width: '10%',
              formatter: {
                func: languageTypeFormatter,
                params: ['language_type'],
              },
            },
            {
              key: 'created_at',
              text: '????????????',
              width: '10%',
              formatter: {
                func: dateFormatter,
                params: ['created_at'],
              },
            },
            {
              key: 'updated_at',
              text: '????????????',
              width: '10%',
              formatter: {
                func: dateFormatter,
                params: ['updated_at'],
              },
            },
            {
              key: 'button',
              text: '',
              width: '5%',
              items: [
                {
                  text: '?????? ??????',
                  action: {
                    func: (keytagId:string,) => handleModal('update', keytagId, '', ''),
                    params: ['id'],
                  },
                },
                {
                  text: '?????? ??????',
                  disabled: {
                    func: (status:string) => status === 'installed',
                    params: ['status'],
                  },
                  action: {
                    func:  (keytagId:string, keytagName:string, status:string) => handleModal('delete', keytagId, keytagName, status),
                    params: ['id', 'name', 'status'],
                  },
                },
              ],
            }
          ]}
          datas={keytagListItems}
          userRole={userRole}
        />
      </FormCardDetail>
      {userRole === 'master' &&
        <ContentButtonForm>
          <ContentButton onClick={() => handleModal('create', '', '', '')}>
            <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
            <span>?????? ??????</span>
          </ContentButton>
        </ContentButtonForm>
      }
    </Fragment>
  );
};

export default KeytagList;