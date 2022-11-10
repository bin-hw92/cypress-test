import React, { Fragment } from 'react';
import _ from 'lodash';
import Filter from '../Commons/Filter';
import Table from '../Commons/Table';
import { doorlockStatusFormatter, doorlockBatteryFormatter, dateFormatter } from '../../lib/formatter';
import doorlockFormatter from './DoorlockFormatter';
import { doorlockFormatterFwTypeProps } from '../../types/formatter';
import styled from 'styled-components';
import { DoorlockListProps } from '../../types/doorlock';

/* styled */
const ContentTitle = styled.div`
  position: absolute;
  top: -3.1875rem;
  right: 0;
  height: 2rem;
`;
const BlankWrap = styled.div`
  width: 100%;
  height: 1.25rem;
`;

const DoorlockList = ({
  doorlockListItems,
  buildingListItems,
  floorListItems,
  filterItem,
  sortItem,
  userRole,
  hotelRole,
  handleFilter,
  handleinitFilter,
  handleDoorlockDetail,
  handleModal,
  changeSort,
}:DoorlockListProps) => {
  /* const statusItems = [
    { key: '미설치', value: 'created' },
    { key: '설치됨', value: 'installed' },
  ]; */

  return (
    <Fragment>
        <ContentTitle>
          <Filter
            columns={[
              {
                key: 'buildingId',
                type: 'select',
                size: 'xlg',
                placeholder: '빌딩',
                value: filterItem.buildingId,
                action: handleFilter,
                selectItems: buildingListItems? buildingListItems : '',
                selectItemKey: 'name',
                selectItemValue: 'id',
                isRemoveButton: true,
              },
              {
                key: 'floorId',
                type: 'select',
                size: 'xlg',
                placeholder: '층',
                value: filterItem.floorId,
                action: handleFilter,
                selectItems: floorListItems? floorListItems : '',
                selectItemKey: 'name',
                selectItemValue: 'id',
                isRemoveButton: true,
              },
              {
                key: 'name',
                size: 'xlg',
                placeholder: '도어락이름',
                value: filterItem.name,
                action: handleFilter,
              },
              /* {
                key: 'serial',
                size: 'xlg',
                placeholder: '시리얼번호',
                value: filterItem.serial,
                action: handleFilter,
              }, */
              {
                key: 'type',
                type: 'select',
                size: 'xlg',
                placeholder: '타입',
                value: filterItem.type,
                action: handleFilter,
                selectItems: doorlockFormatter.typeItems,
                selectItemKey: 'key',
                selectItemValue: 'value',
                isRemoveButton: true,
              },
              /* {
                key: 'status',
                type: 'select',
                size: 'xlg',
                placeholder: '상태',
                value: filterItem.status,
                action: handleFilter,
                selectItems: statusItems,
                selectItemKey: 'key',
                selectItemValue: 'value',
                isRemoveButton: true,
              }, */
              {
                key: 'fwType',
                type: 'select',
                size: 'xlg',
                placeholder: '모델명',
                value: filterItem.fwType,
                action: handleFilter,
                selectItems: doorlockFormatter.fwTypeItems,
                selectItemKey: 'key',
                selectItemValue: 'value',
                isRemoveButton: true,
              },
              {
                key: 'fwVersion',
                size: 'xlg',
                placeholder: 'FW버전',
                value: filterItem.fwVersion,
                action: handleFilter,
              },
            ]}
            init={handleinitFilter}
          />
        </ContentTitle>
        <BlankWrap></BlankWrap>
        <Table
          columns={[
            {
              key: 'view',
              text: '상세보기',
              width: '5%',
              moveToPage: {
                func: handleDoorlockDetail,
                params: ['id'],
              },
            },
            {
              key: 'name',
              text: '도어락이름',
              width: '11%',
              sort: {
                func: changeSort,
                params: 'name',
                selected: sortItem.sort === 'name',
                order: sortItem.sort === 'name' ? sortItem.order : 'desc',
              }
            },
            {
              key: 'type',
              text: '타입',
              width: '8%',
              formatter: {
                func: doorlockFormatter.type,
                params: ['type'],
              },
            },
            {
              key: 'dl_serial',
              text: '시리얼번호',
              width: '8%',
            },
            {
              key: 'building_name',
              text: '빌딩',
              width: '13%',
              sort: {
                func: changeSort,
                params: 'building_name',
                selected: sortItem.sort === 'building_name',
                order: sortItem.sort === 'building_name' ? sortItem.order : 'desc',
              },
            },
            {
              key: 'floor_name',
              text: '층',
              width: '7%',
              sort: {
                func: changeSort,
                params: 'floor_name',
                selected: sortItem.sort === 'floor_name',
                order: sortItem.sort === 'floor_name' ? sortItem.order : 'desc',
              },
            },
            {
              key: 'status',
              text: '상태',
              width: '6%',
              formatter: {
                func: doorlockStatusFormatter,
                params: ['status'],
              },
              sort: {
                func: changeSort,
                params: 'status',
                selected: sortItem.sort === 'status',
                order: sortItem.sort === 'status' ? sortItem.order : 'desc',
              },
            },
            {
              key: 'fw_type',
              text: '모델명',
              width: '10%',
              formatter: {
                func: (fwType:doorlockFormatterFwTypeProps) => fwType ? doorlockFormatter.fwType(fwType) : '-',
                params: ['fw_type'],
              },
            },
            {
              key: 'fw_version',
              text: 'FW버전',
              width: '7%',
            },
            {
              key: 'fw_battery',
              text: '배터리상태',
              width: '7%',
              formatter: {
                func: (fwBattery:number) => fwBattery || _.isNumber(fwBattery) ? doorlockBatteryFormatter(fwBattery) : '-',
                params: ['fw_battery'],
              },
              sort: {
                func: changeSort,
                params: 'fw_battery',
                selected: sortItem.sort === 'fw_battery',
                order: sortItem.sort === 'fw_battery' ? sortItem.order : 'desc',
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
              sort: {
                func: changeSort,
                params: 'created_at',
                selected: sortItem.sort === 'created_at',
                order: sortItem.sort === 'created_at' ? sortItem.order : 'desc',
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
              sort: {
                func: changeSort,
                params: 'updated_at',
                selected: sortItem.sort === 'updated_at',
                order: sortItem.sort === 'updated_at' ? sortItem.order : 'desc',
              },
            },
            {
              key: 'button',
              text: '',
              width: '5%',
              items: [
                {
                  text: '설치 삭제',
                  disabled: {
                    func: (status:string) => status !== 'installed' || hotelRole === 'manager',
                    params: ['status'],
                  },
                  action: {
                    func: (doorlockId:string, status: string, doorlockName:string ) => handleModal('delete', doorlockId, status, doorlockName),
                    params: ['id', 'status', 'name'],
                  },
                },
              ],
            },
          ]}
          datas={doorlockListItems}
          userRole={userRole}
        />
    </Fragment>
  );
};

export default DoorlockList;