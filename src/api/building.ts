import { buildingIdProps, listBuildingProps, PostBuildingProps } from "../types/building";
import { getHotelId, headers, querystring, removeNullInObject, request } from "./lib/common";

export const selectBuilding = ({buildingId:building_id}:buildingIdProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}`, headers({}));
}
  
export const listBuilding = ({hotelId, name, offset, limit, pagination=true}:listBuildingProps) => {
    return request.get(`/multifamily/hotels/${hotelId? hotelId : getHotelId()}/buildings`, {
        ...querystring({...name && {name}, offset, limit, pagination}),
        ...headers({}),
    });
}

export const listBuildingtype = () => {
    return request.get('/multifamily/hotels/buildingtypes', {
        // ...querystring({}),
        ...headers({}),
    });
}

// building
export const createBuilding = ({name, buildingtypeId:buildingtype_id, commonrooms}:PostBuildingProps) => {
    const data = removeNullInObject({name, buildingtype_id, commonrooms});
    return request.post(`/multifamily/hotels/${getHotelId()}/buildings`,
        data,
        headers({}),
    );
}

export const updateBuilding = ({buildingId:building_id, name, buildingtypeId:buildingtype_id, commonrooms}:PostBuildingProps) => {
    let data = removeNullInObject({name, buildingtype_id});
    data= {...data, commonrooms};
    return request.put(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}`,
        data,
        headers({}),
    );
}

export const deleteBuilding = ({buildingId:building_id}:buildingIdProps) => {
    return request.delete(`/multifamily/hotels/${getHotelId()}/buildings/${building_id}`, headers({}));
}

// listBuilding, selectBuilding API 호출 값
export type listBuildingApi = {
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
    "created_at": Date,
    "updated_at": Date,
}