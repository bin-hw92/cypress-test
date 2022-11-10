import React, { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Filter from '../Commons/Filter';
import Table from '../Commons/Table';
import { dateFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { HotelNotifyTemplateListProps } from '../../types/hotelnotify';

/* styled */
const ContentTitle = styled.div`
    position: absolute;
    top: -3.1875rem;
    right: 0;
    height: 2rem;
`;
const ContentButtonForm = styled.div`
  float: right;
  margin-top: 1.25rem;

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
const ContentTopButtonForm = styled.div`
  float: right;
  margin: 1.25rem auto;

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

const HotelNotifyTemplateList = ({
  hotelNotifyTemplateListItems,
  hotelNotifyTemplateContextItems,
  filterItem,
  userRole,
  handleFilter,
  handleinitFilter,
  handleModal,
  handleModalPreview,
  handleNotifyContextFormatter,
}:HotelNotifyTemplateListProps) => {

  return (
    <Fragment>
        <ContentTitle>
          <Filter
            columns={[
              {
                key: 'notifyContext',
                type: 'select',
                size: 'xlg',
                placeholder: '템플릿타입',
                value: filterItem.notifyContext,
                action: handleFilter,
                selectItems: hotelNotifyTemplateContextItems? hotelNotifyTemplateContextItems : '',
                selectItemKey: 'display',
                selectItemValue: 'code',
                isRemoveButton: true,
              },
            ]}
            init={handleinitFilter}
          />
        </ContentTitle>
        {userRole === 'master'? (
          <ContentTopButtonForm>
            <ContentButton onClick={() => handleModal('create', '')}>
              <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
              <span>단지 템플릿 생성</span>
            </ContentButton>
          </ContentTopButtonForm>
        ): (<div style={{paddingTop: '1.25rem'}}></div>)
        }
        <Table
          columns={[
            {
              key: 'id',
              text: 'ID',
              width: '5%',
            },
            {
              key: `hotel['name']`,
              text: '단지이름',
              width: '12%',
            },
            {
              key: 'notify_context',
              text: '템플릿타입',
              width: '12%',
              formatter: {
                func: handleNotifyContextFormatter,
                params: ['notify_context'],
              }
            },
            {
              key: 'notify_template_id',
              text: '템플릿ID',
              width: '6%',
            },
            {
              key: `notify_template['template']`,
              text: '템플릿',
              width: '16%',
            },
            {
              key: `notify_template['template_code']`,
              text: '템플릿코드',
              width: '10%',
            },
            {
              key: `notify_template['locale']`,
              text: '언어코드',
              width: '6%',
            },
            {
              key: `notify_template['template_alt']`,
              text: '대체 템플릿',
              width: '16%',
            },
            {
              key: `notify_template['is_lms']`,
              text: 'LMS 사용',
              width: '6%',
              formatter: {
                func: (isLMS:boolean) => isLMS === true ? 'O' : 'X',
                params: [`notify_template['is_lms']`],
              },
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
                  text: '템플릿 미리보기',
                  pass: 'Y',
                  action: {
                    func: handleModalPreview,
                    params: [`notify_template['template']`, `notify_template['template_alt']`, `notify_template['date_format']`, `notify_template['locale']`],
                  },
                },
                {
                  text: '단지 템플릿 삭제',
                  action: {
                    func: (hotelTemplateId:string) => handleModal('delete', hotelTemplateId),
                    params: ['id'],
                  },
                },
              ],
            },
          ]}
          datas={hotelNotifyTemplateListItems}
          userRole={userRole}
        />
        {userRole === 'master' &&
          <ContentButtonForm>
            <ContentButton onClick={() => handleModal('create', '')}>
              <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
              <span>단지 템플릿 생성</span>
            </ContentButton>
          </ContentButtonForm>
        }
    </Fragment>
  );
};

export default HotelNotifyTemplateList;