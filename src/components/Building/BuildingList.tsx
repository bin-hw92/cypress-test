import React, { Fragment } from 'react';
import Filter from '../Commons/Filter';
import Table from '../Commons/Table';
import { dateFormatter } from '../../lib/formatter';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { BuildingListProps } from '../../types/building';

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

const BuildingList = ({
    buildingListItems,
    filterItem,
    userRole,
    handleFilter,
    handleinitFilter,
    handleBuildingDetail,
    handleModal,
}:BuildingListProps) => {

  return (
    <Fragment>
      <ContentTitle>
        <Filter
          columns={[
            {
              key: 'name',
              size: 'lg',
              placeholder: '빌딩이름',
              value: filterItem.name,
              action: handleFilter,
            },
          ]}
          init={handleinitFilter}
        />
      </ContentTitle>
      {userRole === 'master'? (
        <ContentTopButtonForm>
          <ContentButton onClick={() => handleModal('create','','')}>
            <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
            <span>빌딩 생성</span>
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
              func: handleBuildingDetail,
              params: ['id'],
            },
          },
          {
            key: 'name',
            text: '빌딩이름',
            width: '27%',
          },
          {
            key: 'room_counts',
            text: '객실 갯수',
            width: '20%',
          },
          {
            key: 'commonrooms',
            text: '공용도어 갯수',
            width: '20%',
            formatter: {
              func: (commonrooms:[]) => commonrooms.length,
              params: ['commonrooms'],
            },
          },
          {
            key: 'created_at',
            text: '생성일자',
            width: '25%',
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
                text: '빌딩 수정',
                action: {
                  func: (buildingId:string) => handleModal('update', buildingId, ''),
                  params: ['id'],
                },
              },
              {
                text: '빌딩 삭제',
                action: {
                  func: (buildingId:string, buildingName:string) => handleModal('delete', buildingId, buildingName),
                  params: ['id', 'name'],
                },
              },
            ],
          },
        ]}
        datas={buildingListItems}
        userRole={userRole}
      />
      {userRole === 'master' &&
        <ContentButtonForm>
          <ContentButton onClick={() => handleModal('create','','')}>
            <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
            <span>빌딩 생성</span>
          </ContentButton>
        </ContentButtonForm>
      }
    </Fragment>
  );
};

export default BuildingList;