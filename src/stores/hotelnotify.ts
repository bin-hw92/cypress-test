import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as hotelnotifyAPI from "../api/hotelnotify";
import produce from "immer";
import { CommonProps, hotelnotifySuccessProps } from "../types/commons";
import { HotelNotifyState, hotelTemplateIdProps, PostHotelNotifyProps } from "../types/hotelnotify";

/* 호텔 등록, 수정, 상제 부분 */
const INITIALIZE = 'hotelnotify/INITIALIZE';
const CHANGE_FINELD = 'hotelnotify/CHANGE_FIELD'; //데이터 변경용
const CHANGE_RESULT = 'hotelnotify/CHANGE_RESULT'; //결과값 변경

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [HOTELNOTIFY_CREATE, HOTELNOTIFY_CREATE_SUCCESS, HOTELNOTIFY_CREATE_FAILURE] = createRequestActionTypes('hotelnotify/HOTELNOTIFY_CREATE');
const [HOTELNOTIFY_DELETE, HOTELNOTIFY_DELETE_SUCCESS, HOTELNOTIFY_DELETE_FAILURE] = createRequestActionTypes('hotelnotify/HOTELNOTIFY_DELETE');

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

//등록 시도
export const createhotelnotifyAction = createAction(HOTELNOTIFY_CREATE, ({ hotelId, notifyTemplateId, notifyContext }:PostHotelNotifyProps) => ({
    hotelId, 
    notifyTemplateId, 
    notifyContext
}));

export const deletehotelnotifyAction = createAction(HOTELNOTIFY_DELETE, ({ hotelTemplateId }:hotelTemplateIdProps) => ({
    hotelTemplateId
}));

//사가 생성
const createhotelnotifySaga = createRequestSaga(HOTELNOTIFY_CREATE, hotelnotifyAPI.createHotelNotifyTemplate);
const deletehotelnotifySaga = createRequestSaga(HOTELNOTIFY_DELETE, hotelnotifyAPI.deleteHotelNotifyTemplate);

export function* hotelnotifySaga(){
    yield takeLatest(HOTELNOTIFY_CREATE, createhotelnotifySaga);
    yield takeLatest(HOTELNOTIFY_DELETE, deletehotelnotifySaga);
}

const initialState:HotelNotifyState = {
    hotelnotify:{
        hotelId: '',
        notifyContext: '',
        notifyTemplateId: '',
    },
    hotelnotifyCreateSuccess: false, //등록 성공 관련
    hotelnotifyDeleteSuccess: false, //삭제 성공 관련
    hotelnotifyCreateError: null,
    hotelnotifyDeleteError: null,
};
  
const hotelnotify = handleActions<HotelNotifyState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FINELD] : (state, { payload: {key, value} }) => 
        produce(state, draft => {
            if(key === 'notifyContext') draft.hotelnotify.notifyContext = value;
            if(key === 'notifyTemplateId') draft.hotelnotify.notifyTemplateId = value;
            if(key === 'hotelId') draft.hotelnotify.hotelId = value;
        }),
        [CHANGE_RESULT] : (state, { payload: {key, value} }:hotelnotifySuccessProps) => 
        produce(state, draft => {
            draft[key] = value;
        }),
        // 층 등록 화면 조회 성공
        [HOTELNOTIFY_CREATE_SUCCESS] : (state, { payload: hotelnotify }) => ({
            ...state,
            hotelnotify: hotelnotify,
            hotelnotifyCreateSuccess: true,
            hotelnotifyCreateError: null,
         }),
         // 층 등록 화면 조회 실패
          [HOTELNOTIFY_CREATE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             hotelnotifyCreateError: error,
         }),
         // 층 삭제 성공
         [HOTELNOTIFY_DELETE_SUCCESS] : (state, { payload: hotelnotify }) => ({
             ...state,
             hotelnotifyDeleteSuccess: true,
             hotelnotifyDeleteError: null,
        }),
         // 층 삭제 실패
        [HOTELNOTIFY_DELETE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             hotelnotifyDeleteError: error,
        }),
   },
   initialState,
);

export default hotelnotify;
