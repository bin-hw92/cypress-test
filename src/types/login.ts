import { FormEvent } from "react";
import { countryInfoProps } from "./commons";

export type HeaderApiState = {
  'Content-Type'? : string,
}
export type LoginApistate = {
  [key: string] : string|number,
}
export interface LoginState {
  loginData: any|null,
  loginError: any|null,
}

//Component
export type LoginProps = {
  countryNumber: string,
  phoneNumber: string,
  password: string,
  countryInfoList: countryInfoProps[],
  clientId: string,
  handleSubmit: (e:FormEvent) => void,
  handleChange: (value:string, form:number) => void,
  handleLoginGoogle: (tokenId:string) => void,
  handleLoginGoogleError: (error:Error) => void,
}