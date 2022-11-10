
import { listKeytagProps, PostKeytagProps, keytagIdProps } from "../types/keytag";
import { getHotelId, headers, querystring, request } from "./lib/common";

export const selectKeytag = ({buildingId:building_id, floorId:floor_id, roomId:room_id, keytagId:keytag_id }:keytagIdProps) => {
  return request.get(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}/rooms/${room_id}/keytags/${keytag_id}`, headers({}));
}

export const listKeytag = ({buildingId:building_id, floorId:floor_id, roomId:room_id, offset, limit, pagination=true}:listKeytagProps) => {
  return request.get(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}/rooms/${room_id}/keytags`, {
    ...querystring({offset, limit, pagination}),
    ...headers({}),
  });
}
  
export const createKeytag = ({ buildingId:building_id, floorId:floor_id, roomId:room_id, name, delayMs:delay_ms, isMobilekeyIssuable:is_mobilekey_issuable, keytagOpMode:keytag_op_mode, enterAlarmCount:enter_alarm_count, enterWaitingSec:enter_waiting_sec, exitAlarmCount:exit_alarm_count, exitWaitingSec:exit_waiting_sec, allowSound:allow_sound, soundVolume:sound_volume, languageType:language_type}:PostKeytagProps) => {
    const data = {name, delay_ms, is_mobilekey_issuable, keytag_op_mode, enter_alarm_count, enter_waiting_sec, exit_alarm_count, exit_waiting_sec, allow_sound, sound_volume, language_type};
    return request.post(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}/rooms/${room_id}/keytags`,
      data,
      headers({}),
    );
  }

export const updateKeytag = ({buildingId:building_id, floorId:floor_id, roomId:room_id, keytagId:keytag_id, name, delayMs:delay_ms, isMobilekeyIssuable:is_mobilekey_issuable, keytagOpMode:keytag_op_mode, enterAlarmCount:enter_alarm_count, enterWaitingSec:enter_waiting_sec, exitAlarmCount:exit_alarm_count, exitWaitingSec:exit_waiting_sec, allowSound:allow_sound, soundVolume:sound_volume, languageType:language_type}:PostKeytagProps) => {
  const data = {name, delay_ms, is_mobilekey_issuable, keytag_op_mode, enter_alarm_count, enter_waiting_sec, exit_alarm_count, exit_waiting_sec, allow_sound, sound_volume, language_type};
  return request.put(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}/rooms/${room_id}/keytags/${keytag_id}`,
    data,
    headers({}),
  );
}
  
export const deleteKeytag = ({buildingId:building_id, floorId:floor_id, roomId:room_id, keytagId:keytag_id}:keytagIdProps) => {
  return request.delete(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}/rooms/${room_id}/keytags/${keytag_id}`, headers({}));
}

//listKeytag, selectKeytag 호출 값
export type listKeytagApi = {
    "id": string,
    "name": string,
    "status": string,
    "hotel_id": string,
    "building_id": string,
    "floor_id": string,
    "room_id": string,
    "is_mobilekey_issuable": boolean,
    "keytag_op_mode": number,
    "enter_alarm_count": number,
    "enter_waiting_sec": number,
    "exit_alarm_count": number,
    "exit_waiting_sec": number,
    "allow_sound": boolean,
    "sound_volume": number,
    "language_type": number,
    "delay_ms": number,
    "card_index": number,
    "doorlock": {
        "id": string,
        "dl_serial": string,
        "name": number,
    },
    "created_at": Date,
    "updated_at": Date,
}

/* export type create = {
  {
    "name": "1803호의 키택", //이름
    "delay_ms": 15000, //
    "is_mobilekey_issuable": false, //
    "keytag_op_mode": 1, // 키택 모드
    "enter_alarm_count": 3, // 
    "enter_waiting_sec": 10, // 
    "exit_alarm_count": 2, //
    "exit_waiting_sec": 30, //
    "allow_sound": true, // 
    "sound_volume": 80, // 사운드 볼륨
    "language_type": 3 //
  }
}
 */