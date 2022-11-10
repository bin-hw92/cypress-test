import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as keytagAPI from "../api/keytag";
import produce from "immer";
import { CommonProps, keytagSuccessProps } from "../types/commons";
import { keytagIdProps, KeytagState, PostKeytagProps } from "../types/keytag";

/* 객실 등록, 수정, 상제 부분 */
const INITIALIZE = 'keytag/INITIALIZE';
const CHANGE_FINELD = 'keytag/CHANGE_FIELD'; //데이터 변경용
const CHANGE_RESULT = 'keytag/CHANGE_RESULT'; //결과값 변경

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [KEYTAG_CREATE, KEYTAG_CREATE_SUCCESS, KEYTAG_CREATE_FAILURE] = createRequestActionTypes('keytag/KEYTAG_CREATE');
const [KEYTAG_DELETE, KEYTAG_DELETE_SUCCESS, KEYTAG_DELETE_FAILURE] = createRequestActionTypes('keytag/KEYTAG_DELETE');
const [KEYTAG_UPDATE, KEYTAG_UPDATE_SUCCESS, KEYTAG_UPDATE_FAILURE] = createRequestActionTypes('keytag/KEYTAG_UPDATE');
const [KEYTAG_SELECT, KEYTAG_SELECT_SUCCESS, KEYTAG_SELECT_FAILURE] = createRequestActionTypes('keytag/KEYTAG_SELECT');

/* action */
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(
    CHANGE_FINELD,
    ({ key, value }:CommonProps) => ({
        key, // keytag 내부 > name, keytagId 등
        value, // 실제 바꾸려는 값
    }),
);

export const changeResult = createAction(
    CHANGE_RESULT,
    ({ key, value }:CommonProps) => ({
        key, // keytag success, error 변경
        value, // 실제 바꾸려는 값
    }),
);

//객실 조회 정보
export const selectKeytagAction = createAction(KEYTAG_SELECT, ({ buildingId, floorId, roomId, keytagId }:keytagIdProps) => ({
    buildingId, 
    floorId,
    roomId,
    keytagId,
}));

//객실 등록 시도
export const createKeytagAction = createAction(KEYTAG_CREATE, ({ buildingId, floorId, roomId, name, delayMs, isMobilekeyIssuable, keytagOpMode, enterAlarmCount, enterWaitingSec, exitAlarmCount, exitWaitingSec, allowSound, soundVolume, languageType }:PostKeytagProps) => ({
    buildingId, 
    floorId, 
    roomId, 
    name, 
    delayMs, 
    isMobilekeyIssuable, 
    keytagOpMode, 
    enterAlarmCount, 
    enterWaitingSec, 
    exitAlarmCount, 
    exitWaitingSec, 
    allowSound, 
    soundVolume, 
    languageType 
}));

//객실 수정 시도
export const updateKeytagAction = createAction(KEYTAG_UPDATE, ({ buildingId, floorId, roomId, keytagId, name, delayMs, isMobilekeyIssuable, keytagOpMode, enterAlarmCount, enterWaitingSec, exitAlarmCount, exitWaitingSec, allowSound, soundVolume, languageType }:PostKeytagProps) => ({
    buildingId, 
    floorId,
    roomId, 
    keytagId,
    name, 
    delayMs, 
    isMobilekeyIssuable, 
    keytagOpMode, 
    enterAlarmCount, 
    enterWaitingSec, 
    exitAlarmCount, 
    exitWaitingSec, 
    allowSound, 
    soundVolume, 
    languageType
}));

//객실 삭제 시도
export const deleteKeytagAction = createAction(KEYTAG_DELETE, ({ buildingId, floorId, roomId, keytagId }:keytagIdProps) => ({
    buildingId, 
    floorId, 
    roomId,
    keytagId,
}));

//사가 생성
const createKeytagSaga = createRequestSaga(KEYTAG_CREATE, keytagAPI.createKeytag);
const deleteKeytagSaga = createRequestSaga(KEYTAG_DELETE, keytagAPI.deleteKeytag);
const updateKeytagSaga = createRequestSaga(KEYTAG_UPDATE, keytagAPI.updateKeytag);
const selectKeytagSaga = createRequestSaga(KEYTAG_SELECT, keytagAPI.selectKeytag);

