import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as staffAPI from "../api/staff";
import { currentPageNumberProps, PaginationItemProps } from "../types/commons";
import { listStaffkeyProps, staffkeyListState } from "../types/staff";

const INITIALIZE = 'staffkeyList/INITIALIZE';
const SET_STAFF_KEY_LIST_CURRENT_PAGE_NUMBER = 'staffkeyList/SET_STAFF_KEY_LIST_CURRENT_PAGE_NUMBER' as const;
const SET_STAFF_KEY_PAGINATION_ITEM = 'staffkeyList/SET_STAFF_KEY_PAGINATION_ITEM' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [STAFF_KEY_LIST, STAFF_KEY_LIST_SUCCESS, STAFF_KEY_LIST_FAILURE] = createRequestActionTypes('staffkeyList/STAFF_KEY_LIST');

/* action */
export const initialize = createAction(INITIALIZE);
// 목록 조회 시도
export const listStaffKeyAction = createAction(STAFF_KEY_LIST, ({ staffId, offset, limit }:listStaffkeyProps) => ({
    staffId, 
    offset, 
    limit,
}));
export const setCurrentPageNumberAction = createAction(SET_STAFF_KEY_LIST_CURRENT_PAGE_NUMBER, ({currentPageNumber}:currentPageNumberProps) => ({
    currentPageNumber,
}));
export const setPaginationItemAction = createAction(SET_STAFF_KEY_PAGINATION_ITEM, ({paginationItem}:PaginationItemProps) => (
    paginationItem
));

//사가 생성
const listStaffKeySaga = createRequestSaga(STAFF_KEY_LIST, staffAPI.listStaffkey);

export function* staffkeyListSaga(){
    yield takeLatest(STAFF_KEY_LIST, listStaffKeySaga);
}

const initialState:staffkeyListState = {
    staffkeyListTotal: 0,
    staffkeyListItems: [],
    currentPageNumber: 1,
    paginationItem: {
      offset: 0,
      limit: 10,
    },
    staffkeyListError: null,
  };
  
const staffkeyList = handleActions<staffkeyListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 스태프 키 목록 조회 성공
        [STAFF_KEY_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            staffkeyListTotal: total,
            staffkeyListItems: items,
            staffkeyListError: null,
         }),
         // 스태프 키 목록 조회 실패
          [STAFF_KEY_LIST_FAILURE] : (state, { payload: error }) => ({
             ...state,
             staffkeyListError: error,
         }),
        // 스태프 키 현재 페이지
        [SET_STAFF_KEY_LIST_CURRENT_PAGE_NUMBER] : (state, { payload: {currentPageNumber} }) => ({
            ...state,
            currentPageNumber: currentPageNumber,
        }),
        // 스태프 키 페이지네이션
        [SET_STAFF_KEY_PAGINATION_ITEM] : (state, { payload: paginationItem }) => ({
            ...state,
            paginationItem: paginationItem,
        }),
   },
   initialState,
);

export default staffkeyList;
