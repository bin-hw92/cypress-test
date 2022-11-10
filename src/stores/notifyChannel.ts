import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as notifyChannelAPI from "../api/notifyChannel";
import produce from "immer";
import { CommonProps, notifyChannelSuccessProps } from "../types/commons";
import { channelIdPRops, notifyChannelState, PostNotifyChannelProps } from "../types/notifyChannel";

/* 호텔 등록, 수정, 상제 부분 */
const INITIALIZE = 'notifyChannel/INITIALIZE';
const CHANGE_FINELD = 'notifyChannel/CHANGE_FIELD'; //데이터 변경용
const CHANGE_RESULT = 'notifyChannel/CHANGE_RESULT'; //결과값 변경

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [NOTIFY_CHANNEL_CREATE, NOTIFY_CHANNEL_CREATE_SUCCESS, NOTIFY_CHANNEL_CREATE_FAILURE] = createRequestActionTypes('notifyChannel/NOTIFY_CHANNEL_CREATE');
const [NOTIFY_CHANNEL_DELETE, NOTIFY_CHANNEL_DELETE_SUCCESS, NOTIFY_CHANNEL_DELETE_FAILURE] = createRequestActionTypes('notifyChannel/NOTIFY_CHANNEL_DELETE');
const [NOTIFY_CHANNEL_UPDATE, NOTIFY_CHANNEL_UPDATE_SUCCESS, NOTIFY_CHANNEL_UPDATE_FAILURE] = createRequestActionTypes('notifyChannel/NOTIFY_CHANNEL_UPDATE');
const [NOTIFY_CHANNEL_SELECT, NOTIFY_CHANNEL_SELECT_SUCCESS, NOTIFY_CHANNEL_SELECT_FAILURE] = createRequestActionTypes('notifyChannel/NOTIFY_CHANNEL_SELECT');

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

export const selectnotifyChannelAction = createAction(NOTIFY_CHANNEL_SELECT, ({ channelId }:channelIdPRops) => ({
    channelId
}));

//채널 등록 시도
export const createnotifyChannelAction = createAction(NOTIFY_CHANNEL_CREATE, ({ name, type, config, isDefault }:PostNotifyChannelProps) => ({
    name, 
    type, 
    config, 
    isDefault,
}));

//채널 수정 시도
export const updatenotifyChannelAction = createAction(NOTIFY_CHANNEL_UPDATE, ({ channelId, name, type, config, isDefault }:PostNotifyChannelProps) => ({
    channelId, 
    name, 
    type, 
    config, 
    isDefault,
}));

export const deletenotifyChannelAction = createAction(NOTIFY_CHANNEL_DELETE, ({ channelId }:channelIdPRops) => ({
    channelId
}));

//사가 생성
const createnotifyChannelSaga = createRequestSaga(NOTIFY_CHANNEL_CREATE, notifyChannelAPI.createNotifyChannel);
const deletenotifyChannelSaga = createRequestSaga(NOTIFY_CHANNEL_DELETE, notifyChannelAPI.deleteNotifyChannel);
const updatenotifyChannelSaga = createRequestSaga(NOTIFY_CHANNEL_UPDATE, notifyChannelAPI.updateNotifyChannel);
const selectnotifyChannelSaga = createRequestSaga(NOTIFY_CHANNEL_SELECT, notifyChannelAPI.selectNotifyChannel);

export function* notifyChannelSaga(){
    yield takeLatest(NOTIFY_CHANNEL_CREATE, createnotifyChannelSaga);
    yield takeLatest(NOTIFY_CHANNEL_DELETE, deletenotifyChannelSaga);
    yield takeLatest(NOTIFY_CHANNEL_UPDATE, updatenotifyChannelSaga);
    yield takeLatest(NOTIFY_CHANNEL_SELECT, selectnotifyChannelSaga);
}

