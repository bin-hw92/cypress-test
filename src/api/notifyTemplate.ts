import { listNotifyProps, PostNotifyProps, previewProps, templateIdProps } from "../types/notifyTemplate";
import { querystring, removeNullInObject, request } from "./lib/common";

 // notify template
 export const createNotifyTemplate = ({template, templateCode:template_code, templateAlt:template_alt, dateFormat:date_format, locale, isLMS:is_lms, desc}:PostNotifyProps) => {
    let data = removeNullInObject({template, template_code, template_alt, date_format, locale, desc});
    data = {...data, is_lms};
    return request.post('/multifamily/notify/templates',
      data,
    );
  }
  
  export const previewNotifyTemplate = ({template, templateAlt:template_alt, dateFormat:date_format, locale}:previewProps) => {
    const data = removeNullInObject({template, template_alt, date_format, locale});
    return request.post('/multifamily/notify/templates/preview',
      data,
    );
  }
  
  export const selectNotifyTemplate = ({templateId:template_id}:templateIdProps) => {
    return request.get(`/multifamily/notify/templates/${template_id}`);
  }
  
  export const listNotifyTemplate = ({template, templateCode:template_code, templateAlt:template_alt, desc, offset, limit, pagination=true}:listNotifyProps) => {
    return request.get('/multifamily/notify/templates', {
      ...querystring({...template && {template}, ...template_code && {template_code}, ...template_alt && {template_alt}, ...desc && {desc}, offset, limit, pagination}),
    });
  }
  
  export const updateNotifyTemplate = ({templateId:template_id, template, templateCode:template_code, templateAlt:template_alt, dateFormat:date_format, locale, isLMS:is_lms, desc}:PostNotifyProps) => {
    let data = removeNullInObject({template, template_code, template_alt, date_format, locale, desc});
    data = {...data, is_lms};
    return request.put(`/multifamily/notify/templates/${template_id}`,
      data,
    );
  }
  
  export const deleteNotifyTemplate = ({templateId:template_id}:templateIdProps) => {
    return request.delete(`/multifamily/notify/templates/${template_id}`);
  }


//listNotifyTemplate,  API 호출 값
export type listNotifyTemplatePropsApi = {
  "id": number,
  "date_format": string|null,
  "desc": string,
  "hotel_template_count": number,
  "is_lms": boolean,
  "locale": string|null,
  "template": string,
  "template_alt": string|null,
  "template_code": string,
  "created_at": Date,
  "updated_at": Date,
}