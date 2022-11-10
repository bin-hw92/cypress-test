import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as keytagAPI from "../api/keytag";
import { currentPageNumberProps, PaginationItemProps } from "../types/commons";
import { keytagListState, listKeytagProps } from "../types/keytag";

const INITIALIZE = 'keytagList/INITIALIZE';
const SET_KEYTAG_LIST_CURRENT_PAGE_NUMBER = 'keytagList/SET_KEYTAG_LIST_CURRENT_PAGE_NUMBER' as const;
const SET_KEYTAG_PAGINATION_ITEM = 'keytagList/SET_KEYTAG_PAGINATION_ITEM' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [KEYTAG_LIST, KEYTAG_LIST_SUCCESS, KEYTAG_LIST_FAILURE] = createRequestActionTypes('keytagList/KEYTAG_LIST');

/* action */
export const initialize = createAction(INITIALIZE);
//호텔 목록 조회 시도
export const listKeytagAction = createAction(KEYTAG_LIST, ({ buildingId, floorId, roomId, offset, limit, pagination }:listKeytagProps) => ({
    buildingId,
    floorId,
    roomId,
    offset,
    limit,
    pagination,
}));
export const setCurrentPageNumberAction = createAction(SET_KEYTAG_LIST_CURRENT_PAGE_NUMBER, ({currentPageNumber}:currentPageNumberProps) => ({
    currentPageNumber,
}));
export const setPaginationItemAction = createAction(SET_KEYTAG_PAGINATION_ITEM, ({paginationItem}:PaginationItemProps) => (
    paginationItem
));

//사가 생성
const listKeytagSaga = createRequestSaga(KEYTAG_LIST, keytagAPI.listKeytag);

export function* keytagListSaga(){
    yield takeLatest(KEYTAG_LIST, listKeytagSaga);
}

//initialState
const initialState:keytagListState = {
    keytagListTotal: 0,
    keytagListItems: [],
    currentPageNumber: 1,
    paginationItem: {
      offset: 0,
      limit: 50,
    },
    keytagListError: null,
};
  
const keytagList = handleActions<keytagListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 키택 목록 조회 성공
        [KEYTAG_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            keytagListTotal: total,
            keytagListItems: items,
            keytagListError: null,
         }),
         // 키택 목록 조회 실패
          [KEYTAG_LIST_FAILURE] : (state, { payload: error }) => ({
             ...state,
             keytagListError: error,
         }),
        // 키택 현재 페이지
        [SET_KEYTAG_LIST_CURRENT_PAGE_NUMBER] : (state, { payload: {currentPageNumber} }) => ({
            ...state,
            currentPageNumber: currentPageNumber,
        }),
        // 키택 페이지네이션
        [SET_KEYTAG_PAGINATION_ITEM] : (state, { payload: paginationItem }) => ({
            ...state,
            paginationItem: paginationItem,
        }),
   },
   initialState,
);

export default keytagList;
