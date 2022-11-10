import { LoginApistate } from '../types/login';
import { headers, removeNullInObject, request } from './lib/common';


// login
export const loginApi = ({phoneNumber:phone_number, password}:LoginApistate) => {
  const data = {phone_number, password};
  return request.post('/multifamily/staff/session', data);
}
// google login
export const googleLogin = ({tokenId:id_token}:LoginApistate) => {
  const data = {id_token};
  return request.post('/multifamily/admin/session', data);
}
  
export const logout = () => {
  return request.delete('/multifamily/staff/session', headers({}));
}

export const googleLogLogout = () => {
  return  request.delete('/multifamily/admin/session', headers({}));
}

export const updatePassword = ({passwordOld:password_old, passwordNew:password_new}:LoginApistate) => {
  let data = removeNullInObject({password_old, password_new});
  return request.put('/multifamily/staff/password',
    data,
    headers({}),
  );
}
