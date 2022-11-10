import { floorIdProps, listFloorProps, PostFloorProps } from "../types/floor";
import { getHotelId, headers, querystring, removeNullInObject, request } from "./lib/common";

export const selectFloor = ({buildingId:building_id, floorId:floor_id}:floorIdProps) => {
  return request.get(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}`, headers({}));
}

export const listFloor = ({hotelId:hotel_Id, buildingId:building_id, offset, limit, pagination=true}:listFloorProps) => {
  return request.get(`/multifamily/hotels/${hotel_Id? hotel_Id : getHotelId()}/buildings/${building_id}/floors`, {
    ...querystring({offset, limit, pagination}),
    ...headers({}),
  });
}
  
export const createFloor = ({buildingId:building_id, name}:PostFloorProps) => {
    const data = removeNullInObject({name});
    return request.post(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors`,
      data,
      headers({}),
    );
  }

export const updateFloor = ({buildingId:building_id, floorId:floor_id, name}:PostFloorProps) => {
  let data = removeNullInObject({name});
  return request.put(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}`,
    data,
    headers({}),
  );
}
  
export const deleteFloor = ({buildingId:building_id, floorId:floor_id}:floorIdProps) => {
  return request.delete(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}/floors/${floor_id}`, headers({}));
}

//listFloor, selectFloor 호출 값
export type listFloorApi = {
    "id": string,
    "name": string,
    "card_index": number,
    "doorlocks": [
      {
        "id": string,
        "serial": string,
        "name": string,
      }
    ],
    "hotel_id": string,
    "hotel_name": string,
    "building_id": string,
    "building_name": string,
    "created_at": Date,
    "updated_at": Date,
}
