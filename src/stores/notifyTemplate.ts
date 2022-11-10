import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "./lib/createRequestSaga";
import * as notifyTemplateAPI from "../api/notifyTemplate";
import produce from "immer";
import { CommonProps, notifyTemplateSuccessProps } from "../types/commons";
import { notifyTemplateState, PostNotifyProps, previewProps, templateIdProps } from "../types/notifyTemplate";

/* 호텔 등록, 수정, 상제 부분 */
const INITIALIZE = 'notifyTemplate/INITIALIZE';
const CHANGE_FINELD = 'notifyTemplate/CHANGE_FIELD'; //데이터 변경용
const CHANGE_RESULT = 'notifyTemplate/CHANGE_RESULT'; //결과값 변경
const CHANGE_PREVIEW = 'notifyTemplate/CHANGE_PREVIEW'; //미리보기 컬럼 변경

//리덕스 모듈에서 API를 사용할 수 있게 추가
const [NOTIFY_TEMPLATE_CREATE, NOTIFY_TEMPLATE_CREATE_SUCCESS, NOTIFY_TEMPLATE_CREATE_FAILURE] = createRequestActionTypes('notifyTemplate/NOTIFY_TEMPLATE_CREATE');
const [NOTIFY_TEMPLATE_DELETE, NOTIFY_TEMPLATE_DELETE_SUCCESS, NOTIFY_TEMPLATE_DELETE_FAILURE] = createRequestActionTypes('notifyTemplate/NOTIFY_TEMPLATE_DELETE');
const [NOTIFY_TEMPLATE_UPDATE, NOTIFY_TEMPLATE_UPDATE_SUCCESS, NOTIFY_TEMPLATE_UPDATE_FAILURE] = createRequestActionTypes('notifyTemplate/NOTIFY_TEMPLATE_UPDATE');
const [NOTIFY_TEMPLATE_SELECT, NOTIFY_TEMPLATE_SELECT_SUCCESS, NOTIFY_TEMPLATE_SELECT_FAILURE] = createRequestActionTypes('notifyTemplate/NOTIFY_TEMPLATE_SELECT');
const [NOTIFY_TEMPLATE_PREVIEW, NOTIFY_TEMPLATE_PREVIEW_SUCCESS, NOTIFY_TEMPLATE_PREVIEW_FAILURE] = createRequestActionTypes('notifyTemplate/NOTIFY_TEMPLATE_PREVIEW');

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

export const changePreview = createAction(CHANGE_PREVIEW, ({ template, templateAlt, dateFormat, locale }:previewProps) => ({
    template, 
    templateAlt, 
    dateFormat, 
    locale
}));

export const previewNotifyTemplateAction = createAction(NOTIFY_TEMPLATE_PREVIEW, ({ template, templateAlt, dateFormat, locale }:previewProps) => ({
    template, 
    templateAlt, 
    dateFormat, 
    locale,
}));


export const selectnotifyTemplateAction = createAction(NOTIFY_TEMPLATE_SELECT, ({ templateId }:templateIdProps) => ({
    templateId
}));

//호텔 등록 시도
export const createnotifyTemplateAction = createAction(NOTIFY_TEMPLATE_CREATE, ({ template, templateCode, templateAlt, dateFormat, locale, isLMS, desc }:PostNotifyProps) => ({
    template, 
    templateCode, 
    templateAlt, 
    dateFormat, 
    locale, 
    isLMS, 
    desc,
}));

//호텔 수정 시도
export const updatenotifyTemplateAction = createAction(NOTIFY_TEMPLATE_UPDATE, ({ templateId, template, templateCode, templateAlt, dateFormat, locale, isLMS, desc }:PostNotifyProps) => ({
    templateId, 
    template, 
    templateCode, 
    templateAlt, 
    dateFormat, 
    locale, 
    isLMS, 
    desc,
}));

export const deletenotifyTemplateAction = createAction(NOTIFY_TEMPLATE_DELETE, ({ templateId }:templateIdProps) => ({
    templateId
}));

//사가 생성
const createnotifyTemplateSaga = createRequestSaga(NOTIFY_TEMPLATE_CREATE, notifyTemplateAPI.createNotifyTemplate);
const deletenotifyTemplateSaga = createRequestSaga(NOTIFY_TEMPLATE_DELETE, notifyTemplateAPI.deleteNotifyTemplate);
const updatenotifyTemplateSaga = createRequestSaga(NOTIFY_TEMPLATE_UPDATE, notifyTemplateAPI.updateNotifyTemplate);
const selectnotifyTemplateSaga = createRequestSaga(NOTIFY_TEMPLATE_SELECT, notifyTemplateAPI.selectNotifyTemplate);
const previewnotifyTemplateSaga = createRequestSaga(NOTIFY_TEMPLATE_PREVIEW, notifyTemplateAPI.previewNotifyTemplate);

export function* notifyTemplateSaga(){
    yield takeLatest(NOTIFY_TEMPLATE_CREATE, createnotifyTemplateSaga);
    yield takeLatest(NOTIFY_TEMPLATE_DELETE, deletenotifyTemplateSaga);
    yield takeLatest(NOTIFY_TEMPLATE_UPDATE, updatenotifyTemplateSaga);
    yield takeLatest(NOTIFY_TEMPLATE_SELECT, selectnotifyTemplateSaga);
    yield takeLatest(NOTIFY_TEMPLATE_PREVIEW, previewnotifyTemplateSaga);
}

