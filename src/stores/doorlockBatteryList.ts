import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as doorlockAPI from "../api/doorlock";
import _ from "lodash";
import { CommonProps, doorlockBatterySuccessProps, filterItemProps } from "../types/commons";
import produce from "immer";
import { DoorlockBatteryListState, listDoorlockBatteryLogProps } from "../types/doorlock";

/* 등록, 수정, 상제 부분 */
const INITIALIZE = 'doorlockBatteryList/INITIALIZE';
const CHANGE_RESULT = 'doorlock/CHANGE_RESULT'; //결과값 변경
const SET_DOORLOCKBATTERY_FILTER_ITEM = 'doorlockBatteryList/SET_DOORLOCKBATTERY_FILTER_ITEM' as const;
const SET_DOORLOCKBATTERY_INIT_FILTER_ITEM = 'doorlockBatteryList/SET_DOORLOCKBATTERY_INIT_FILTER_ITEM' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [DOORLOCKBATTERY_LIST, DOORLOCKBATTERY_LIST_SUCCESS, DOORLOCKBATTERY_LIST_FAILURE] = createRequestActionTypes('doorlockBatteryList/DOORLOCKBATTERY_LIST');

/* action */
export const initialize = createAction(INITIALIZE);

export const changeResult = createAction(
    CHANGE_RESULT,
    ({ key, value }:CommonProps) => ({
        key, // building success, error 변경
        value, // 실제 바꾸려는 값
    }),
);
export const listDoorlockBatteryAction = createAction(DOORLOCKBATTERY_LIST, ({ hotelId, doorlockId, startAt, endAt }:listDoorlockBatteryLogProps) => ({
    hotelId,
    doorlockId, 
    startAt, 
    endAt
}));
export const setFilterBatteryItemAction = createAction(SET_DOORLOCKBATTERY_FILTER_ITEM, (filterItem:filterItemProps) => ({
    filterItem
}));
export const setInitFilterItemAction = createAction(SET_DOORLOCKBATTERY_INIT_FILTER_ITEM);

//사가 생성
const listDoorlockBatterySaga = createRequestSaga(DOORLOCKBATTERY_LIST, doorlockAPI.listDoorlockBatteryLog);

export function* doorlockBatteryListSaga(){
    yield takeLatest(DOORLOCKBATTERY_LIST, listDoorlockBatterySaga);
}

const initialState:DoorlockBatteryListState = {
    doorlockBatteryListItems: [],//배터리 목록
    filterItem: {
        startAt: '',
        endAt: '',
    },
    doorlockBatteryListSuccess: false,
    doorlockBatteryListError: null,
};
  
const doorlockBatteryList = handleActions<DoorlockBatteryListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_RESULT] : (state, { payload: {key, value} }:doorlockBatterySuccessProps) => 
        produce(state, draft => {
            draft[key] = value;
        }),
        [DOORLOCKBATTERY_LIST_SUCCESS] : (state, { payload: items }) => ({
            ...state,
            doorlockBatteryListItems: _.sortBy(items, ['created_at']), //등록일 오름차순으로 정렬
            doorlockBatteryListError: null,
        }),
        // 배터리 목록 조회 실패
        [DOORLOCKBATTERY_LIST_FAILURE] : (state, { payload: error }) => ({
            ...state,
            doorlockBatteryListError: error,
        }),
        // 도어락 필터 (BATTERY)
        [SET_DOORLOCKBATTERY_FILTER_ITEM] : (state, { payload: filter }) => ({
            ...state,
            filterItem: filter.filterItem,
        }),
        // 필터 초기화
        [SET_DOORLOCKBATTERY_INIT_FILTER_ITEM] : (state) => ({
            ...state,
            filterItem: {
                startAt: null,
                endAt: null,
            }
        }),
   },
   initialState,
);

export default doorlockBatteryList;
