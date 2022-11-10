import { listReportApi } from '../api/report';

// initial state - 리덕스 reportList.ts
export interface reportListState {
    reportListTotal: number,
    reportListItems: listReportApi[]|null,
    filterItem: {
        reportType: 'userkey'|'facility'|'staff'|'user_mobilekey',
        buildingName: string,
    },
    reportListError: any|null,
}

// API, Redux Props
export type listReportProps = {
    reportType: string,
    buildingName?: string,
}

/* Conteiner Props */
export type ReportListContainerProps = {
    isOpen: boolean,
    reportView: string,
    handleViewChange: (flag:string, type:string) => void,
}

/* Component Props */
export type ReportListProps = {
    reportListItems: listReportApi[]|null,
    filterItem: reportListState['filterItem'],
    userRole: string,
    handleFilter: (targetItem: any, isDebounce: boolean) => void,
    handleinitFilter: () => void,
    handleExportDataToExcel: () => void,
    handleSelectReport: (report:any) => void,
}
export type ReportDetailProps = {
  isOpen: boolean,
  toggle: () => void,
  reportItem: listReportApi,
  reportType: 'userkey'|'facility'|'staff'|'user_mobilekey',
  userRole: string,
}

export type formatDatProps = 'operation'|'key_type'|'actor_role'|'grantee_role'|'start_at_day'|'start_at_hour'|'end_at_day'|'end_at_hour'|'json_destination.room'|'json_destination.rooms'|'json_context.seq_num'|'json_diffs'|'created_at'|'actor_name'|'grantee_name'|'grantee_phone_number'|'actor_phone_number';