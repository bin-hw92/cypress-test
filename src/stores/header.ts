import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as loginAPI from "../api/login";
import { CommonProps, HeaderState, headerSuccessProps } from "../types/commons";
import { LoginApistate } from "../types/login";
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";

const INITIALIZE = 'header/INITIALIZE' as const;
const SET_HEADER_ITEM = 'header/SET_HEADER_ITEM' as const;
const LOGOUT = 'header/LOGOUT' as const; //로그아웃 시 헤더에서 제거 되야 함.
const LOGOUT_GOOGLE = 'header/LOGOUT_GOOGLE' as const; //로그아웃 시 헤더에서 제거 되야 함.
const INITIALIZE_PASSWORD = 'header/INITIALIZE_PASSWORD' as const;
const CHANGE_RESULT = 'floor/CHANGE_RESULT'; //결과값 변경

const [PASSWORD_UPDATE, PASSWORD_UPDATE_SUCCESS, PASSWORD_UPDATE_FAILURE] = createRequestActionTypes('header/PASSWORD_UPDATE');

type ChangeState = {
    [key: string] : string,
 }

export const initialize = createAction(INITIALIZE);

export const initializePassword = createAction(INITIALIZE_PASSWORD);

export const setHeaderItemAction = createAction(SET_HEADER_ITEM, ({ key, value }:ChangeState) => ({
    key,
    value
}));

export const changeResult = createAction(
    CHANGE_RESULT,
    ({ key, value }:CommonProps) => ({
        key, // building success, error 변경
        value, // 실제 바꾸려는 값
    }),
);

export const logoutAction = createAction(LOGOUT); //헤더 초기화를 위해서 여기에 넣음

export const logoutGoogleAction = createAction(LOGOUT_GOOGLE); //헤더 초기화를 위해서 여기에 넣음

//비밀번호 변경
export const updatePasswordAction = createAction(PASSWORD_UPDATE, ({ passwordOld, passwordNew }:LoginApistate) => ({
    passwordOld, 
    passwordNew,
}));

//사가 생성
const logoutSaga = createRequestSaga(LOGOUT, loginAPI.logout);
const logoutGoogleSaga = createRequestSaga(LOGOUT_GOOGLE, loginAPI.googleLogLogout);
const updatePasswordSaga = createRequestSaga(PASSWORD_UPDATE, loginAPI.updatePassword);

export function* headerSaga(){
    yield takeLatest(LOGOUT, logoutSaga);
    yield takeLatest(LOGOUT_GOOGLE, logoutGoogleSaga);
    yield takeLatest(PASSWORD_UPDATE, updatePasswordSaga);
}

const initialState:HeaderState = {
    name: '',
    userRole: '',
    hotelRole: '',
    phoneNumber: '',
    password: {
        passwordOld: '',
        passwordNew: '',
    },
    passwordSuccess: false,
    passwordError: null,
};
  

const header = handleActions<HeaderState, any>(
   {
       [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
       // name, role, selectedMenu 값 변경 시
       [SET_HEADER_ITEM] : (state, { payload: { key, value} }) => 
       produce(state, draft => {
            if(key === 'name') draft.name = value;
            if(key === 'userRole') draft.userRole = value;
            if(key === 'hotelRole') draft.hotelRole = value;
            if(key === 'phoneNumber') draft.phoneNumber = value;
            if(key === 'passwordOld') draft.password.passwordOld = value;
            if(key === 'passwordNew') draft.password.passwordNew = value;
       }),
       [CHANGE_RESULT] : (state, { payload: {key, value} }:headerSuccessProps) => 
       produce(state, draft => {
           draft[key] = value;
       }),
        //비밀번호 변경 성공
        [PASSWORD_UPDATE_SUCCESS] : (state, { payload: password }) => ({
            ...state,
            passwordSuccess: true,
            passwordError: null,
        }),
        //비밀번호 변경 실패
        [PASSWORD_UPDATE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            passwordError: error,
        }),
        [INITIALIZE_PASSWORD] : (state) => ({
            ...state,
            password: {
                passwordOld: '',
                passwordNew: '',
            }
        }),
        [LOGOUT] : state => initialState, // logout 넣으면 초기 상태로 바뀜
        [LOGOUT_GOOGLE] : state => initialState, // logout 넣으면 초기 상태로 바뀜
       
   },
   initialState,
);

export default header;
