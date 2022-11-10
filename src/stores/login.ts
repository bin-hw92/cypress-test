import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as loginAPI from "../api/login";
import { LoginApistate, LoginState } from "../types/login";

const INITIALIZE = 'login/INITIALIZE';

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('login/LOGIN');
const [LOGIN_GOOGLE, LOGIN_GOOGLE_SUCCESS, LOGIN_GOOGLE_FAILURE] = createRequestActionTypes('login/LOGIN_GOGGLE');


export const initialize = createAction(INITIALIZE);

//로그인 시도
export const loginAction = createAction(LOGIN, ({ phoneNumber, password }:LoginApistate) => ({
    phoneNumber,
    password
}));
export const loginGoogleAction = createAction(LOGIN_GOOGLE, ({ tokenId }:LoginApistate) => ({
    tokenId
}));

//사가 생성
const loginActionSaga = createRequestSaga(LOGIN, loginAPI.loginApi);
const loginGoogleActionSaga = createRequestSaga(LOGIN_GOOGLE, loginAPI.googleLogin);

export function* loginSaga(){
    yield takeLatest(LOGIN, loginActionSaga);
    yield takeLatest(LOGIN_GOOGLE, loginGoogleActionSaga);
}

const initialState:LoginState = {
  loginData: null,
  loginError: null,
};
  
const login = handleActions<LoginState, any>(
   {
    [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
    // 로그인 성공
    [LOGIN_SUCCESS] : (state, { payload: loginData }) => ({
      ...state,
      loginData,
      loginError: null,
    }),
    // 로그인 실패
    [LOGIN_FAILURE] : (state, { payload: error }) => ({
      ...state,
      loginError: error,
    }),
    [LOGIN_GOOGLE_SUCCESS] : (state, { payload: loginData }) => ({
      ...state,
      loginData:{
        ...loginData,
        name: 'Oauth',
      },
      loginError: null,
    }),
    // 로그인 실패
    [LOGIN_GOOGLE_FAILURE] : (state, { payload: error }) => ({
      ...state,
      loginError: error,
    }),
   },
   initialState,
);

export default login;
