import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as doorlockAPI from "../api/doorlock";
import { CommonProps, currentPageNumberProps, doorlockLogSuccessProps, filterItemProps, PaginationItemProps, sortItemProps } from "../types/commons";
import produce from "immer";
import { DoorlockLogListState, listDoorlockLogProps } from "../types/doorlock";

/* 등록, 수정, 상제 부분 */
const INITIALIZE = 'doorlockLogList/INITIALIZE';
const CHANGE_RESULT = 'doorlock/CHANGE_RESULT'; //결과값 변경

const SET_DOORLOCK_LIST_CURRENT_PAGE_NUMBER = 'doorlockLogList/SET_DOORLOCK_LIST_CURRENT_PAGE_NUMBER' as const;
const SET_DOORLOCK_PAGINATION_ITEM = 'doorlockLogList/SET_DOORLOCK_PAGINATION_ITEM' as const;
const SET_DOORLOCKLOG_FILTER_ITEM = 'doorlockLogList/SET_DOORLOCKLOG_FILTER_ITEM' as const;
const SET_DOORLOCK_SORT_ITEM = 'doorlockLogList/SET_DOORLOCK_SORT_ITEM' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [DOORLOCKLOG_LIST, DOORLOCKLOG_LIST_SUCCESS, DOORLOCKLOG_LIST_FAILURE] = createRequestActionTypes('doorlockLogList/DOORLOCKLOG_LIST');

/* action */
export const initialize = createAction(INITIALIZE);

export const changeResult = createAction(
    CHANGE_RESULT,
    ({ key, value }:CommonProps) => ({
        key, // building success, error 변경
        value, // 실제 바꾸려는 값
    }),
);

/* Log, Battery 관련 */
export const listDoorlockLogAction = createAction(DOORLOCKLOG_LIST, ({ hotelId, doorlockId, logType, sort, order, offset, limit, pagination }:listDoorlockLogProps) => ({
    hotelId,
    doorlockId, 
    logType, 
    sort, 
    order, 
    offset, 
    limit, 
    pagination
}));

export const setCurrentPageNumberAction = createAction(SET_DOORLOCK_LIST_CURRENT_PAGE_NUMBER, ({currentPageNumber}:currentPageNumberProps) => ({
    currentPageNumber,
}));
export const setPaginationItemAction = createAction(SET_DOORLOCK_PAGINATION_ITEM, ({paginationItem}:PaginationItemProps) => (
    paginationItem
));
export const setFilterLogItemAction = createAction(SET_DOORLOCKLOG_FILTER_ITEM, (filterItem:filterItemProps) => ({
    filterItem
}));
export const setSortItemAction = createAction(SET_DOORLOCK_SORT_ITEM, ({sortItem}:sortItemProps) => ({
    sortItem
}));

//사가 생성
const listDoorlockLogSaga = createRequestSaga(DOORLOCKLOG_LIST, doorlockAPI.listDoorlockLog);

export function* doorlockLogListSaga(){
    yield takeLatest(DOORLOCKLOG_LIST, listDoorlockLogSaga);
}

const initialState:DoorlockLogListState = {
    doorlockLogListTotal: 0, //로그 목록
    doorlockLogListItems: [],//로그 목록
    currentPageNumber: 1,
    paginationItem: {
      offset: 0,
      limit: 50,
    },
    sortItem: {
        sort: 'log_id',
        order: 'desc',
    },
    filterItem: {
        logType: '',
    },
    doorlockLogListSuccess: false,
    doorlockLogListError: null,
};
  
const doorlockLogList = handleActions<DoorlockLogListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_RESULT] : (state, { payload: {key, value} }:doorlockLogSuccessProps) => 
        produce(state, draft => {
            draft[key] = value;
        }),
       /* Log, Battery 부분 */
       [DOORLOCKLOG_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            doorlockLogListTotal: total,
            doorlockLogListItems: items,
            doorlockLogListError: null,
        }),
        // 로그 목록 조회 실패
        [DOORLOCKLOG_LIST_FAILURE] : (state, { payload: error }) => ({
            ...state,
            doorlockLogListError: error,
        }),
        // 도어락 현재 페이지
        [SET_DOORLOCK_LIST_CURRENT_PAGE_NUMBER] : (state, { payload: {currentPageNumber} }) => ({
            ...state,
            currentPageNumber: currentPageNumber,
        }),
        // 도어락 페이지네이션
        [SET_DOORLOCK_PAGINATION_ITEM] : (state, { payload: paginationItem }) => ({
            ...state,
            paginationItem: paginationItem,
        }),
        // 도어락 필터 (LOG)
        [SET_DOORLOCKLOG_FILTER_ITEM] : (state, { payload: filter }) => ({
            ...state,
            filterItem: filter.filterItem,
        }),
        // 도어락 정렬
        [SET_DOORLOCK_SORT_ITEM] : (state, { payload: sortItem }) => ({
            ...state,
            sortItem: sortItem.sortItem,
        }),
   },
   initialState,
);

export default doorlockLogList;
