import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as commonroomAPI from "../api/commonroom";
import { commonroomState, listCommonProps } from "../types/commonroom";

const INITIALIZE = 'commonroom/INITIALIZE';

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [COMMONROOM_LIST, COMMONROOM_LIST_SUCCESS, COMMONROOM_LIST_FAILURE] = createRequestActionTypes('commonroom/COMMONROOM_LIST');
const [COMMONROOM_BUILDING_LIST, COMMONROOM_BUILDING_LIST_SUCCESS, COMMONROOM_BUILDING_LIST_FAILURE] = createRequestActionTypes('commonroom/COMMONROOM_BUILDING_LIST');

/* action */
export const initialize = createAction(INITIALIZE);

//공용 목록 조회 시도
export const listCommonRoomAction = createAction(COMMONROOM_LIST);

export const listCommonRoomBuildingAction = createAction(COMMONROOM_BUILDING_LIST, ({ buildingId }:listCommonProps) => ({
  buildingId, 
}));

//사가 생성
const listCommonRoomSaga = createRequestSaga(COMMONROOM_LIST, commonroomAPI.listCommonroomDoorlock);
const listCommonRoomBuildingSaga = createRequestSaga(COMMONROOM_BUILDING_LIST, commonroomAPI.listCommonroom);

export function* commonroomSaga(){
  yield takeLatest(COMMONROOM_LIST, listCommonRoomSaga);
  yield takeLatest(COMMONROOM_BUILDING_LIST, listCommonRoomBuildingSaga);
}

const initialState:commonroomState = {
  commonroomItems: [],
  commonroomError: null,
  commonroomBuildingItems: [],
  commonroomBuildingError: null,
};
  
const commonroom = handleActions<commonroomState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 공용 목록 조회 성공
        [COMMONROOM_LIST_SUCCESS] : (state, { payload: commonItem }) => ({
          ...state,
          commonroomItems: commonItem,
          commonroomError: null,
        }),
        // 공용 목록 조회 실패
        [COMMONROOM_LIST_FAILURE] : (state, { payload: error }) => ({
          ...state,
          commonroomError: error,
        }),
        // 공용 목록 조회 성공
        [COMMONROOM_BUILDING_LIST_SUCCESS] : (state, { payload: commonItem }) => ({
          ...state,
          commonroomBuildingItems: commonItem,
          commonroomBuildingError: null,
        }),
        // 공용 목록 조회 실패
        [COMMONROOM_BUILDING_LIST_FAILURE] : (state, { payload: error }) => ({
          ...state,
          commonroomBuildingError: error,
        }),
   },
   initialState,
);

export default commonroom;
