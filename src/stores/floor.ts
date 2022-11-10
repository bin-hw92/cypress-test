import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as floorAPI from "../api/floor";
import produce from "immer";
import { CommonProps, floorSuccessProps } from "../types/commons";
import { floorIdProps, FloorState, PostFloorProps } from "../types/floor";

/* 호텔 등록, 수정, 상제 부분 */
const INITIALIZE = 'floor/INITIALIZE';
const CHANGE_FINELD = 'floor/CHANGE_FIELD'; //데이터 변경용
const CHANGE_RESULT = 'floor/CHANGE_RESULT'; //결과값 변경

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [FLOOR_CREATE, FLOOR_CREATE_SUCCESS, FLOOR_CREATE_FAILURE] = createRequestActionTypes('floor/FLOOR_CREATE');
const [FLOOR_DELETE, FLOOR_DELETE_SUCCESS, FLOOR_DELETE_FAILURE] = createRequestActionTypes('floor/FLOOR_DELETE');
const [FLOOR_UPDATE, FLOOR_UPDATE_SUCCESS, FLOOR_UPDATE_FAILURE] = createRequestActionTypes('floor/FLOOR_UPDATE');
const [FLOOR_SELECT, FLOOR_SELECT_SUCCESS, FLOOR_SELECT_FAILURE] = createRequestActionTypes('floor/FLOOR_SELECT');

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

export const selectFloorAction = createAction(FLOOR_SELECT, ({ buildingId, floorId }:floorIdProps) => ({
    buildingId,
    floorId,
}));

//호텔 등록 시도
export const createFloorAction = createAction(FLOOR_CREATE, ({ buildingId, name }:PostFloorProps) => ({
    buildingId,
    name, 
}));

//호텔 수정 시도
export const updateFloorAction = createAction(FLOOR_UPDATE, ({ buildingId, floorId, name }:PostFloorProps) => ({
    buildingId, 
    floorId, 
    name,
}));

export const deleteFloorAction = createAction(FLOOR_DELETE, ({ buildingId, floorId }:floorIdProps) => ({
    buildingId, 
    floorId,
}));

//사가 생성
const createFloorSaga = createRequestSaga(FLOOR_CREATE, floorAPI.createFloor);
const deleteFloorSaga = createRequestSaga(FLOOR_DELETE, floorAPI.deleteFloor);
const updateFloorSaga = createRequestSaga(FLOOR_UPDATE, floorAPI.updateFloor);
const selectFloorSaga = createRequestSaga(FLOOR_SELECT, floorAPI.selectFloor);

export function* floorSaga(){
    yield takeLatest(FLOOR_CREATE, createFloorSaga);
    yield takeLatest(FLOOR_DELETE, deleteFloorSaga);
    yield takeLatest(FLOOR_UPDATE, updateFloorSaga);
    yield takeLatest(FLOOR_SELECT, selectFloorSaga);
}

//initialState
const initialState:FloorState = {
    floor:{
        name: '',
        buildingName: '',
        createdAt: null,
        updatedAt: null,
    },
    floorCreateSuccess: false, //등록 성공 관련
    floorUpdateSuccess: false, //수정 성공 관련
    floorDeleteSuccess: false, //삭제 성공 관련
    floorCreateError: null,
    floorUpdateError: null,
    floorDeleteError: null,
};
  
const floor = handleActions<FloorState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FINELD] : (state, { payload: {key, value} }) => 
        produce(state, draft => {
            if(key === 'name') draft.floor.name = value;
        }),
        [CHANGE_RESULT] : (state, { payload: {key, value} }:floorSuccessProps) => 
        produce(state, draft => {
            draft[key] = value;
        }),
        // 층 등록 화면 조회 성공
        [FLOOR_CREATE_SUCCESS] : (state, { payload: floor }) => ({
            ...state,
            floor: floor,
            floorCreateSuccess: true,
            floorCreateError: null,
         }),
         // 층 등록 화면 조회 실패
          [FLOOR_CREATE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             floorCreateError: error,
         }),
         // 층 삭제 성공
         [FLOOR_DELETE_SUCCESS] : (state, { payload: floor }) => ({
             ...state,
             floorDeleteSuccess: true,
             floorDeleteError: null,
        }),
         // 층 삭제 실패
        [FLOOR_DELETE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             floorDeleteError: error,
        }),
        // 층 수정 성공
        [FLOOR_UPDATE_SUCCESS] : (state, { payload: floor }) => ({
            ...state,
            floorUpdateSuccess: true,
            floorUpdateError: null,
        }),
         // 층 수정 실패
        [FLOOR_UPDATE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            floorDeleteError: error,
        }),         
        // 층 검색 조회 성공
        [FLOOR_SELECT_SUCCESS] : (state, { payload: floorSelect }) => ({
           ...state,
           floor:{
                name: floorSelect.name,
                buildingName: floorSelect.building_name,
                createdAt: floorSelect.created_at,
                updatedAt: floorSelect.updated_at,
           }
        }),
        // 층 검색 조회 실패
        [FLOOR_SELECT_FAILURE] : (state, { payload: error }) => ({
           ...state,
           floorUpdateError: error,
       }),
   },
   initialState,
);

export default floor;
