import { ChangeEvent } from "react"
import { staffRoleStatusProps, userRoleStatusProps } from "./formatter"

//BreadcrumbState
export interface BreadcrumbState {
    breadcrumbItems: {
        [key: string] : Object
    }[],
    menuItem: string,
    menuType: {
        building: 'list'|'detail',
        floor: 'list'|'detail',
        room: 'list'|'detail'|'keytag',
        doorlock: 'list'|'detail'|'battery'|'log',
        booking: 'list'|'detail'|'keyList',
        report: 'list'|'detail',
        staff: 'list'|'detail'|'staffkey',
    },
    homeMenuItem: string,
}
//Header
export interface HeaderState {
    name: string,
    userRole: "master" | "guest" | "",
    hotelRole: "master" | "manager" | "housekeeping" | "manager_mobilekey" | "doorlock_setting" | "",
    phoneNumber: string,
    password: {
        passwordOld: string,
        passwordNew: string,
    },
    passwordSuccess: boolean,
    passwordError: any|null,
}

//API, 리덕스 등 Props로 받을 경우
export type CommonProps = {
    [key: string] : string|number|boolean|Date|Object|any|null,
}

export type CommonQueryProps = {
    [key: string] : Object|number|undefined|null,
}

export type CommonHeaderProps = {
    'Content-Type'? : string,
}
//메뉴 변경
export type menuItemProps = {
    menuItem: string,
}
export type homeMenuItemProps = {
    homeMenuItem: string,
}

//현재 페이지 타입
export type currentPageNumberProps = {
  currentPageNumber: number,
}
//페이지네이션 타입
export type PaginationItemProps = {
  paginationItem: {
    offset?: number,
    limit?: number,
  }
}
//필터 타입
export type filterItemProps = {
  filterItem: {
    [key: string] : string|number|Date,
  }
}
//정렬 타입
export type sortItemProps = {
    sortItem: {
        sort?: string,
        order?: string,
    }
}
//공용도어 수정 정보
export interface changeProps {
    id: number,
    name: string,
}

//mainLayout
export interface mainLayOutProps {
    refresh: () => void,
    ContentBody: any
}

export interface countryInfoProps {
    name: string;
    native: string;
    phone: string;
    continent: string;
    capital: string;
    currency: string;
    languages: string[];
}


/* Container */
//Password
export type PasswordUpdateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
}
//Breadcrumb
export type BreadcrumbContainerProps = {
    breadcrumbItems: BreadcrumbState['breadcrumbItems'],
}

/* Component */
//LeftMenu
export type LeftMenuProps = {
    menuItem: string,
    homeMenuItem: string,
    hotelRole: string,
    userName: string,
    userRole: string,
    handleMenuItem: (menuItem:string) => void,
    handleHomeMenuItem: (homeMenuItem:string) => void,
}
//Header
export type HeaderProps = {
    userName?: string,
    userRole: userRoleStatusProps,
    hotelRole: staffRoleStatusProps,
    setClassName: (menu: string) => "menu-item active" | "menu-item",
    //handleMove: (value:string) => void,
    handlePasswordUpdateModal: (flag:boolean) => void,
    handleLogout: () => void,
}
//Password
export type PasswordUpdateProps = {
    passwordItem: {
      passwordOld: string,
      passwordNew: string,
    },
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleUpdatePassword: () => void,
    toggle: () => void,
}
//DetailForm 
export type DetailFormProps = {
    activeTab: number,
    breadcrumbItems: BreadcrumbState['breadcrumbItems'],
    handleActiveTab: (number:number) => void,
}
export type BreadcrumbProps = {
    breadcrumbItems: BreadcrumbState['breadcrumbItems'],
    handleLink: (path:string) => void,
}
//LimitButton
export type LimitButtonProps = {
    currentLimit: number,
    changeLimit: (limit: number) => void,
}
//Spin
export type SpinProps = {
    isSpin?: boolean,
    isModal?: boolean,
}
//ResponseSuccessModal
export type ResponseSuccessModalProps = {
    isOpen: boolean,
    toggle: () => void,
    message: string,
}
export type ResponseFailModalProps = {
    isOpen: boolean,
    toggle: () => void,
    message: string,
    subMessage?: string,
}
//Filter
export type FilterProps = {
    columns: {
        [key:string] : Object,
    }[],
    init: () => void,
    customClassName?: string,
}
//Table
export type CustomTableProps = {
    columns: any,
    datas: any,
    userRole?: string,
}


