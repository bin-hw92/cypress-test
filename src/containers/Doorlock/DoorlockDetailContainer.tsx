import React, { Fragment, useState, useEffect, useCallback } from 'react';
import DoorlockUninstallContainer from './DoorlockUninstallContainer';
import DoorlockDetail from '../../components/Doorlock/DoorlockDetail';
import { ResponseFailModal } from '../../components/Modal/Response';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeResult, initialize, selectDoorlockAction } from '../../stores/doorlock';
import { initialize as batteryInitialize } from '../../stores/doorlockBatteryList';
import { initialize as logInitialize } from '../../stores/doorlockLogList';
import DoorlockLogListContainer from './DoorlockLogListContainer';
import DoorlockBatteryLogContainer from './DoorlockBatteryLogContainer';
import styled from 'styled-components';
import { DoorlockDetailContainerProps } from '../../types/doorlock';
import { useNavigate } from 'react-router-dom';

/* styled */
const FormTabWrap = styled.nav`
  display: inline-flex;
  margin: 16px auto 0 auto;

  ul {
    display: inline-flex;
    list-style: none;
    margin: auto;
    padding: 0;

    .tab-item {
      position: relative;
      bottom: -1px;
      margin: auto;
      padding: 0 15px;
      height: 36px;
      min-width: 130px;
      color: #555555;
      line-height: 35px;
      text-align: center;
      border: 1px solid #cccccc;
      border-top-left-radius: 0.35rem;
      border-top-right-radius: 0.35rem;
      border-bottom: 1px solid #ffffff;
      background-color: #ffffff;
      cursor: default;

      &.inactive {
        color: #555555;
        border: 1px solid #cccccc;
        border-bottom: 0;
        background-color: #edf3f4;
        cursor: pointer;
        
        &:hover {    
          text-decoration: underline;
          text-underline-position: under;
        }
      }
    }
  }
`;

const DoorlockDetailContainer = ({
  isOpen,
  doorlockView,
  handleViewChange
}:DoorlockDetailContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { doorlockItem, doorlockError, detailField, userRole, hotelRole } = useSelector(({ doorlock, doorlockList, header }:RootState) => ({
    doorlockItem: doorlock.doorlock,
    doorlockError: doorlock.doorlockUpdateError,
    detailField: doorlockList.detailField,
    userRole: header.userRole,
    hotelRole: header.hotelRole,
  }));
  const [ isOpenApiErrorModal, setIsOpenApiErrorModal ] = useState<boolean>(false);
  const [ apiErrorMessage, setApiErrorMessage ] = useState<string>('');
  const [ apiErrorSubMessage, setApiErrorSubMessage ] = useState<string>('');
  const [ isOpenDoorlockUninstallModal, setIsOpenDoorlockUninstallModal ] = useState<boolean>(false);

  const handleSelectDoorlock = useCallback(() => {
    dispatch(selectDoorlockAction({doorlockId: detailField.doorlockId}));
  }, [dispatch, detailField.doorlockId]);

  const handleSelectDoorlockUninstall = () => {
    if (doorlockItem.status !== 'installed') return;
    if (hotelRole === 'manager') return;
    setIsOpenDoorlockUninstallModal(true);
  };

  const handleGoBack = () => {
    handleViewChange('doorlock', 'list');
    dispatch(initialize());
    dispatch(batteryInitialize());
    dispatch(logInitialize());
  }

  const handleDoorlockType = useCallback((type:'detail'|'battery'|'log') => {
    handleViewChange('doorlock', type);
  },[handleViewChange]);

  const handleErrorApi = useCallback((type:string, Error: any) => {
    if(type === 'detail') setApiErrorMessage('도어락 상세 조회 실패');
    if(type === 'battery') setApiErrorMessage('도어락 배터리 로그 조회 실패');
    if(type === 'log') setApiErrorMessage('도어락 로그 조회 실패');
    if (!Error.response) setApiErrorSubMessage(Error.message);
    else setApiErrorSubMessage(`${Error.response.data.code}, ${Error.response.data.message}`);
    setIsOpenApiErrorModal(true);
  },[]);

  useEffect(() => {
    try {
      if (isOpen && detailField.doorlockId) {
        handleSelectDoorlock();
      }
    } catch (error) {
      throw error;
    }
  }, [isOpen, detailField.doorlockId, handleSelectDoorlock]);

  useEffect(() => {
    if(doorlockError){
      if(doorlockError.response.data.code === 401 || doorlockError.response.data.code === 419){
        localStorage.clear();
        navigation('/login');
      }else{
        handleErrorApi('detail', doorlockError);
      }
      dispatch(
        changeResult({
          key: 'doorlockUpdateError',
          value: null,
        })
      );
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch, doorlockError, handleErrorApi]);

  return (
    <Fragment>
        <FormTabWrap>
          <ul>
            <li className={`tab-item ${doorlockView !== 'detail' ? 'inactive':''}`}
              onClick={() => handleDoorlockType('detail')}
            >도어락 정보</li>
            <li className={`tab-item ${doorlockView !== 'battery' ? 'inactive':''}`}
              onClick={() => handleDoorlockType('battery')}
            >도어락 배터리 로그</li>
            <li className={`tab-item ${doorlockView !== 'log' ? 'inactive':''}`}
              onClick={() => handleDoorlockType('log')}
            >도어락 로그</li>
          </ul>
        </FormTabWrap>
        {doorlockView === 'detail' && 
            <DoorlockDetail
                doorlockItem={doorlockItem}
                handleSelectDoorlockUninstall={handleSelectDoorlockUninstall}
                userRole={userRole}
                hotelRole={hotelRole}
                handleGoBack={handleGoBack}
            />
        }
        {doorlockView === 'battery' &&  
            <DoorlockBatteryLogContainer
                isOpen={doorlockView === 'battery'}
                doorlockId={detailField.doorlockId}
                handleGoBack={handleGoBack}
                handleErrorApi={handleErrorApi}
            />
        }
        {doorlockView === 'log' && 
            <DoorlockLogListContainer
                isOpen={doorlockView === 'log'}
                doorlockId={detailField.doorlockId}
                handleGoBack={handleGoBack}
                handleErrorApi={handleErrorApi}
            />
        }

        <ResponseFailModal
          isOpen={isOpenApiErrorModal}
          toggle={() => setIsOpenApiErrorModal(!isOpenApiErrorModal)}
          message={apiErrorMessage}
          subMessage={apiErrorSubMessage}
        />
        <DoorlockUninstallContainer
          isOpen={isOpenDoorlockUninstallModal}
          toggle={() => setIsOpenDoorlockUninstallModal(!isOpenDoorlockUninstallModal)}
          reload={() => handleSelectDoorlock()}
          doorlockId={detailField.doorlockId}
          doorlockName={doorlockItem.name}
        />
    </Fragment>
  );
}

export default DoorlockDetailContainer;