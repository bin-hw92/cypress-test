import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as staffAPI from "../api/staff";
import { currentPageNumberProps, filterItemProps, PaginationItemProps } from "../types/commons";
import { listStaffProps, staffListState } from "../types/staff";

const INITIALIZE = 'staffList/INITIALIZE';
const SET_STAFF_LIST_CURRENT_PAGE_NUMBER = 'staffList/SET_STAFF_LIST_CURRENT_PAGE_NUMBER' as const;
const SET_STAFF_PAGINATION_ITEM = 'staffList/SET_STAFF_PAGINATION_ITEM' as const;
const SET_STAFF_FILTER_ITEM = 'staffList/SET_STAFF_FILTER_ITEM' as const;
const SET_STAFF_INIT_FILTER_ITEM = 'staffList/SET_STAFF_INIT_FILTER_ITEM' as const;
const SET_STAFF_DETAIL = 'staffList/SET_STAFF_DETAIL' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [STAFF_LIST, STAFF_LIST_SUCCESS, STAFF_LIST_FAILURE] = createRequestActionTypes('staffList/STAFF_LIST');
const [STAFF_LIST_CNT, STAFF_LIST_CNT_SUCCESS, STAFF_LIST_CNT_FAILURE] = createRequestActionTypes('staffList/STAFF_LIST_CNT');

/* action */
export const initialize = createAction(INITIALIZE);
// 목록 조회 시도
export const listStaffAction = createAction(STAFF_LIST, ({ name, role, status, offset, limit, pagination }:listStaffProps) => ({
    name, 
    role, 
    status,
    offset,
    limit,
    pagination,
}));
export const listStaffCntAction = createAction(STAFF_LIST_CNT);
export const setCurrentPageNumberAction = createAction(SET_STAFF_LIST_CURRENT_PAGE_NUMBER, ({currentPageNumber}:currentPageNumberProps) => ({
    currentPageNumber,
}));
export const setPaginationItemAction = createAction(SET_STAFF_PAGINATION_ITEM, ({paginationItem}:PaginationItemProps) => (
    paginationItem
));
export const setFilterItemAction = createAction(SET_STAFF_FILTER_ITEM, (filterItem:filterItemProps) => ({
    filterItem
}));
export const setInitFilterItemAction = createAction(SET_STAFF_INIT_FILTER_ITEM);
export const setDetailField = createAction(SET_STAFF_DETAIL, (staffId:string) => ({
    staffId
}));
//사가 생성
const listStaffSaga = createRequestSaga(STAFF_LIST, staffAPI.listStaff);
const listStaffCntSaga = createRequestSaga(STAFF_LIST_CNT, staffAPI.listStaffCnt);

export function* staffListSaga(){
    yield takeLatest(STAFF_LIST, listStaffSaga);
    yield takeLatest(STAFF_LIST_CNT, listStaffCntSaga);
}

const initialState:staffListState = {
    staffListTotal: 0,
    staffListItems: [],
    staffListCntTotal: 0,
    staffListCntItems: [],
    currentPageNumber: 1,
    paginationItem: {
      offset: 0,
      limit: 10,
    },
    filterItem: {
      name: '',
      role: '',
      status: '',
    },
    staffListError: null,
    detailField: {
        staffId: '',
    }
  };
  
const staffList = handleActions<staffListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 스태프 목록 조회 성공
        [STAFF_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            staffListTotal: total,
            staffListItems: items,
            staffListError: null,
         }),
         // 스태프 목록 조회 실패
        [STAFF_LIST_FAILURE] : (state, { payload: error }) => ({
             ...state,
             staffListError: error,
         }),
        // 스태프 현재 페이지
        [SET_STAFF_LIST_CURRENT_PAGE_NUMBER] : (state, { payload: {currentPageNumber} }) => ({
            ...state,
            currentPageNumber: currentPageNumber,
        }),
        // 스태프 페이지네이션
        [SET_STAFF_PAGINATION_ITEM] : (state, { payload: paginationItem }) => ({
            ...state,
            paginationItem: paginationItem,
        }),
        // 스태프 필터
        [SET_STAFF_FILTER_ITEM] : (state, { payload: filter }) => ({
            ...state,
            filterItem: filter.filterItem,
        }),
        //필터 초기화
        [SET_STAFF_INIT_FILTER_ITEM] : (state) => ({
            ...state,
            filterItem: {
                name: '',
                role: '',
                status: '',
            },
        }),
        // 스태프 목록 조회 성공
        [STAFF_LIST_CNT_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            staffListCntTotal: total,
            staffListCntItems: items,
        }),
         // 스태프 목록 조회 성공
        [STAFF_LIST_CNT_FAILURE] : (state, { payload: error }) => ({
            ...state,
            staffListError: error,
        }),
        // detail 접근 시 필드 저장
        [SET_STAFF_DETAIL] : (state, { payload: detailField }) => ({
            ...state,
            detailField: {
                staffId: detailField.staffId,
            }
        }),
   },
   initialState,
);

export default staffList;