export function* keytagSaga(){
    yield takeLatest(KEYTAG_CREATE, createKeytagSaga);
    yield takeLatest(KEYTAG_DELETE, deleteKeytagSaga);
    yield takeLatest(KEYTAG_UPDATE, updateKeytagSaga);
    yield takeLatest(KEYTAG_SELECT, selectKeytagSaga);
}

const initialState:KeytagState = {
    keytag:{
        name: '',
        delayMs: '15000',
        isMobilekeyIssuable: false,
        keytagOpMode: 0,
        enterAlarmCount: 1,
        enterWaitingSec: 0,
        exitAlarmCount: 1,
        exitWaitingSec: 0,
        allowSound: false,
        soundVolume: 0,
        languageType: 1,
    },
    keytagCreateSuccess: false, //등록 성공 관련
    keytagUpdateSuccess: false, //수정 성공 관련
    keytagDeleteSuccess: false, //삭제 성공 관련
    keytagCreateError: null,
    keytagUpdateError: null,
    keytagDeleteError: null,
};

const keytag = handleActions<KeytagState, any>(
   {
    [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
    [CHANGE_FINELD] : (state, { payload: {key, value} }) => 
    produce(state, draft => {
        if(key === 'name') draft.keytag.name = value;
        if(key === 'delayMs') draft.keytag.delayMs = value;
        if(key === 'isMobilekeyIssuable') draft.keytag.isMobilekeyIssuable = value;
        if(key === 'keytagOpMode') draft.keytag.keytagOpMode = value;
        if(key === 'enterAlarmCount') draft.keytag.enterAlarmCount = value;
        if(key === 'enterWaitingSec') draft.keytag.enterWaitingSec = value;
        if(key === 'exitAlarmCount') draft.keytag.exitAlarmCount = value;
        if(key === 'exitWaitingSec') draft.keytag.exitWaitingSec = value;
        if(key === 'allowSound') draft.keytag.allowSound = value;
        if(key === 'soundVolume') draft.keytag.soundVolume = value;
        if(key === 'languageType') draft.keytag.languageType = value;
    }),
    [CHANGE_RESULT] : (state, { payload: {key, value} }:keytagSuccessProps) => 
    produce(state, draft => {
        draft[key] = value;
    }),
    // 객실 등록 화면 조회 성공
    [KEYTAG_CREATE_SUCCESS] : (state, { payload: keytag }) => ({
        ...state,
        keytag: keytag,
        keytagCreateSuccess: true,
        keytagCreateError: null,
     }),
    // 객실 등록 화면 조회 실패
    [KEYTAG_CREATE_FAILURE] : (state, { payload: error }) => ({
        ...state,
        keytagCreateError: error,
    }),
    // 객실 삭제 성공
    [KEYTAG_DELETE_SUCCESS] : (state, { payload: keytag }) => ({
        ...state,
        keytagDeleteSuccess: true,
        keytagDeleteError: null,
    }),
    // 객실 삭제 실패
    [KEYTAG_DELETE_FAILURE] : (state, { payload: error }) => ({
        ...state,
        keytagDeleteError: error,
    }),
    // 객실 수정 성공
    [KEYTAG_UPDATE_SUCCESS] : (state, { payload: keytag }) => ({
        ...state,
        keytagUpdateSuccess: true,
        keytagUpdateError: null,
    }),
     // 객실 수정 실패
    [KEYTAG_UPDATE_FAILURE] : (state, { payload: error }) => ({
        ...state,
        keytagUpdateError: error,
    }),         
     // 객실 검색 조회 성공
    [KEYTAG_SELECT_SUCCESS] : (state, { payload: keytagselect }) => ({
       ...state,
       keytag:{
        keytagId: keytagselect.id,        
        name: keytagselect.name,
        delayMs: keytagselect.delay_ms,
        isMobilekeyIssuable: keytagselect.is_mobilekey_issuable,
        keytagOpMode: keytagselect.keytag_op_mode,
        enterAlarmCount: keytagselect.enter_alarm_count,
        enterWaitingSec: keytagselect.enter_waiting_sec,
        exitAlarmCount: keytagselect.exit_alarm_count,
        exitWaitingSec: keytagselect.exit_waiting_sec,
        allowSound: keytagselect.allow_sound,
        soundVolume: keytagselect.sound_volume,
        languageType: keytagselect.language_type,
       }
    }),
    // 객실 검색 조회 실패
    [KEYTAG_SELECT_FAILURE] : (state, { payload: error }) => ({
       ...state,
       keytagUpdateError: error,
   }),
   },
   initialState,
);

export default keytag;
