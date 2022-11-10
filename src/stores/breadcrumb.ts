import produce from "immer";
import { createAction, handleActions} from "redux-actions";
import { BreadcrumbState, CommonProps, homeMenuItemProps, menuItemProps } from "../types/commons";

const INITIALIZE = 'breadcrumb/INITIALIZE';
const SET_BREADCRUMB_LIST = 'breadcrumb/SET_BREADCRUMB_LIST';
const SET_MENUITEM = 'breadcrumb/SET_MENUITEM';
const SET_MENUTYPE = 'breadcrumb/SET_MENUTYPE';
const SET_HOMEMENUITEM = 'breadcrumb/SET_HOMEMENUITEM';

/* 
    요청을 위한 액션 타입을 payload로 설정합니다. (예: "sample/GET_POST")
*/

export const initialize = createAction(INITIALIZE);
export const setBreadcrumbListAction = createAction(
    SET_BREADCRUMB_LIST,
    (breadcrumbItems:BreadcrumbState['breadcrumbItems']) => breadcrumbItems,
);

export const setMenuItemAction = createAction(SET_MENUITEM, ({ menuItem }:menuItemProps) => ({
    menuItem
}));
export const setMenuTypeAction = createAction(SET_MENUTYPE, ({ key, value }:CommonProps) => ({
    key,
    value
}));

export const setHomeMenuItemAction = createAction(SET_HOMEMENUITEM, ({ homeMenuItem }:homeMenuItemProps) => ({
    homeMenuItem
}));

// initial state : type폴더 -> commons.ts에 등록

const initialState:BreadcrumbState = {
    breadcrumbItems: [],
    menuItem: '',
    menuType: {
        building: 'list',
        floor: 'list',
        room: 'list',
        doorlock: 'list',
        booking: 'list',
        report: 'list',
        staff: 'list',
    },
    homeMenuItem: '',
};

const breadcrumb = handleActions<BreadcrumbState, any>(
    {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [SET_BREADCRUMB_LIST] : (state, {payload: breadcrumbItems}) => ({
            ...state,
            breadcrumbItems: breadcrumbItems,
        }),
        [SET_MENUITEM] : (state, {payload: menuItem}) => ({
            ...state,
            menuItem: menuItem.menuItem,
        }),
        [SET_MENUTYPE] : (state, {payload: menuType}) => ({
            ...state,
            menuType: menuType.menuType,
        }),
        [SET_MENUTYPE] : (state, { payload: { key, value} }) => 
        produce(state, draft => {
            if(key === 'building') draft.menuType.building = value;
            if(key === 'floor') draft.menuType.floor = value;
            if(key === 'room') draft.menuType.room = value;
            if(key === 'doorlock') draft.menuType.doorlock = value;
            if(key === 'booking') draft.menuType.booking = value;
            if(key === 'report') draft.menuType.report = value;
            if(key === 'staff') draft.menuType.staff = value;
        }),
        [SET_HOMEMENUITEM] : (state, {payload: homeMenuItem}) => ({
            ...state,
            homeMenuItem: homeMenuItem.homeMenuItem,
        }),
    },
    initialState,
);

export default breadcrumb;