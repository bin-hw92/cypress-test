import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as staffAPI from "../api/staff";
import produce from "immer";
import { CommonProps, staffSuccessProps } from "../types/commons";
import { issueStaffkeyProps, keyIdProps, PostStaffProps, signupStaffProps, staffIdProps, StaffState, verificationProps } from "../types/staff";

/* 호텔 등록, 수정, 상제 부분 */
const INITIALIZE = 'staff/INITIALIZE';
const INITIALIZEMOBILE = 'staff/INITIALIZEMOBILE';
const CHANGE_FINELD = 'staff/CHANGE_FIELD'; //데이터 변경용
const CHANGE_RESULT = 'staff/CHANGE_RESULT'; //결과값 변경
const CHANGE_MOBILE_FINELD = 'staff/CHANGE_MOBILE_FINELD'; //모바일키 데이터 변경

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [STAFF_CREATE, STAFF_CREATE_SUCCESS, STAFF_CREATE_FAILURE] = createRequestActionTypes('staff/STAFF_CREATE');
const [STAFF_DELETE, STAFF_DELETE_SUCCESS, STAFF_DELETE_FAILURE] = createRequestActionTypes('staff/STAFF_DELETE');
const [STAFF_UPDATE, STAFF_UPDATE_SUCCESS, STAFF_UPDATE_FAILURE] = createRequestActionTypes('staff/STAFF_UPDATE');
const [STAFF_SELECT, STAFF_SELECT_SUCCESS, STAFF_SELECT_FAILURE] = createRequestActionTypes('staff/STAFF_SELECT');
const [STAFF_VERIFICATION_CODE, STAFF_VERIFICATION_CODE_SUCCESS, STAFF_VERIFICATION_CODE_FAILURE] = createRequestActionTypes('staff/STAFF_VERIFICATION_CODE');
const [STAFF_VERIFICATION_TOKEN, STAFF_VERIFICATION_TOKEN_SUCCESS, STAFF_VERIFICATION_TOKEN_FAILURE] = createRequestActionTypes('staff/STAFF_VERIFICATION_TOKEN');
const [STAFF_SIGNUP, STAFF_SIGNUP_SUCCESS, STAFF_SIGNUP_FAILURE] = createRequestActionTypes('staff/STAFF_SIGNUP');
const [STAFF_MOBILEKEY, STAFF_MOBILEKEY_SUCCESS, STAFF_MOBILEKEY_FAILURE] = createRequestActionTypes('staff/STAFF_MOBILEKEY');
const [STAFF_MOBILEKEY_DELETE, STAFF_MOBILEKEY_DELETE_SUCCESS, STAFF_MOBILEKEY_DELETE_FAILURE] = createRequestActionTypes('staff/STAFF_MOBILEKEY_DELETE');

/* action */
export const initialize = createAction(INITIALIZE);
export const initializeMobile = createAction(INITIALIZEMOBILE);
export const changeField = createAction(
    CHANGE_FINELD,
    ({ key, value }:CommonProps) => ({
        key, // hotel 내부 > name, timezone, address 등
        value, // 실제 바꾸려는 값
    }),
);
export const changeMobileField = createAction(
    CHANGE_MOBILE_FINELD,
    ({ key, value }:CommonProps) => ({
        key, // hotel 내부 > name, timezone, address 등
        value, // 실제 바꾸려는 값
    }),
);

export const changeResult = createAction(
    CHANGE_RESULT,
    ({ key, value }:CommonProps) => ({
        key, // building success, error 변경
        value, // 실제 바꾸려는 값
    }),
);

export const selectStaffAction = createAction(STAFF_SELECT, ({ staffId }:staffIdProps) => ({
    staffId,
}));

//등록 시도
export const createStaffAction = createAction(STAFF_CREATE, ({ name, phoneNumber, role }:PostStaffProps) => ({
    name, 
    phoneNumber, 
    role,
}));

//수정 시도
export const updateStaffAction = createAction(STAFF_UPDATE, ({ staffId, name, role }:PostStaffProps) => ({
    staffId, 
    name, 
    role,
}));

export const deleteStaffAction = createAction(STAFF_DELETE, ({ staffId }:staffIdProps) => ({
    staffId,
}));

