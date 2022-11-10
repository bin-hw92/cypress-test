import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as BookingAPI from "../api/booking";
import { currentPageNumberProps, filterItemProps, PaginationItemProps, sortItemProps } from "../types/commons";
import { bookingListState, listBookingProps } from "../types/booking";

const INITIALIZE = 'bookingList/INITIALIZE';
const SET_BOOKING_LIST_CURRENT_PAGE_NUMBER = 'bookingList/SET_BOOKING_LIST_CURRENT_PAGE_NUMBER' as const;
const SET_BOOKING_PAGINATION_ITEM = 'bookingList/SET_BOOKING_PAGINATION_ITEM' as const;
const SET_BOOKING_FILTER_ITEM = 'bookingList/SET_BOOKING_FILTER_ITEM' as const;
const SET_BOOKING_INIT_FILTER_ITEM = 'bookingList/SET_BOOKING_INIT_FILTER_ITEM' as const;
const SET_BOOKING_SORT_ITEM = 'bookingList/SET_BOOKING_SORT_ITEM' as const;
const SET_BOOKING_DETAIL = 'bookingList/SET_BOOKING_DETAIL' as const;

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [BOOKING_LIST, BOOKING_LIST_SUCCESS, BOOKING_LIST_FAILURE] = createRequestActionTypes('bookingList/BOOKING_LIST');

/* action */
export const initialize = createAction(INITIALIZE);
//호텔 목록 조회 시도
export const listBookingAction = createAction(BOOKING_LIST, ({ buildingId, roomName, phoneNumber, startAt, endAt, sort, order, offset, limit }:listBookingProps) => ({
    buildingId, 
    roomName, 
    phoneNumber, 
    startAt, 
    endAt, 
    sort, 
    order, 
    offset, 
    limit
}));
export const setCurrentPageNumberAction = createAction(SET_BOOKING_LIST_CURRENT_PAGE_NUMBER, ({currentPageNumber}:currentPageNumberProps) => ({
    currentPageNumber,
}));
export const setPaginationItemAction = createAction(SET_BOOKING_PAGINATION_ITEM, ({paginationItem}:PaginationItemProps) => (
    paginationItem
));
export const setFilterItemAction = createAction(SET_BOOKING_FILTER_ITEM, (filterItem:filterItemProps) => ({
    filterItem
}));
export const setInitFilterItemAction = createAction(SET_BOOKING_INIT_FILTER_ITEM);
export const setSortItemAction = createAction(SET_BOOKING_SORT_ITEM, ({sortItem}:sortItemProps) => ({
    sortItem
}));
export const setDetailField = createAction(SET_BOOKING_DETAIL, (bookingId:string) => ({
    bookingId
}));
//사가 생성
const listBookingSaga = createRequestSaga(BOOKING_LIST, BookingAPI.listBooking);

export function* bookingListSaga(){
    yield takeLatest(BOOKING_LIST, listBookingSaga);
}

const initialState:bookingListState = {
    bookingListTotal: 0,
    bookingListItems: [],
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
        roomName: '',
        phoneNumber: '',
        startAt: '',
        endAt: '',
    },
    bookingListError: null,
    detailField: {
        bookingId: '',
    }
  };
  
const bookingList = handleActions<bookingListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 예약 목록 조회 성공
        [BOOKING_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            bookingListTotal: total,
            bookingListItems: items,
            bookingListError: null,
         }),
         // 예약 목록 조회 실패
          [BOOKING_LIST_FAILURE] : (state, { payload: error }) => ({
             ...state,
             bookingListError: error,
         }),
        // 예약 현재 페이지
        [SET_BOOKING_LIST_CURRENT_PAGE_NUMBER] : (state, { payload: {currentPageNumber} }) => ({
            ...state,
            currentPageNumber: currentPageNumber,
        }),
        // 예약 페이지네이션
        [SET_BOOKING_PAGINATION_ITEM] : (state, { payload: paginationItem }) => ({
            ...state,
            paginationItem: paginationItem,
        }),
        // 예약 필터
        [SET_BOOKING_FILTER_ITEM] : (state, { payload: filter }) => ({
            ...state,
            filterItem: filter.filterItem,
        }),
        // 필터 초기화
        [SET_BOOKING_INIT_FILTER_ITEM] : (state) => ({
            ...state,
            filterItem: {
                buildingId: '',
                roomName: '',
                phoneNumber: '',
                startAt: '',
                endAt: '',
            },
        }),
        // 예약 정렬
        [SET_BOOKING_SORT_ITEM] : (state, { payload: sortItem }) => ({
            ...state,
            sortItem: sortItem.sortItem,
        }),
        // detail 접근 시 필드 저장
        [SET_BOOKING_DETAIL] : (state, { payload: detailField }) => ({
            ...state,
            detailField: {
                bookingId: detailField.bookingId,
            }
        }),
   },
   initialState,
);

export default bookingList;
