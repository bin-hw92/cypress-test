
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import header, { headerSaga } from "./header";
import login, { loginSaga } from "./login";
import sidebar from "./sidebar";
import hotelList, { hotelListSaga } from "./hotelList";
import breadcrumb from "./breadcrumb";
import hotel, { hotelSaga } from "./hotel";
import buildingList, { buildingListSaga } from "./buildingList";
import building, { buildingSaga } from "./building";
import floorList, { floorListSaga } from "./floorList";
import floor, { floorSaga } from "./floor";
import roomList, { roomListSaga } from "./roomList";
import room, { roomSaga } from "./room";
import doorlockList, { doorlockListSaga } from "./doorlockList";
import doorlock, { doorlockSaga } from "./doorlock";
import doorlockLogList, { doorlockLogListSaga } from "./doorlockLogList";
import doorlockBatteryList, { doorlockBatteryListSaga } from "./doorlockBatteryList";
import bookingList, { bookingListSaga } from "./bookingList";
import sms, { smsSaga } from "./sms";
import booking, { bookingSaga } from "./booking";
import commonroom, { commonroomSaga } from "./commonroom";
import reportList, { reportListSaga } from "./reportList";
import hotelnotifyList, { hotelnotifyListSaga } from "./hotelnotifyList";
import notifyTemplateList, { notifyTemplateListSaga } from "./notifyTemplateList";
import hotelnotify, { hotelnotifySaga } from "./hotelnotify";
import notifyTemplate, { notifyTemplateSaga } from "./notifyTemplate";
import staffList, { staffListSaga } from "./staffList";
import staff, { staffSaga } from "./staff";
import staffkeyList, { staffkeyListSaga } from "./staffkeyList";
import notifyChannelList, { notifyChannelListSaga } from "./notifyChannelList";
import notifyChannel, { notifyChannelSaga } from "./notifyChannel";
import keytagList, { keytagListSaga } from "./keytagList";
import keytag, { keytagSaga } from "./keytag";
import doorlockAllList, { doorlockAllListSaga } from "./doorlockAllList";

const rootReducer = combineReducers({
    loading,
    header,
    login,
    sidebar,
    hotel,
    hotelList,
    breadcrumb,
    building,
    buildingList,
    floor,
    floorList,
    room,
    roomList,
    doorlock,
    doorlockList,
    doorlockLogList,
    doorlockBatteryList,
    booking,
    bookingList,
    hotelnotify,
    hotelnotifyList,
    staff,
    staffList,
    staffkeyList,
    keytag,
    keytagList,
    notifyTemplate,
    notifyTemplateList,
    notifyChannel,
    notifyChannelList,
    reportList,
    sms,
    commonroom,
    doorlockAllList,
});
// 루트 리듀서의 반환값를 유추해줍니다
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내줍니다.
export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
    yield all([headerSaga(), loginSaga(), hotelSaga(), hotelListSaga(), buildingSaga(), buildingListSaga(), floorSaga(), floorListSaga(), roomSaga(), roomListSaga(), doorlockSaga(), doorlockListSaga(),
        doorlockLogListSaga(), doorlockBatteryListSaga(), bookingSaga(), bookingListSaga(), staffSaga(), staffListSaga(), staffkeyListSaga(), hotelnotifySaga(), hotelnotifyListSaga(), reportListSaga(), 
        keytagSaga(), keytagListSaga(), notifyTemplateSaga(), notifyTemplateListSaga(), notifyChannelSaga(), notifyChannelListSaga(), smsSaga(), commonroomSaga(),
        doorlockAllListSaga()    
    ]);
}

export default rootReducer;