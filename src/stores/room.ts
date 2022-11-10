import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as roomAPI from "../api/room";
import produce from "immer";
import { CommonProps, roomSuccessProps } from "../types/commons";
import { PostRoomProps, roomIdProps, RoomState } from "../types/room";

/* 객실 등록, 수정, 상제 부분 */
const INITIALIZE = 'room/INITIALIZE';
const CHANGE_FINELD = 'room/CHANGE_FIELD'; //데이터 변경용
const CHANGE_RESULT = 'room/CHANGE_RESULT'; //결과값 변경

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [ROOM_CREATE, ROOM_CREATE_SUCCESS, ROOM_CREATE_FAILURE] = createRequestActionTypes('room/ROOM_CREATE');
const [ROOM_DELETE, ROOM_DELETE_SUCCESS, ROOM_DELETE_FAILURE] = createRequestActionTypes('room/ROOM_DELETE');
const [ROOM_UPDATE, ROOM_UPDATE_SUCCESS, ROOM_UPDATE_FAILURE] = createRequestActionTypes('room/ROOM_UPDATE');
const [ROOM_SELECT, ROOM_SELECT_SUCCESS, ROOM_SELECT_FAILURE] = createRequestActionTypes('room/ROOM_SELECT');
const [ROOM_SELECT_ID, ROOM_SELECT_ID_SUCCESS, ROOM_SELECT_ID_FAILURE] = createRequestActionTypes('room/ROOM_SELECT_ID');

/* action */
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(
    CHANGE_FINELD,
    ({ key, value }:CommonProps) => ({
        key, // room 내부 > name, roomtypeId 등
        value, // 실제 바꾸려는 값
    }),
);

export const changeResult = createAction(
    CHANGE_RESULT,
    ({ key, value }:CommonProps) => ({
        key, // room success, error 변경
        value, // 실제 바꾸려는 값
    }),
);

//객실 조회 정보
export const selectRoomAction = createAction(ROOM_SELECT, ({ buildingId, floorId, roomId }:roomIdProps) => ({
    buildingId, 
    floorId,
    roomId
}));

//객실 조회 정보
export const selectRoomIdAction = createAction(ROOM_SELECT_ID, ({ buildingId, roomId }:roomIdProps) => ({
    buildingId, 
    roomId
}));

//객실 등록 시도
export const createRoomAction = createAction(ROOM_CREATE, ({ buildingId, floorId, name, rmsId, allowKeytag, advertiseStrength, connectedStrength}:PostRoomProps) => ({
    buildingId, 
    floorId, 
    name, 
    rmsId, 
    allowKeytag, 
    advertiseStrength, 
    connectedStrength
}));

//객실 수정 시도
export const updateRoomAction = createAction(ROOM_UPDATE, ({ buildingId, floorId, roomId, name, rmsId, allowKeytag, advertiseStrength, connectedStrength }:PostRoomProps) => ({
    buildingId, 
    floorId,
    roomId, 
    name, 
    rmsId, 
    allowKeytag, 
    advertiseStrength, 
    connectedStrength
}));

//객실 삭제 시도
export const deleteRoomAction = createAction(ROOM_DELETE, ({ buildingId, floorId, roomId }:roomIdProps) => ({
    buildingId, 
    floorId, 
    roomId
}));

//사가 생성
const createRoomSaga = createRequestSaga(ROOM_CREATE, roomAPI.createRoom);
const deleteRoomSaga = createRequestSaga(ROOM_DELETE, roomAPI.deleteRoom);
const updateRoomSaga = createRequestSaga(ROOM_UPDATE, roomAPI.updateRoom);
const selectRoomSaga = createRequestSaga(ROOM_SELECT, roomAPI.selectRoom);
const selectRoomIdSaga = createRequestSaga(ROOM_SELECT_ID, roomAPI.selectRoomId);

export function* roomSaga(){
    yield takeLatest(ROOM_CREATE, createRoomSaga);
    yield takeLatest(ROOM_DELETE, deleteRoomSaga);
    yield takeLatest(ROOM_UPDATE, updateRoomSaga);
    yield takeLatest(ROOM_SELECT, selectRoomSaga);
    yield takeLatest(ROOM_SELECT_ID, selectRoomIdSaga);
}

