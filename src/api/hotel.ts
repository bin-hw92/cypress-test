import { HotelUploadFileProps, listHotelProps, PostHotelProps } from "../types/hotel";
import { getHotelId, headers, querystring, removeNullInObject, request } from "./lib/common";

  export const selectHotel = () => {
    return request.get(`/multifamily/hotels/${getHotelId()}`, headers({}));
  }
  
  export const listHotel = ({name, offset, limit, pagination=true}:listHotelProps) => {
    return request.get('/multifamily/hotels', { 
      ...querystring({...name && {name}, offset, limit, pagination}),
      ...headers({}),
    });
  }

  export const createHotel = ({name, timezone, address, desc, pincodeDayTypeOffset:pincode_day_type_offset, pincodeVersion:pincode_version, pincodeLength:pincode_length, allowInfinityPincode:allow_infinity_pincode, pincodeAuthTimeoutMin:pincode_auth_timeout_min, useSlimkey:use_slimkey, commonrooms, notifyChannelId:notify_channel_id}:PostHotelProps) => {
    const data = {name, timezone, address, desc, commonrooms, pincode_version, pincode_length, pincode_day_type_offset, allow_infinity_pincode, pincode_auth_timeout_min, use_slimkey, notify_channel_id};
    return request.post('/multifamily/hotels/',
      data,
      headers({}),
    );
  }
  
  export const createFacilityByExcelUpload = ({file}:HotelUploadFileProps) => {
    const data = file;
    return request.post(`/multifamily/facilities/bulk`,
      data,
      headers({'Content-Type': 'multipart/form-data'}),
    );
  }

  export const updateHotel = ({name, timezone, address, desc, pincodeDayTypeOffset:pincode_day_type_offset, pincodeVersion:pincode_version, pincodeLength:pincode_length, allowInfinityPincode:allow_infinity_pincode, pincodeAuthTimeoutMin:pincode_auth_timeout_min, useSlimkey:use_slimkey, commonrooms, notifyChannelId:notify_channel_id, apphotelstory:app_hotelstory, appElevatorBtn:app_elevator_btn}:PostHotelProps) => {
    let data = removeNullInObject({name, timezone, address});
    data = {...data, desc, commonrooms, pincode_version, pincode_length, pincode_day_type_offset, allow_infinity_pincode, pincode_auth_timeout_min, use_slimkey, notify_channel_id, app_hotelstory, app_elevator_btn };
    return request.put(`/multifamily/hotels/${getHotelId()}`,
      data,
      headers({}),
    );
  }
  
  export const deleteHotel = () => {
    return request.delete(`/multifamily/hotels/${getHotelId()}`, headers({}));
  }

// listHotel, selectHotel API 호출 값
export type listHotelApi = {
    "id": string,
  "role": string,
  "name": string,
  "timezone": string,
  "domain_id": string,
  "domain_name": string,
  "tag": string,
  "type": string,
  "checkin_hour": number,
  "checkout_hour": number,
  "checkin_minute": number,
  "checkout_minute": number,
  "hotel_logo": string,
  "booking_logo": string,
  "staff_logo": string,
  "powercontrol": powercontrolState[],
  "desc": string,
  "created_at": Date|string,
  "updated_at": Date|string
  "latch_warning": number,
  "dl_auto_mode": boolean,
  "is_cardkey_auto_disable": boolean,
  "is_duplicatable_booking": boolean,
  "pincode_length": number,
  "pincode_version": string,
  "pincode_day_type_offset": string,
  "is_pincode_issuable": boolean,
  "building_counts": number,
  "floor_counts": number,
  "room_counts": number,
  "commonrooms": commonroomsState[],
}

type powercontrolState = {
    "id": string,
    "card_bitmask": number,
    "name": string,
    "hotel_id": string,
    "created_at": Date|string,
    "updated_at": Date|string,
}

type commonroomsState = {
    "id": string,
    "name": string,
}