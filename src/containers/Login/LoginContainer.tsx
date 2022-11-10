import React, { FormEvent, Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import countryInfo from '../../assets/countries.json';
import Login from '../../components/Login/Login';
import { ResponseFailModal } from '../../components/Modal/Response';
import { allInitialize } from '../../lib/allInitialize';
import { RootState } from '../../stores';
import { setHeaderItemAction } from '../../stores/header';
import { initialize, loginAction, loginGoogleAction } from '../../stores/login';


const LoginContainer = () => {
  const [ isOpenApiErrorModal, setIsOpenApiErrorModal ] = useState<boolean>(false);
  const [ apiErrorMessage, setApiErrorMessage ] = useState<string>('');
  const [ apiErrorSubMessage, setApiErrorSubMessage ] = useState<string>('');
  const [ countryNumber, setCountryNumber ] = useState<string>('82');
  const [ phoneNumber, setPhoneNumber ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const countryInfoList = Object.values(countryInfo);
  const navigation = useNavigate();
  const initializeAll = allInitialize(); //모든 리덕스 상태 초기화
  const clientId = "727183764673-adrqnjvlosaistplqq6l5r50bq6tj5pc.apps.googleusercontent.com";
  
  const dispatch = useDispatch();
  const { loginData, loginError, } = useSelector(({ login }:RootState) => ({
    loginData: login.loginData,
    loginError: login.loginError,
  }));

  const handleSubmit = useCallback((e:FormEvent) => {
    e.preventDefault();
    const reqNum = countryNumber + Number.parseInt(phoneNumber);
    dispatch(loginAction({phoneNumber:reqNum, password}));
  },[countryNumber, dispatch, password, phoneNumber]);

  //0: countryNumber, 1: phoneNumber, 2: password
  const handleChange = useCallback((value:string, form:number) => {
    if(form === 0) setCountryNumber(value);
    if(form === 1) setPhoneNumber(value);
    if(form === 2) setPassword(value);
  },[]);
  
  useEffect(() => {
    //로그인 화면 언마운트 시 초기화
    return () => {
      dispatch(initialize());
    }
  },[dispatch]);
  
  const handleLoginGoogle = (tokenId:string) => {
    dispatch(loginGoogleAction({tokenId}));
  };

  const handleLoginGoogleError = (error:Error) => {
    setApiErrorMessage('로그인 실패');
    setApiErrorSubMessage('Google 인증 실패했습니다.');
    setIsOpenApiErrorModal(true);
  };

  useEffect(() => {
    if(loginError){
      setApiErrorMessage('로그인 실패');
      setApiErrorSubMessage(loginError.message);
      setIsOpenApiErrorModal(true);
      return;
    }
    if(loginData){
      /* 
        모든 리덕스 초기화 이유: 목록 필터가 새로고침해도 살아있을 수 있게, 
        storage 형식으로 변경을 해서 새로 로그인 시 모든 리덕스 초기화 하는 방식을 선택 
      */
      initializeAll(); 
      localStorage.setItem('api_key', loginData.api_key);
      dispatch(setHeaderItemAction({
        key: 'name',
        value: loginData.name,
      }));
      dispatch(setHeaderItemAction({
        key: 'phoneNumber',
        value: loginData.phone_number,
      }));
      dispatch(setHeaderItemAction({
        key: 'userRole',
        value: loginData.role? loginData.role : 'master',
      }));
      navigation('/hotel');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loginData, loginError, dispatch, navigation]);

  return (
    <Fragment>
      <Login
        countryNumber={countryNumber}
        phoneNumber={phoneNumber}
        password={password}
        countryInfoList={countryInfoList}
        clientId={clientId}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleLoginGoogle={handleLoginGoogle}
        handleLoginGoogleError={handleLoginGoogleError}
      />
      <ResponseFailModal
        isOpen={isOpenApiErrorModal}
        toggle={() => setIsOpenApiErrorModal(!isOpenApiErrorModal)}
        message={apiErrorMessage}
        subMessage={apiErrorSubMessage}
      />
    </Fragment>
  );
}

export default LoginContainer;