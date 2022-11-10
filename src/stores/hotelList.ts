import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as hotelAPI from "../api/hotel";
import { currentPageNumberProps, filterItemProps, PaginationItemProps } from "../types/commons";
import { HotelListState, listHotelProps } from "../types/hotel";

const INITIALIZE = 'hotelList/INITIALIZE';
const SET_HOTEL_LIST_CURRENT_PAGE_NUMBER = 'hotelList/SET_HOTEL_LIST_CURRENT_PAGE_NUMBER' as const;
const SET_HOTEL_PAGINATION_ITEM = 'hotelList/SET_HOTEL_PAGINATION_ITEM' as const;
const SET_HOTEL_FILTER_ITEM = 'hotelList/SET_HOTEL_FILTER_ITEM' as const;
const SET_HOTEL_INIT_FILTER_ITEM = 'hotelList/SET_HOTEL_INIT_FILTER_ITEM' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [HOTEL_LIST, HOTEL_LIST_SUCCESS, HOTEL_LIST_FAILURE] = createRequestActionTypes('hotelList/HOTEL_LIST');

/* action */
export const initialize = createAction(INITIALIZE);
//호텔 목록 조회 시도
export const listHotelAction = createAction(HOTEL_LIST, ({ name, offset, limit, pagination }:listHotelProps) => ({
    name,
    offset,
    limit,
    pagination,
}));
export const setCurrentPageNumberAction = createAction(SET_HOTEL_LIST_CURRENT_PAGE_NUMBER, ({currentPageNumber}:currentPageNumberProps) => ({
    currentPageNumber,
}));
export const setPaginationItemAction = createAction(SET_HOTEL_PAGINATION_ITEM, ({paginationItem}:PaginationItemProps) => (
    paginationItem
));
export const setFilterItemAction = createAction(SET_HOTEL_FILTER_ITEM, (filterItem:filterItemProps) => ({
    filterItem
}));
export const setInitFilterItemAction = createAction(SET_HOTEL_INIT_FILTER_ITEM);

//사가 생성
const listHotelSaga = createRequestSaga(HOTEL_LIST, hotelAPI.listHotel);

export function* hotelListSaga(){
    yield takeLatest(HOTEL_LIST, listHotelSaga);
}

//initialState
const initialState:HotelListState = {
    hotelListTotal: 0,
    hotelListItems: [],
    currentPageNumber: 1,
    paginationItem: {
      offset: 0,
      limit: 50,
    },
    filterItem: {
      name: '',
    },
    hotelListError: null,
};
  
const hotelList = handleActions<HotelListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 호텔목록 조회 성공
        [HOTEL_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            hotelListTotal: total,
            hotelListItems: items,
            hotelListError: null,
         }),
         // 호텔목록 조회 실패
          [HOTEL_LIST_FAILURE] : (state, { payload: error }) => ({
             ...state,
             hotelListError: error,
         }),
        // 호텔 현재 페이지
        [SET_HOTEL_LIST_CURRENT_PAGE_NUMBER] : (state, { payload: {currentPageNumber} }) => ({
            ...state,
            currentPageNumber: currentPageNumber,
        }),
        // 호텔 페이지네이션
        [SET_HOTEL_PAGINATION_ITEM] : (state, { payload: paginationItem }) => ({
            ...state,
            paginationItem: paginationItem,
        }),
        // 호텔 필터
        [SET_HOTEL_FILTER_ITEM] : (state, { payload: filterItem }) => ({
            ...state,
            filterItem: filterItem.filterItem,
        }),
        // 필터 초기화
        [SET_HOTEL_INIT_FILTER_ITEM] : (state) => ({
            ...state,
            filterItem: {
                name: '',
            },
        }),
   },
   initialState,
);

export default hotelList;