const initialState:RoomState = {
    room:{
        name: '',
        floorId: '',
        rmsId: '',
        allowKeytag: false,
        advertiseStrength: 5,
        connectedStrength: 7,
    },
    roomCreateSuccess: false, //등록 성공 관련
    roomUpdateSuccess: false, //수정 성공 관련
    roomDeleteSuccess: false, //삭제 성공 관련
    roomCreateError: null,
    roomUpdateError: null,
    roomDeleteError: null,
};

const room = handleActions<RoomState, any>(
   {
    [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
    [CHANGE_FINELD] : (state, { payload: {key, value} }) => 
    produce(state, draft => {
        if(key === 'name') draft.room.name = value;
        if(key === 'floorId') draft.room.floorId = value;
        if(key === 'rmsId') draft.room.rmsId = value;
        if(key === 'allowKeytag') draft.room.allowKeytag = value;
        if(key === 'advertiseStrength') draft.room.advertiseStrength = value;
        if(key === 'connectedStrength') draft.room.connectedStrength = value;
    }),
    [CHANGE_RESULT] : (state, { payload: {key, value} }:roomSuccessProps) => 
    produce(state, draft => {
        draft[key] = value;
    }),
    // 객실 등록 화면 조회 성공
    [ROOM_CREATE_SUCCESS] : (state, { payload: room }) => ({
        ...state,
        room: room,
        roomCreateSuccess: true,
        roomCreateError: null,
     }),
    // 객실 등록 화면 조회 실패
    [ROOM_CREATE_FAILURE] : (state, { payload: error }) => ({
        ...state,
        roomCreateError: error,
    }),
    // 객실 삭제 성공
    [ROOM_DELETE_SUCCESS] : (state, { payload: room }) => ({
        ...state,
        roomDeleteSuccess: true,
        roomDeleteError: null,
    }),
    // 객실 삭제 실패
    [ROOM_DELETE_FAILURE] : (state, { payload: error }) => ({
        ...state,
        roomDeleteError: error,
    }),
    // 객실 수정 성공
    [ROOM_UPDATE_SUCCESS] : (state, { payload: room }) => ({
        ...state,
        roomUpdateSuccess: true,
        roomUpdateError: null,
    }),
     // 객실 수정 실패
    [ROOM_UPDATE_FAILURE] : (state, { payload: error }) => ({
        ...state,
        roomUpdateError: error,
    }),         
     // 객실 검색 조회 성공
     [ROOM_SELECT_SUCCESS] : (state, { payload: roomselect }) => ({
        ...state,
        room:{
         roomId: roomselect.id,
         name: roomselect.name,
         floorId: roomselect.floor_id,
         rmsId: roomselect.rms_id,
         allowKeytag: roomselect.allow_keytag,
         advertiseStrength: roomselect.advertise_strength,
         connectedStrength: roomselect.connected_strength,
         status: roomselect.status,
         buildingName: roomselect.building_name,
         floorName: roomselect.floor_name,
         createdAt: roomselect.created_at,
         updatedAt: roomselect.updated_at,
         doorlock: {
             doorlockId: roomselect.doorlock.id,
             dlSerial: roomselect.doorlock.dl_serial,
             name: roomselect.doorlock.name,
             pincodeVersion: roomselect.doorlock.pincode_version,
         },
        }
     }),
     // 객실 검색 조회 실패
     [ROOM_SELECT_FAILURE] : (state, { payload: error }) => ({
        ...state,
        roomUpdateError: error,
    }),
     // 객실 검색 조회 성공
     [ROOM_SELECT_ID_SUCCESS] : (state, { payload: roomselect }) => ({
        ...state,
        room:{
         roomId: roomselect.id,
         name: roomselect.name,
         floorId: roomselect.floor_id,
         rmsId: roomselect.rms_id,
         allowKeytag: roomselect.allow_keytag,
         advertiseStrength: roomselect.advertise_strength,
         connectedStrength: roomselect.connected_strength,
         status: roomselect.status,
         buildingName: roomselect.building_name,
         floorName: roomselect.floor_name,
         createdAt: roomselect.created_at,
         updatedAt: roomselect.updated_at,
         doorlock: {
             doorlockId: roomselect.doorlock.id,
             dlSerial: roomselect.doorlock.dl_serial,
             name: roomselect.doorlock.name,
             pincodeVersion: roomselect.doorlock.pincode_version,
         },
        }
     }),
     // 객실 검색 조회 실패
     [ROOM_SELECT_ID_FAILURE] : (state, { payload: error }) => ({
        ...state,
        roomUpdateError: error,
    }),
   },
   initialState,
);

export default room;
