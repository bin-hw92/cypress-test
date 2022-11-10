import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as bookingAPI from "../api/booking";
import produce from "immer";
import { bookingSuccessProps, CommonProps } from "../types/commons";
import { bookingIdProps, BookingState, issueUserProps, PostBookingProps, UploadBookingFileProps } from "../types/booking";

/* 호텔 등록, 수정, 상제 부분 */
const INITIALIZE = 'booking/INITIALIZE';
const CHANGE_FINELD = 'booking/CHANGE_FIELD'; //데이터 변경용
const CHANGE_RESULT = 'booking/CHANGE_RESULT'; //결과값 변경

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [BOOKING_CREATE, BOOKING_CREATE_SUCCESS, BOOKING_CREATE_FAILURE] = createRequestActionTypes('booking/BOOKING_CREATE');
const [BOOKING_CANCEL, BOOKING_CANCEL_SUCCESS, BOOKING_CANCEL_FAILURE] = createRequestActionTypes('booking/BOOKING_CANCEL');
const [BOOKING_UPDATE, BOOKING_UPDATE_SUCCESS, BOOKING_UPDATE_FAILURE] = createRequestActionTypes('booking/BOOKING_UPDATE');
const [BOOKING_SELECT, BOOKING_SELECT_SUCCESS, BOOKING_SELECT_FAILURE] = createRequestActionTypes('booking/BOOKING_SELECT');
const [BOOKING_PINCODE, BOOKING_PINCODE_SUCCESS, BOOKING_PINCODE_FAILURE] = createRequestActionTypes('booking/BOOKING_PINCODE');
const [BOOKING_MOBILEKEY, BOOKING_MOBILEKEY_SUCCESS, BOOKING_MOBILEKEY_FAILURE] = createRequestActionTypes('booking/BOOKING_MOBILEKEY');
const [BOOKING_MOBILEKEY_DELETE, BOOKING_MOBILEKEY_DELETE_SUCCESS, BOOKING_MOBILEKEY_DELETE_FAILURE] = createRequestActionTypes('booking/BOOKING_MOBILEKEY_DELETE');
const [BOOKING_UPLOAD, BOOKING_UPLOAD_SUCCESS, BOOKING_UPLOAD_FAILURE] = createRequestActionTypes('booking/BOOKING_UPLOAD');