//스태프 가입을 위한 인증토큰 및 코드
export const verificationCodeAction = createAction(STAFF_VERIFICATION_CODE, ({ phoneNumber, expiredAt, needSignedup, isTestMode }:verificationProps) => ({
    phoneNumber, 
    expiredAt, 
    needSignedup, 
    isTestMode,
}));
export const verificationTokenAction = createAction(STAFF_VERIFICATION_TOKEN, ({ phoneNumber, expiredAt, verificationCode }:verificationProps) => ({
    phoneNumber, 
    expiredAt, 
    verificationCode,
}));
//스태프 가입
export const signupStaffAction = createAction(STAFF_SIGNUP, ({ name, phoneNumber, verificationToken, password }:signupStaffProps) => ({
    name, 
    phoneNumber, 
    verificationToken, 
    password,
}));

//핀코드, 모바일키 발생 관련
export const issueStaffMobilekeyAction = createAction(STAFF_MOBILEKEY, ({ staffId, roomIds, commonroomIds, startAt, endAt }:issueStaffkeyProps) => ({
    staffId, 
    roomIds, 
    commonroomIds, 
    startAt, 
    endAt,
}));
export const deleteStaffMobilekeyAction = createAction(STAFF_MOBILEKEY_DELETE, ({  keyId }:keyIdProps) => ({
    keyId,
}));

//사가 생성
const createStaffSaga = createRequestSaga(STAFF_CREATE, staffAPI.createStaff);
const deleteStaffSaga = createRequestSaga(STAFF_DELETE, staffAPI.deleteStaff);
const updateStaffSaga = createRequestSaga(STAFF_UPDATE, staffAPI.updateStaff);
const selectStaffSaga = createRequestSaga(STAFF_SELECT, staffAPI.selectStaff);
//가입 승인
const verificationCodeSaga = createRequestSaga(STAFF_VERIFICATION_CODE, staffAPI.verificationCode);
const verificationTokenSaga = createRequestSaga(STAFF_VERIFICATION_TOKEN, staffAPI.verificationToken);
const signupStaffSaga = createRequestSaga(STAFF_SIGNUP, staffAPI.signupStaff);
//모바일키
const issueStaffMobilekeySaga = createRequestSaga(STAFF_MOBILEKEY, staffAPI.issueStaffMobilekey);
const deleteStaffMobilekeySaga = createRequestSaga(STAFF_MOBILEKEY_DELETE, staffAPI.deleteStaffMobilekey);

export function* staffSaga(){
    yield takeLatest(STAFF_CREATE, createStaffSaga);
    yield takeLatest(STAFF_DELETE, deleteStaffSaga);
    yield takeLatest(STAFF_UPDATE, updateStaffSaga);
    yield takeLatest(STAFF_SELECT, selectStaffSaga);
    //가입 승인
    yield takeLatest(STAFF_VERIFICATION_CODE, verificationCodeSaga);
    yield takeLatest(STAFF_VERIFICATION_TOKEN, verificationTokenSaga);
    yield takeLatest(STAFF_SIGNUP, signupStaffSaga);
    //모바일키
    yield takeLatest(STAFF_MOBILEKEY, issueStaffMobilekeySaga);
    yield takeLatest(STAFF_MOBILEKEY_DELETE, deleteStaffMobilekeySaga);
}

const initialState:StaffState = {
    staff:{
        name: '',
        phoneNumber: '',
        countryNumber: '82',
        role: '',
    },
    keyIssueItem: {
        roomIds: [],
        commonroomIds: [],
        startAt: '',
        endAt: '',
    },
    staffCreateSuccess: false, //등록 성공 관련
    staffUpdateSuccess: false, //수정 성공 관련
    staffDeleteSuccess: false, //삭제 성공 관련
    staffkeyIssueItem: null, //스태프 키 발급 -> 데이터를 받아야 함.
    staffSignupSuccess: false, //스태프 회원가입
    staffCreateError: null,
    staffUpdateError: null,
    staffDeleteError: null,
    staffkeyIssueError: null,
    staffSignupError: null,    
    verificationCode: '',
    verificationToken: '',
    staffkeyDeleteSuccess: false,
    staffkeyDeleteError: null,
};
  