const initialState:notifyChannelState = {
    notifyChannel:{
        name: '',
        isDefault: false,
        type: '',
        config: {
          user_code: '',
          dept_code: '',
          calling_number: '',
          yellowid_key: '',
        },
    },
    notifyChannelCreateSuccess: false, //등록 성공 관련
    notifyChannelUpdateSuccess: false, //수정 성공 관련
    notifyChannelDeleteSuccess: false, //삭제 성공 관련
    notifyChannelCreateError: null,
    notifyChannelUpdateError: null,
    notifyChannelDeleteError: null,
};
  
const notifyChannel = handleActions<notifyChannelState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FINELD] : (state, { payload: {key, value} }) => 
        produce(state, draft => {
            if(key === 'name') draft.notifyChannel.name = value;
            if(key === 'type') draft.notifyChannel.type = value;
            if(key === 'isDefault') draft.notifyChannel.isDefault = value;
            if(key === 'user_code') draft.notifyChannel.config.user_code = value;
            if(key === 'dept_code') draft.notifyChannel.config.dept_code = value;
            if(key === 'calling_number') draft.notifyChannel.config.calling_number = value;
            if(key === 'yellowid_key') draft.notifyChannel.config.yellowid_key = value;
        }),
        [CHANGE_RESULT] : (state, { payload: {key, value} }:notifyChannelSuccessProps) => 
        produce(state, draft => {
            draft[key] = value;
        }),
        // 알림 채널 등록 화면 조회 성공
        [NOTIFY_CHANNEL_CREATE_SUCCESS] : (state, { payload: notifyChannel }) => ({
            ...state,
            notifyChannel: notifyChannel,
            notifyChannelCreateSuccess: true,
            notifyChannelCreateError: null,
         }),
         // 알림 채널 등록 화면 조회 실패
          [NOTIFY_CHANNEL_CREATE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             notifyChannelCreateError: error,
         }),
         // 알림 채널 삭제 성공
         [NOTIFY_CHANNEL_DELETE_SUCCESS] : (state, { payload: notifyChannel }) => ({
             ...state,
             notifyChannelDeleteSuccess: true,
             notifyChannelDeleteError: null,
        }),
         // 알림 채널 삭제 실패
        [NOTIFY_CHANNEL_DELETE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             notifyChannelDeleteError: error,
        }),
        // 알림 채널 수정 성공
        [NOTIFY_CHANNEL_UPDATE_SUCCESS] : (state, { payload: notifyChannel }) => ({
            ...state,
            notifyChannelUpdateSuccess: true,
            notifyChannelUpdateError: null,
        }),
         // 알림 채널 수정 실패
        [NOTIFY_CHANNEL_UPDATE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            notifyChannelDeleteError: error,
        }),         
        // 알림 채널 검색 조회 성공
        [NOTIFY_CHANNEL_SELECT_SUCCESS] : (state, { payload: notifyChannelSelect }) => ({
           ...state,
           notifyChannel: {
                channelId: notifyChannelSelect.id,
                name: notifyChannelSelect.name,
                isDefault: notifyChannelSelect.is_default,
                type: notifyChannelSelect.type,
                config: {
                    user_code: notifyChannelSelect.config? notifyChannelSelect.config.user_code : '',
                    dept_code: notifyChannelSelect.config? notifyChannelSelect.config.dept_code : '',
                    calling_number: notifyChannelSelect.config? notifyChannelSelect.config.calling_number : '',
                    yellowid_key: notifyChannelSelect.config? notifyChannelSelect.config.yellowid_key : '',
                },
                createdAt: notifyChannelSelect.created_at,
                updatedAt: notifyChannelSelect.updated_at,
                hotels: notifyChannelSelect.hotels,
           }
        }),
        // 알림 채널 검색 조회 실패
        [NOTIFY_CHANNEL_SELECT_FAILURE] : (state, { payload: error }) => ({
           ...state,
           notifyChannelUpdateError: error,
       }),
   },
   initialState,
);

export default notifyChannel;
