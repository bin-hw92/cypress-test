import { useMemo } from "react";
import { useSelector } from "react-redux";
import Spin from "../../components/Commons/Spin";
import { RootState } from "../../stores";


//로딩 플래그
function loadingCheck(action:any) {
    //hotel
    if(action.hotelListLoading) return true;
    if(action.hotelCreateLoading) return true;
    if(action.hotelUpdateLoading) return true;
    if(action.hotelDeleteLoading) return true;
    if(action.hotelSelectLoading) return true;
    if(action.hotelFileUploadLoading) return true;
    //building
    if(action.buildingListLoading) return true;
    if(action.buildingCreateLoading) return true;
    if(action.buildingUpdateLoading) return true;
    if(action.buildingDeleteLoading) return true;
    if(action.buildingSelectLoading) return true;
    if(action.buildingTypeListLoading) return true;
    //floor
    if(action.floorListLoading) return true;
    if(action.floorCreateLoading) return true;
    if(action.floorUpdateLoading) return true;
    if(action.floorDeleteLoading) return true;
    if(action.floorSelectLoading) return true;
    //room
    if(action.roomListLoading) return true;
    if(action.roomFloorListLoading) return true;
    if(action.roomCreateLoading) return true;
    if(action.roomUpdateLoading) return true;
    if(action.roomDeleteLoading) return true;
    if(action.roomSelectLoading) return true;
    if(action.roomSelectIdLoading) return true;
    //doorlock
    if(action.doorlockListLoading) return true;
    if(action.doorlockUninstallLoading) return true;
    if(action.doorlockSelectLoading) return true;
    if(action.doorlockBatteryListLoading) return true;
    if(action.doorlockLogListLoading) return true;
    //booking
    if(action.bookingListLoading) return true;
    if(action.bookingCreateLoading) return true;
    if(action.bookingUpdateLoading) return true;
    if(action.bookingCancelLoading) return true;
    if(action.bookingUploadLoading) return true;
    if(action.bookingSelectLoading) return true;
    if(action.bookingPincodeLoading) return true;
    if(action.bookingMobileKeyLoading) return true;
    if(action.bookingMobileDeleteLoading) return true;
    //staff 
    if(action.staffListLoading) return true;
    if(action.staffkeyListLoading) return true;
    if(action.staffCreateLoading) return true;
    if(action.staffUpdateLoading) return true;
    if(action.staffDeleteLoading) return true;
    if(action.staffSelectLoading) return true;
    if(action.staffVerificationCodeLoading) return true;
    if(action.staffVerificationTokenLoading) return true;
    if(action.staffSignupLoading) return true;
    if(action.staffMobileKeyLoading) return true;
    if(action.staffMobileKeyDeleteLoading) return true;
    //hotelnotify
    if(action.hotelnotifyListLoading) return true;
    if(action.hotelnotifyContextListLoading) return true;
    if(action.hotelnotifyCreateLoading) return true;
    if(action.hotelnotifyDeleteLoading) return true;
    //notifyChannel
    if(action.notifyChannelListLoading) return true;
    if(action.notifyChannelCreateLoading) return true;
    if(action.notifyChannelUpdateLoading) return true;
    if(action.notifyChannelDeleteLoading) return true;
    if(action.notifyChannelSelectLoading) return true;
    //notifyTemplate
    if(action.notifyTemplateListLoading) return true;
    if(action.notifyTemplateCreateLoading) return true;
    if(action.notifyTemplateUpdateLoading) return true;
    if(action.notifyTemplateDeleteLoading) return true;
    if(action.notifyTemplateSelectLoading) return true;
    if(action.notifyTemplatePreviewLoading) return true;
    //report
    if(action.reportListLoading) return true;
    //commonroom
    if(action.commonroomListLoading) return true;
    //sms
    if(action.smsSendLoading) return true;
    if(action.smsPincodeLoading) return true;
    if(action.smsMobileKeyLoading) return true;

    return false;
}

