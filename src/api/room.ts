import { listRoomProps, PostRoomProps, roomIdProps } from "../types/room";
import { getHotelId, headers, querystring, removeNullInObject, request } from "./lib/common";

export const selectRoom = ({buildingId:building_id, floorId:floor_id, roomId:room_id}:roomIdProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}/rooms/${room_id}`, headers({}));
}
export const selectRoomId = ({buildingId:building_id, roomId:room_id}:roomIdProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/rooms/${room_id}`, headers({}));
}

export const listRoom = ({buildingId:building_id, offset, limit, pagination=true}:listRoomProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/rooms`, {
        ...querystring({offset, limit, pagination}),
        ...headers({}),
    });
}
  
export const listFloorRoom = ({buildingId:building_id, floorId:floor_id, offset, limit, pagination=true}:listRoomProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}/rooms`, {
        ...querystring({offset, limit, pagination}),
        ...headers({}),
    });
}

export const createRoom = ({buildingId:building_id, floorId:floor_id, name, rmsId:rms_id, allowKeytag:allow_keytag, advertiseStrength:advertise_strength, connectedStrength:connected_strength}:PostRoomProps) => {
    let data = removeNullInObject({name, rms_id});
    data = {...data, allow_keytag, ...allow_keytag && {advertise_strength, connected_strength}};
    return request.post(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}/rooms`,
        data,
        headers({}),
    );
}

export const updateRoom = ({buildingId:building_id, floorId:floor_id, roomId:room_id, name, rmsId:rms_id, allowKeytag:allow_keytag, advertiseStrength:advertise_strength, connectedStrength:connected_strength}:PostRoomProps) => {
    let data = removeNullInObject({name, rms_id});
    data = {...data, allow_keytag, ...allow_keytag && {advertise_strength, connected_strength}};
    return request.put(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}/rooms/${room_id}`,
        data,
        headers({}),
    );
}
  
export const deleteRoom = ({buildingId:building_id, floorId:floor_id, roomId:room_id}:roomIdProps) => {
    return request.delete(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}/rooms/${room_id}`, headers({}));
}

// listRoom, selectRoom API 호출 값
export type listRoomApi = {
    "id": string,
    "name": string,
    "status": string,
    "floor_index": number,
    "card_index": number
    "card_guest_seq_num": number
    "card_status": string,
    "mobile_status": string,
    "is_cleaning": boolean,
    "hotel_id": string,
    "building_id": string,
    "floor_id": string,
    "doorlock": {
      "id": string,
      "dl_serial": string,
      "name": number,
      "pincode_version": string,
    },
    "rms_id": string,
    "dl_keytag_serial": string,
    "allow_keytag": boolean,
    "advertise_strength": number,
    "connected_strength": number,
    "created_at": Date
    "updated_at": Date
}