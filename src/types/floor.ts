import { ChangeEvent } from 'react';
import { listFloorApi } from '../api/floor';
import { listBuildingApi } from '../api/building';

// initial state - 리덕스 floor.ts
export interface FloorState {
    floor: {
        name: string,
        buildingName? : string,
        createdAt? : Date|null,
        updatedAt? : Date|null,
    },
    floorCreateSuccess: boolean,
    floorUpdateSuccess: boolean,
    floorDeleteSuccess: boolean,
    floorCreateError: any|null,
    floorUpdateError: any|null,
    floorDeleteError: any|null,
}
// initial state - 리덕스 floorList.ts
export interface floorListState {
    floorListTotal: number,
    floorListItems: listFloorApi[]|null,
    currentPageNumber: number,
    paginationItem: {
      offset: number,
      limit: number,
    },
    filterItem: {
        buildingId: string,
    },
    floorListError: any|null,
    detailField: {
        floorId: string,
        buildingId: string,
    }
}

// API, Redux Props
export type listFloorProps = {
    hotelId?: string,
    buildingId?: string,
    offset?: number,
    limit?: number,
    pagination?: boolean,
}
export type listFloorDetailProps = {
    detailField: {
        buildingId: string,
        floorId: string,
    }
}
export type floorIdProps = {
    buildingId: string,
    floorId: string,
}
//api 보낼 때 필요한 create, update용 Props 값
export type PostFloorProps = {
    floorId?: string,
    buildingId: string,
    name: string,
}

/* Conteiner Props */
export type FloorListContainerProps = {
    isOpen: boolean,
    floorView: string,
    handleViewChange: (flag:string, type:string) => void,
}
export type FloorCreateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    buildingId: string,
}
export type FloorUpdateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    buildingId: string,
    floorId: string,
}
export type FloorDeleteContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    buildingId: string,
    floorId: string,
    floorName: string,
}
export type FloorDetailContainerProps = {
    isOpen: boolean,
    listFloor: () => void,
    handleViewChange: (flag:string, view:string) => void,
}

/* Component Props */
export type FloorListProps = {
    floorListItems: listFloorApi[] | null,
    buildingListItems: listBuildingApi[] | null,
    filterItem: floorListState['filterItem'],
    userRole: string,
    handleFilter: (targetItem: any, isDebounce: boolean) => void,
    handleinitFilter: () => void,
    handleFloorDetail: (buildingId:string, floorId:string) => void,
    handleModal:  (modalFlag: string, buildingId: string, buildingName: string) => void,
}
export type FloorCreateProps = { 
    floorItem: FloorState['floor'],
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleCreateFloor: () => void,
    toggle: () => void,
}
export type FloorUpdateProps = {
    floorItem: FloorState['floor'],
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleUpdateFloor: () => void,
    toggle: () => void,
}
export type FloorDeleteProps = {
    floorName: string,
    handleDeleteFloor: () => void,
    toggle: () => void,
}
export type FloorDetailProps = {
    floorItem: FloorState['floor'],
    userRole: string,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleUpdateFloor: () => void,
    handleSelectFloor: () => void,
    handleModal: () => void,
    handleGoBack: () => void,
}