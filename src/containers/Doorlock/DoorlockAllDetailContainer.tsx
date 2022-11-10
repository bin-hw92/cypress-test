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
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import BreadcrumbContainer from '../Commons/BreadcrumbContainer';
import { setBreadcrumbListAction } from '../../stores/breadcrumb';
import _ from 'lodash';
import { setDetailField } from '../../stores/doorlockAllList';

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

const DoorlockAllDetailContainer = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const doorlockId = param.id? param.id : '';
  const { doorlockItem, doorlockError, hotelId, detailField, userRole, hotelRole, breadcrumbItems } = useSelector(({ doorlock, doorlockAllList, header, breadcrumb }:RootState) => ({
    doorlockItem: doorlock.doorlock,
    doorlockError: doorlock.doorlockUpdateError,
    hotelId: doorlockAllList.filterItem.hotelId,
    detailField: doorlockAllList.detailField,
    userRole: header.userRole,
    hotelRole: header.hotelRole,
    breadcrumbItems: breadcrumb.breadcrumbItems,
  }));
  const [ isOpenApiErrorModal, setIsOpenApiErrorModal ] = useState<boolean>(false);
  const [ apiErrorMessage, setApiErrorMessage ] = useState<string>('');
  const [ apiErrorSubMessage, setApiErrorSubMessage ] = useState<string>('');
  const [ isOpenDoorlockUninstallModal, setIsOpenDoorlockUninstallModal ] = useState<boolean>(false);

  const setBreadcrumbList = useCallback((targetIndex:number, newItem:{title: string, isLink: boolean} ) => {
    let newBreadcrumbItems = Array.from(breadcrumbItems);
    newBreadcrumbItems[targetIndex] = newItem;
    const reducedBreadcrumbItem = _.compact(_.take(newBreadcrumbItems, targetIndex + 1));
    dispatch(setBreadcrumbListAction(reducedBreadcrumbItem));
  },[breadcrumbItems, dispatch]);

  const handleSelectDoorlock = useCallback(() => {
    dispatch(selectDoorlockAction({hotelId, doorlockId}));
  }, [dispatch, hotelId, doorlockId]);

  const handleSelectDoorlockUninstall = () => {
    if (doorlockItem.status !== 'installed') return;
    if (hotelRole === 'manager') return;
    setIsOpenDoorlockUninstallModal(true);
  };

  const handleGoBack = () => {
    dispatch(initialize());
    dispatch(batteryInitialize());
    dispatch(logInitialize());
    dispatch(setDetailField('detail'));
    navigation('/doorlock');
  }

  const handleDoorlockType = useCallback((type:'detail'|'battery'|'log') => {
    dispatch(setDetailField(type));
  },[dispatch]);

  const handleErrorApi = useCallback((type:string, Error: any) => {
    if(type === 'detail') setApiErrorMessage('도어락 상세 조회 실패');
    if(type === 'battery') setApiErrorMessage('도어락 배터리 로그 조회 실패');
    if(type === 'log') setApiErrorMessage('도어락 로그 조회 실패');
    if (!Error.response) setApiErrorSubMessage(Error.message);
    else setApiErrorSubMessage(`${Error.response.data.code}, ${Error.response.data.message}`);
    setIsOpenApiErrorModal(true);
  },[]);

  const moveToListPage = () => {
    dispatch(setDetailField('detail'));
    navigation('/doorlock');
  };

  useEffect(() => {
    try {
      if (doorlockId) {
        handleSelectDoorlock();
      }
    } catch (error) {
      throw error;
    }
  }, [doorlockId, handleSelectDoorlock]);
    
  useEffect(() => {
    if (doorlockItem.name) setBreadcrumbList(1,{title: doorlockItem.name, isLink: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doorlockItem.name]);

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
      <MainLayout
        refresh={moveToListPage}
        ContentBody={(
        <>
      <div className='content-title2'>
        <BreadcrumbContainer breadcrumbItems={breadcrumbItems}/>
      </div>
        <FormTabWrap>
          <ul>
            <li className={`tab-item ${detailField.detailtype !== 'detail' ? 'inactive':''}`}
              onClick={() => handleDoorlockType('detail')}
            >도어락 정보</li>
            <li className={`tab-item ${detailField.detailtype !== 'battery' ? 'inactive':''}`}
              onClick={() => handleDoorlockType('battery')}
            >도어락 배터리 로그</li>
            <li className={`tab-item ${detailField.detailtype !== 'log' ? 'inactive':''}`}
              onClick={() => handleDoorlockType('log')}
            >도어락 로그</li>
          </ul>
        </FormTabWrap>
        {detailField.detailtype === 'detail' && 
            <DoorlockDetail
                doorlockItem={doorlockItem}
                handleSelectDoorlockUninstall={handleSelectDoorlockUninstall}
                userRole={userRole}
                hotelRole={hotelRole}
                handleGoBack={handleGoBack}
            />
        }
        {detailField.detailtype === 'battery' &&  
            <DoorlockBatteryLogContainer
                isOpen={detailField.detailtype === 'battery'}
                doorlockId={doorlockId}
                hotelId={hotelId}
                handleGoBack={handleGoBack}
                handleErrorApi={handleErrorApi}
            />
        }
        {detailField.detailtype === 'log' && 
            <DoorlockLogListContainer
                isOpen={detailField.detailtype === 'log'}
                doorlockId={doorlockId}
                hotelId={hotelId}
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
          doorlockId={doorlockId}
          doorlockName={doorlockItem.name}
        />
        </>
      )} 
      />
    </Fragment>
  );
}

export default DoorlockAllDetailContainer;