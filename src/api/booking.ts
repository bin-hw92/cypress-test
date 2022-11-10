import { bookingIdProps, issueUserProps, listBookingProps, PostBookingProps, UploadBookingFileProps } from "../types/booking";
import { getHotelId, headers, querystring, removeNullInObject, request } from "./lib/common";
 
export const selectBooking = ({bookingId:booking_id}:bookingIdProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/bookings/${booking_id}`, headers({}));
}

export const listBooking = ({buildingId:building_id, roomName:room_name, phoneNumber:phone_number, startAt:start_at, endAt:end_at, sort, order, offset, limit}:listBookingProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/bookings`, {
        ...querystring({...building_id && {building_id}, ...room_name && {room_name}, ...phone_number && {phone_number}, ...start_at && {start_at}, ...end_at && {end_at}, ...sort && {sort}, ...order && {order}, offset, limit}),
        ...headers({}),
    });
}

export const createBooking = ({userName:user_name, phoneNumber:phone_number, roomIds:room_ids, commonroomIds:commonroom_ids, checkinAt:checkin_at, checkoutAt:checkout_at, desc}:PostBookingProps) => {
    const data = {user_name, phone_number, room_ids, commonroom_ids, checkin_at, checkout_at, desc};
    return request.post(`/multifamily/hotels/${getHotelId()}/bookings`,
      data,
      headers({}),
    );
}

export const createBookingByExcelUpload = ({formData}:UploadBookingFileProps) => {
    return request.post(`/multifamily/hotels/${getHotelId()}/bookings/bulk`,
        formData,
        headers({'Content-Type': 'multipart/form-data'}),
    );
}

export const updateBooking = ({bookingId:booking_id, userName:user_name, phoneNumber:phone_number, checkinAt:checkin_at, checkoutAt:checkout_at, desc}:PostBookingProps) => {
    let data = removeNullInObject({user_name, phone_number, desc});
    data = {...data, checkin_at, checkout_at};
    return request.put(`/multifamily/hotels/${getHotelId()}/bookings/${booking_id}`,
        data,
        headers({}),
    );
}

export const cancelBooking = ({bookingId:booking_id}:bookingIdProps) => {
    return request.delete(`/multifamily/hotels/${getHotelId()}/bookings/${booking_id}`, headers({}));
}

// userkey
export const issueUserMobilekey = ({bookingId:booking_id, userName:user_name, phoneNumber:phone_number, isNew:is_new, checkinAt:checkin_at, checkoutAt:checkout_at}:issueUserProps) => {
    const data = {user_name, phone_number, is_new, checkin_at, checkout_at};
    return request.post(`/multifamily/hotels/${getHotelId()}/bookings/${booking_id}/exchangekeys`,
        data,
        headers({}),
    );
}

export const deleteUserMobilekey = ({bookingId:booking_id, keyId:key_id}:bookingIdProps) => {
    return request.delete(`/multifamily/hotels/${getHotelId()}/bookings/${booking_id}/mobilekeys/${key_id}`, headers({}));
}

export const issueUserPincode = ({bookingId:booking_id, userName:user_name, phoneNumber:phone_number, type, isNew:is_new, checkinAt:checkin_at, checkoutAt:checkout_at}:issueUserProps) => {
    const data = {user_name, phone_number, type, is_new, checkin_at, checkout_at};
    return request.post(`/multifamily/hotels/${getHotelId()}/bookings/${booking_id}/pincodes`,
        data,
        headers({}),
    );
}

//listBooking, selectBooking API 받은 Pram 타입
export type listBookingApi = {
    "id": string,
    "user": {
      "id": string,
      "name": string,
      "email": string,
      "phone_number": string,
    },
    "booking_type": string,
    "mobilekeys": [
      {
        "user_id": string,
        "user_name": string,
        "user_email": string,
        "phone_number": string,
        "token": string,
        "issue_ref_id": string,
        "exchangekey": string,
        "seq_num": number,
        "expired_at": Date,
        "checkin_at": Date,
        "checkout_at": Date,
        "created_at": Date,
      }
    ],
    "pincodes": [
      {
        "id": string,
        "doorlock_id": string,
        "doorlock_name": number,
        "pincode": string,
        "type": string,
        "seq_num": number,
        "user_id": string,
        "user_name": string,
        "user_email": string,
        "phone_number": string,
        "qr_url": string,
        "checkin_at": Date,
        "checkout_at": Date,
        "created_at": Date,
        "updated_at": Date,
      }
    ],
    "cards": [
      {
        "card_no": string,
        "seq_num": number,
        "card_status": string,
        "checkin_at": Date,
        "checkout_at": Date,
        "user_id": string,
        "user_name": string,
        "user_email": string,
        "phone_number": string,
        "created_at": Date,
      }
    ],
    "hotel": {
      "id": string,
      "name": string,
      "address": string,
      "booking_logo": string,
      "staff_logo": string,
    },
    "building": {
      "id": string,
      "name": string,
    },
    "room": {
      "id": string,
      "name": string,
    },
    "commonrooms": [
      {
        "id": string,
        "name": string,
      }
    ],
    "status": string,
    "desc": string,
    "token": string,
    "issue_ref_id": string,
    "checkin_at": Date,
    "checkout_at": Date,
    "created_at": Date,
    "updated_at": Date,
}