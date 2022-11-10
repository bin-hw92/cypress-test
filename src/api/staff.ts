import { issueStaffkeyProps, keyIdProps, listStaffkeyProps, listStaffProps, PostStaffProps, signupStaffProps, staffIdProps, verificationProps } from "../types/staff";
import { getHotelId, headers, querystring, removeNullInObject, request } from "./lib/common";

export const createStaff = ({name, phoneNumber:phone_number, role}:PostStaffProps) => {
    const data = {name, phone_number, role};
    return request.post(`/multifamily/hotels/${getHotelId()}/staffs`,
      data,
      headers({}),
    );
  }

  export const selectStaff = ({staffId:staff_id}:staffIdProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/staffs/${staff_id}`, headers({}));
  }
  
  export const listStaff = ({name, role, status, offset, limit, pagination=true}:listStaffProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/staffs`, {
      ...querystring({...name && {name}, ...role && {role}, ...status && {status}, offset, limit, pagination}),
      ...headers({}),
    });
  }
  
  export const listStaffCnt = () => {
    return request.get(`/multifamily/hotels/${getHotelId()}/staffs`, {
      ...headers({}),
    });
  }
  
  export const updateStaff = ({staffId:staff_id, name, role}:PostStaffProps) => {
    const data = removeNullInObject({name, role});
    return request.put(`/multifamily/hotels/${getHotelId()}/staffs/${staff_id}`,
      data,
      headers({}),
    );
  }
  
  export const deleteStaff = ({staffId:staff_id}:staffIdProps) => {
    return request.delete(`/multifamily/hotels/${getHotelId()}/staffs/${staff_id}`, headers({}));
  }
  
// staffkey
export const issueStaffMobilekey = ({staffId:permission_id, roomIds:room_ids, commonroomIds:commonroom_ids, startAt:start_at, endAt:end_at}:issueStaffkeyProps) => {
    const data = {permission_id, room_ids, commonroom_ids, start_at, end_at};
    return request.post(`/multifamily/hotels/${getHotelId()}/staffs/keys/mobilekey`,
      data,
      headers({}),
    );
  }

  export const listStaffkey = ({staffId:staff_id, offset=0, limit=10}:listStaffkeyProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/staffs/keys`, {
      ...querystring({staff_id, offset, limit}),
      ...headers({}),
    });
  }
  
  export const deleteStaffMobilekey = ({keyId:key_id}:keyIdProps) => {
    return request.delete(`/multifamily/hotels/${getHotelId()}/staffs/keys/${key_id}`, headers({}));
  }

  //signup
  export const verificationCode = ({phoneNumber:phone_number, expiredAt:expired_at, needSignedup:need_signedup, isTestMode:is_test_mode}:verificationProps) => {
    const data = {phone_number, expired_at, need_signedup, is_test_mode};
    return request.post('/multifamily/staff/verification_code', data);
  }
  
  export const verificationToken = ({phoneNumber:phone_number, expiredAt:expired_at, verificationCode:verification_code}:verificationProps) => {
    const data = {phone_number, expired_at, verification_code};
    return request.post('/multifamily/staff/verification_token', data);
  }
  
  export const signupStaff = ({name, phoneNumber:phone_number, verificationToken:verification_token, password}:signupStaffProps) => {
    const data = {name, phone_number, verification_token, password};
    return request.post('/multifamily/staff', data);
  }

//listStaff, selectStaff, listStaffKey, listDoorlockLog  API 호출 값
export type listStaffApi = {
  "id": string,
  "phone_number": string,
  "name": string,
  "role": string,
  "status": string,
  "desc": string,
  "cardkey_count": number,
  "mobilekey_count": number,
  "created_at": Date,
  "updated_at": Date,
}
export type listStaffKeyApi = {
  "id": string,
  "hotel_id": string,
  "grantor": {
    "id": string,
    "name": string,
    "role": string,
  },
  "grantee": {
    "id": string,
    "name": string,
    "role": string,
  },
  "type": string,
  "start_at": Date,
  "end_at": Date,
  "created_at": Date,
  "updated_at": Date,
  "hotel_password": string,
  "card_no": string,
  "carduser_id": string,
  "seq_num": number,
  "exchangekey": string,
  "rooms": [
    {
      "id": string,
      "name": string,
    }
  ],
  "commonrooms": [
    {
      "id": string,
      "name": string,
    }
  ],
  "building_bits": number[],
  "buildings":{
      "id": string,
      "name": string,
  }[],
  "floor_bits": number[],
  "floors": {
      "id": string,
      "name": string,
  }[],
  "building_index": number,
}