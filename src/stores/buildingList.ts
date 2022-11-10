import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as buildingAPI from "../api/building";
import { currentPageNumberProps, filterItemProps, PaginationItemProps } from "../types/commons";
import { buildingListState, listBuildingProps } from "../types/building";

const INITIALIZE = 'buildingList/INITIALIZE';
const SET_BUILDING_LIST_CURRENT_PAGE_NUMBER = 'buildingList/SET_BUILDING_LIST_CURRENT_PAGE_NUMBER' as const;
const SET_BUILDING_PAGINATION_ITEM = 'buildingList/SET_BUILDING_PAGINATION_ITEM' as const;
const SET_BUILDING_FILTER_ITEM = 'buildingList/SET_BUILDING_FILTER_ITEM' as const;
const SET_BUILDING_INIT_FILTER_ITEM = 'buildingList/SET_BUILDING_INIT_FILTER_ITEM' as const;
const SET_BUILDING_DETAIL = 'buildingList/SET_BUILDING_DETAIL' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [BUILDING_LIST, BUILDING_LIST_SUCCESS, BUILDING_LIST_FAILURE] = createRequestActionTypes('buildingList/BUILDING_LIST');

/* action */
export const initialize = createAction(INITIALIZE);
//호텔 목록 조회 시도
export const listBuildingAction = createAction(BUILDING_LIST, ({ hotelId, name, offset, limit, pagination }:listBuildingProps) => ({
    hotelId,
    name,
    offset,
    limit,
    pagination,
}));
export const setCurrentPageNumberAction = createAction(SET_BUILDING_LIST_CURRENT_PAGE_NUMBER, ({currentPageNumber}:currentPageNumberProps) => ({
    currentPageNumber,
}));
export const setPaginationItemAction = createAction(SET_BUILDING_PAGINATION_ITEM, ({paginationItem}:PaginationItemProps) => (
    paginationItem
));
export const setFilterItemAction = createAction(SET_BUILDING_FILTER_ITEM, (filterItem:filterItemProps) => ({
    filterItem
}));

export const setDetailField = createAction(SET_BUILDING_DETAIL, (buildingId:string) => ({
    buildingId
}));
export const setInitFilterItemAction = createAction(SET_BUILDING_INIT_FILTER_ITEM);

//사가 생성
const listBuildingSaga = createRequestSaga(BUILDING_LIST, buildingAPI.listBuilding);

export function* buildingListSaga(){
    yield takeLatest(BUILDING_LIST, listBuildingSaga);
}

//initialState
const initialState:buildingListState = {
    buildingListTotal: 0,
    buildingListItems: [],
    currentPageNumber: 1,
    paginationItem: {
      offset: 0,
      limit: 50,
    },
    filterItem: {
      name: '',
    },
    buildingListError: null,
    detailField:{
      buildingId: '',
    }, //detail로 진입 시 저장
  };
  
const buildingList = handleActions<buildingListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 빌딩목록 조회 성공
        [BUILDING_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            buildingListTotal: total,
            buildingListItems: items,
            buildingListError: null,
         }),
         // 빌딩목록 조회 실패
          [BUILDING_LIST_FAILURE] : (state, { payload: error }) => ({
             ...state,
             buildingListError: error,
         }),
        // 빌딩 현재 페이지
        [SET_BUILDING_LIST_CURRENT_PAGE_NUMBER] : (state, { payload: {currentPageNumber} }) => ({
            ...state,
            currentPageNumber: currentPageNumber,
        }),
        // 빌딩 페이지네이션
        [SET_BUILDING_PAGINATION_ITEM] : (state, { payload: paginationItem }) => ({
            ...state,
            paginationItem: paginationItem,
        }),
        // 빌딩 필터
        [SET_BUILDING_FILTER_ITEM] : (state, { payload: filter }) => ({
            ...state,
            filterItem: filter.filterItem,
        }),
        // 필터 초기화
        [SET_BUILDING_INIT_FILTER_ITEM] : (state) => ({
            ...state,
            filterItem: {
                name: '',
            }
        }),
        // detail 접근 시 필드 저장
        [SET_BUILDING_DETAIL] : (state, { payload: detailField }) => ({
            ...state,
            detailField: {
                buildingId: detailField.buildingId,
            }
        }),
   },
   initialState,
);

export default buildingList;
