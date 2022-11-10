import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as doorlockAPI from "../api/doorlock";
import produce from "immer";
import { CommonProps, doorlockSuccessProps } from "../types/commons";
import { doorlockIdProps, DoorlockState } from "../types/doorlock";

/* 등록, 수정, 상제 부분 */
const INITIALIZE = 'doorlock/INITIALIZE';
const CHANGE_FINELD = 'doorlock/CHANGE_FIELD'; //데이터 변경용
const CHANGE_RESULT = 'doorlock/CHANGE_RESULT'; //결과값 변경

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [DOORLOCK_UNINSTALL, DOORLOCK_UNINSTALL_SUCCESS, DOORLOCK_UNINSTALL_FAILURE] = createRequestActionTypes('doorlock/DOORLOCK_UNINSTALL');
const [DOORLOCK_SELECT, DOORLOCK_SELECT_SUCCESS, DOORLOCK_SELECT_FAILURE] = createRequestActionTypes('doorlock/DOORLOCK_SELECT');

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

export const selectDoorlockAction = createAction(DOORLOCK_SELECT, ({ hotelId, doorlockId }:doorlockIdProps) => ({
    hotelId,
    doorlockId,
}));

export const uninstallDoorlockAction = createAction(DOORLOCK_UNINSTALL, ({ hotelId, doorlockId }:doorlockIdProps) => ({
    hotelId,
    doorlockId,
}));

//사가 생성
const uninstallDoorlockSaga = createRequestSaga(DOORLOCK_UNINSTALL, doorlockAPI.uninstallDoorlock);
const selectDoorlockSaga = createRequestSaga(DOORLOCK_SELECT, doorlockAPI.selectDoorlock);

export function* doorlockSaga(){
    yield takeLatest(DOORLOCK_UNINSTALL, uninstallDoorlockSaga);
    yield takeLatest(DOORLOCK_SELECT, selectDoorlockSaga);
}

const initialState:DoorlockState = {
    doorlock:{
        name: '',
        type: null,
        serial: '',
        buildingName: '',
        floorName: '',
        status: null,
        fwVersion: '',
        fwBattery: '',
        fwType: null,
        createdAt: null,
        updatedAt: null,
    },
    doorlockUninstallSuccess: false, //언인스톨 성공 관련
    doorlockUninstallError: null,
    doorlockUpdateError: null,
};
  
const doorlock = handleActions<DoorlockState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FINELD] : (state, { payload: {key, value} }) => 
        produce(state, draft => {
            if(key === 'name') draft.doorlock.name = value;
        }),
        [CHANGE_RESULT] : (state, { payload: {key, value} }:doorlockSuccessProps) => 
        produce(state, draft => {
            draft[key] = value;
        }),
         // 도어락 언인스톨 성공
         [DOORLOCK_UNINSTALL_SUCCESS] : (state, { payload: doorlock }) => ({
             ...state,
             doorlockUninstallSuccess: true,
             doorlockUninstallError: null,
        }),
         // 도어락 언인스톨 실패
        [DOORLOCK_UNINSTALL_FAILURE] : (state, { payload: error }) => ({
             ...state,
             doorlockUninstallError: error,
        }), 
        // 도어락 검색 조회 성공
        [DOORLOCK_SELECT_SUCCESS] : (state, { payload: doorlockSelect }) => ({
           ...state,
           doorlock:{
                name: doorlockSelect.name,
                type: doorlockSelect.type,
                serial: doorlockSelect.dl_serial,
                buildingName: doorlockSelect.building_name,
                floorName: doorlockSelect.floor_name,
                status: doorlockSelect.status,
                fwVersion: doorlockSelect.fw_version,
                fwBattery: doorlockSelect.fw_battery,
                fwType: doorlockSelect.fw_type,
                createdAt: doorlockSelect.created_at,
                updatedAt: doorlockSelect.updated_at,
           }
        }),
        // 도어락 검색 조회 실패
        [DOORLOCK_SELECT_FAILURE] : (state, { payload: error }) => ({
           ...state,
           doorlockUpdateError: error,
       }),
   },
   initialState,
);

export default doorlock;
