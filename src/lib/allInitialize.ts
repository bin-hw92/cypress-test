/* eslint-disable react-hooks/rules-of-hooks */
import { initialize as initializeHeader } from "../stores/header";
import { initialize as initializeSidebar } from "../stores/sidebar";
import { initialize as initializeHoteList } from "../stores/hotelList";
import { initialize as initializeBreadCrumb } from "../stores/breadcrumb";
import { initialize as initializeHotel } from "../stores/hotel";
import { initialize as initializeBuildingList } from "../stores/buildingList";
import { initialize as initializeBuilding } from "../stores/building";
import { initialize as initializeFloorList } from "../stores/floorList";
import { initialize as initializeFloor } from "../stores/floor";
import { initialize as initializeRoomList } from "../stores/roomList";
import { initialize as initializeRoom } from "../stores/room";
import { initialize as initializeDoorlockList } from "../stores/doorlockList";
import { initialize as initializeDoorlock } from "../stores/doorlock";
import { initialize as initializeDoorlockLogList } from "../stores/doorlockLogList";
import { initialize as initializeDoorlockBatteryList } from "../stores/doorlockBatteryList";
import { initialize as initializeBookingList } from "../stores/bookingList";
import { initialize as initializeSms } from "../stores/sms";
import { initialize as initializeBooking } from "../stores/booking";
import { initialize as initializeCommonRoom } from "../stores/commonroom";
import { initialize as initializeReportList } from "../stores/reportList";
import { initialize as initializeHotelNotifyList } from "../stores/hotelnotifyList";
import { initialize as initializeNotifyTemplateList } from "../stores/notifyTemplateList";
import { initialize as initializeHoteNotify } from "../stores/hotelnotify";
import { initialize as initializeNotifyTemplate } from "../stores/notifyTemplate";
import { initialize as initializeStaffList } from "../stores/staffList";
import { initialize as initializeStaff } from "../stores/staff";
import { initialize as initializeStaffKeyList } from "../stores/staffkeyList";
import { initialize as initializeNotifyChannelList } from "../stores/notifyChannelList";
import { initialize as initializeNotifyChannel } from "../stores/notifyChannel";
import { initialize as initializeKeytagList } from "../stores/keytagList";
import { initialize as initializeKeytag } from "../stores/keytag";
import { initialize as initializeDoorlockAllList } from "../stores/doorlockAllList";
import { useDispatch } from 'react-redux';

export const allInitialize = () => {
  const dispatch = useDispatch();

  const handleAllinitialize = () => {
    dispatch(initializeHeader());
    dispatch(initializeSidebar());
    dispatch(initializeHoteList());
    dispatch(initializeBreadCrumb());
    dispatch(initializeHotel());
    dispatch(initializeBuildingList());
    dispatch(initializeBuilding());
    dispatch(initializeFloorList());
    dispatch(initializeFloor());
    dispatch(initializeRoomList());
    dispatch(initializeRoom());
    dispatch(initializeDoorlockList());
    dispatch(initializeDoorlock());
    dispatch(initializeDoorlockLogList());
    dispatch(initializeDoorlockBatteryList());
    dispatch(initializeBookingList());
    dispatch(initializeSms());
    dispatch(initializeBooking());
    dispatch(initializeCommonRoom());
    dispatch(initializeReportList());
    dispatch(initializeHotelNotifyList());
    dispatch(initializeNotifyTemplateList());
    dispatch(initializeHoteNotify());
    dispatch(initializeNotifyTemplate());
    dispatch(initializeStaffList());
    dispatch(initializeStaff());
    dispatch(initializeStaffKeyList());
    dispatch(initializeNotifyChannelList());
    dispatch(initializeNotifyChannel());
    dispatch(initializeKeytagList());
    dispatch(initializeKeytag());
    dispatch(initializeDoorlockAllList());
  }

  return handleAllinitialize;
}