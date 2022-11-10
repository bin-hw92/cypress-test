
// initial state - 리덕스 sms.ts
export interface SmsState {
    sms: {
        type: 'mobilekey'|'pincode',
        value?: string,
        keyId?: string,
        phoneNumber?: string,
    },
    smsSuccess: boolean,
    smsError: any|null,
}

// API, Redux Props
export type SendSmsProps = {
    phoneNumber: string,
    message: string,
}
export type notifyKeyProps = {
    bookingId: string,
    userId?: string,
    pincodeId?: string
}
export type SmsProps = {
    sms: {
        type: string,
        value?: string,
        keyId?: string,
        phoneNumber?: string,
    }
}

/* Conteiner Props */
export type SMSSendContainerProps = {
    isOpen: boolean,
    isResend?: boolean,
    toggle: () => void,
    bookingId?: string,
    reload: () => void,
}

/* Component Props */
export type SMSSendProps = {
    isResend?:boolean,
    smsSendItem: SmsState['sms'],
    typeFormatter: (type: 'mobilekey' | 'pincode') => string,
    handleClose: () => void,
    handleSendSMS: () => void,
}