const initialState:notifyTemplateState = {
    notifyTemplate:{
        templateCode: '',
        template: '',
        templateAlt: '',
        dateFormat: '',
        locale: '',
        isLMS: false,
        desc: '',
    },
    notifyPreviewState: {
        template: '',
        templateAlt: '',
        dateFormat: '',
        locale: '',
    },
    notifyTemplatePreview: {
        templateAltRendered: '',
        templateRendered: '',
    },
    notifyTemplateCreateSuccess: false, //등록 성공 관련
    notifyTemplateUpdateSuccess: false, //수정 성공 관련
    notifyTemplateDeleteSuccess: false, //삭제 성공 관련
    notifyTemplateCreateError: null,
    notifyTemplateUpdateError: null,
    notifyTemplateDeleteError: null,
    notifyTemplatePreviewError: null,
};
  
const notifyTemplate = handleActions<notifyTemplateState, any>(
   {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FINELD] : (state, { payload: {key, value} }) => 
        produce(state, draft => {
            if(key === 'template') draft.notifyTemplate.template = value;
            if(key === 'templateCode') draft.notifyTemplate.templateCode = value;
            if(key === 'templateAlt') draft.notifyTemplate.templateAlt = value;
            if(key === 'dateFormat') draft.notifyTemplate.dateFormat = value;
            if(key === 'locale') draft.notifyTemplate.locale = value;
            if(key === 'isLMS') draft.notifyTemplate.isLMS = value;
            if(key === 'desc') draft.notifyTemplate.desc = value;
        }),
        [CHANGE_RESULT] : (state, { payload: {key, value} }:notifyTemplateSuccessProps) => 
        produce(state, draft => {
            draft[key] = value;
        }),
        // 알림 템플릿 검색 조회 성공
        [CHANGE_PREVIEW] : (state, { payload: { template, templateAlt, dateFormat, locale, } }) => ({
            ...state,
            notifyPreviewState: {
                template: template,
                templateAlt: templateAlt,
                dateFormat: dateFormat,
                locale: locale,
            }
        }),
        // 알림 템플릿 등록 화면 조회 성공
        [NOTIFY_TEMPLATE_CREATE_SUCCESS] : (state, { payload: notifyTemplate }) => ({
            ...state,
            notifyTemplate: notifyTemplate,
            notifyTemplateCreateSuccess: true,
            notifyTemplateCreateError: null,
         }),
         // 알림 템플릿 등록 화면 조회 실패
          [NOTIFY_TEMPLATE_CREATE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             notifyTemplateCreateError: error,
         }),
         // 알림 템플릿 삭제 성공
         [NOTIFY_TEMPLATE_DELETE_SUCCESS] : (state, { payload: notifyTemplate }) => ({
             ...state,
             notifyTemplateDeleteSuccess: true,
             notifyTemplateDeleteError: null,
        }),
         // 알림 템플릿 삭제 실패
        [NOTIFY_TEMPLATE_DELETE_FAILURE] : (state, { payload: error }) => ({
             ...state,
             notifyTemplateDeleteError: error,
        }),
        // 알림 템플릿 수정 성공
        [NOTIFY_TEMPLATE_UPDATE_SUCCESS] : (state, { payload: notifyTemplate }) => ({
            ...state,
            notifyTemplateUpdateSuccess: true,
            notifyTemplateUpdateError: null,
        }),
         // 알림 템플릿 수정 실패
        [NOTIFY_TEMPLATE_UPDATE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            notifyTemplateDeleteError: error,
        }),         
        // 알림 템플릿 검색 조회 성공
        [NOTIFY_TEMPLATE_SELECT_SUCCESS] : (state, { payload: notifyTemplateSelect }) => ({
           ...state,
           notifyTemplate: {
                templateId: notifyTemplateSelect.id? notifyTemplateSelect.id : '',
                template: notifyTemplateSelect.template? notifyTemplateSelect.template : '',
                templateCode: notifyTemplateSelect.template_code? notifyTemplateSelect.template_code : '',
                templateAlt: notifyTemplateSelect.template_alt? notifyTemplateSelect.template_alt : '',
                dateFormat: notifyTemplateSelect.date_format? notifyTemplateSelect.date_format : '',
                locale: notifyTemplateSelect.locale? notifyTemplateSelect.locale : '',
                isLMS: notifyTemplateSelect.is_lms,
                desc: notifyTemplateSelect.desc? notifyTemplateSelect.desc : '',
                createdAt: notifyTemplateSelect.created_at,
                updatedAt: notifyTemplateSelect.updated_at,
                hotelTemplateCount: notifyTemplateSelect.hotel_template_count? notifyTemplateSelect.hotel_template_count : 0,
           }
        }),
        // 알림 템플릿 검색 조회 실패
        [NOTIFY_TEMPLATE_SELECT_FAILURE] : (state, { payload: error }) => ({
           ...state,
           notifyTemplateUpdateError: error,
       }),
        // 미리보기 성공
        [NOTIFY_TEMPLATE_PREVIEW_SUCCESS] : (state, { payload: preview }) => ({
            ...state,
            notifyTemplatePreview: {
                templateAltRendered: preview.template_alt_rendered,
                templateRendered: preview.template_rendered,
            },
            notifyTemplatePreviewError: null,
        }),
         // 미리보기 실패
        [NOTIFY_TEMPLATE_PREVIEW_FAILURE] : (state, { payload: error }) => ({
            ...state,
            notifyTemplatePreviewError: error,
        }),
   },
   initialState,
);

export default notifyTemplate;
