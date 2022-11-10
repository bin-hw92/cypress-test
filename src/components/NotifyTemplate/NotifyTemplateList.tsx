import React, { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Filter from '../Commons/Filter';
import Table from '../Commons/Table';
import { dateFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { NotifyTemplateListProps } from '../../types/notifyTemplate';

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
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 70%), 
  0 2px 4px -2px rgb(0 0 0 / 50%);

  :hover {
    background-color: #4c9ffe;
  }
  :disabled {
    background-color: #949494;
    cursor: default;
  }
`;

const NotifyTemplateList = ({
  notifyTemplateListItems,
  filterItem,
  userRole,
  handleFilter,
  handleinitFilter,
  handleModal,
  handleModalPreview,
  handleTemplateDetail,
}:NotifyTemplateListProps) => {

  return (
    <Fragment>
        <ContentTitle>
          <Filter
            columns={[
              {
                key: 'template',
                size: 'lg',
                placeholder: '템플릿',
                value: filterItem.template,
                action: handleFilter,
              },
              {
                key: 'templateCode',
                size: 'lg',
                placeholder: '템플릿코드',
                value: filterItem.templateCode,
                action: handleFilter,
              },
              {
                key: 'templateAlt',
                size: 'lg',
                placeholder: '대체 템플릿',
                value: filterItem.templateAlt,
                action: handleFilter,
              },
              {
                key: 'desc',
                size: 'lg',
                placeholder: '설명',
                value: filterItem.desc,
                action: handleFilter,
              },
            ]}
            init={handleinitFilter}
          />
        </ContentTitle>
        {userRole === 'master'? (
          <ContentTopButtonForm>
            <ContentButton onClick={() => handleModal('create', '', '')}>
              <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
              <span>템플릿 생성</span>
            </ContentButton>
          </ContentTopButtonForm>
        ) : (<div style={{paddingTop: '1.25rem'}}></div>)
        }
        <Table
          columns={[
            {
              key: 'view',
              text: '상세보기',
              width: '8%',
              moveToPage: {
                func: (templateId:string) => handleTemplateDetail(templateId),
                params: ['id'],
              },
            },
            {
              key: 'id',
              text: 'ID',
              width: '5%',
            },
            {
              key: 'desc',
              text: '설명',
              width: '12%',
            },
            {
              key: 'template',
              text: '템플릿',
              width: '16%',
            },
            {
              key: 'template_code',
              text: '템플릿코드',
              width: '8%',
            },
            {
              key: 'template_alt',
              text: '대체 템플릿',
              width: '16%',
            },
            {
              key: 'date_format',
              text: '날짜형식',
              width: '9%',
            },
            {
              key: 'locale',
              text: '언어코드',
              width: '5%',
            },
            {
              key: 'is_lms',
              text: 'LMS 사용',
              width: '5%',
              formatter: {
                func: (isLMS:boolean) => isLMS === true ? 'O' : 'X',
                params: ['is_lms'],
              },
            },
            {
              key: 'hotel_template_count',
              text: '호텔 수',
              width: '5%',
            },
            {
              key: 'created_at',
              text: '생성일자',
              width: '11%',
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
                    func: (template:string, templateAlt:string, dateFormat:string, locale:string) => handleModalPreview(template, templateAlt, dateFormat, locale),
                    params: ['template', 'template_alt', 'date_format', 'locale'],
                  },
                },
                {
                  text: '템플릿 수정',
                  action: {
                    func: (templateId:string) => handleModal('update', templateId, ''),
                    params: ['id'],
                  },
                },
                {
                  text: '템플릿 삭제',
                  action: {
                    func: (templateId:string, desc:string) => handleModal('delete', templateId, desc),
                    params: ['id', 'desc'],
                  },
                },
              ],
            },
          ]}
          datas={notifyTemplateListItems}
          userRole={userRole}
        />
        {userRole === 'master' &&
          <ContentButtonForm>
            <ContentButton onClick={() => handleModal('create', '', '')}>
              <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
              <span>템플릿 생성</span>
            </ContentButton>
          </ContentButtonForm>
        }
    </Fragment>
  );
};

export default NotifyTemplateList;