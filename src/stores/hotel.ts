import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as hotelAPI from "../api/hotel";
import produce from "immer";
import { CommonProps, hotelSuccessProps } from "../types/commons";
import { HotelState, HotelUploadFileProps, PostHotelProps } from "../types/hotel";

/* 호텔 등록, 수정, 상제 부분 */
const INITIALIZE = 'hotel/INITIALIZE';
const CHANGE_FINELD = 'hotel/CHANGE_FIELD'; //데이터 변경용
const CHANGE_RESULT = 'building/CHANGE_RESULT'; //결과값 변경

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [HOTEL_CREATE, HOTEL_CREATE_SUCCESS, HOTEL_CREATE_FAILURE] = createRequestActionTypes('hotel/HOTEL_CREATE');
const [HOTEL_FILE_UPLOAD, HOTEL_FILE_UPLOAD_SUCCESS, HOTEL_FILE_UPLOAD_FAILURE] = createRequestActionTypes('hotel/HOTEL_FILE_UPLOAD');
const [HOTEL_DELETE, HOTEL_DELETE_SUCCESS, HOTEL_DELETE_FAILURE] = createRequestActionTypes('hotel/HOTEL_DELETE');
const [HOTEL_UPDATE, HOTEL_UPDATE_SUCCESS, HOTEL_UPDATE_FAILURE] = createRequestActionTypes('hotel/HOTEL_UPDATE');
const [HOTEL_SELECT, HOTEL_SELECT_SUCCESS, HOTEL_SELECT_FAILURE] = createRequestActionTypes('hotel/HOTEL_SELECT');

