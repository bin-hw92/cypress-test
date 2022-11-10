import { ChangeEvent } from 'react';
import { listHotelApi } from '../api/hotel';
import { listHotelNotifyTemplateApi, listHotelNotifyTemplateContextApi } from '../api/hotelnotify';
import { listNotifyTemplatePropsApi } from '../api/notifyTemplate';
import { notifyTemplateState } from './notifyTemplate';

// initial state - 리덕스 hotelnotify.ts
export interface HotelNotifyState {
    hotelnotify: {
        hotelId: string,
        notifyContext: string,
        notifyTemplateId: string,
        createdAt? : Date|null,
        updatedAt? : Date|null,
    },
    hotelnotifyCreateSuccess: boolean,
    hotelnotifyDeleteSuccess: boolean,
    hotelnotifyCreateError: any|null,
    hotelnotifyDeleteError: any|null,
}

// initial state - 리덕스 hotelnotifyList.ts
export interface hotelnotifyListState {
    hotelNotifyTemplateListTotal: number,
    hotelNotifyTemplateListItems: listHotelNotifyTemplateApi[]|null,
    hotelNotifyTemplateContextTotal: number,
    hotelNotifyTemplateContextItems: listHotelNotifyTemplateContextApi[]|null,
    currentPageNumber: number,
    paginationItem: {
      offset: number,
      limit: number,
    },
    filterItem: {
        notifyContext: string,
    },
    hotelNotifyTemplateListError: any|null,
    hotelNotifyTemplateContextError: any|null,
}

// API, Redux Props
export type listHotelNotifyProps = {
    hotelId?: string, 
    notifyContext: string, 
    offset?: number, 
    limit?: number,
}
export type hotelTemplateIdProps = {
    hotelTemplateId: string
}

//api 보낼 때 필요한 create, update용 Props 값
export type PostHotelNotifyProps = {
    hotelId: string, 
    notifyTemplateId: string, 
    notifyContext: string,
}

/* Conteiner Props */
export type HotelNotifyTemplateListContainerProps = {
    isOpen: boolean,
    isOpenHotel?: boolean,
}
export type HotelNotifyTemplateCreateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    hotelId: string|null,
}
export type HotelNotifyTemplateDeleteContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    hotelTemplateId: string,
}

/* Component Props */
export type HotelNotifyTemplateListProps = {
    hotelNotifyTemplateListItems: listHotelNotifyTemplateApi[]|null,
    hotelNotifyTemplateContextItems: listHotelNotifyTemplateContextApi[]|null,
    filterItem: hotelnotifyListState['filterItem'],
    userRole: string,
    handleFilter: (targetItem:any, isDebounce: boolean) => void,
    handleinitFilter: () => void,
    handleModal: (modalFlag:string, hotelTemplateId:string) => void,
    handleModalPreview: (template:string, templateAlt:string, dateFormat:string, locale:string) => void,
    handleNotifyContextFormatter: (notifyContext:any) => any,
}
export type HotelNotifyTemplateCreateProps = {
    hotelId: string|null,
    hotelnotifyItems: HotelNotifyState['hotelnotify'],
    notifyTemplateItem: notifyTemplateState['notifyTemplate'],
    hotelListItems: listHotelApi[]|null,
    hotelNotifyTemplateContextItems: listHotelNotifyTemplateContextApi[]|null,
    notifyTemplateListItems: listNotifyTemplatePropsApi[]|null,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleCreateHotelNotifyTemplate: () => void,
    handlePreviewNotifyTemplate: () => void,
    handleSelectNotifyTemplate: (notifyTemplateId:string) => void,
    toggle: () => void,
}
export type HotelNotifyTemplateDeleteProps = {
    hotelTemplateId: string,
    handleDeleteHotelNotifyTemplate: () => void,
    toggle: () => void,
}