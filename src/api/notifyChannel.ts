import { channelIdPRops, PostNotifyChannelProps } from "../types/notifyChannel";
import { removeNullInObject, request } from "./lib/common";

// notify channel
export const listNotifyChannel = () => {
  return request.get('/multifamily/notify/channels');
}

export const selectNotifyChannel = ({channelId:channel_id}:channelIdPRops) => {
  return request.get(`/multifamily/notify/channels/${channel_id}`);
}

export const createNotifyChannel = ({name, type, config, isDefault:is_default}:PostNotifyChannelProps) => {
  let data = removeNullInObject({name, type});
  data = {...data, config, is_default};
  return request.post('/multifamily/notify/channels',
    data,
  );
}

export const updateNotifyChannel = ({channelId:channel_id, name, type, config, isDefault:is_default}:PostNotifyChannelProps) => {
  let data = removeNullInObject({name, type});
  data = {...data, config, is_default};
  return request.put(`/multifamily/notify/channels/${channel_id}`,
    data,
  );
}

export const deleteNotifyChannel = ({channelId:channel_id}:channelIdPRops) => {
  return request.delete(`/multifamily/notify/channels/${channel_id}`);
}

//listNotifyChannel API 호출 값
export type listNotifyChannelApi = {
  "id": number,
  "config": {
    "calling_number": string,
    "dept_code": string,
    "user_code": string,
    "yellowid_key": string,
  },
  "hotel_count": number,
  "is_default": boolean,
  "name": string,
  "type": string,
  "created_at": Date,
  "updated_at": Date,
}