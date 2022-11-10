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
              <FontAwesomeIcon icon={faArrowLeft} style={{paddingRight:'3px'}}/><span>객실 목록으로</span>
            </button>
          </div>
        </FormCardTitle>
        <Table
          columns={[
            {
              key: 'name',
              text: '이름',
              width: '15%',
            },
            {
              key: 'status',
              text: '상태',
              width: '6%',
              formatter: {
                func: keytagStatusFormatter,
                params: ['status'],
              },
            },
            {
              key: 'delay_ms',
              text: '딜레이 설정',
              width: '6%',
            },
            {
              key: 'keytag_op_mode',
              text: '동작 모드',
              width: '12%',
              formatter: {
                func: keytagModeFormatter,
                params: ['keytag_op_mode'],
              },
            },
            {
              key: 'enter_alarm_count',
              text: '입실 후 반복 횟수',
              width: '8%',
            },
            {
              key: 'exit_alarm_count',
              text: '퇴실 후 반복 횟수',
              width: '8%',
            },
            {
              key: 'language_type',
              text: '언어 설정',
              width: '10%',
              formatter: {
                func: languageTypeFormatter,
                params: ['language_type'],
              },
            },
            {
              key: 'created_at',
              text: '생성일자',
              width: '10%',
              formatter: {
                func: dateFormatter,
                params: ['created_at'],
              },
            },
            {
              key: 'updated_at',
              text: '수정일자',
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
                  text: '키택 수정',
                  action: {
                    func: (keytagId:string,) => handleModal('update', keytagId, '', ''),
                    params: ['id'],
                  },
                },
                {
                  text: '키택 삭제',
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
            <span>키택 생성</span>
          </ContentButton>
        </ContentButtonForm>
      }
    </Fragment>
  );
};

export default KeytagList;