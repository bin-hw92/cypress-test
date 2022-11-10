import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as buildingAPI from "../api/building";
import produce from "immer";
import { buildingSuccessProps, CommonProps } from "../types/commons";
import { buildingIdProps, BuildingState, PostBuildingProps } from "../types/building";

/* 빌딩 등록, 수정, 상제 부분 */
const INITIALIZE = 'building/INITIALIZE';
const CHANGE_FINELD = 'building/CHANGE_FIELD'; //데이터 변경용
const CHANGE_RESULT = 'building/CHANGE_RESULT'; //결과값 변경

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [BUILDING_TYPE, BUILDING_TYPE_SUCCESS, BUILDING_TYPE_FAILURE] = createRequestActionTypes('building/BUILDING_TYPE');
const [BUILDING_CREATE, BUILDING_CREATE_SUCCESS, BUILDING_CREATE_FAILURE] = createRequestActionTypes('building/BUILDING_CREATE');
const [BUILDING_DELETE, BUILDING_DELETE_SUCCESS, BUILDING_DELETE_FAILURE] = createRequestActionTypes('building/BUILDING_DELETE');
const [BUILDING_UPDATE, BUILDING_UPDATE_SUCCESS, BUILDING_UPDATE_FAILURE] = createRequestActionTypes('building/BUILDING_UPDATE');
const [BUILDING_SELECT, BUILDING_SELECT_SUCCESS, BUILDING_SELECT_FAILURE] = createRequestActionTypes('building/BUILDING_SELECT');

/* action */
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(
    CHANGE_FINELD,
    ({ key, value }:CommonProps) => ({
        key, // building 내부 > name, buildingtypeId 등
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

//빌딩 타입 목록
export const listBuildingTypeAction = createAction(BUILDING_TYPE);

//빌딩 조회 정보
export const selectBuildingAction = createAction(BUILDING_SELECT, ({ buildingId }:buildingIdProps) => ({
    buildingId
}));

//빌딩 등록 시도
export const createBuildingAction = createAction(BUILDING_CREATE, ({ name, buildingtypeId, commonrooms }:PostBuildingProps) => ({
    name, 
    buildingtypeId,
    commonrooms
}));

//빌딩 수정 시도
export const updateBuildingAction = createAction(BUILDING_UPDATE, ({ buildingId, name, buildingtypeId, commonrooms }:PostBuildingProps) => ({
    buildingId,
    name, 
    buildingtypeId,
    commonrooms
}));

//빌딩 삭제 시도
export const deleteBuildingAction = createAction(BUILDING_DELETE, ({ buildingId }:buildingIdProps) => ({
    buildingId
}));

//사가 생성
const listBuildingTypeSaga = createRequestSaga(BUILDING_TYPE, buildingAPI.listBuildingtype);
const createBuildingSaga = createRequestSaga(BUILDING_CREATE, buildingAPI.createBuilding);
const deleteBuildingSaga = createRequestSaga(BUILDING_DELETE, buildingAPI.deleteBuilding);
const updateBuildingSaga = createRequestSaga(BUILDING_UPDATE, buildingAPI.updateBuilding);
const selectBuildingSaga = createRequestSaga(BUILDING_SELECT, buildingAPI.selectBuilding);

export function* buildingSaga(){
    yield takeLatest(BUILDING_TYPE, listBuildingTypeSaga);
    yield takeLatest(BUILDING_CREATE, createBuildingSaga);
    yield takeLatest(BUILDING_DELETE, deleteBuildingSaga);
    yield takeLatest(BUILDING_UPDATE, updateBuildingSaga);
    yield takeLatest(BUILDING_SELECT, selectBuildingSaga);
}

//initialState
const initialState:BuildingState = {
    building:{
        name: '',
        buildingtypeId: '',
        commonrooms: [],
        createdAt: null,
        updatedAt: null,
    },    
    buildingtype: [{
        id: '',
        name: '',
    }],
    buildingCreateSuccess: false, //등록 성공 관련
    buildingUpdateSuccess: false, //수정 성공 관련
    buildingDeleteSuccess: false, //삭제 성공 관련
    buildingCreateError: null,
    buildingUpdateError: null,
    buildingDeleteError: null,
};

const building = handleActions<BuildingState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FINELD] : (state, { payload: {key, value} }) => 
        produce(state, draft => {
            if(key === 'name') draft.building.name = value;
            if(key === 'buildingtypeId') draft.building.buildingtypeId = value;
            if(key === 'commonrooms') draft.building.commonrooms = value;
        }),
        [CHANGE_RESULT] : (state, { payload: {key, value} }:buildingSuccessProps) => 
        produce(state, draft => {
            draft[key] = value;
        }),
        // 빌딩 타입 조회 성공
        [BUILDING_TYPE_SUCCESS] : (state, { payload: buildingtype }) => ({
            ...state,
            buildingtype: buildingtype,
            buildingCreateError: null,
         }),
         // 빌딩 타입 조회 실패
        [BUILDING_TYPE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            buildingCreateError: error,
         }),
        // 빌딩 등록 화면 조회 성공
        [BUILDING_CREATE_SUCCESS] : (state, { payload: building }) => ({
            ...state,
            building: building,
            buildingCreateSuccess: true,
            buildingCreateError: null,
         }),
        // 빌딩 등록 화면 조회 실패
        [BUILDING_CREATE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            buildingCreateError: error,
        }),
        // 빌딩 삭제 성공
        [BUILDING_DELETE_SUCCESS] : (state, { payload: building }) => ({
            ...state,
            buildingDeleteSuccess: true,
            buildingDeleteError: null,
        }),
        // 빌딩 삭제 실패
        [BUILDING_DELETE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            buildingDeleteError: error,
        }),
        // 빌딩 수정 성공
        [BUILDING_UPDATE_SUCCESS] : (state, { payload: building }) => ({
            ...state,
            buildingUpdateSuccess: true,
            buildingUpdateError: null,
        }),
         // 빌딩 수정 실패
        [BUILDING_UPDATE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            buildingUpdateError: error,
        }),         
        // 빌딩 검색 조회 성공
        [BUILDING_SELECT_SUCCESS] : (state, { payload: buildingselect }) => ({
           ...state,
           building:{
            buildingId: buildingselect.id,
            name: buildingselect.name,
            buildingtypeId: buildingselect.buildingtype_id,
            commonrooms: buildingselect.commonrooms,
            createdAt: buildingselect.created_at,
            updatedAt: buildingselect.updated_at,
           }
        }),
        // 빌딩 검색 조회 실패
        [BUILDING_SELECT_FAILURE] : (state, { payload: error }) => ({
           ...state,
           buildingUpdateError: error,
       }),
   },
   initialState,
);

export default building;
