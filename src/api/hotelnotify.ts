import { hotelTemplateIdProps, listHotelNotifyProps, PostHotelNotifyProps } from "../types/hotelnotify";
import { querystring, removeNullInObject, request } from "./lib/common";

export const createHotelNotifyTemplate = ({hotelId:hotel_id, notifyTemplateId:notify_template_id, notifyContext:notify_context}:PostHotelNotifyProps) => {
    let data = removeNullInObject({notify_template_id, notify_context});
    data = {...data, hotel_id};
    return request.post('/multifamily/notify/hotel_templates',
      data,
    );
}

export const listHotelNotifyTemplate = ({hotelId:hotel_id, notifyContext:notify_context, offset, limit}:listHotelNotifyProps) => {
    return request.get('/multifamily/notify/hotel_templates', {
        ...querystring({...hotel_id && {hotel_id}, ...notify_context && {notify_context}, offset, limit}),
    });
}

export const listHotelNotifyTemplateContext = () => {
    return request.get('/multifamily/notify/hotel_templates/contexts');
}

export const deleteHotelNotifyTemplate = ({hotelTemplateId:hotel_template_id}:hotelTemplateIdProps) => {
    return request.delete(`/multifamily/notify/hotel_templates/${hotel_template_id}`);
}


//listHotelNotifyTemplate, listHotelNotifyTemplateContext API 호출 값
export type listHotelNotifyTemplateApi = {
    "id": number,
    "hotel_id": string,
    "hotel": {
        "id": string,
        "name": string,
    },
    "notify_template_id": number,
    "notify_template": {
        "desc": string,
        "id": number,
        "is_lms": boolean,
        "locale": string,
        "template": string,
        "template_alt": string|null,
        "template_code": string|null,
        "date_format": string,
        "created_at": Date,
        "updated_at": Date,
    },
    "notify_context": string,
    "created_at": Date,
    "updated_at": Date,
}

export type listHotelNotifyTemplateContextApi = {
    "code": string,
    "display": string,
}