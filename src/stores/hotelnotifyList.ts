import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as hotelnotifyAPI from '../api/hotelnotify';
import { currentPageNumberProps, filterItemProps, PaginationItemProps } from "../types/commons";
import { hotelnotifyListState, listHotelNotifyProps } from "../types/hotelnotify";

const INITIALIZE = 'hotelnotifyList/INITIALIZE';
const SET_HOTELNOTIFY_LIST_CURRENT_PAGE_NUMBER = 'hotelnotifyList/SET_HOTELNOTIFY_LIST_CURRENT_PAGE_NUMBER' as const;
const SET_HOTELNOTIFY_PAGINATION_ITEM = 'hotelnotifyList/SET_HOTELNOTIFY_PAGINATION_ITEM' as const;
const SET_HOTELNOTIFY_FILTER_ITEM = 'hotelnotifyList/SET_HOTELNOTIFY_FILTER_ITEM' as const;
const SET_HOTELNOTIFY_INIT_FILTER_ITEM = 'hotelnotifyList/SET_HOTELNOTIFY_INIT_FILTER_ITEM' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [HOTELNOTIFY_LIST, HOTELNOTIFY_LIST_SUCCESS, HOTELNOTIFY_LIST_FAILURE] = createRequestActionTypes('hotelnotifyList/HOTELNOTIFY_LIST');
const [HOTELNOTIFY_CONTEXT_LIST, HOTELNOTIFY_CONTEXT_LIST_SUCCESS, HOTELNOTIFY_CONTEXT_LIST_FAILURE] = createRequestActionTypes('hotelnotifyList/HOTELNOTIFY_CONTEXT_LIST');

/* action */
export const initialize = createAction(INITIALIZE);
//알림 템플릿 (단지 내부) 목록 조회 시도
export const listHotelNotifyAction = createAction(HOTELNOTIFY_LIST, ({ hotelId, notifyContext, offset, limit }:listHotelNotifyProps) => ({
    hotelId, 
    notifyContext, 
    offset, 
    limit
}));

export const listHotelNotifyContextAction = createAction(HOTELNOTIFY_CONTEXT_LIST);

export const setCurrentPageNumberAction = createAction(SET_HOTELNOTIFY_LIST_CURRENT_PAGE_NUMBER, ({currentPageNumber}:currentPageNumberProps) => ({
    currentPageNumber,
}));
export const setPaginationItemAction = createAction(SET_HOTELNOTIFY_PAGINATION_ITEM, ({paginationItem}:PaginationItemProps) => (
    paginationItem
));
export const setFilterItemAction = createAction(SET_HOTELNOTIFY_FILTER_ITEM, (filterItem:filterItemProps) => ({
    filterItem
}));
export const setInitFilterItemAction = createAction(SET_HOTELNOTIFY_INIT_FILTER_ITEM);

//사가 생성
const listHotelNotifySaga = createRequestSaga(HOTELNOTIFY_LIST, hotelnotifyAPI.listHotelNotifyTemplate);
const listHotelNotifyContextSaga = createRequestSaga(HOTELNOTIFY_CONTEXT_LIST, hotelnotifyAPI.listHotelNotifyTemplateContext);

export function* hotelnotifyListSaga(){
    yield takeLatest(HOTELNOTIFY_LIST, listHotelNotifySaga);
    yield takeLatest(HOTELNOTIFY_CONTEXT_LIST, listHotelNotifyContextSaga);
}

const initialState:hotelnotifyListState = {
    hotelNotifyTemplateListTotal: 0,
    hotelNotifyTemplateListItems: [],
    hotelNotifyTemplateContextTotal: 0,
    hotelNotifyTemplateContextItems: [],
    currentPageNumber: 1,
    paginationItem: {
      offset: 0,
      limit: 10,
    },
    filterItem: {
        notifyContext: '',
    },
    hotelNotifyTemplateListError: null,
    hotelNotifyTemplateContextError: null,
  };
  
const hotelnotifyList = handleActions<hotelnotifyListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 단지 알림 템플릿 목록 조회 성공
        [HOTELNOTIFY_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            hotelNotifyTemplateListTotal: total,
            hotelNotifyTemplateListItems: items,
            hotelNotifyTemplateListError: null,
        }),
         // 단지 알림 템플릿 목록 조회 실패
        [HOTELNOTIFY_LIST_FAILURE] : (state, { payload: error }) => ({
            ...state,
            hotelNotifyTemplateListError: error,
        }),
        // 단지 알림 템플릿 Context 목록 조회 성공
        [HOTELNOTIFY_CONTEXT_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            hotelNotifyTemplateContextTotal: total,
            hotelNotifyTemplateContextItems: items,
            hotelNotifyTemplateContextError: null,
        }),
         // 단지 알림 템플릿 Context 목록 조회 실패
        [HOTELNOTIFY_CONTEXT_LIST_FAILURE] : (state, { payload: error }) => ({
            ...state,
            hotelNotifyTemplateContextError: error,
        }),
        // 단지 알림 템플릿 현재 페이지
        [SET_HOTELNOTIFY_LIST_CURRENT_PAGE_NUMBER] : (state, { payload: {currentPageNumber} }) => ({
            ...state,
            currentPageNumber: currentPageNumber,
        }),
        // 단지 알림 템플릿 페이지네이션
        [SET_HOTELNOTIFY_PAGINATION_ITEM] : (state, { payload: paginationItem }) => ({
            ...state,
            paginationItem: paginationItem,
        }),
        // 단지 알림 템플릿 필터
        [SET_HOTELNOTIFY_FILTER_ITEM] : (state, { payload: filter }) => ({
            ...state,
            filterItem: filter.filterItem,
        }),
        // 필터 초기화
        [SET_HOTELNOTIFY_INIT_FILTER_ITEM] : (state) => ({
            ...state,
            filterItem: {
                notifyContext: '',
            },
        }),
   },
   initialState,
);

export default hotelnotifyList;
