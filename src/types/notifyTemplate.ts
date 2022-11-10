import { ChangeEvent } from 'react';
import { listNotifyTemplatePropsApi } from '../api/notifyTemplate';

// initial state - 리덕스 notifyTemplate.ts
export interface notifyTemplateState {
    notifyTemplate: {
        templateId?: string,
        templateCode: string,
        template: string,
        templateAlt: string,
        dateFormat: string,
        locale: string,
        isLMS: boolean,
        desc: string,
        createdAt? : Date|null,
        updatedAt? : Date|null,
        hotelTemplateCount?: number,
    },
    notifyPreviewState: {
        template: string,
        templateAlt: string,
        dateFormat: string,
        locale: string,
    },
    notifyTemplatePreview: {
        templateAltRendered: string|null,
        templateRendered: string|null,
    },
    notifyTemplateCreateSuccess: boolean,
    notifyTemplateUpdateSuccess: boolean,
    notifyTemplateDeleteSuccess: boolean,
    notifyTemplateCreateError: any|null,
    notifyTemplateUpdateError: any|null,
    notifyTemplateDeleteError: any|null,
    notifyTemplatePreviewError: any|null,
}

// initial state - 리덕스 notifyTemplateList.ts
export interface notifyTemplateListState {
    notifyTemplateListTotal: number,
    notifyTemplateListItems: listNotifyTemplatePropsApi[]|null,
    currentPageNumber: number,
    paginationItem: {
      offset: number,
      limit: number,
    },
    filterItem: {
        template: string,
        templateCode: string,
        templateAlt: string,
        desc: '',
    },
    notifyTemplateListError: any|null,
}

// API, Redux Props
export type listNotifyProps = {
    template?: string, 
    templateCode?: string, 
    templateAlt?: string, 
    desc?: string, 
    offset?: number, 
    limit?: number, 
    pagination?: boolean,
}
export type previewProps = {
    template: string, 
    templateAlt: string, 
    dateFormat: string, 
    locale: string,
}
export type templateIdProps = {
    templateId: string
}

//api 보낼 때 필요한 create, update용 Props 값
export type PostNotifyProps = {
    templateId?: string,
    template: string, 
    templateCode: string, 
    templateAlt: string, 
    dateFormat: string, 
    locale: string, 
    isLMS: boolean, 
    desc: string
}

/* Conteiner Props */
export type NotifyTemplateCreateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
}
export type NotifyTemplateUpdateContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    templateId: string,
}
export type NotifyTemplateDeleteContainerProps = {
    isOpen: boolean,
    toggle: () => void,
    reload: () => void,
    templateId: string,
}
export type NotifyTemplatePreviewContainerProps = {
    isOpen: boolean,
    toggle: () => void,
}

/* Component Props */
export type NotifyTemplateListProps = {
    notifyTemplateListItems: listNotifyTemplatePropsApi[] | null,
    filterItem: notifyTemplateListState['filterItem'],
    userRole: string,
    handleFilter: (targetItem:any, isDebounce:boolean) => void,
    handleinitFilter: () => void,
    handleModal: (modalFlag:string, templateId:string, desc:string) => void,
    handleModalPreview: (template:string, templateAlt:string, dateFormat:string, locale:string) => void,
    handleTemplateDetail: (templateId:string) => void,
}
export type NotifyTemplateCreateProps = {
    notifyTemplateItem: notifyTemplateState['notifyTemplate'],
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>|ChangeEvent<HTMLTextAreaElement>) => void,
    handlePreviewNotifyTemplate: () => void,
    handleCreateNotifyTemplate: () => void,
    toggle: () => void,
}
export type NotifyTemplateUpdateProps = {
    notifyTemplateItem: notifyTemplateState['notifyTemplate'],
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>|ChangeEvent<HTMLTextAreaElement>) => void,
    handleUpdateNotifyTemplate: () => void,
    handlePreviewNotifyTemplate: () => void,
    toggle: () => void,
}
export type NotifyTemplateDeleteProps = {
    templateId: string,
    handleDeleteNotifyTemplate: () => void,
    toggle: () => void
}
export type NotifyTemplateDetailProps = {
    breadcrumbItems:any,
    notifyTemplateItem: notifyTemplateState['notifyTemplate'],
    templateId?: string,
    userRole: string,
    handleChange: (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>|ChangeEvent<HTMLTextAreaElement>) => void,
    handleModal: () => void,
    moveToListPage: () => void,
    handleSelectNotifyTemplate: () => void,
    handleUpdateNotifyTemplate: () => void,
    handlePreviewNotifyTemplate: () => void,
}
export type NotifyTemplatePreviewProps = {
    notifyTemplatePreview: {
      templateRendered: string|null,
      templateAltRendered: string|null,
    },
    toggle: () => void,
}