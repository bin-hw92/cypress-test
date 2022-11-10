import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as floorAPI from "../api/floor";
import { currentPageNumberProps, filterItemProps, PaginationItemProps } from "../types/commons";
import { floorListState, listFloorDetailProps, listFloorProps } from "../types/floor";

const INITIALIZE = 'floorList/INITIALIZE';
const SET_FLOOR_LIST_CURRENT_PAGE_NUMBER = 'floorList/SET_FLOOR_LIST_CURRENT_PAGE_NUMBER' as const;
const SET_FLOOR_PAGINATION_ITEM = 'floorList/SET_FLOOR_PAGINATION_ITEM' as const;
const SET_FLOOR_FILTER_ITEM = 'floorList/SET_FLOOR_FILTER_ITEM' as const;
const SET_FLOOR_INIT_FILTER_ITEM = 'floorList/SET_FLOOR_INIT_FILTER_ITEM' as const;
const SET_FLOOR_DETAIL = 'floorList/SET_FLOOR_DETAIL' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [FLOOR_LIST, FLOOR_LIST_SUCCESS, FLOOR_LIST_FAILURE] = createRequestActionTypes('floorList/FLOOR_LIST');

/* action */
export const initialize = createAction(INITIALIZE);
//호텔 목록 조회 시도
export const listFloorAction = createAction(FLOOR_LIST, ({ hotelId, buildingId, offset, limit, pagination }:listFloorProps) => ({
    hotelId,
    buildingId,
    offset,
    limit,
    pagination,
}));
export const setCurrentPageNumberAction = createAction(SET_FLOOR_LIST_CURRENT_PAGE_NUMBER, ({currentPageNumber}:currentPageNumberProps) => ({
    currentPageNumber,
}));
export const setPaginationItemAction = createAction(SET_FLOOR_PAGINATION_ITEM, ({paginationItem}:PaginationItemProps) => (
    paginationItem
));
export const setFilterItemAction = createAction(SET_FLOOR_FILTER_ITEM, (filterItem:filterItemProps) => ({
    filterItem
}));
export const setInitFilterItemAction = createAction(SET_FLOOR_INIT_FILTER_ITEM);
export const setDetailField = createAction(SET_FLOOR_DETAIL, ({detailField}:listFloorDetailProps) => ({
    detailField
}));
//사가 생성
const listFloorSaga = createRequestSaga(FLOOR_LIST, floorAPI.listFloor);

export function* floorListSaga(){
    yield takeLatest(FLOOR_LIST, listFloorSaga);
}

//initialState
const initialState:floorListState = {
    floorListTotal: 0,
    floorListItems: [],
    currentPageNumber: 1,
    paginationItem: {
      offset: 0,
      limit: 50,
    },
    filterItem: {
        buildingId: '',
    },
    floorListError: null,
    detailField: {
        floorId: '',
        buildingId: '',
    }
};
  
const floorList = handleActions<floorListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 층 목록 조회 성공
        [FLOOR_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            floorListTotal: total,
            floorListItems: items,
            floorListError: null,
         }),
         // 층 목록 조회 실패
          [FLOOR_LIST_FAILURE] : (state, { payload: error }) => ({
             ...state,
             floorListError: error,
         }),
        // 층 현재 페이지
        [SET_FLOOR_LIST_CURRENT_PAGE_NUMBER] : (state, { payload: {currentPageNumber} }) => ({
            ...state,
            currentPageNumber: currentPageNumber,
        }),
        // 층 페이지네이션
        [SET_FLOOR_PAGINATION_ITEM] : (state, { payload: paginationItem }) => ({
            ...state,
            paginationItem: paginationItem,
        }),
        // 층 필터
        [SET_FLOOR_FILTER_ITEM] : (state, { payload: filter }) => ({
            ...state,
            filterItem: filter.filterItem,
        }),
        // 필터 초기화
        [SET_FLOOR_INIT_FILTER_ITEM] : (state) => ({
            ...state,
            filterItem: {
                buildingId: '',
            },
        }),
        // detail 접근 시 필드 저장
        [SET_FLOOR_DETAIL] : (state, { payload: detailField }) => ({
            ...state,
            detailField: detailField.detailField,
        }),
   },
   initialState,
);

export default floorList;
