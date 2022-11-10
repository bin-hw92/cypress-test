import { ChangeEvent } from 'react';
import { listKeytagApi } from '../api/keytag';

// initial state - 리덕스 keytag.ts
export interface KeytagState {
    keytag: {
        keytagId?: string,
        name: string,
        delayMs: string,
        isMobilekeyIssuable: boolean,
        keytagOpMode: number,
        enterAlarmCount: number,
        enterWaitingSec: number,
        exitAlarmCount: number,
        exitWaitingSec: number,
        allowSound: boolean,
        soundVolume: number,
        languageType: number,
        createdAt? : Date|null,
        updatedAt? : Date|null,
    },
    keytagCreateSuccess: boolean,
    keytagUpdateSuccess: boolean,
    keytagDeleteSuccess: boolean,
    keytagCreateError: any|null,
    keytagUpdateError: any|null,
    keytagDeleteError: any|null,
}
// initial state - 리덕스 keytagList.ts
export interface keytagListState {
    keytagListTotal: number,
    keytagListItems: listKeytagApi[]|null,
    currentPageNumber: number,
    paginationItem: {
      offset: number,
      limit: number,
    },
    keytagListError: any|null,
}

// API, Redux Props
export type listKeytagProps = {
    buildingId?: string,
    floorId?: string,
    roomId?: string,
    offset?: number,
    limit?: number,
    pagination?: boolean,
}
export type keytagIdProps = {
    buildingId: string,
    floorId: string,
    roomId: string,
    keytagId?: string,
}
//api 보낼 때 필요한 create, update용 Props 값
export type PostKeytagProps = {
    roomId: string,
    floorId: string,
    buildingId: string,
    keytagId?: string,
    name: string,
    delayMs: string,
    isMobilekeyIssuable: boolean,
    keytagOpMode: number,
    enterAlarmCount: number,
    enterWaitingSec: number,
    exitAlarmCount: number,
    exitWaitingSec: number,
    allowSound: boolean,
    soundVolume: number,
    languageType: number,
}

/* Conteiner Props */
export type KeytagListContainerProps = {
    isOpen: boolean,
    buildingId: string,
    floorId: string,
    roomId: string,
    handleGoBack: () => void,
}
export type KeytagCreateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    buildingId: string,
    floorId: string,
    roomId: string,
}
export type KeytagUpdateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    buildingId: string,
    floorId: string,
    roomId: string,
    keytagId: string,
}
export type KeytagDeleteContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    buildingId: string,
    floorId: string,
    roomId: string,
    keytagId: string,
    keytagName: string,
}
export type KeytagDetailContainerProps = {
    isOpen: boolean,
    onClose: () => void,
    listFloor: () => void,
    buildingId: string,
    floorId: string,
    handleViewChange: (flag:string, view:string) => void,
}

/* Component Props */
export type KeytagListProps = {
    keytagListItems: listKeytagApi[] | null,
    userRole: string,
    handleModal: (modalFlag:string, keytagId:string, keytagName:string, status:string) => void,
    handleGoBack: () => void,
}
export type KeytagCreateProps = { 
    keytagItem: KeytagState['keytag'],
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleCreateKeytag: () => void,
    toggle: () => void,
}
export type KeytagUpdateProps = {
    keytagItem: KeytagState['keytag'],
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleUpdateKeytag: () => void,
    toggle: () => void,
}
export type KeytagDeleteProps = {
    keytagName: string,
    handleDeleteKeytag: () => void,
    toggle: () => void,
}
export type FloorDetailProps = {
    keytagItem: KeytagState['keytag'],
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleUpdateFloor: () => void,
    handleSelectFloor: () => void,
    handleModal: () => void,
    handleGoBack: () => void,
}