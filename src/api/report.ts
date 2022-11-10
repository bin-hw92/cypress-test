import { reportKeyTypeStateProps, staffRoleStatusProps } from "../types/formatter";
import { listReportProps } from "../types/report";
import { getHotelId, headers, querystring, request } from "./lib/common";

export const listReport = ({reportType:report_type, buildingName:building_name}:listReportProps) => {
    return request.get(`/multifamily/hotels/${getHotelId()}/reports/${report_type}`, {
      ...querystring({...building_name && {building_name}}),
      ...headers({}),
    });
}

// listReportApi 호출 값
export type listReportApi = {
    "hotel_id": string,
    "report_type": string,
    "report_subtype": string,
    "key_type": reportKeyTypeStateProps,
    "index_num": number,
    "operation": string,
    "req_id": string,
    "actor_name": string,
    "actor_phone_number": number,
    "actor_role": staffRoleStatusProps,
    "grantee_name": string,
    "grantee_phone_number": number,
    "grantee_role": staffRoleStatusProps,
    "facility_name": string,
    "building_name": string,
    "json_destination": {
      "room": string[],
      "rooms": string[],
      "commonrooms": string[],
    },
    "json_context": {
      "start_at": Date,
      "end_at": Date,
      "seq_num": string,
    },
    "json_diffs": [
      {
        "key": string,
        "oldValue": string,
        "newValue": string,
      }
    ],
    "created_at": Date,
    //"updated_at": Date,
}