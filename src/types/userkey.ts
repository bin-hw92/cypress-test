import { ChangeEvent } from "react"
import { listBookingApi } from "../api/booking"
import { BookingState } from "./booking"


/* Container */
export type UserkeyListContainerProps = {
    buildingId: string,
    bookingId: string,
    roomId: string,
    roomName: string,
    userkeyListItems: listBookingApi['mobilekeys'][],
    allowInfinityPincode: boolean,
    userRole: string,
    reload: () => void,
    handleGoBack: () => void,
}
export type UserkeyIssueContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    buildingId: string,
    bookingId: string,
    roomId: string,
    roomName?: string,
    allowInfinityPincode: boolean,
}
export type UserkeyDeleteContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    bookingId: string,
    keyId: string,
}

/* Component */
export type UserkeyListProps = {
    userkeyListItems: listBookingApi['mobilekeys'][],
    pincodeVersion: string,
    userRole: string,
    handleGoBack: () => void,
    handleKeyIssue: () => void,
    handleSelectMobilekeyDelete: (keyId:string, pincode:string) => void,
    handleSelectSMSSend: (pincodeId:string, pincode:string, userId:string, exchangekey:string) => void,
}
export type UserkeyIssueProps = {
    keyIssueItem: BookingState['keyIssueItem'],
    limitCheckInOutAt: BookingState['limitCheckInOutAt'],
    pincodeVersion: string,
    limitCheckInAt: Date|undefined,
    limitCheckOutAt: Date|undefined,
    checkinAtV4HH: number[],
    checkinAtV4MM: number[],
    toggle: () => void,
    handleChange: (form:string, e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => void,
    handleChangeDate: (date:Date, name:string) => void,
    handleIssueKey: () => void,
    handleChangeKeyType: (keyType:string) => void,
    handleChangePincodeType: (pincodeType:string) => void,
    hnadleChangeDateV4: (type:string, e:ChangeEvent<HTMLSelectElement>) => void,
    validateStartAt: (time:Date) => boolean,
    validateEndAt: (time:Date) => boolean,
}
export type UserkeyDeleteProps = {
  handleDeleteKey: () => void,
  toggle: () => void
}