import { listCommonProps } from "../types/commonroom";
import { getHotelId, headers, querystring, request } from "./lib/common";

export const listCommonroom = ({buildingId:building_id, type='commonroom'}:listCommonProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/doorlocks`, {
      ...querystring({building_id, type}),
      ...headers({}),
    });
}
/* 
export const listCommonroom = ({buildingId:building_id}:listCommonProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/commonrooms`, {
      ...querystring({building_id}),
      ...headers({}),
    });
}
 */
export const listCommonroomDoorlock = ({type='commonroom'}:listCommonProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/doorlocks`, {
        ...querystring({type}),
        ...headers({}),
    });
}

export type listCommonRommBuildingApi = {
    "id": string,
    "name": string,
    "card_index": number,
    "hotel_id": string,
    "hotel_name": string,
    "building_id": string,
    "building_name": string,
    "created_at": Date,
    "updated_at": Date,
}

export type listCommonRommApi = {
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