/* action */
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(
    CHANGE_FINELD,
    ({ form, key, value }:CommonProps) => ({
        form, // booking, keyIssueItem
        key, //  userName, phoneNumber 등
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

export const selectBookingAction = createAction(BOOKING_SELECT, ({ bookingId }:bookingIdProps) => ({
    bookingId
}));

//호텔 등록 시도
export const createBookingAction = createAction(BOOKING_CREATE, ({ userName, phoneNumber, roomIds, commonroomIds, checkinAt, checkoutAt, desc }:PostBookingProps) => ({
    userName, 
    phoneNumber, 
    roomIds, 
    commonroomIds, 
    checkinAt, 
    checkoutAt, 
    desc,
}));

//호텔 수정 시도
export const updateBookingAction = createAction(BOOKING_UPDATE, ({ bookingId, userName, phoneNumber, checkinAt, checkoutAt, desc }:PostBookingProps) => ({
    bookingId, 
    userName, 
    phoneNumber, 
    checkinAt, 
    checkoutAt, 
    desc,
}));

export const cancelBookingAction = createAction(BOOKING_CANCEL, ({ bookingId }:bookingIdProps) => ({
    bookingId
}));

export const createExcelUploadAction = createAction(BOOKING_UPLOAD, ({formData}:UploadBookingFileProps) => ({
    formData
}));

//핀코드, 모바일키 발생 관련
export const issueUserMobilekeyAction = createAction(BOOKING_MOBILEKEY, ({ bookingId, userName, phoneNumber, isNew, checkinAt, checkoutAt }:issueUserProps) => ({
    bookingId, 
    userName, 
    phoneNumber, 
    isNew, 
    checkinAt, 
    checkoutAt
}));
export const issueUserPincodeAction = createAction(BOOKING_PINCODE, ({ bookingId, userName, phoneNumber, type, isNew, checkinAt, checkoutAt }:issueUserProps) => ({
    bookingId, 
    userName, 
    phoneNumber, 
    type, 
    isNew, 
    checkinAt, 
    checkoutAt
}));
export const deleteUserMobilekeyAction = createAction(BOOKING_MOBILEKEY_DELETE, ({ bookingId, keyId }:bookingIdProps) => ({
    bookingId, 
    keyId
}));


//사가 생성
const createBookingSaga = createRequestSaga(BOOKING_CREATE, bookingAPI.createBooking);
const cancelBookingSaga = createRequestSaga(BOOKING_CANCEL, bookingAPI.cancelBooking);
const updateBookingSaga = createRequestSaga(BOOKING_UPDATE, bookingAPI.updateBooking);
const selectBookingSaga = createRequestSaga(BOOKING_SELECT, bookingAPI.selectBooking);
const createExcelUploadSaga = createRequestSaga(BOOKING_UPLOAD, bookingAPI.createBookingByExcelUpload);
//모바일키, 핀코드
const issueUserMobilekeySaga = createRequestSaga(BOOKING_MOBILEKEY, bookingAPI.issueUserMobilekey);
const issueUserPincodeSaga = createRequestSaga(BOOKING_PINCODE, bookingAPI.issueUserPincode);
const deleteUserMobilekeySaga = createRequestSaga(BOOKING_MOBILEKEY_DELETE, bookingAPI.deleteUserMobilekey);

export function* bookingSaga(){
    yield takeLatest(BOOKING_CREATE, createBookingSaga);
    yield takeLatest(BOOKING_CANCEL, cancelBookingSaga);
    yield takeLatest(BOOKING_UPDATE, updateBookingSaga);
    yield takeLatest(BOOKING_SELECT, selectBookingSaga);
    yield takeLatest(BOOKING_UPLOAD, createExcelUploadSaga);
    yield takeLatest(BOOKING_MOBILEKEY, issueUserMobilekeySaga);
    yield takeLatest(BOOKING_PINCODE, issueUserPincodeSaga);
    yield takeLatest(BOOKING_MOBILEKEY_DELETE, deleteUserMobilekeySaga);
}

const initialState:BookingState = {
    booking:{
        userName: '',
        phoneNumber: '',
        countryNumber: '82',
        desc: '',
        roomIds: [],
        commonroomIds: [],
        checkinAt: '',
        checkoutAt: '',
    },
    keyIssueItem: {
        keyType: 'pincode',
        userName: '',
        phoneNumber: '',
        countryNumber: '82',
        type: 'day',
        isNew: false,
        checkinAt: '',
        checkoutAt: '',
    },
    limitCheckInOutAt: {
        minCheckinAt: '',
        maxCheckoutAt: '',
    },
    userkeyListItems: [],
    bookingCreateSuccess: false, //등록 성공 관련
    bookingUpdateSuccess: false, //수정 성공 관련
    bookingCancelSuccess: false, //삭제 성공 관련
    bookingCreateError: null,
    bookingUpdateError: null,
    bookingCancelError: null,
    excelUploadSuccess: false,
    excelUploadError: null,
    userMobileKeyItem: null,
    userMobileKeyError: null,
    userPincodeItem: null,
    userPincodeError: null,
    userkeyDeleteSuccess: false,
    userkeyDeleteError: null,
};
  
const booking = handleActions<BookingState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FINELD] : (state, { payload: { form, key, value} }) => 
        produce(state, draft => {
            if(form === 'booking'){
                if(key === 'userName') draft.booking.userName = value;
                if(key === 'phoneNumber') draft.booking.phoneNumber = value;
                if(key === 'countryNumber') draft.booking.countryNumber = value;
                if(key === 'desc') draft.booking.desc = value;
                if(key === 'roomIds') draft.booking.roomIds = value;
                if(key === 'commonroomIds') draft.booking.commonroomIds = value;
                if(key === 'checkinAt') draft.booking.checkinAt = value;
                if(key === 'checkoutAt') draft.booking.checkoutAt = value;
            }
            if(form === 'keyIssueItem'){
                if(key === 'keyType') draft.keyIssueItem.keyType = value;
                if(key === 'userName') draft.keyIssueItem.userName = value;
                if(key === 'phoneNumber') draft.keyIssueItem.phoneNumber = value;
                if(key === 'countryNumber') draft.booking.countryNumber = value;
                if(key === 'type') draft.keyIssueItem.type = value;
                if(key === 'isNew') draft.keyIssueItem.isNew = value;
                if(key === 'checkinAt') draft.keyIssueItem.checkinAt = value;
                if(key === 'checkoutAt') draft.keyIssueItem.checkoutAt = value;
            }
            if(form === 'limitCheckInOutAt'){
                if(key === 'minCheckinAt') draft.limitCheckInOutAt.minCheckinAt = value;
                if(key === 'maxCheckoutAt') draft.limitCheckInOutAt.maxCheckoutAt = value;
            }
        }),
        [CHANGE_RESULT] : (state, { payload: {key, value} }:bookingSuccessProps) => 
        produce(state, draft => {
            draft[key] = value;
        }),
        // 예약 등록 화면 조회 성공
        [BOOKING_CREATE_SUCCESS] : (state, { payload: booking }) => ({
            ...state,
            booking:{
                bookingId: booking.id,
                userName: booking.user.name,
                phoneNumber: booking.user.phone_number.replace(/([0-9]*)(\d{10})/, '0$2'),
                countryNumber:  booking.user.phone_number.replace(/([0-9]*)(\d{10})/, '$1'),
                desc: booking.desc,
                roomIds: [booking.room.id],
                commonroomIds: booking.commonrooms.id === undefined?[] : [booking.commonrooms.id],
                checkinAt: new Date(booking.checkin_at),
                checkoutAt: new Date(booking.checkout_at),
            },
            keyIssueItem: {
                keyType: 'pincode',
                userName: booking.user.name,
                phoneNumber: booking.user.phone_number.replace(/([0-9]*)(\d{10})/, '0$2'),
                countryNumber:  booking.user.phone_number.replace(/([0-9]*)(\d{10})/, '$1'),
                type: 'day',
                isNew: false,
                checkinAt: new Date(booking.checkin_at),
                checkoutAt: '',
            },
            limitCheckInOutAt: {
                minCheckinAt: new Date(booking.checkin_at),
                maxCheckoutAt: new Date(booking.checkout_at),
            },
            bookingCreateSuccess: true,
            bookingCreateError: null,
         }),
         // 예약 등록 화면 조회 실패
          [BOOKING_CREATE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             bookingCreateError: error,
         }),
         // 예약 삭제 성공
         [BOOKING_CANCEL_SUCCESS] : (state, { payload: booking }) => ({
             ...state,
             bookingCancelSuccess: true,
             bookingCancelError: null,
        }),
         // 예약 삭제 실패
        [BOOKING_CANCEL_FAILURE] : (state, { payload: error }) => ({
             ...state,
             bookingCancelError: error,
        }),
        // 예약 수정 성공
        [BOOKING_UPDATE_SUCCESS] : (state, { payload: booking }) => ({
            ...state,
            bookingUpdateSuccess: true,
            bookingUpdateError: null,
        }),
         // 예약 수정 실패
        [BOOKING_UPDATE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            bookingUpdateError: error,
        }),      
        // 예약 검색 조회 성공
        [BOOKING_SELECT_SUCCESS] : (state, { payload: bookingSelect }) => ({
           ...state,
           booking:{
                bookingId: bookingSelect.id,
                roomId: bookingSelect.room.id,
                roomName: bookingSelect.room.name,
                buildingId: bookingSelect.building.id,
                buildingName: bookingSelect.building.name,
                userName: bookingSelect.user.name,
                phoneNumber: bookingSelect.user.phone_number ? bookingSelect.user.phone_number.replace(/([0-9]*)(\d{10})/, '0$2'):'',
                countryNumber: bookingSelect.user.phone_number ? bookingSelect.user.phone_number.replace(/([0-9]*)(\d{10})/, '$1'):'', 
                desc: bookingSelect.desc,
                roomIds: bookingSelect.room,
                commonroomIds: bookingSelect.commonrooms,
                checkinAt: new Date(bookingSelect.checkin_at),
                checkoutAt: new Date(bookingSelect.checkout_at),
                createdAt: bookingSelect.created_at,
                updatedAt: bookingSelect.updated_at,
           },
           keyIssueItem: {
                keyType: 'pincode',
                userName: bookingSelect.user.name,
                phoneNumber: bookingSelect.user.phone_number ? bookingSelect.user.phone_number.replace(/([0-9]*)(\d{10})/, '0$2'):'',
                countryNumber: bookingSelect.user.phone_number ? bookingSelect.user.phone_number.replace(/([0-9]*)(\d{10})/, '$1'):'', 
                type: 'day',
                isNew: false,
                checkinAt: new Date(bookingSelect.checkin_at),
                checkoutAt: '',
            },
            limitCheckInOutAt: {
                minCheckinAt: new Date(bookingSelect.checkin_at),
                maxCheckoutAt: new Date(bookingSelect.checkout_at),
            },
            userkeyListItems: [...bookingSelect.cards, ...bookingSelect.pincodes, ...bookingSelect.mobilekeys],
        }),
        // 예약 검색 조회 실패
        [BOOKING_SELECT_FAILURE] : (state, { payload: error }) => ({
           ...state,
           bookingUpdateError: error,
       }),
       // 엑셀 업로드 성공
       [BOOKING_UPLOAD_SUCCESS] : (state, { payload: upload }) => ({
           ...state,
           excelUploadSuccess: true,
           excelUploadError: null,
       }),
       // 엑셀 업로드 실패
       [BOOKING_UPLOAD_FAILURE] : (state, { payload: error }) => ({
           ...state,
           excelUploadError: error,
       }),   
        //핀코드, 모바일키 관련
        // 모바일키 성공
        [BOOKING_MOBILEKEY_SUCCESS] : (state, { payload: mobile }) => ({
            ...state,
            userMobileKeyItem: mobile,
            userMobileKeyError: null,
        }),
        // 모바일키 실패
        [BOOKING_MOBILEKEY_FAILURE] : (state, { payload: error }) => ({
            ...state,
            userMobileKeyError: error,
            userMobileKeyItem: null,
        }),       
        // 핀코드 성공
        [BOOKING_PINCODE_SUCCESS] : (state, { payload: pincode }) => ({
            ...state,
            userPincodeItem: pincode,
            userPincodeError: null,
        }),
         // 핀코드 실패
        [BOOKING_PINCODE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            userPincodeError: error,
            userPincodeItem: null,
        }),       
        // 모바일키 삭제 성공
        [BOOKING_MOBILEKEY_DELETE_SUCCESS] : (state, { payload: mobile }) => ({
            ...state,
            userkeyDeleteSuccess: true,
            userkeyDeleteError: null,
        }),
        // 모바일키 삭제 실패
        [BOOKING_MOBILEKEY_DELETE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            userkeyDeleteError: error,
        }),     
   },
   initialState,
);

export default booking;
