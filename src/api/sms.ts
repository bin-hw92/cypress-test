import { notifyKeyProps, SendSmsProps } from "../types/sms";
import { getHotelId, headers, request } from "./lib/common";

export const sendSMS = ({phoneNumber:phone_number, message}:SendSmsProps) => {
    const data = {phone_number, message};
    return request.post(`/multifamily/hotels/${getHotelId()}/sms`,
      data,
      headers({}),
    );
}

export const notifyMobilekey = ({bookingId, userId}:notifyKeyProps) => {
    const data = {};
    return request.post(`/multifamily/hotels/${getHotelId()}/bookings/${bookingId}/mobilekeys/${userId}/notify`,
        data,
        headers({}),
    );
}

export const notifyPincode = ({bookingId, pincodeId}:notifyKeyProps) => {
    const data = {};
    return request.post(`/multifamily/hotels/${getHotelId()}/bookings/${bookingId}/pincodes/${pincodeId}/notify`,
        data,
        headers({}),
    );
}


