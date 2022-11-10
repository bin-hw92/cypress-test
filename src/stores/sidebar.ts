import { createAction, handleActions } from "redux-actions";

const INITIALIZE = 'sidebar/INITIALIZE' as const;
const SET_IS_OPEN = 'sidebar/SET_IS_OPEN';
const SET_SIDEBAR_ITEM = 'sidebar/SET_SIDEBAR_ITEM' as const; 

type ChangeState = {
    hotelName: string,
    timezone: string,
    address: string
 }

 
 export const initialize = createAction(INITIALIZE);

 export const setHeaderItemAction = createAction(SET_SIDEBAR_ITEM, ({ hotelName, timezone, address }:ChangeState) => ({
    hotelName,
    timezone,
    address
}));

export const setIsOpenAction = createAction(SET_IS_OPEN); 

// initial state
export interface SidebarState {
    isOpen: boolean,
    hotelName: string,
    timezone: string,
    address: string,
    buildingCount: number,
    roomCount: number,
    doorlockCount: number,
    bookingCount: number,
    staffCount: number,
}

const initialState:SidebarState = {
    isOpen: true,
    hotelName: '',
    timezone: '',
    address: '',
    buildingCount: 0,
    roomCount: 0,
    doorlockCount: 0,
    bookingCount: 0,
    staffCount: 0,
  };
  

const sidebar = handleActions<SidebarState, any>(
   {
       [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
       [SET_IS_OPEN] : (state) => ({
            ...state,
            isOpen: !state.isOpen,
        }),
        [SET_IS_OPEN] : (state, { payload: { hotelName, timezone, address }}) => ({
            ...state,
            hotelName: hotelName,
            timezone: timezone,
            address: address,
        }),
   },
   initialState,
);

export default sidebar;
