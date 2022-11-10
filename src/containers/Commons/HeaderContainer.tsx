import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../stores';
import { logoutAction, logoutGoogleAction } from '../../stores/header';
import Header from '../../components/Commons/Header';
import { useNavigate } from 'react-router-dom';
import PasswordUpdateContainer from './PasswordUpdateContainer';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { header } = useSelector(({ header }:RootState) => ({
    header: header,
  }));
  const [ isOpenPasswordUpdateModal, setIsOpenPasswordUpdateModal ] = useState<boolean>(false);

  const setClassName = (menu:string) => {
    return window.location.pathname.split('/')[1] === menu ? 'menu-item active' : 'menu-item';
    // return menu === selectedMenu ? 'menu-item active' : 'menu-item';
  };

  const handlePasswordUpdateModal = useCallback((flag:boolean)=> {
    setIsOpenPasswordUpdateModal(flag);
  },[]);

  const handleLogout = useCallback(() => {
    if(header.name === 'Oauth'){
      dispatch(logoutGoogleAction());
    }else{
      dispatch(logoutAction());
    }
  },[dispatch, header.name]);

  useEffect(() => {
    //header 전역 상태 중 name이 없을 경우 로그아웃으로 간주
    if(!header.name){
        localStorage.clear();
        navigation('/login');
    }
  },[header, navigation]);

  return (
    <Fragment>
      <Header 
        userName={header.name}
        userRole={header.userRole}
        hotelRole={header.hotelRole}
        setClassName={setClassName}
        //handleMove={handleMove}
        handlePasswordUpdateModal={handlePasswordUpdateModal}
        handleLogout={handleLogout}
      />
      <PasswordUpdateContainer 
        isOpen={isOpenPasswordUpdateModal} 
        toggle={() => setIsOpenPasswordUpdateModal(!isOpenPasswordUpdateModal)} 
      />
    </Fragment>
  );
}

export default HeaderContainer;