//리덕스별 성공, 실패 Key 값과 변경을 위한 부분 (changeResult)
export type headerSuccessProps = {
    payload: {
    key: 'passwordSuccess' | 'passwordError';
    value: boolean|any|null,
    }
}
export type hotelSuccessProps = {
    payload: {
    key: 'hotelCreateSuccess' | 'hotelUpdateSuccess' | 'hotelDeleteSuccess' | 'hotelCreateError' | 'hotelUpdateError' | 'hotelDeleteError';
    value: boolean|any|null,
    }
}
export type buildingSuccessProps = {
    payload: {
    key: 'buildingCreateSuccess' | 'buildingUpdateSuccess' | 'buildingDeleteSuccess' | 'buildingCreateError' | 'buildingUpdateError' | 'buildingDeleteError';
    value: boolean|any|null,
    }
}
export type floorSuccessProps = {
    payload: {
    key: 'floorCreateSuccess' | 'floorUpdateSuccess' | 'floorDeleteSuccess' | 'floorCreateError' | 'floorUpdateError' | 'floorDeleteError';
    value: boolean|any|null,
    }
}
export type roomSuccessProps = {
    payload: {
    key: 'roomCreateSuccess' | 'roomUpdateSuccess' | 'roomDeleteSuccess' | 'roomCreateError' | 'roomUpdateError' | 'roomDeleteError';
    value: boolean|any|null,
    }
}
export type doorlockSuccessProps = {
    payload: {
    key: 'doorlockUninstallSuccess' | 'doorlockUninstallError' | 'doorlockUpdateError';
    value: boolean|number|any|null,
    }
}
export type doorlockBatterySuccessProps = {
    payload: {
    key: 'doorlockBatteryListSuccess' | 'doorlockBatteryListError';
    value: boolean|any|null,
    }
}
export type doorlockLogSuccessProps = {
    payload: {
    key: 'doorlockLogListSuccess' | 'doorlockLogListError';
    value: boolean|any|null,
    }
}
export type bookingSuccessProps = {
    payload: {
    key: 'bookingCreateSuccess' | 'bookingUpdateSuccess' | 'bookingCancelSuccess' | 'bookingCreateError' | 'bookingUpdateError' | 'bookingCancelError' | 'userMobileKeyItem' | 'userMobileKeyError' | 'userPincodeItem' | 'userPincodeError';
    value: boolean|number|any|null,
    }
}
export type staffSuccessProps = {
    payload: {
    key: 'staffCreateSuccess' | 'staffUpdateSuccess' | 'staffDeleteSuccess' | 'staffCreateError' | 'staffUpdateError' | 'staffDeleteError' | 'staffkeyIssueItem' | 'staffSignupSuccess' | 'staffkeyIssueError' | 'staffSignupError' | 'staffkeyDeleteSuccess' | 'staffkeyDeleteError';
    value: boolean|number|any|null,
    }
}
export type hotelnotifySuccessProps = {
    payload: {
        key: 'hotelnotifyCreateSuccess' | 'hotelnotifyDeleteSuccess' | 'hotelnotifyCreateError' | 'hotelnotifyDeleteError';
        value: boolean|any|null,
    }
}
export type notifyTemplateSuccessProps = {
    payload: {
        key: 'notifyTemplateCreateSuccess' | 'notifyTemplateUpdateSuccess' | 'notifyTemplateDeleteSuccess' | 'notifyTemplateCreateError' | 'notifyTemplateUpdateError' | 'notifyTemplateDeleteError';
        value: boolean|any|null,
    }
}
export type notifyChannelSuccessProps = {
    payload: {
        key: 'notifyChannelCreateSuccess' | 'notifyChannelUpdateSuccess' | 'notifyChannelDeleteSuccess' | 'notifyChannelCreateError' | 'notifyChannelUpdateError' | 'notifyChannelDeleteError';
        value: boolean|any|null,
    }
}
export type smsSuccessProps = {
    payload: {
    key: 'smsSuccess' | 'smsError';
    value: boolean|any|null,
    }
}
export type keytagSuccessProps = {
    payload: {
    key: 'keytagCreateSuccess' | 'keytagUpdateSuccess' | 'keytagDeleteSuccess' | 'keytagCreateError' | 'keytagUpdateError' | 'keytagDeleteError';
    value: boolean|any|null,
    }
}