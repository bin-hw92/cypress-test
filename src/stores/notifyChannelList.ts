import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as notifyChannelAPI from "../api/notifyChannel";
import { notifyChannelListState } from "../types/notifyChannel";

const INITIALIZE = 'notifyChannelList/INITIALIZE';

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [NOTIFY_CHANNEL_LIST, NOTIFY_CHANNEL_LIST_SUCCESS, NOTIFY_CHANNEL_LIST_FAILURE] = createRequestActionTypes('notifyChannelList/NOTIFY_CHANNEL_LIST');

/* action */
export const initialize = createAction(INITIALIZE);
//알림 템플릿 목록 조회 시도
export const listNotifyChannelListAction = createAction(NOTIFY_CHANNEL_LIST);

//사가 생성
const listnNotifyChannelListSaga = createRequestSaga(NOTIFY_CHANNEL_LIST, notifyChannelAPI.listNotifyChannel);

export function* notifyChannelListSaga(){
    yield takeLatest(NOTIFY_CHANNEL_LIST, listnNotifyChannelListSaga);
}

const initialState:notifyChannelListState = {
    notifyChannelListTotal: 0,
    notifyChannelListItems: [],
    notifyChannelListError: null,
  };
  
const notifyChannelList = handleActions<notifyChannelListState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        // 알림 템플릿 목록 조회 성공
        [NOTIFY_CHANNEL_LIST_SUCCESS] : (state, { payload: {total, items} }) => ({
            ...state,
            notifyChannelListTotal: total,
            notifyChannelListItems: items,
            notifyChannelListError: null,
        }),
         // 알림 템플릿 목록 조회 실패
        [NOTIFY_CHANNEL_LIST_FAILURE] : (state, { payload: error }) => ({
            ...state,
            notifyChannelListError: error,
        }),
   },
   initialState,
);

export default notifyChannelList;
