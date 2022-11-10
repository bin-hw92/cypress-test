import React, { Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Filter from '../Commons/Filter';
import Table from '../Commons/Table';
import { doorlockStatusFormatter, dateFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { RoomListProps } from '../../types/room';

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

const RoomList = ({
  roomListItems,
  buildingListItems,
  filterItem,
  userRole,
  handleFilter,
  handleinitFilter,
  handleRoomDetail,
  handleModal,
}:RoomListProps) => {

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
            <ContentButton onClick={() => handleModal('create', '', '', '', '')} disabled={!filterItem.buildingId &&  (buildingListItems !== null && !buildingListItems.length)}>
              <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
              <span>객실 생성</span>
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
                func: handleRoomDetail,
                params: ['building_id', 'floor_id', 'id'],
              },
            },
            {
              key: 'name',
              text: '객실이름',
              width: '20%',
              // width: '11%',
            },
            {
              key: 'building_name',
              text: '빌딩',
              width: '18%',
            },
            {
              key: 'floor_name',
              text: '층',
              width: '16%',
            },
            {
              key: 'status',
              text: '객실상태',
              width: '9%',
              // width: '7%',
              formatter: {
                func: doorlockStatusFormatter,
                params: ['status'],
              },
            },
            {
              key: 'rms_id',
              text: 'RMS ID',
              width: '13%',
            },
            {
              key: 'created_at',
              text: '생성일자',
              width: '20%',
              // width: '12%',
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
                  text: '객실 수정',
                  action: {
                    func: (roomId:string, floorId:string) => handleModal('update', roomId, floorId, '', ''),
                    params: ['id', 'floor_id'],
                  },
                },
                {
                  text: '객실 삭제',
                  disabled: {
                    func: (status:string) => status === 'installed',
                    params: ['status'],
                  },
                  action: {
                    func:  (roomId:string, floorId:string, roomName:string, status:string) => handleModal('delete', roomId, floorId, roomName, status),
                    params: ['id', 'floor_id', 'name', 'status'],
                  },
                },
              ],
            },
          ]}
          datas={roomListItems}
          userRole={userRole}
        />
        {userRole === 'master' &&
          <ContentButtonForm>
            <ContentButton onClick={() => handleModal('create', '', '', '', '')} disabled={!filterItem.buildingId &&  (buildingListItems !== null && !buildingListItems.length)}>
              <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
              <span>객실 생성</span>
            </ContentButton>
          </ContentButtonForm>
        }
    </Fragment>
  );
};

export default RoomList;