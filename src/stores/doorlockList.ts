import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as doorlockAPI from "../api/doorlock";
import { currentPageNumberProps, filterItemProps, PaginationItemProps, sortItemProps } from "../types/commons";
import { doorlockListState, listDoorlockProps } from "../types/doorlock";

const INITIALIZE = 'doorlockList/INITIALIZE';
const SET_DOORLOCK_LIST_CURRENT_PAGE_NUMBER = 'doorlockList/SET_DOORLOCK_LIST_CURRENT_PAGE_NUMBER' as const;
const SET_DOORLOCK_PAGINATION_ITEM = 'doorlockList/SET_DOORLOCK_PAGINATION_ITEM' as const;
const SET_DOORLOCK_FILTER_ITEM = 'doorlockList/SET_DOORLOCK_FILTER_ITEM' as const;
const SET_DOORLOCK_INIT_FILTER_ITEM = 'doorlockList/SET_DOORLOCK_INIT_FILTER_ITEM' as const;
const SET_DOORLOCK_SORT_ITEM = 'doorlockList/SET_DOORLOCK_SORT_ITEM' as const;
const SET_DOORLOCK_DETAIL = 'doorlockList/SET_DOORLOCK_DETAIL' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [DOORLOCK_LIST, DOORLOCK_LIST_SUCCESS, DOORLOCK_LIST_FAILURE] = createRequestActionTypes('doorlockList/DOORLOCK_LIST');

/* action */
export const initialize = createAction(INITIALIZE);
//호텔 목록 조회 시도
export const listDoorlockAction = createAction(DOORLOCK_LIST, ({ buildingId, floorId, name, serial, type, status, fwType, fwVersion, sort, order, offset, limit, pagination}:listDoorlockProps) => ({
    buildingId,
    floorId, 
    name, 
    serial, 
    type, 
    status, 
    fwType, 
    fwVersion, 
    sort, 
    order,
    offset,
    limit,
    pagination,
}));
export const setCurrentPageNumberAction = createAction(SET_DOORLOCK_LIST_CURRENT_PAGE_NUMBER, ({currentPageNumber}:currentPageNumberProps) => ({
    currentPageNumber,
}));
export const setPaginationItemAction = createAction(SET_DOORLOCK_PAGINATION_ITEM, ({paginationItem}:PaginationItemProps) => (
    paginationItem
));
export const setFilterItemAction = createAction(SET_DOORLOCK_FILTER_ITEM, (filterItem:filterItemProps) => ({
    filterItem
}));
export const setInitFilterItemAction = createAction(SET_DOORLOCK_INIT_FILTER_ITEM);
export const setSortItemAction = createAction(SET_DOORLOCK_SORT_ITEM, ({sortItem}:sortItemProps) => ({
    sortItem
}));
export const setDetailField = createAction(SET_DOORLOCK_DETAIL, (doorlockId:string) => ({
    doorlockId
}));

//사가 생성
const listdoorlockSaga = createRequestSaga(DOORLOCK_LIST, doorlockAPI.listDoorlock);

export function* doorlockListSaga(){
    yield takeLatest(DOORLOCK_LIST, listdoorlockSaga);
}

const initialState:doorlockListState = {
    doorlockListTotal: 0,
    doorlockListItems: [],
    currentPageNumber: 1,
    paginationItem: {
      offset: 0,
      limit: 50,
    },
    sortItem: {
        sort: '',
        order: '',
      },
    filterItem: {
        buildingId: '',
        floorId: '',
        name: '',
        serial: '',
        type: '',
        status: '',
        fwType: '',
        fwVersion: '',
    },
    doorlockListError: null,
    detailField: {
        doorlockId: '',
    }
  };
  
const doorlockList = handleActions<doorlockListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 도어락 목록 조회 성공
        [DOORLOCK_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            doorlockListTotal: total,
            doorlockListItems: items,
            doorlockListError: null,
         }),
         // 도어락 목록 조회 실패
          [DOORLOCK_LIST_FAILURE] : (state, { payload: error }) => ({
             ...state,
             doorlockListError: error,
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
        // 도어락 필터
        [SET_DOORLOCK_FILTER_ITEM] : (state, { payload: filter }) => ({
            ...state,
            filterItem: filter.filterItem,
        }),
        // 필터 초기화
        [SET_DOORLOCK_INIT_FILTER_ITEM] : (state) => ({
            ...state,
            filterItem: {
                buildingId: '',
                floorId: '',
                name: '',
                serial: '',
                type: '',
                status: '',
                fwType: '',
                fwVersion: '',
            }
        }),
        // 도어락 정렬
        [SET_DOORLOCK_SORT_ITEM] : (state, { payload: sortItem }) => ({
            ...state,
            sortItem: sortItem.sortItem,
        }),
        // detail 접근 시 필드 저장
        [SET_DOORLOCK_DETAIL] : (state, { payload: detailField }) => ({
            ...state,
            detailField: {
                doorlockId: detailField.doorlockId,
            }
        }),
   },
   initialState,
);

export default doorlockList;