/* action */
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(
    CHANGE_FINELD,
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

export const selectHotelAction = createAction(HOTEL_SELECT);

//호텔 등록 시도
export const createHotelAction = createAction(HOTEL_CREATE, ({ name, timezone, address, desc, pincodeDayTypeOffset, pincodeVersion, pincodeLength, allowInfinityPincode, pincodeAuthTimeoutMin, useSlimkey, commonrooms, notifyChannelId }:PostHotelProps) => ({
    name, 
    timezone, 
    address, 
    desc, 
    pincodeDayTypeOffset, 
    pincodeVersion, 
    pincodeLength, 
    allowInfinityPincode, 
    pincodeAuthTimeoutMin, 
    useSlimkey, 
    commonrooms,
    notifyChannelId,
}));

//호텔 수정 시도
export const updateHotelAction = createAction(HOTEL_UPDATE, ({ name, timezone, address, desc, pincodeDayTypeOffset, pincodeVersion, pincodeLength, allowInfinityPincode, pincodeAuthTimeoutMin, useSlimkey, commonrooms, notifyChannelId, apphotelstory, appElevatorBtn }:PostHotelProps) => ({
    name, 
    timezone, 
    address, 
    desc, 
    pincodeDayTypeOffset, 
    pincodeVersion, 
    pincodeLength, 
    allowInfinityPincode, 
    pincodeAuthTimeoutMin, 
    useSlimkey, 
    commonrooms,
    notifyChannelId, 
    apphotelstory, 
    appElevatorBtn,
}));

export const createExcelUploadAction = createAction(HOTEL_FILE_UPLOAD, ({file}:HotelUploadFileProps) => ({
    file
}));
export const deleteHotelAction = createAction(HOTEL_DELETE);

//사가 생성
const createHotelSaga = createRequestSaga(HOTEL_CREATE, hotelAPI.createHotel);
const createExcelUploadSaga= createRequestSaga(HOTEL_FILE_UPLOAD, hotelAPI.createFacilityByExcelUpload);
const deleteHotelSaga = createRequestSaga(HOTEL_DELETE, hotelAPI.deleteHotel);
const updateHotelSaga = createRequestSaga(HOTEL_UPDATE, hotelAPI.updateHotel);
const selectHotelSaga = createRequestSaga(HOTEL_SELECT, hotelAPI.selectHotel);

export function* hotelSaga(){
    yield takeLatest(HOTEL_CREATE, createHotelSaga);
    yield takeLatest(HOTEL_FILE_UPLOAD, createExcelUploadSaga);
    yield takeLatest(HOTEL_DELETE, deleteHotelSaga);
    yield takeLatest(HOTEL_UPDATE, updateHotelSaga);
    yield takeLatest(HOTEL_SELECT, selectHotelSaga);
}

//initialState
const initialState:HotelState = {
    hotel:{
        name: '',
        timezone: 'Asia/Seoul',
        address: '',
        desc: '',
        pincodeVersion: 'V2',
        pincodeLength: '8',
        pincodeDayTypeOffset: '1200',
        allowInfinityPincode: false,
        pincodeAuthTimeoutMin: '10',
        useSlimkey: true,
        commonrooms: [],
        notifyChannelId: null,
        role: '',
    },
    hotelCreateSuccess: false, //등록 성공 관련
    hotelUpdateSuccess: false, //수정 성공 관련
    hotelDeleteSuccess: false, //삭제 성공 관련
    hotelCreateError: null,
    hotelUpdateError: null,
    hotelDeleteError: null,
    formData:null,
};
  
const hotel = handleActions<HotelState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FINELD] : (state, { payload: {key, value} }) => 
        produce(state, draft => {
            if(key === 'name') draft.hotel.name = value;
            if(key === 'timezone') draft.hotel.timezone = value;
            if(key === 'address') draft.hotel.address = value;
            if(key === 'desc') draft.hotel.desc = value;
            if(key === 'useSlimkey') draft.hotel.useSlimkey = value;
            if(key === 'pincodeVersion'){
                draft.hotel.pincodeVersion = value;
                if(value === 'V2') draft.hotel.pincodeLength = 8;
                if(value === 'V3') draft.hotel.pincodeLength = 6;
                if(value === 'V4') draft.hotel.pincodeLength = 6;
            } 
            if(key === 'pincodeLength') draft.hotel.pincodeLength = value;
            if(key === 'pincodeDayTypeOffset') draft.hotel.pincodeDayTypeOffset = value;
            if(key === 'allowInfinityPincode') draft.hotel.allowInfinityPincode = value;
            if(key === 'pincodeAuthTimeoutMin') draft.hotel.pincodeAuthTimeoutMin = value;
            if(key === 'commonrooms') draft.hotel.commonrooms = value;
            if(key === 'notifyChannelId') draft.hotel.notifyChannelId = value;
            if(key === 'apphotelstory') draft.hotel.apphotelstory = value;
            if(key === 'appElevatorBtn') draft.hotel.appElevatorBtn = value;
            if(key === 'role')  draft.hotel.role = value;
        }),        
        [CHANGE_RESULT] : (state, { payload: {key, value} }:hotelSuccessProps) => 
        produce(state, draft => {
            draft[key] = value;
        }),
        // 호텔 등록 화면 조회 성공
        [HOTEL_CREATE_SUCCESS] : (state, { payload: hotel }) => ({
            ...state,
            hotel: hotel,
            hotelCreateSuccess: true,
            hotelCreateError: null,
         }),
         // 호텔 등록 화면 조회 실패
          [HOTEL_CREATE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             hotelCreateError: error,
         }),
        // 호텔 벌크 등록 화면 조회 성공
        [HOTEL_FILE_UPLOAD_SUCCESS] : (state, { payload: hotel }) => ({
            ...state,
            hotelCreateSuccess: true,
            hotelCreatelError: null,
         }),
         // 호텔 벌크 등록 화면 조회 실패
          [HOTEL_FILE_UPLOAD_FAILURE] : (state, { payload: error }) => ({
             ...state,
             hotelCreateError: error,
         }),
         // 호텔 삭제 성공
         [HOTEL_DELETE_SUCCESS] : (state, { payload: hotel }) => ({
             ...state,
             hotelDeleteSuccess: true,
             hotelDeleteError: null,
        }),
          // 호텔 삭제 실패
           [HOTEL_DELETE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             hotelDeleteError: error,
         }),
        // 호텔 수정 성공
        [HOTEL_UPDATE_SUCCESS] : (state, { payload: hotel }) => ({
            ...state,
            hotelUpdateSuccess: true,
            hotelUpdateError: null,
        }),
         // 호텔 수정 실패
        [HOTEL_UPDATE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            hotelDeleteError: error,
        }),         
        // 호텔 검색 조회 성공
        [HOTEL_SELECT_SUCCESS] : (state, { payload: hotelselect }) => ({
           ...state,
           hotel:{
            name: hotelselect.name,
            timezone: hotelselect.timezone,
            address: hotelselect.address,
            desc: hotelselect.desc,
            pincodeVersion: hotelselect.pincode_version,
            pincodeLength: hotelselect.pincode_length,
            pincodeDayTypeOffset: hotelselect.pincode_day_type_offset,
            allowInfinityPincode: hotelselect.allow_infinity_pincode,
            pincodeAuthTimeoutMin: hotelselect.pincode_auth_timeout_min,
            useSlimkey: hotelselect.use_slimkey,
            commonrooms: hotelselect.commonrooms,
            notifyChannelId: hotelselect.notify_channel_id,
            apphotelstory: hotelselect.app_hotelstory,
            appElevatorBtn: hotelselect.app_elevator_btn,
            role: hotelselect.role,
           }
        }),
        // 호텔 검색 조회 실패
        [HOTEL_SELECT_FAILURE] : (state, { payload: error }) => ({
           ...state,
           hotelUpdateError: error,
       }),
   },
   initialState,
);

export default hotel;
