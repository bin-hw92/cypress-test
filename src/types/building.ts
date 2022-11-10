import { ChangeEvent } from 'react';
import { changeProps } from "./commons";
import { listBuildingApi } from "../api/building";

// initial state - 리덕스 building.ts
export interface BuildingState {
    building: {
        buildingId?: string,
        name: string,
        buildingtypeId: string,
        commonrooms: any[],
        createdAt?: Date|null,
        updatedAt?: Date|null,
    },
    buildingtype: {
        id: string,
        name: string,
    }[],
    buildingCreateSuccess: boolean,
    buildingUpdateSuccess: boolean,
    buildingDeleteSuccess: boolean,
    buildingCreateError: any|null,
    buildingUpdateError: any|null,
    buildingDeleteError: any|null,
}
// initial state - 리덕스 buildingList.ts
export interface buildingListState {
    buildingListTotal: number,
    buildingListItems: listBuildingApi[]|null,
    currentPageNumber: number,
    paginationItem: {
      offset: number,
      limit: number,
    },
    filterItem: {
      name: string,
    },
    buildingListError: any|null,
    detailField:{
      buildingId: string,
    }, //detail로 이동 시 저장
}

// API, Redux Props
export type buildingIdProps = {
    buildingId: string
}
export type listBuildingProps = {
    hotelId?: string,
    name?: string,
    offset?: number,
    limit?: number,
    pagination?: boolean,
}

//api 보낼 때 필요한 create, update용 Props 값
export type PostBuildingProps = {
    name: string,
    buildingId?: string,
    buildingtypeId: string,
    commonrooms: any[],
    createdAt?: Date|null,
    updatedAt?: Date|null,
}

/* Conteiner Props */
export type BuildingListContainerProps = {
    isOpen: boolean,
    buildingView: string,
    handleViewChange: (flag:string, type:string) => void,
}
export type BuildingCreateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
}
export type BuildingUpdateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    buildingId: string,
}
export type BuildingDeleteContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    buildingId: string,
    buildingName: string,
}
export type BuildingDetailContainerProps = {
    isOpen: boolean,
    listBuilding: () => void,
    handleViewChange: (flag:string, view:string) => void,
}
/* Component Props */
export type BuildingListProps = {
    buildingListItems: listBuildingApi[] | null
    filterItem: buildingListState['filterItem'],
    userRole: string,
    handleFilter: (targetItem: any, isDebounce: boolean) => void,
    handleinitFilter: () => void,
    handleBuildingDetail: (buildingId: string) => void,
    handleModal:  (modalFlag: string, buildingId: string, buildingName: string) => void,
}
export type BuildingCreateProps = {
    buildingItem: BuildingState['building'],
    buildingTypeItem: BuildingState['buildingtype'],
    commonroomInputRef: any|null,
    handleAddCommonroom: () => void,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleRemoveCommonroom: (index:number) => void,
    handleCreateBuilding: () => void,
    toggle: () => void,
}
export type BuildingUpdateProps = {
    buildingItem: BuildingState['building'],
    buildingTypeItem: BuildingState['buildingtype'],
    commonroomInputRef: any|null,
    editableCommonroom: any|null,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleAddCommonroom: () => void,
    handleRemoveCommonroom: (index:number) => void,
    handleEditableCommonroom: (index:number) => void,
    handleChangeCommonroom: ({id, name}:changeProps) => void,
    handleUpdateBuilding: () => void,
    toggle: () => void,
}
export type BuildingDeleteProps = {
    buildingName: string,
    toggle: () => void,
    handleDeleteHotel: () => void,
}
export type BuildingDetailProps = {
    buildingItem: BuildingState['building'],
    buildingTypeItem: BuildingState['buildingtype'],
    commonroomInputRef: any|null,
    editableCommonroom: any|null,
    userRole: string,
    dateFormatter: (date:any) => string,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleAddCommonroom: () => void,
    handleRemoveCommonroom: (index:number) => void,
    handleEditableCommonroom: (index:number) => void,
    handleChangeCommonroom: ({id, name}:changeProps) => void,
    handleUpdateBuilding: () => void,
    handleSelectBuilding: () => void,
    handleModal: () => void,
    handleGoBack: () => void,
}