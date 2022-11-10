import { ChangeEvent } from 'react';
import { MultiValue } from 'react-select';
import { listBuildingApi } from '../api/building';
import { listStaffApi, listStaffKeyApi } from '../api/staff';
import { staffStatusProps } from './formatter';

// initial state - 리덕스 staff.ts
export interface StaffState {
    staff: {
        name: string,
        phoneNumber: string,
        countryNumber: string,
        role: string,
        createdAt? : Date|null,
        updatedAt? : Date|null,
        status?: staffStatusProps,
    },
    keyIssueItem: {
        buildingId?: string,
        roomIds: any[],
        commonroomIds: any[],
        startAt: string|Date|any,
        endAt: string|Date|any,
    },
    staffCreateSuccess: boolean,
    staffUpdateSuccess: boolean,
    staffDeleteSuccess: boolean,
    staffkeyIssueItem: any|null,
    staffSignupSuccess: boolean,
    staffCreateError: any|null,
    staffUpdateError: any|null,
    staffDeleteError: any|null,
    staffkeyIssueError: any|null,
    staffSignupError: any|null,
    verificationCode: string,
    verificationToken: string,
    staffkeyDeleteSuccess: boolean,
    staffkeyDeleteError: any|null,
}

// initial state - 리덕스 roomList.ts
export interface staffListState {
    staffListTotal: number,
    staffListItems: listStaffApi[]|null,
    staffListCntTotal: number,
    staffListCntItems: listStaffApi[]|null,
    currentPageNumber: number,
    paginationItem: {
      offset: number,
      limit: number,
    },
    filterItem: {
        name: string,
        role: string,
        status: string,
    },
    staffListError: any|null,
    detailField: {
        staffId: string,
    }
}

// initial state - 리덕스 staffKeyList.ts
export interface staffkeyListState {
    staffkeyListTotal: number,
    staffkeyListItems: listStaffKeyApi[]|null,
    currentPageNumber: number,
    paginationItem: {
      offset: number,
      limit: number,
    },
    staffkeyListError: any|null,
}

// API, Redux Props
export type listStaffProps = {
    name: string, 
    role: string, 
    status: string, 
    offset?: number, 
    limit?: number, 
    pagination?: boolean,
}
export type staffIdProps = {
    staffId: string,
}

export type listStaffkeyProps = {
    staffId: string,
    offset?: number,
    limit?: number,
}
export type keyIdProps = {
    keyId: string,
}

//api 보낼 때 필요한 create, update용(POST) Props 값
export type PostStaffProps = {
    staffId?: string,
    name: string, 
    phoneNumber?: string, 
    role: string,
}
export type issueStaffkeyProps = {
    staffId: string, 
    roomIds?: any[], 
    commonroomIds?: any[], 
    startAt: Date, 
    endAt: Date,
}
export type verificationProps = {
    phoneNumber: string, 
    expiredAt?: string, 
    needSignedup?: boolean, 
    isTestMode?: boolean,
    verificationCode?: string,
}
export type signupStaffProps = {
    name: string, 
    phoneNumber: string, 
    verificationToken: string, 
    password: string
}

/* Conteiner Props */
export type StaffListContainerProps = {
    isOpen: boolean,
    staffView: string,
    handleViewChange: (flag:string, type:string) => void,
}
export type StaffCreateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
}
export type StaffUpdateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    staffId: string,
}
export type StaffDeleteContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    staffId: string,
    staffName: string,
}
export type StaffDetailContainerProps = {
    isOpen: boolean,
    staffView: string,
    listStaff: () => void,
    handleViewChange: (flag:string, type:string) => void,
    handleResetStaffId: () => void,
}
export type StaffSignupContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    staffPhoneNumber:string,
    staffName:string,
}
export type StaffkeyListContainerProps = {
    isOpen: boolean,
    staffId: string,
    staffRole: string,
    handleGoBack: () => void,
}
export type StaffkeyIssueContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    staffId: string,
}
export type StaffkeyDeleteContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    keyId: string,
}

/* Component Props */
export type StaffListProps = {
    staffListItems: listStaffApi[]|null,
    filterItem: staffListState['filterItem'],
    selectMasterCount: number,
    userRole: string,
    userPhoneNumber: string,
    hotelRole: string,
    handleFilter: (targetItem:any, isDebounce:boolean) => void,
    handleinitFilter: () => void,
    handleModal: (modalFlag:string, staffId:string, staffName:string, role:string, phone_number:string, status:string) => void,
    handleModalUser: (modalFlag:string, staffId:string, staffName:string, staffPhoneNumber:string, status:string, role:string, phone_number:string) => void,
    handleStaffDetail: (staffId:string) => void,
}
export type StaffCreateProps = {
    staffItem: StaffState['staff'],
    hotelRole: string,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleCreateStaff: () => void,
    toggle: () => void,
}
export type StaffUpdateProps = {
    staffItem: StaffState['staff'],
    hotelRole: string,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleUpdateStaff: () => void,
    toggle: () => void,
}
export type StaffDeleteProps = {
    staffName: string,
    handleDeleteStaff: () => void,
    toggle: () => void,
}
export type StaffDetailProps = {
    staffItem: StaffState['staff'],
    selectMasterCount: number,
    userRole: string,
    hotelRole: string,
    userPhoneNumber: string,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleModal: () => void,
    handleGoBack: () => void,
    handleSelectStaff: () => void,
    handleUpdateStaff: () => void,
    handleSelectStaffSignup: () => void,
}
export type StaffSignupProps = {
    staffName: string,
    initPassword: string,
    handleSignupStaffVerifiCode: () => void,
    toggle: () => void,
}
export type StaffkeyListProps = {
    staffkeyListItems: listStaffKeyApi[]|null,
    staffRole: string,
    userRole: string,
    handleSelectStaffkeyDelete: (keyId:string) => void,
    handleGoBack: () => void,
    handleModal: () => void,
}
export type StaffkeyIssueProps = {
    staffItem: StaffState['staff'],
    keyIssueItem: StaffState['keyIssueItem'],
    buildingItems: listBuildingApi[]|null,
    roomItems: any[],
    commonroomItems: any[],
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleChangeDate: (date:Date, name:string) => void,
    handleChangeArray: (state:MultiValue<any>, name:string) => void,
    handleIssueKey: () => void,
    toggle: () => void,
}
export type StaffkeyDeleteProps = {
    handleDeleteStaffkey: () => void,
    toggle: () => void,
}