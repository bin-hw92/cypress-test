import React, { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Table from '../Commons/Table';
import { dateFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { NotifyChannelListProps } from '../../types/notifyChannel';

/* styled */
const ContentTitle2 = styled.div`
  display: flex;
  padding: 0.625rem 1.875rem;
  margin-left: -1.875rem;
  margin-bottom: 0.625rem;
  width: 100%;
  font-weight: bold;
  position: relative;
  height: 2rem;
  background: #ffffff;

  h1,
  h2 {
    cursor: default;
    margin: 0;
    line-height: 2rem;
  }
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

const NotifyChannelList = ({
  notifyChannelListItems,
  userRole,
  handleModal,
}:NotifyChannelListProps) => {

  return (
    <Fragment>
      <ContentTitle2>
        <h1>알림 채널 목록</h1>
      </ContentTitle2>
        {userRole === 'master'? (
          <ContentButtonForm>
            <ContentButton onClick={() => handleModal('create', '')}>
              <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
              <span>채널 생성</span>
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
              func: (channelId:string) => handleModal('detail', channelId),
              params: ['id'],
            },
          },
          {
            key: 'id',
            text: 'ID',
            width: '10%',
          },
          {
            key: 'name',
            text: '이름',
            width: '24%',
          },
          {
            key: 'type',
            text: '타입',
            width: '20%',
          },
          {
            key: 'hotel_count',
            text: '단지 갯수',
            width: '18%',
          },
          {
            key: 'created_at',
            text: '생성일자',
            width: '20%',
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
                text: '채널 수정',
                action: {
                  func: (channelId:string) => handleModal('update', channelId),
                  params: ['id'],
                },
              },
              {
                text: '채널 삭제',
                action: {
                  func: (channelId:string) => handleModal('delete', channelId),
                  params: ['id', 'desc'],
                },
              },
            ],
          },
        ]}
        datas={notifyChannelListItems}
        userRole={userRole}
      />
      {userRole === 'master' && 
        <ContentButtonForm>
          <ContentButton onClick={() => handleModal('create', '')}>
            <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
            <span>채널 생성</span>
          </ContentButton>
        </ContentButtonForm>
      }
    </Fragment>
  );
};

export default NotifyChannelList;