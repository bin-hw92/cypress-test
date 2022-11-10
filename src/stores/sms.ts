import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as smsAPI from "../api/sms";
import produce from "immer";
import { CommonProps, smsSuccessProps } from "../types/commons";
import { notifyKeyProps, SendSmsProps, SmsProps, SmsState } from "../types/sms";

/* 호텔 등록, 수정, 상제 부분 */
const INITIALIZE = 'sms/INITIALIZE';
const CHANGE_FINELD = 'sms/CHANGE_FIELD'; //데이터 변경용
const CHANGE_RESULT = 'sms/CHANGE_RESULT'; //결과값 변경

const CHANGE_ALL_FINELD = 'sms/CHANGE_ALL_FIELD'; //데이터 한번에 변경

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [SMS_PINCODE, SMS_PINCODE_SUCCESS, SMS_PINCODE_FAILURE] = createRequestActionTypes('sms/SMS_PINCODE');
const [SMS_MOBILEKEY, SMS_MOBILEKEY_SUCCESS, SMS_MOBILEKEY_FAILURE] = createRequestActionTypes('sms/SMS_MOBILEKEY');
const [SMS_SEND, SMS_SEND_SUCCESS, SMS_SEND_FAILURE] = createRequestActionTypes('sms/SMS_SEND');

/* action */
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(
    CHANGE_FINELD,
    ({ key, value }:CommonProps) => ({
        key, // hotel 내부 > name, timezone, address 등
        value, // 실제 바꾸려는 값
    }),
);

export const changeResult = createAction(
    CHANGE_RESULT,
    ({ key, value }:CommonProps) => ({
        key, // building success, error 변경
        value, // 실제 바꾸려는 값
    }),
);

export const changeAllField = createAction(CHANGE_ALL_FINELD, ({ sms }:SmsProps) => ({
    sms
}));

export const smsPincodeAction = createAction(SMS_PINCODE, ({ bookingId, pincodeId }:notifyKeyProps) => ({
    bookingId, 
    pincodeId,
}));
export const smsMobileKeyAction = createAction(SMS_MOBILEKEY, ({ bookingId, userId }:notifyKeyProps) => ({
    bookingId, 
    userId,
}));
export const smsSendAction = createAction(SMS_SEND, ({ phoneNumber, message }:SendSmsProps) => ({
    phoneNumber, 
    message,
}));


//사가 생성
const smsPincodeSaga = createRequestSaga(SMS_PINCODE, smsAPI.notifyPincode);
const smsMobileKeySaga = createRequestSaga(SMS_MOBILEKEY, smsAPI.notifyMobilekey);
const smsSendSaga = createRequestSaga(SMS_SEND, smsAPI.sendSMS);

export function* smsSaga(){
    yield takeLatest(SMS_PINCODE, smsPincodeSaga);
    yield takeLatest(SMS_MOBILEKEY, smsMobileKeySaga);
    yield takeLatest(SMS_SEND, smsSendSaga);
}

const initialState:SmsState = {
    sms: {
        type: 'pincode',
        value: '',
        keyId: '',
    },
    smsSuccess: false, // 성공 관련
    smsError: null,
};
  
const sms = handleActions<SmsState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FINELD] : (state, { payload: {key, value} }) => 
        produce(state, draft => {
            if(key === 'type') draft.sms.type = value;
            if(key === 'value') draft.sms.value = value;
            if(key === 'keyId') draft.sms.keyId = value;
            if(key === 'phoneNumber') draft.sms.phoneNumber = value;
        }),
        [CHANGE_RESULT] : (state, { payload: {key, value} }:smsSuccessProps) => 
        produce(state, draft => {
            draft[key] = value;
        }),
        // 핀코드 성공
        [CHANGE_ALL_FINELD] : (state, { payload: smsItem }) => ({
            ...state,
            sms: smsItem.sms,
         }),
        // 핀코드 성공
        [SMS_PINCODE_SUCCESS] : (state, { payload: floor }) => ({
            ...state,
            smsSuccess: true,
            smsError: null,
         }),
         // 핀코드 실패
        [SMS_PINCODE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             smsError: error,
         }),
         // 모바일키 성공
         [SMS_MOBILEKEY_SUCCESS] : (state, { payload: floor }) => ({
             ...state,
             smsSuccess: true,
             smsError: null,
        }),
         // 모바일키 실패
        [SMS_MOBILEKEY_FAILURE] : (state, { payload: error }) => ({
             ...state,
             smsError: error,
        }),
        // SMS Send 성공
        [SMS_SEND_SUCCESS] : (state, { payload: sms }) => ({
            ...state,
            smsSuccess: true,
            smsError: null,
        }),
         // SMS Send 실패
        [SMS_SEND_FAILURE] : (state, { payload: error }) => ({
            ...state,
            smsError: error,
        }),
   },
   initialState,
);

export default sms;
