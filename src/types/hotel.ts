import { listNotifyChannelApi } from "../api/notifyChannel"
import { ChangeEvent } from 'react';
import { changeProps } from "./commons";
import { listHotelApi } from "../api/hotel";

// initial state - 리덕스 hotel.ts
export interface HotelState {
    hotel: {
        name: string,
        timezone: string,
        address: string,
        desc: string,
        pincodeDayTypeOffset: string|number,
        pincodeVersion: 'V2'|'V3'|'V4',
        pincodeLength: string|number,
        allowInfinityPincode: boolean,
        pincodeAuthTimeoutMin: string|number,
        useSlimkey: boolean, 
        commonrooms: any[],
        notifyChannelId: string|null,
        apphotelstory?: boolean,
        appElevatorBtn?: boolean,
        role: string,
    },
    hotelCreateSuccess: boolean,
    hotelUpdateSuccess: boolean,
    hotelDeleteSuccess: boolean,
    hotelCreateError: any|null,
    hotelUpdateError: any|null,
    hotelDeleteError: any|null,
    formData: FormData|null,
}
// initial state - 리덕스 hotelList.ts
export interface HotelListState {
    hotelListTotal: number,
    hotelListItems: listHotelApi[]|null,
    currentPageNumber: number,
    paginationItem: {
      offset: number,
      limit: number,
    },
    filterItem: {
      name: string,
    },
    hotelListError: any|null,
}

// API, Redux Props
export type listHotelProps = {
    name?: string,
    offset?: number,
    limit?: number,
    pagination?: boolean,
}
//api 보낼 때 필요한 create, update용 Props 값
export type PostHotelProps = {
  name: string,
  timezone: string,
  address: string,
  desc: string,
  pincodeDayTypeOffset: string|number,
  pincodeVersion: 'V2'|'V3'|'V4',
  pincodeLength: string|number,
  allowInfinityPincode: boolean,
  pincodeAuthTimeoutMin: string|number,
  useSlimkey: boolean, 
  commonrooms: any[],
  notifyChannelId: string|null,
  apphotelstory?: boolean,
  appElevatorBtn?: boolean,
}
export type HotelUploadFileProps = {
    file: FormData
}

/* Conteiner Props */
export type HotelCreateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
}
export type HotelUpdateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
}
export type HotelDeleteContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    hotelName: string,
}
export type HotelDetailContainerProps = {
    isOpen: boolean,
}

/* Component Props */
export type HotelListProps = {
    hotelListItems: listHotelApi[]|null,
    filterItem: HotelListState['filterItem'],
    userRole: string,
    handleFilter: (targetItem: any, debounce: boolean) => void,
    handleinitFilter: () => void,
    handleHotelDetail: (hotelId:string, role:string) => void,
    handleModal: (modalFlag:string, hotelId:string, hotelName:string) => void,
}
export type HotelCreateProps = {
    hotelItem: HotelState['hotel'],
    activeTab:number,
    commonroomInputRef: any|null,
    notifyChannelListItems: listNotifyChannelApi[]|null,
    handleAddCommonroom: () => void,
    handelActiveTab: (number:number) => void,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleRemoveCommonroom: (index:number) => void,
    handleSetFile: (e:ChangeEvent<HTMLInputElement>) => void,
    handleCreateHotel: () => void,
    handleCreateFacilityByExcelUpload: () => void,
    toggle: () => void,
}
export type HotelUpdateProps = {
    hotelItem: HotelState["hotel"],
    commonroomInputRef: any|null,
    editableCommonroom: any|null,
    notifyChannelListItems: listNotifyChannelApi[]|null,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleAddCommonroom: () => void,
    handleRemoveCommonroom: (index:number) => void,
    handleEditableCommonroom: (index:number) => void,
    handleChangeCommonroom: ({id, name}:changeProps) => void,
    handleUpdateHotel: () => void,
    toggle: () => void,
}
export type HotelDeleteProps = {
    hotelName: string,
    toggle: () => void,
    handleDeleteHotel: () => void,
}
export type HotelDetailProps = {
    hotelItem: HotelState['hotel'],
    hotelListTotal: number,
    commonroomInputRef: any|null,
    editableCommonroom: any|null,
    notifyChannelListItems: listNotifyChannelApi[]|null,
    handleModal: () => void,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleAddCommonroom: () => void,
    handleRemoveCommonroom: (index:number) => void,
    handleEditableCommonroom: (index:number) => void,
    handleChangeCommonroom: ({id, name}:changeProps) => void,
    handleSelectHotel: () => void,
    handleUpdateHotel: () => void,
}