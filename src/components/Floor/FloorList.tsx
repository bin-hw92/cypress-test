import React, { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Filter from '../Commons/Filter';
import Table from '../Commons/Table';
import { dateFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { FloorListProps } from '../../types/floor';

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

const FloorList = ({
    floorListItems,
    buildingListItems,
    filterItem,
    userRole,
    handleFilter,
    handleinitFilter,
    handleFloorDetail,
    handleModal,
}:FloorListProps) => {

  return (
    <Fragment>
        <ContentTitle>
          <Filter
            columns={[
              {
                key: 'buildingId',
                type: 'select',
                size: 'xlg',
                placeholder: '빌딩이름',
                value: filterItem.buildingId,
                action: handleFilter,
                selectItems: buildingListItems? buildingListItems : '',
                selectItemKey: 'name',
                selectItemValue: 'id',
              },
            ]}
            init={handleinitFilter}
          />
        </ContentTitle>
        {userRole === 'master'? (
          <ContentTopButtonForm>
            <ContentButton onClick={() => handleModal('create', '', '')} disabled={!filterItem.buildingId && (buildingListItems !== null && !buildingListItems.length)}>
              <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
              <span>층 생성</span>
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
                func: handleFloorDetail,
                params: ['building_id', 'id'],
              },
            },
            {
              key: 'name',
              text: '층이름',
              width: '22%',
            },
            {
              key: 'building_name',
              text: '빌딩',
              width: '25%',
            },
            {
              key: 'room_counts',
              text: '객실 갯수',
              width: '20%',
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
                  text: '층 수정',
                  action: {
                    func: (floorId:string) => handleModal('update', floorId, ''),
                    params: ['id'],
                  },
                },
                {
                  text: '층 삭제',
                  // disabled: {
                  //   func: (status) => status === 'installed',
                  //   params: ['status'],
                  // },
                  action: {
                    func: (floorId:string, floorName:string) => handleModal('delete', floorId, floorName),
                    params: ['id', 'name'],
                  },
                },
              ],
            },
          ]}
          datas={floorListItems}
          userRole={userRole}
        />
        {userRole === 'master' &&
          <ContentButtonForm>
            <ContentButton onClick={() => handleModal('create', '', '')} disabled={!filterItem.buildingId && (buildingListItems !== null && !buildingListItems.length)}>
              <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
              <span>층 생성</span>
            </ContentButton>
          </ContentButtonForm>
        }
    </Fragment>
  );
};

export default FloorList;