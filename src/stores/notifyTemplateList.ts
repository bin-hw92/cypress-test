import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as notifyTemplateAPI from '../api/notifyTemplate';
import { currentPageNumberProps, filterItemProps, PaginationItemProps } from "../types/commons";
import { listNotifyProps, notifyTemplateListState } from "../types/notifyTemplate";

const INITIALIZE = 'notifyTemplateList/INITIALIZE';
const SET_NOTIFY_TEMPLATE_LIST_CURRENT_PAGE_NUMBER = 'notifyTemplateList/SET_NOTIFY_TEMPLATE_LIST_CURRENT_PAGE_NUMBER' as const;
const SET_NOTIFY_TEMPLATE_PAGINATION_ITEM = 'notifyTemplateList/SET_NOTIFY_TEMPLATE_PAGINATION_ITEM' as const;
const SET_NOTIFY_TEMPLATE_FILTER_ITEM = 'notifyTemplateList/SET_NOTIFY_TEMPLATE_FILTER_ITEM' as const;
const SET_NOTIFY_TEMPLATE_INIT_FILTER_ITEM = 'notifyTemplateList/SET_NOTIFY_TEMPLATE_INIT_FILTER_ITEM' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [NOTIFY_TEMPLATE_LIST, NOTIFY_TEMPLATE_LIST_SUCCESS, NOTIFY_TEMPLATE_LIST_FAILURE] = createRequestActionTypes('notifyTemplateList/NOTIFY_TEMPLATE_LIST');

/* action */
export const initialize = createAction(INITIALIZE);
//알림 템플릿 목록 조회 시도
export const listNotifyTemplateListAction = createAction(NOTIFY_TEMPLATE_LIST, ({ template, templateCode, templateAlt, desc, offset, limit, pagination }:listNotifyProps) => ({
    template, 
    templateCode, 
    templateAlt, 
    desc, 
    offset, 
    limit, 
    pagination,
}));

export const setCurrentPageNumberAction = createAction(SET_NOTIFY_TEMPLATE_LIST_CURRENT_PAGE_NUMBER, ({currentPageNumber}:currentPageNumberProps) => ({
    currentPageNumber,
}));
export const setPaginationItemAction = createAction(SET_NOTIFY_TEMPLATE_PAGINATION_ITEM, ({paginationItem}:PaginationItemProps) => (
    paginationItem
));
export const setFilterItemAction = createAction(SET_NOTIFY_TEMPLATE_FILTER_ITEM, (filterItem:filterItemProps) => ({
    filterItem
}));
export const setInitFilterItemAction = createAction(SET_NOTIFY_TEMPLATE_INIT_FILTER_ITEM);

//사가 생성
const listnNotifyTemplateListSaga = createRequestSaga(NOTIFY_TEMPLATE_LIST, notifyTemplateAPI.listNotifyTemplate);

export function* notifyTemplateListSaga(){
    yield takeLatest(NOTIFY_TEMPLATE_LIST, listnNotifyTemplateListSaga);
}

const initialState:notifyTemplateListState = {
    notifyTemplateListTotal: 0,
    notifyTemplateListItems: [],
    currentPageNumber: 1,
    paginationItem: {
      offset: 0,
      limit: 10,
    },
    filterItem: {
        template: '',
        templateCode: '',
        templateAlt: '',
        desc: '',
    },
    notifyTemplateListError: null,
  };
  
const notifyTemplateList = handleActions<notifyTemplateListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 알림 템플릿 목록 조회 성공
        [NOTIFY_TEMPLATE_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            notifyTemplateListTotal: total,
            notifyTemplateListItems: items,
            notifyTemplateListError: null,
        }),
         // 알림 템플릿 목록 조회 실패
        [NOTIFY_TEMPLATE_LIST_FAILURE] : (state, { payload: error }) => ({
            ...state,
            notifyTemplateListError: error,
        }),
        // 알림 템플릿 현재 페이지
        [SET_NOTIFY_TEMPLATE_LIST_CURRENT_PAGE_NUMBER] : (state, { payload: {currentPageNumber} }) => ({
            ...state,
            currentPageNumber: currentPageNumber,
        }),
        // 알림 템플릿 페이지네이션
        [SET_NOTIFY_TEMPLATE_PAGINATION_ITEM] : (state, { payload: paginationItem }) => ({
            ...state,
            paginationItem: paginationItem,
        }),
        // 알림 템플릿 필터
        [SET_NOTIFY_TEMPLATE_FILTER_ITEM] : (state, { payload: filter }) => ({
            ...state,
            filterItem: filter.filterItem,
        }),
        // 필터 초기화
        [SET_NOTIFY_TEMPLATE_INIT_FILTER_ITEM] : (state) => ({
            ...state,
            filterItem: {
                template: '',
                templateCode: '',
                templateAlt: '',
                desc: '',
            },
        }),
   },
   initialState,
);

export default notifyTemplateList;
