import { ChangeEvent } from 'react';
import { MultiValue } from 'react-select';
import { listBookingApi } from '../api/booking';
import { listBuildingApi } from '../api/building';
import { listRoomApi } from '../api/room';

// initial state - 리덕스 booking.ts
export interface BookingState {
    booking: {
        bookingId?: string,
        buildingId?: string,
        buildingName?: string,
        roomId?: string,
        roomName?: string,
        userName: string,
        phoneNumber: string,
        countryNumber: string,
        desc: string,
        roomIds: any[],
        commonroomIds: any[],
        checkinAt: string|Date|any,
        checkoutAt: string|Date|any,
        createdAt?: Date,
        updatedAt?: Date,
    },
    keyIssueItem: {
        keyType: string,
        userName: string,
        phoneNumber: string,
        countryNumber: string,
        type: 'day'|'hour'|'10mins',
        isNew: boolean,
        checkinAt: string|Date|any,
        checkoutAt: string|Date|any,
    },
    limitCheckInOutAt: {
        minCheckinAt: string|Date|any,
        maxCheckoutAt: string|Date|any,
    },
    userkeyListItems: listBookingApi['mobilekeys'][],
    bookingCreateSuccess: boolean,
    bookingUpdateSuccess: boolean,
    bookingCancelSuccess: boolean,
    bookingCreateError: any|null,
    bookingUpdateError: any|null,
    bookingCancelError: any|null,
    excelUploadSuccess: boolean,
    excelUploadError: any|null,
    userMobileKeyItem: any|null, //값을 가지고 오는 용도
    userMobileKeyError: any|null,
    userPincodeItem: any|null, //값을 가지고 오는 용도
    userPincodeError: any|null,
    userkeyDeleteSuccess: boolean,
    userkeyDeleteError: any|null,
}

// initial state - 리덕스 roomList.ts
export interface bookingListState {
    bookingListTotal: number,
    bookingListItems: listBookingApi[]|null,
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
        roomName: string,
        phoneNumber: string,
        startAt: string|Date,
        endAt: string|Date,
    },
    bookingListError: any|null,
    detailField: {
        bookingId: string,
    }
}

// API, Redux Props
export type bookingIdProps = {
    bookingId: string,
    keyId?: string,
}
export type listBookingProps = {
    buildingId?: string, 
    roomName?: string, 
    phoneNumber?: string, 
    startAt?: string|Date, 
    endAt?: string|Date, 
    sort?: string, 
    order?: string,
    offset?: number|null,
    limit?: number|null,
    pagination?: boolean,
}
export type issueUserProps = {
    bookingId: string, 
    userName: string, 
    phoneNumber: string, 
    type: 'day'|'hour'|'10mins',
    isNew: boolean, 
    checkinAt: string|Date|any, 
    checkoutAt: string|Date|any,
}
export type UploadBookingFileProps = {
    formData: FormData
}

//api 보낼 때 필요한 create, update용 Props 값
export type PostBookingProps = {
    bookingId?: string,
    userName: string, 
    phoneNumber: string, 
    roomIds?: any[], 
    commonroomIds?: any[], 
    checkinAt: string|Date|any, 
    checkoutAt: string|Date|any, 
    desc: string
}

/* Conteiner Props */
export type BookingListContainerProps = {
    isOpen: boolean,
    bookingView: string,
    handleViewChange: (flag:string, type:string) => void,
}
export type BookingCreateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
}
export type BookingUpdateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    bookingId: string,
}
export type BookingCancelContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    bookingId: string,
}
export type BookingDetailContainerProps = { 
    isOpen: boolean,
    bookingView: string,
    listBooking: () => void,
    handleViewChange: (flag:string, type:string) => void,
}
export type checkProps = {
    userName: string, 
    phoneNumber: string, 
    checkinAt: string|Date, 
    checkoutAt: string|Date, 
    roomIds?: any[],
}

export type ExcelDownloadContainerProps = {
    isOpen: boolean,
    toggle: () => void,
}
export type ExcelUploadContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
}

/* Component Props */
export type BookingListProps = {
    bookingListItems: listBookingApi[] | null,
    buildingListItems: listBuildingApi[] | null,
    filterItem: bookingListState['filterItem'],
    sortItem: bookingListState['sortItem'],
    userRole: string,
    handleFilter: (filterItem: any, isDebounce: boolean) => void,
    handleinitFilter: () => void,
    handleBookingDetail: (bookingId:string) => void,
    handleModal:  (modalFlag: string, bookingId: string, buildingId: string, roomId: string, roomName: string) => void,
    changeSort: (sort: string) => void,
}
export type BookingCreateProps = {
    bookingItem: BookingState['booking'],
    keyIssueItem: BookingState['keyIssueItem'],
    limitCheckInOutAt: BookingState['limitCheckInOutAt'],
    selectedBuildingId: string,
    buildingItems: listBuildingApi[]|null,
    roomItems: listRoomApi[]|null,
    commonroomItems: any[]|null,
    activePage: number,
    pincodeVersion?: string,
    limitCheckInAt: Date|undefined,
    limitCheckOutAt: Date|undefined,
    isSlimkeyCheck: boolean,
    checkinAtV4HH: number[],
    checkinAtV4MM: number[],
    toggle: () => void,
    handleChange: (form:string, e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleChangeDate: (date:Date, form:string, name:string) => void,
    handleChangeCommonroom: (state:MultiValue<any>) => void,
    handleSetMaxDate: () => Date,
    handleCreateBooking: () => void,
    handleCancelBooking: (flag?:string) => void,
    handleIssueKey: () => void,
    handleChangeKeyType: (keyType:string) => void,
    handleChangePincodeType: (pincodeType:string) => void,
    hnadleChangeDateV4: (type:string, e:ChangeEvent<HTMLSelectElement>) => void,
    validateStartAt: (time:Date) => boolean,
    validateEndAt: (time:Date) => boolean,
}
export type BookingUpdateProps = {
    bookingItem: BookingState['booking'],
    handleChange: (form:string, e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleChangeDate: (date:Date, form:string, name:string) => void,
    handleSetMaxDate: () => Date,
    handleUpdateBooking: () => void,
    toggle: () => void,
}
export type BookingDetailProps = {
    bookingItem: BookingState['booking'],
    userRole: string,
    handleChange: (form:string, e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleChangeDate: (date:Date, form:string, name:string) => void,
    handleGoBack: () => void,
    handleSelectBooking: () => void,
    handleUpdateBooking: () => void,
    handleModal: () => void,
}
export type BookingCancelProps = {
    bookingItem: BookingState['booking'],
    handleCancelBooking: () => void
    toggle: () => void,
}

export type ExcelDownloadProps = {
    handleExportDataToExcel: () => void,
    toggle: () => void,
}
export type ExcelUploadProps = {
    selectedFileName: string,
    handleSetFile: (e:ChangeEvent<HTMLInputElement>) => void,
    handleCreateBooking: () => void,
    toggle: () => void,
}