const staff = handleActions<StaffState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [INITIALIZEMOBILE] : (state) => ({ // 키 발급 초기화
            ...state,
            keyIssueItem: {
                roomIds: [],
                commonroomIds: [],
                startAt: '',
                endAt: '',
                buildingId: '',
            }
         }),
        [CHANGE_FINELD] : (state, { payload: {key, value} }) => 
        produce(state, draft => {
            if(key === 'name') draft.staff.name = value;
            if(key === 'phoneNumber') draft.staff.phoneNumber = value;
            if(key === 'countryNumber') draft.staff.countryNumber = value;
            if(key === 'role') draft.staff.role = value;
        }),
        [CHANGE_MOBILE_FINELD] : (state, { payload: {key, value} }) => 
        produce(state, draft => {
            if(key === 'buildingId') draft.keyIssueItem.buildingId = value;
            if(key === 'roomIds') draft.keyIssueItem.roomIds = value;
            if(key === 'commonroomIds') draft.keyIssueItem.commonroomIds = value;
            if(key === 'startAt') draft.keyIssueItem.startAt = value;
            if(key === 'endAt') draft.keyIssueItem.endAt = value;
        }),
        [CHANGE_RESULT] : (state, { payload: {key, value} }:staffSuccessProps) => 
        produce(state, draft => {
            draft[key] = value;
        }),
        // 스태프 등록 화면 조회 성공
        [STAFF_CREATE_SUCCESS] : (state, { payload: staff }) => ({
            ...state,
            staffCreateSuccess: true,
            staffCreateError: null,
         }),
         // 스태프 등록 화면 조회 실패
          [STAFF_CREATE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             staffCreateError: error,
         }),
         // 스태프 삭제 성공
         [STAFF_DELETE_SUCCESS] : (state, { payload: staff }) => ({
             ...state,
             staffDeleteSuccess: true,
             staffDeleteError: null,
        }),
         // 스태프 삭제 실패
        [STAFF_DELETE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             staffDeleteError: error,
        }),
        // 스태프 수정 성공
        [STAFF_UPDATE_SUCCESS] : (state, { payload: staff }) => ({
            ...state,
            staffUpdateSuccess: true,
            staffUpdateError: null,
        }),
         // 스태프 수정 실패
        [STAFF_UPDATE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            staffDeleteError: error,
        }),         
        // 스태프 검색 조회 성공
        [STAFF_SELECT_SUCCESS] : (state, { payload: staffSelect }) => ({
            ...state,
            staff:{
                name: staffSelect.name,
                phoneNumber: staffSelect.phone_number.replace(/([0-9]*)(\d{10})/, '0$2'),
                countryNumber:  staffSelect.phone_number.replace(/([0-9]*)(\d{10})/, '$1'),
                role: staffSelect.role,
                createdAt : staffSelect.created_at,
                updatedAt : staffSelect.updated_at,
                status: staffSelect.status,
            }
         }),
         // 스태프 검색 조회 실패
         [STAFF_SELECT_FAILURE] : (state, { payload: error }) => ({
            ...state,
            staffUpdateError: error,
        }),
        // 스태프 가입 인증코드 성공
        [STAFF_VERIFICATION_CODE_SUCCESS] : (state, { payload: verification }) => ({
            ...state,
            verificationCode: verification.verification_code,
            }),
        // 스태프 가입 인증코드 실패
        [STAFF_VERIFICATION_CODE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            staffSignupError: error,
        }),
        // 스태프 가입 인증토큰 성공
        [STAFF_VERIFICATION_TOKEN_SUCCESS] : (state, { payload: verification }) => ({
            ...state,
            verificationToken: verification.verification_token,
         }),
         // 스태프 가입 인증토큰 실패
         [STAFF_VERIFICATION_TOKEN_FAILURE] : (state, { payload: error }) => ({
            ...state,
            staffSignupError: error,
        }),
        // 스태프 가입  성공
        [STAFF_SIGNUP_SUCCESS] : (state, { payload: signup }) => ({
            ...state,
            staffSignupSuccess: true,
            staffSignupError: null,
         }),
         // 스태프 가입  실패
         [STAFF_SIGNUP_FAILURE] : (state, { payload: error }) => ({
            ...state,
            staffSignupError: error,
        }),
        // 스태프 모바일키 등록 성공
        [STAFF_MOBILEKEY_SUCCESS] : (state, { payload: staffkey }) => ({
            ...state,
            staffkeyIssueItem: staffkey,
            staffkeyIssueError: null,
         }),
         // 스태프 모바일키 등록 실패
         [STAFF_MOBILEKEY_FAILURE] : (state, { payload: error }) => ({
            ...state,
            staffkeyIssueError: error,
        }),
        // 스태프 모바일키 삭제 성옹
        [STAFF_MOBILEKEY_DELETE_SUCCESS] : (state, { payload: staffkey }) => ({
            ...state,
            staffkeyDeleteSuccess: true,
            staffkeyDeleteError: null,
         }),
         // 스태프 모바일키 삭제 실패
         [STAFF_MOBILEKEY_DELETE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            staffkeyDeleteError: error,
        }),
   },
   initialState,
);

export default staff;
