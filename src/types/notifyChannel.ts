import { ChangeEvent } from 'react';
import { listNotifyChannelApi } from '../api/notifyChannel';

// initial state - 리덕스 notifyChannelts
export interface notifyChannelState {
    notifyChannel: {
        channelId?: string,
        name: string,
        isDefault: boolean,
        type: string,
        config: {
          user_code: string,
          dept_code: string,
          calling_number: string,
          yellowid_key: string,
        },
        createdAt?: Date,
        updatedAt?: Date,
        hotels?: {
            id: string,
            name: string,
        }[],
    },
    notifyChannelCreateSuccess: boolean,
    notifyChannelUpdateSuccess: boolean,
    notifyChannelDeleteSuccess: boolean,
    notifyChannelCreateError: any|null,
    notifyChannelUpdateError: any|null,
    notifyChannelDeleteError: any|null,
}

// initial state - 리덕스 notifyChannelList.ts
export interface notifyChannelListState {
    notifyChannelListTotal: number,
    notifyChannelListItems: listNotifyChannelApi[]|null,
    notifyChannelListError: any|null,
}

// API, Redux Props
export type channelIdPRops = {
    channelId: string,
}  

//api 보낼 때 필요한 create, update용 Props 값
export type PostNotifyChannelProps = {
    channelId?: string,
    name: string, 
    type: string, 
    config: {
        user_code: string,
        dept_code: string,
        calling_number: string,
        yellowid_key: string,
    }|null, 
    isDefault:boolean,
}

/* Conteiner Props */
export type NotifyChannelCreateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
}
export type NotifyChannelUpdateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    channelId: string,
}
export type NotifyChannelDeleteContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    channelId: string,
}
/* Component Props */
export type NotifyChannelListProps = {
    notifyChannelListItems: listNotifyChannelApi[]|null,
    userRole: string,
    handleModal: (modalFlag:string, channelId:string) => void,
}
export type NotifyChannelCreateProps = {
    notifyChannelItem: notifyChannelState['notifyChannel'],
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleCreateNotifyChannel: () => void,
    toggle: () => void,
}
export type NotifyChannelUpdateProps = {
    notifyChannelItem: notifyChannelState['notifyChannel'],
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleUpdateNotifyChannel: () => void,
    toggle: () => void,
}
export type NotifyChannelDeleteProps = {
    channelId: string,
    handleDeleteNotifyChannel: () => void,
    toggle: () => void,
}
export type NotifyChannelDetailProps = {
    notifyChannelItem: notifyChannelState['notifyChannel'],
    breadcrumbItems: any,
    userRole: string,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleSelectNotifyChannel: () => void,
    handleUpdateNotifyChannel: () => void,
    handleModal: () => void,
    moveToListPage: () => void,
}