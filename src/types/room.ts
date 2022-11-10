import { ChangeEvent } from 'react';
import { listRoomApi } from "../api/room";
import { listFloorApi } from "../api/floor";
import { listBuildingApi } from "../api/building";

// initial state - 리덕스 room.ts
export interface RoomState {
    room: {
        roomId?: string,
        name: string,
        floorId: string,
        rmsId: string,
        allowKeytag: boolean,
        advertiseStrength: number,
        connectedStrength: number,
        //select로 받아올 때만 사용
        status?: 'created'|'installed',
        buildingName?: string,
        floorName?: string,
        createdAt?: Date,
        updatedAt?: Date,
        doorlock?: {
            doorlockId: string,
            dlSerial: string,
            name: number,
            pincodeVersion: string,
        },
    },
    roomCreateSuccess: boolean,
    roomUpdateSuccess: boolean,
    roomDeleteSuccess: boolean,
    roomCreateError: any|null,
    roomUpdateError: any|null,
    roomDeleteError: any|null,
}

// initial state - 리덕스 roomList.ts
export interface roomListState {
    roomListTotal: number,
    roomListItems: listRoomApi[]|null,
    roomfloorListTotal: number,
    roomfloorListItems: listRoomApi[]|null,
    currentPageNumber: number,
    paginationItem: {
      offset: number,
      limit: number,
    },
    filterItem: {
        buildingId: string,
        floorId: string,
    },
    roomListError: any|null,
    detailField: {
        buildingId: string,
        floorId: string,
        roomId: string,
    }
}

// API, Redux Props
export type listRoomProps = {
    buildingId: string,
    floorId?: string,
    offset?: number,
    limit?: number,
    pagination?: boolean,
}
export type listRoomDetailProps = {
    detailField: {
        buildingId: string,
        floorId: string,
        roomId: string,
    }
}

export type roomIdProps = {
    buildingId: string,
    floorId?: string,
    roomId: string,
}

//api 보낼 때 필요한 create, update용 Props 값
export type PostRoomProps = {
    buildingId?: string,
    floorId: string,
    roomId?: string,
    name: string,
    rmsId: string,
    allowKeytag: boolean,
    advertiseStrength: number,
    connectedStrength: number
}

/* Conteiner Props */
export type RoomListContainerProps = {
    isOpen: boolean,
    roomView: string,
    handleViewChange: (flag:string, type:string) => void,
}
export type RoomCreateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    buildingId: string,
    floorId: string,
}
export type RoomUpdateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    buildingId: string,
    floorId: string,
    roomId: string,
}
export type RoomDeleteContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    buildingId: string,
    floorId: string,
    roomId: string,
    roomName: string,
}
export type RoomDetailContainerProps = {
    isOpen: boolean,
    roomView: string,
    listRoom: () => void,
    handleViewChange: (flag:string, view:string) => void,
}

/* Component Props */
export type RoomListProps = {
    roomListItems: listRoomApi[] | null,
    buildingListItems: listBuildingApi[] | null,
    filterItem: roomListState['filterItem'],
    userRole: string,
    handleFilter: (targetItem: any, isDebounce: boolean) => void,
    handleinitFilter: () => void,
    handleRoomDetail: (buildingId:string, floorId:string, roomId:string) => void,
    handleModal:  (modalFlag: string, roomId:string, floorId:string, roomName:string, status:string) => void,
}
export type RoomCreateProps = { 
    roomItem: RoomState['room'],
    floorListItems: listFloorApi[]|null,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleCreateRoom: () => void,
    toggle: () => void,
}
export type RoomUpdateProps = {
    roomItem: RoomState['room'],
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleUpdateRoom: () => void,
    toggle: () => void,
}
export type RoomDeleteProps = {
    roomName: string,
    handleDeleteRoom: () => void,
    toggle: () => void,
}
export type RoomDetailProps = {
    roomItem: RoomState['room'],
    userRole: string,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleUpdateRoom: () => void,
    handleSelectRoom: () => void,
    handleModal: () => void,
    handleGoBack: () => void,
}