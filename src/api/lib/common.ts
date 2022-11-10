import axios from 'axios';
import _ from 'lodash';
import { CommonHeaderProps, CommonProps, CommonQueryProps } from '../../types/commons';

// config
export const request = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASEURL,
});

export const getHotelId = () => {
  return localStorage.getItem('hotel_id');
}

export const querystring = (query:CommonQueryProps) => {
  return {
    params: query
  };
};

export const removeNullInObject = (obj:CommonProps) => {
  return _.pickBy(obj, function (value, key) {
      return !_.isEmpty(value) || _.isNumber(value);
  });
}
  
export const headers = (header:CommonHeaderProps) => {
  return {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('api_key')}`,
      ...header && header,
    }
  };
};