import { listBuildingApi } from '../api/building';
import { listDoorlockApi, listDoorlockBatteryApi, listDoorlockLogApi } from '../api/doorlock';
import { listFloorApi } from '../api/floor';
import { doorlockFormatterFwTypeProps, doorlockFormatterTypeProps } from './formatter';

// initial state - 리덕스 doorlock.ts
export interface DoorlockState {
    doorlock: {
        name: string,
        type: doorlockFormatterTypeProps|null,
        serial: string,
        buildingName: string,
        floorName: string,
        status:  "created" | "installed" | null,
        fwVersion: string,
        fwBattery: string,
        fwType: doorlockFormatterFwTypeProps|null,
        createdAt: Date|null,
        updatedAt: Date|null,
    },
    doorlockUninstallSuccess: boolean,
    doorlockUninstallError: any|null,
    doorlockUpdateError: any|null,
}

// initial state - 리덕스 doorlockList.ts
export interface doorlockListState {
    doorlockListTotal: number,
    doorlockListItems: listDoorlockApi[]|null,
    currentPageNumber: number,
    paginationItem: {
      offset: number,
      limit: number,
    },
    sortItem: {
      sort: string,
      order: string,
    },
    filterItem: {
        buildingId: string,
        floorId: string,
        name: string,
        serial: string,
        type: string,
        status: string,
        fwType: string,
        fwVersion: string,
    },
    doorlockListError: any|null,
    detailField: {
        doorlockId: string,
    }
}
// initial state - 리덕스 doorlockAllList.ts
export interface doorlockAllListState {
    doorlockAllListTotal: number,
    doorlockAllListItems: listDoorlockApi[]|null,
    currentPageNumber: number,
    paginationItem: {
      offset: number,
      limit: number,
    },
    sortItem: {
      sort: string,
      order: string,
    },
    filterItem: {
        hotelId: string,
        selectHotelId: Object,
        buildingId: string,
        floorId: string,
        name: string,
        serial: string,
        type: string,
        status: string,
        fwType: string,
        fwVersion: string,
    },
    doorlockAllListError: any|null,
    detailField: {
        detailtype: 'detail'|'battery'|'log', //전체 도어락 상세화면 탭용
    }
}

// initial state - 리덕스 doorlockBatteryList.ts
export interface DoorlockBatteryListState {
    doorlockBatteryListItems: listDoorlockBatteryApi[]|null, //배터리 목록
    filterItem: {
        startAt: Date|string,
        endAt: Date|string,
    },
    doorlockBatteryListSuccess: boolean,
    doorlockBatteryListError: any|null,
}

// initial state - 리덕스 doorlockLogList.ts
export interface DoorlockLogListState {
    doorlockLogListTotal: number,
    doorlockLogListItems: listDoorlockLogApi[]|null,
    currentPageNumber: number,
    paginationItem: {
      offset: number,
      limit: number,
    },
    sortItem: {
      sort: string,
      order: string,
    },
    filterItem: {
        logType: string,
    },
    doorlockLogListSuccess: boolean,
    doorlockLogListError: any|null,
}

// API, Redux Props
export type listDoorlockProps = {
    buildingId?: string,
    floorId?: string, 
    name: string, 
    serial: string, 
    type: string, 
    status: string, 
    fwType: string, 
    fwVersion: string, 
    sort: string, 
    order: string,
    offset?: number,
    limit?: number,
    pagination?: boolean,
}

export type listDoorlockAllProps = {
    hotelId?: string,
    buildingId?: string,
    floorId?: string, 
    name: string, 
    serial: string, 
    type: string, 
    status: string, 
    fwType: string, 
    fwVersion: string, 
    sort: string, 
    order: string,
    offset?: number,
    limit?: number,
    pagination?: boolean,
}
 
export type listDoorlockLogProps = {
    hotelId?: string,
    doorlockId: string,
    logType: string,
    sort: string, 
    order: string,
    offset?: number,
    limit?: number,
    pagination?: boolean,
}
 
export type listDoorlockBatteryLogProps = {
    hotelId?: string,
    doorlockId: string, 
    startAt: Date|string, 
    endAt: Date|string,
}

export type doorlockIdProps = {
    hotelId?: string,
    doorlockId: string
}

/* Conteiner Props */
export type DoorlockListContainerProps = {
  isOpen: boolean,
  doorlockView: string,
  handleViewChange: (flag:string, type:string) => void,
}
export type DoorlockUninstallContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    doorlockId: string,
    doorlockName: string,
    hotelId?: string,
}
export type DoorlockDetailContainerProps = {
    isOpen: boolean,
    doorlockView: string,
    handleViewChange: (flag:string, view:string) => void,
}
export type DoorlockBatteryLogContainerProps = {
    isOpen: boolean,
    doorlockId: string,
    hotelId?: string,
    handleGoBack: () => void,
    handleErrorApi: (type: string, Error: any) => void,
}
export type DoorlockLogListContainerProps = {
    isOpen: boolean,
    doorlockId: string,
    hotelId?: string,
    handleGoBack: () => void,
    handleErrorApi: (type: string, Error: any) => void,
}

/* Component Props */
export type DoorlockListProps = {
    doorlockListItems: listDoorlockApi[]|null,
    buildingListItems: listBuildingApi[]|null,
    floorListItems: listFloorApi[]|null,
    filterItem: doorlockListState['filterItem'],
    sortItem: doorlockListState['sortItem'],
    userRole: string,
    hotelRole: string,
    handleFilter: (targetItem: any, isDebounce: boolean) => void,
    handleinitFilter: () => void,
    handleDoorlockDetail: (doorlockId: string) => void,
    handleModal:  (modalFlag: string, buildingId: string, buildingName: string, status: string) => void,
    changeSort: (sort: string) => void,
}
export type DoorlockAllListProps = {
    doorlockListItems: listDoorlockApi[]|null,
    selectedHotelListItems: any[]|null,
    buildingListItems: listBuildingApi[]|null,
    floorListItems: listFloorApi[]|null,
    filterItem: doorlockAllListState['filterItem'],
    sortItem: doorlockAllListState['sortItem'],
    userRole: string,
    handleFilter: (targetItem: any, isDebounce: boolean) => void,
    handleFilterHotel: (targetItem: any, isDebounce: boolean) => void,
    handleinitFilter: () => void,
    handleDoorlockDetail: (doorlockId: string) => void,
    handleModal:  (modalFlag: string, buildingId: string, buildingName: string, status: string) => void,
    changeSort: (sort: string) => void,
}
export type DoorlockUninstallProps = {
    doorlockName: string,
    handleUninstallDoorlock: () => void,
    toggle: () => void,
}
export type DoorlockDetailProps = {
    doorlockItem: DoorlockState['doorlock'],
    userRole: string,
    hotelRole: string,
    handleSelectDoorlockUninstall: () => void,
    handleGoBack: () => void,
}
export type DoorlockBatteryLogListProps = {
    doorlockBatteryListItems: listDoorlockBatteryApi[]|null,
    filterItem: DoorlockBatteryListState['filterItem'],
    handleGoBack: () => void,
    handleFilter: (targetItem: any, isDebounce: boolean) => void,
    handleinitFilter: () => void,
}
export type DoorlockLogListProps = {
    doorlockLogListItems: listDoorlockLogApi[]|null,
    filterItem: DoorlockLogListState['filterItem'],
    sortItem: DoorlockLogListState['sortItem'],
    handleGoBack: () => void,
    handleFilter: (targetItem: any, isDebounce: boolean) => void,
    handleinitFilter: () => void,
    changeSort: (sort:string) => void,
}