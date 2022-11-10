import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as roomAPI from "../api/room";
import { currentPageNumberProps, filterItemProps, PaginationItemProps } from "../types/commons";
import { listRoomDetailProps, listRoomProps, roomListState } from "../types/room";

const INITIALIZE = 'roomList/INITIALIZE';
const SET_ROOM_LIST_CURRENT_PAGE_NUMBER = 'roomList/SET_ROOM_LIST_CURRENT_PAGE_NUMBER' as const;
const SET_ROOM_PAGINATION_ITEM = 'roomList/SET_ROOM_PAGINATION_ITEM' as const;
const SET_ROOM_FILTER_ITEM = 'roomList/SET_ROOM_FILTER_ITEM' as const;
const SET_ROOM_INIT_FILTER_ITEM = 'roomList/SET_ROOM_INIT_FILTER_ITEM' as const;
const SET_ROOM_DETAIL = 'roomList/SET_ROOM_DETAIL' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [ROOM_LIST, ROOM_LIST_SUCCESS, ROOM_LIST_FAILURE] = createRequestActionTypes('roomList/ROOM_LIST');
const [ROOM_FLOOR_LIST, ROOM_FLOOR_LIST_SUCCESS, ROOM_FLOOR_LIST_FAILURE] = createRequestActionTypes('roomList/ROOM_FLOOR_LIST');

/* action */
export const initialize = createAction(INITIALIZE);
//호텔 목록 조회 시도
export const listRoomAction = createAction(ROOM_LIST, ({ buildingId, offset, limit, pagination }:listRoomProps) => ({
    buildingId,
    offset,
    limit,
    pagination,
}));
export const listFloorRoomAction = createAction(ROOM_FLOOR_LIST, ({ buildingId, floorId, offset, limit, pagination }:listRoomProps) => ({
    buildingId,
    floorId,
    offset,
    limit,
    pagination,
}));
export const setCurrentPageNumberAction = createAction(SET_ROOM_LIST_CURRENT_PAGE_NUMBER, ({currentPageNumber}:currentPageNumberProps) => ({
    currentPageNumber,
}));
export const setPaginationItemAction = createAction(SET_ROOM_PAGINATION_ITEM, ({paginationItem}:PaginationItemProps) => (
    paginationItem
));
export const setFilterItemAction = createAction(SET_ROOM_FILTER_ITEM, (filterItem:filterItemProps) => ({
    filterItem
}));
export const setInitFilterItemAction = createAction(SET_ROOM_INIT_FILTER_ITEM);
export const setDetailField = createAction(SET_ROOM_DETAIL, ({detailField}:listRoomDetailProps) => ({
    detailField
}));

//사가 생성
const listroomSaga = createRequestSaga(ROOM_LIST, roomAPI.listRoom);
const listfloorroomSaga = createRequestSaga(ROOM_FLOOR_LIST, roomAPI.listFloorRoom);

export function* roomListSaga(){
    yield takeLatest(ROOM_LIST, listroomSaga);
    yield takeLatest(ROOM_FLOOR_LIST, listfloorroomSaga);
}

const initialState:roomListState = {
    roomListTotal: 0,
    roomListItems: [],
    roomfloorListTotal: 0,
    roomfloorListItems: [],
    currentPageNumber: 1,
    paginationItem: {
      offset: 0,
      limit: 50,
    },
    filterItem: {
        buildingId: '',
        floorId: '',
    },
    roomListError: null,
    detailField: {
        buildingId: '',
        floorId: '',
        roomId: '',
    }
};
  
const roomList = handleActions<roomListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 층 목록 조회 성공
        [ROOM_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            roomListTotal: total,
            roomListItems: items,
            roomListError: null,
         }),
         [ROOM_FLOOR_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            roomfloorListTotal: total,
            roomfloorListItems: items,
            roomListError: null,
         }),
         // 층 목록 조회 실패
         [ROOM_LIST_FAILURE] : (state, { payload: error }) => ({
            ...state,
            roomListError: error,
        }),
         // 목록 조회 실패
         [ROOM_FLOOR_LIST_FAILURE] : (state, { payload: error }) => ({
            ...state,
            roomListError: error,
        }),
        // 층 현재 페이지
        [SET_ROOM_LIST_CURRENT_PAGE_NUMBER] : (state, { payload: {currentPageNumber} }) => ({
            ...state,
            currentPageNumber: currentPageNumber,
        }),
        // 층 페이지네이션
        [SET_ROOM_PAGINATION_ITEM] : (state, { payload: paginationItem }) => ({
            ...state,
            paginationItem: paginationItem,
        }),
        // 층 필터
        [SET_ROOM_FILTER_ITEM] : (state, { payload: filter }) => ({
            ...state,
            filterItem: filter.filterItem,
        }),
        //필터 초기화
        [SET_ROOM_INIT_FILTER_ITEM] : (state) => ({
            ...state,
            filterItem: {
                buildingId: '',
                floorId: '',
            },
        }),
        // detail 접근 시 필드 저장
        [SET_ROOM_DETAIL] : (state, { payload: detailField }) => ({
            ...state,
            detailField: detailField.detailField,
        }),
   },
   initialState,
);

export default roomList;