const SpinContainer = () => {
    const { hotelListLoading, hotelCreateLoading, hotelUpdateLoading, hotelDeleteLoading, hotelSelectLoading, hotelFileUploadLoading, 
        buildingListLoading, buildingCreateLoading, buildingUpdateLoading, buildingDeleteLoading, buildingSelectLoading, buildingTypeListLoading,
        floorListLoading, floorCreateLoading, floorUpdateLoading, floorDeleteLoading, floorSelectLoading,
        roomListLoading, roomFloorListLoading, roomCreateLoading, roomUpdateLoading, roomDeleteLoading, roomSelectLoading, roomSelectIdLoading,
        doorlockListLoading, doorlockUninstallLoading, doorlockSelectLoading, doorlockBatteryListLoading, doorlockLogListLoading,
        bookingListLoading, bookingCreateLoading, bookingUpdateLoading, bookingCancelLoading, bookingUploadLoading, bookingSelectLoading, bookingPincodeLoading, bookingMobileKeyLoading, bookingMobileDeleteLoading, 
        staffListLoading, staffkeyListLoading, staffCreateLoading, staffUpdateLoading, staffDeleteLoading, staffSelectLoading, staffVerificationCodeLoading, staffVerificationTokenLoading, staffSignupLoading, staffMobileKeyLoading, staffMobileKeyDeleteLoading,
        hotelnotifyListLoading, hotelnotifyContextListLoading, hotelnotifyCreateLoading, hotelnotifyDeleteLoading,
        notifyChannelListLoading, notifyChannelCreateLoading, notifyChannelUpdateLoading, notifyChannelDeleteLoading, notifyChannelSelectLoading, 
        notifyTemplateListLoading, notifyTemplateCreateLoading, notifyTemplateUpdateLoading, notifyTemplateDeleteLoading, notifyTemplateSelectLoading, notifyTemplatePreviewLoading, 
        reportListLoading,
        commonroomListLoading,
        smsSendLoading, smsPincodeLoading, smsMobileKeyLoading,
    } = useSelector(({ loading }:RootState) => ({
        //hotel
        hotelListLoading: loading['hotelList/HOTEL_LIST'],
        hotelCreateLoading: loading['hotel/HOTEL_CREATE'],
        hotelUpdateLoading: loading['hotel/HOTEL_UPDATE'],
        hotelDeleteLoading: loading['hotel/HOTEL_DELETE'],
        hotelSelectLoading: loading['hotel/HOTEL_SELECT'],
        hotelFileUploadLoading: loading['hotel/HOTEL_FILE_UPLOAD'],
        //building
        buildingListLoading: loading['buildingList/BUILDING_LIST'],
        buildingCreateLoading: loading['building/BUILDING_CREATE'],
        buildingUpdateLoading: loading['building/BUILDING_UPDATE'],
        buildingDeleteLoading: loading['building/BUILDING_DELETE'],
        buildingSelectLoading: loading['building/BUILDING_SELECT'],
        buildingTypeListLoading: loading['building/BUILDING_TYPE'],
        //floor
        floorListLoading: loading['floorList/FLOOR_LIST'],
        floorCreateLoading: loading['floor/FLOOR_CREATE'],
        floorUpdateLoading: loading['floor/FLOOR_UPDATE'],
        floorDeleteLoading: loading['floor/FLOOR_DELETE'],
        floorSelectLoading: loading['floor/FLOOR_SELECT'],
        //room
        roomListLoading: loading['roomList/ROOM_LIST'],
        roomFloorListLoading: loading['roomList/ROOM_FLOOR_LIST'],
        roomCreateLoading: loading['room/ROOM_CREATE'],
        roomUpdateLoading: loading['room/ROOM_UPDATE'],
        roomDeleteLoading: loading['room/ROOM_DELETE'],
        roomSelectLoading: loading['room/ROOM_SELECT'],
        roomSelectIdLoading: loading['room/ROOM_SELECT_ID'],
        //doorlock
        doorlockListLoading: loading['doorlockList/DOORLOCK_LIST'],
        doorlockUninstallLoading: loading['doorlock/DOORLOCK_UNINSTALL'],
        doorlockSelectLoading: loading['doorlock/DOORLOCK_SELECT'],
        doorlockBatteryListLoading: loading['doorlockBatteryList/DOORLOCKBATTERY_LIST'],
        doorlockLogListLoading: loading['doorlockLogList/DOORLOCKLOG_LIST'],
        //booking
        bookingListLoading: loading['bookingList/BOOKING_LIST'],
        bookingCreateLoading: loading['booking/BOOKING_CREATE'],
        bookingUpdateLoading: loading['booking/BOOKING_UPDATE'],
        bookingCancelLoading: loading['booking/BOOKING_CANCEL'],
        bookingUploadLoading: loading['booking/BOOKING_UPLOAD'],
        bookingSelectLoading: loading['booking/BOOKING_SELECT'],
        bookingPincodeLoading: loading['booking/BOOKING_PINCODE'],
        bookingMobileKeyLoading: loading['booking/BOOKING_MOBILEKEY'],
        bookingMobileDeleteLoading: loading['booking/BOOKING_MOBILEKEY_DELETE'],
        //staff
        staffListLoading: loading['staffList/STAFF_LIST'],
        staffkeyListLoading: loading['staffkeyList/STAFF_KEY_LIST'],
        staffCreateLoading: loading['staff/STAFF_CREATE'],
        staffUpdateLoading: loading['staff/STAFF_UPDATE'],
        staffDeleteLoading: loading['staff/STAFF_DELETE'],
        staffSelectLoading: loading['staff/STAFF_SELECT'],
        staffVerificationCodeLoading: loading['staff/STAFF_VERIFICATION_CODE'],
        staffVerificationTokenLoading: loading['staff/STAFF_VERIFICATION_TOKEN'],
        staffSignupLoading: loading['staff/STAFF_SIGNUP'],
        staffMobileKeyLoading: loading['staff/STAFF_MOBILEKEY'],
        staffMobileKeyDeleteLoading: loading['staff/STAFF_MOBILEKEY_DELETE'],
        //hotelnotify
        hotelnotifyListLoading: loading['hotelnotifyList/HOTELNOTIFY_LIST'],
        hotelnotifyContextListLoading: loading['hotelnotifyList/HOTELNOTIFY_CONTEXT_LIST'],
        hotelnotifyCreateLoading: loading['hotelnotify/HOTELNOTIFY_CREATE'],
        hotelnotifyDeleteLoading: loading['hotelnotify/HOTELNOTIFY_DELETE'],
        //notifyChannel
        notifyChannelListLoading: loading['notifyChannelList/NOTIFY_CHANNEL_LIST'],
        notifyChannelCreateLoading: loading['notifyChannel/NOTIFY_CHANNEL_CREATE'],
        notifyChannelUpdateLoading: loading['notifyChannel/NOTIFY_CHANNEL_UPDATE'],
        notifyChannelDeleteLoading: loading['notifyChannel/NOTIFY_CHANNEL_DELETE'],
        notifyChannelSelectLoading: loading['notifyChannel/NOTIFY_CHANNEL_SELECT'],
        //notifyTemplate
        notifyTemplateListLoading: loading['notifyTemplateList/NOTIFY_TEMPLATE_LIST'],
        notifyTemplateCreateLoading: loading['notifyTemplate/NOTIFY_TEMPLATE_CREATE'],
        notifyTemplateUpdateLoading: loading['notifyTemplate/NOTIFY_TEMPLATE_UPDATE'],
        notifyTemplateDeleteLoading: loading['notifyTemplate/NOTIFY_TEMPLATE_DELETE'],
        notifyTemplateSelectLoading: loading['notifyTemplate/NOTIFY_TEMPLATE_SELECT'],
        notifyTemplatePreviewLoading: loading['notifyTemplate/NOTIFY_TEMPLATE_PREVIEW'],
        //report
        reportListLoading: loading['reportList/REPORT_LIST'],
        //commonroom
        commonroomListLoading: loading['commonroom/COMMONROOM_LIST'],
        //sms
        smsSendLoading: loading['sms/SMS_SEND'],
        smsPincodeLoading: loading['sms/SMS_PINCODE'],
        smsMobileKeyLoading: loading['sms/SMS_MOBILEKEY'],
    }));

    //로딩 정보
    const loadingMemo = useMemo<boolean>(() => 
    loadingCheck({hotelListLoading, hotelCreateLoading, hotelUpdateLoading, hotelDeleteLoading, hotelSelectLoading, hotelFileUploadLoading, //호텔 관련 loading
        buildingListLoading, buildingCreateLoading, buildingUpdateLoading, buildingDeleteLoading, buildingSelectLoading, buildingTypeListLoading, //빌딩 관련 loading
        floorListLoading, floorCreateLoading, floorUpdateLoading, floorDeleteLoading, floorSelectLoading, //층 관련 loading
        roomListLoading, roomFloorListLoading, roomCreateLoading, roomUpdateLoading, roomDeleteLoading, roomSelectLoading, roomSelectIdLoading, //객실 관련 loading
        doorlockListLoading, doorlockUninstallLoading, doorlockSelectLoading, doorlockBatteryListLoading, doorlockLogListLoading, //도어락 관련 loading
        bookingListLoading, bookingCreateLoading, bookingUpdateLoading, bookingCancelLoading, bookingUploadLoading, bookingSelectLoading, bookingPincodeLoading, bookingMobileKeyLoading, bookingMobileDeleteLoading, //예약 관련 loading
        staffListLoading, staffkeyListLoading, staffCreateLoading, staffUpdateLoading, staffDeleteLoading, staffSelectLoading, staffVerificationCodeLoading, staffVerificationTokenLoading, staffSignupLoading, staffMobileKeyLoading, staffMobileKeyDeleteLoading, //스태프 관련 loading
        hotelnotifyListLoading, hotelnotifyContextListLoading, hotelnotifyCreateLoading, hotelnotifyDeleteLoading, //호텔 알림 관련 loading
        notifyChannelListLoading, notifyChannelCreateLoading, notifyChannelUpdateLoading, notifyChannelDeleteLoading, notifyChannelSelectLoading, //알림 채널 관련 loading
        notifyTemplateListLoading, notifyTemplateCreateLoading, notifyTemplateUpdateLoading, notifyTemplateDeleteLoading, notifyTemplateSelectLoading, notifyTemplatePreviewLoading, //알림 템플릿 관련 loading
        reportListLoading, //리포트 관련 loading
        commonroomListLoading, //공용객실 관련 loading
        smsSendLoading, smsPincodeLoading, smsMobileKeyLoading, //SMS 관련 loading
    }), 
    [   hotelListLoading, hotelCreateLoading, hotelUpdateLoading, hotelDeleteLoading, hotelSelectLoading, hotelFileUploadLoading, 
        buildingListLoading, buildingCreateLoading, buildingUpdateLoading, buildingDeleteLoading, buildingSelectLoading, buildingTypeListLoading,
        floorListLoading, floorCreateLoading, floorUpdateLoading, floorDeleteLoading, floorSelectLoading,
        roomListLoading, roomFloorListLoading, roomCreateLoading, roomUpdateLoading, roomDeleteLoading, roomSelectLoading, roomSelectIdLoading,
        doorlockListLoading, doorlockUninstallLoading, doorlockSelectLoading, doorlockBatteryListLoading, doorlockLogListLoading,
        bookingListLoading, bookingCreateLoading, bookingUpdateLoading, bookingCancelLoading, bookingUploadLoading, bookingSelectLoading, bookingPincodeLoading, bookingMobileKeyLoading, bookingMobileDeleteLoading, 
        staffListLoading, staffkeyListLoading, staffCreateLoading, staffUpdateLoading, staffDeleteLoading, staffSelectLoading, staffVerificationCodeLoading, staffVerificationTokenLoading, staffSignupLoading, staffMobileKeyLoading, staffMobileKeyDeleteLoading,
        hotelnotifyListLoading, hotelnotifyContextListLoading, hotelnotifyCreateLoading, hotelnotifyDeleteLoading,
        notifyChannelListLoading, notifyChannelCreateLoading, notifyChannelUpdateLoading, notifyChannelDeleteLoading, notifyChannelSelectLoading,
        notifyTemplateListLoading, notifyTemplateCreateLoading, notifyTemplateUpdateLoading, notifyTemplateDeleteLoading, notifyTemplateSelectLoading, notifyTemplatePreviewLoading, 
        reportListLoading,
        commonroomListLoading,
        smsSendLoading, smsPincodeLoading, smsMobileKeyLoading,
    ]);

    return <Spin isSpin={loadingMemo}/>
}

export default SpinContainer;