import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as reportAPI from "../api/report";
import { filterItemProps } from "../types/commons";
import { listReportProps, reportListState } from "../types/report";

const INITIALIZE = 'reportList/INITIALIZE';
const SET_REPORT_FILTER_ITEM = 'reportList/SET_REPORT_FILTER_ITEM' as const;
const SET_REPORT_INIT_FILTER_ITEM = 'reportList/SET_REPORT_INIT_FILTER_ITEM' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [REPORT_LIST, REPORT_LIST_SUCCESS, REPORT_LIST_FAILURE] = createRequestActionTypes('reportList/REPORT_LIST');

/* action */
export const initialize = createAction(INITIALIZE);
//호텔 목록 조회 시도
export const listReportAction = createAction(REPORT_LIST, ({ reportType, buildingName }:listReportProps) => ({
    reportType, 
    buildingName,
}));
export const setFilterItemAction = createAction(SET_REPORT_FILTER_ITEM, (filterItem:filterItemProps) => ({
    filterItem
}));
export const setInitFilterItemAction = createAction(SET_REPORT_INIT_FILTER_ITEM);

//사가 생성
const listReportSaga = createRequestSaga(REPORT_LIST, reportAPI.listReport);

export function* reportListSaga(){
    yield takeLatest(REPORT_LIST, listReportSaga);
}

const initialState:reportListState = {
    reportListTotal: 0,
    reportListItems: [],
    filterItem: {
        reportType: 'userkey',
        buildingName: '',
    },
    reportListError: null,
  };
  
const reportList = handleActions<reportListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 리포트 목록 조회 성공
        [REPORT_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            reportListTotal: total,
            reportListItems: items,
            reportListError: null,
         }),
         // 리포트 목록 조회 실패
          [REPORT_LIST_FAILURE] : (state, { payload: error }) => ({
             ...state,
             reportListError: error,
         }),
        // 리포트 필터
        [SET_REPORT_FILTER_ITEM] : (state, { payload: filter }) => ({
            ...state,
            filterItem: filter.filterItem,
        }),
        // 필터 초기화
        [SET_REPORT_INIT_FILTER_ITEM] : (state) => ({
            ...state,
            filterItem: {
                reportType: 'userkey',
                buildingName: '',
            },
        }),
   },
   initialState,
);

export default reportList;
