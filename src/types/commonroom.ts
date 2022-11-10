import { listCommonRommApi } from "../api/commonroom";

// initial state - 리덕스 commonroom.ts
export interface commonroomState {
    commonroomItems: listCommonRommApi[]|null,
    commonroomError: any|null,
    commonroomBuildingItems: listCommonRommApi[]|null,
    commonroomBuildingError: any|null,
}

// API, Redux Props
export type listCommonProps = {
    buildingId?: string, 
    type?: 'commonroom', 
}