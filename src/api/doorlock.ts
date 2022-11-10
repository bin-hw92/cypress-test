import { doorlockIdProps, listDoorlockAllProps, listDoorlockBatteryLogProps, listDoorlockLogProps, listDoorlockProps } from "../types/doorlock";
import { doorlockFormatterFwTypeProps, doorlockFormatterTypeProps } from "../types/formatter";
import { getHotelId, headers, querystring, request } from "./lib/common";
  
// doorlock
export const selectDoorlock = ({hotelId:hotel_id, doorlockId:doorlock_id}:doorlockIdProps) => {
  return request.get(`/multifamily/hotels/${hotel_id? hotel_id :getHotelId()}/doorlocks/${doorlock_id}`, headers({}));
}
  
export const listDoorlock = ({buildingId:building_id, floorId:floor_id, name, serial, type, status, fwType:fw_type, fwVersion:fw_version, sort, order, offset=0, limit=10, pagination=true}:listDoorlockProps) => {
  return request.get(`/multifamily/hotels/${getHotelId()}/doorlocks`, {
    ...querystring({...building_id && {building_id}, ...floor_id && {floor_id}, ...name && {name}, serial, ...type && {type}, ...status && {status}, ...fw_type && {fw_type}, ...fw_version && {fw_version}, ...sort && {sort}, ...order && {order}, offset, limit, pagination}),
    ...headers({}),
  });
}

export const listDoorlockAll = ({hotelId:hotel_id, buildingId:building_id, floorId:floor_id, name, serial, type, status, fwType:fw_type, fwVersion:fw_version, sort, order, offset=0, limit=10, pagination=true}:listDoorlockAllProps) => {
  return request.get(`/multifamily/hotels/${hotel_id}/doorlocks`, {
    ...querystring({...building_id && {building_id}, ...floor_id && {floor_id}, ...name && {name}, serial, ...type && {type}, ...status && {status}, ...fw_type && {fw_type}, ...fw_version && {fw_version}, ...sort && {sort}, ...order && {order}, offset, limit, pagination}),
    ...headers({}),
  });
}

export const uninstallDoorlock = ({hotelId:hotel_id, doorlockId:doorlock_id}:doorlockIdProps) => {
  return request.delete(`/multifamily/hotels/${hotel_id? hotel_id : getHotelId()}/doorlocks/${doorlock_id}`, headers({}));
}

export const listDoorlockLog = ({hotelId:hotel_Id, doorlockId:doorlock_id, logType:log_type, sort, order, offset=0, limit=10, pagination=true}:listDoorlockLogProps) => {
  return request.get(`/multifamily/hotels/${hotel_Id? hotel_Id : getHotelId()}/doorlocks/${doorlock_id}/logs`, {
    ...querystring({...log_type && {log_type}, ...sort && {sort}, ...order && {order}, offset, limit, pagination}),
    ...headers({}),
  });
}

export const listDoorlockBatteryLog = ({hotelId:hotel_Id, doorlockId:doorlock_id, startAt:start_date, endAt:end_date}:listDoorlockBatteryLogProps) => {
  return request.get(`/multifamily/hotels/${hotel_Id? hotel_Id : getHotelId()}/doorlocks/${doorlock_id}/battery_history`, {
    ...querystring({...start_date && {start_date}, ...end_date && {end_date}}),
    ...headers({}),
  });
}
  
//listDoorlock, selectDoorlock, listDoorlockBattery, listDoorlockLog  API 호출 값
export type listDoorlockApi = {
  "id": string,
  "type": string,
  "name": string,
  "status": string,
  "hotel_id": string,
  "building_name": string,
  "floor_name": string,
  "dl_serial": string,
  "ref_id": string,
  "roomtype_name": string,
  "created_at": Date,
  "updated_at": Date,
  "fw_type": number,
  "fw_version": string,
  "fw_rtcf": string,
  "fw_time": Date,
  "fw_battery": number,
  "fw_aged": boolean,
  "fw_logged_at": Date,
  "latch_warning": number,
  "dl_auto_mode": boolean,
  "touch_toggle": number,
  "fromtime_am": string,
  "untiltime_am": string,
  "fromtime_pm": string,
  "untiltime_pm": string,
  "weekday_bits": number[],
  "polarity": number,
  "delay_ms": number,
  "is_card_issuable": boolean,
  "pincode_length": number,
  "pincode_version": string,
  "pincode_day_type_offset": string,
  "is_pincode_issuable": boolean,
}

export type listDoorlockLogApi = {
  "hotel_id": string,
  "doorlock": {
    "id": string,
    "name": string,
  },
  "log_id": string,
  "log_type": number,
  "log_message": string,
  "log_event_date": string,
  "created_at": Date,
  "config": {
    "pincode_version": string,
    "pincode_length": number,
    "codebook_index": number,
    "is_pincode_issuable": boolean,
  },
  "state": {
    "fw_type": number,
    "fw_version": string,
    "fw_rtcf": string,
    "fw_time": Date,
    "fw_battery": number,
  }
}
export type listDoorlockBatteryApi = {
  "created_at": Date,
  "fw_battery": number,
}

export type selectDoorlockApi = {
  name: string,
  type: doorlockFormatterTypeProps|null,
  serial: string,
  buildingName: string,
  floorName: string,
  status: "created" | "installed" | null,
  fwVersion: string,
  fwBattery: string,
  fwType: doorlockFormatterFwTypeProps|null,
  createdAt: Date|null,
  updatedAt: Date|null,
}