import React, { Fragment, useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import MainLayout from '../../components/Layout/MainLayout';
import NotifyChannelDetail from '../../components/NotifyChannel/NotifyChannelDetail';
import NotifyChannelDeleteContainer from './NotifyChannelDeleteContainer';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { setBreadcrumbListAction } from '../../stores/breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { changeField, changeResult, selectnotifyChannelAction, updatenotifyChannelAction } from '../../stores/notifyChannel';

const NotifyChannelDetailContainer = () => {
  const param = useParams();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { notifyChannelItem, notifyChannelSuccess, notifyChannelError, breadcrumbItems, userRole } = useSelector(({ notifyChannel, breadcrumb, header }:RootState) => ({
    notifyChannelItem: notifyChannel.notifyChannel,
    notifyChannelSuccess: notifyChannel.notifyChannelUpdateSuccess,
    notifyChannelError: notifyChannel.notifyChannelUpdateError,
    breadcrumbItems: breadcrumb.breadcrumbItems,
    userRole: header.userRole,
  }));
  const [ isOpenNotifyChannelDeleteModal, setIsOpenNotifyChannelDeleteModal ] = useState<boolean>(false);
  const [ isOpenNotifyChannelUpdateSuccessModal, setIsOpenNotifyChannelUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenNotifyChannelUpdateFailModal, setIsOpenNotifyChannelUpdateFailModal ] = useState<boolean>(false);
  const [ messageNotifyChannelUpdateFail, setMessageNotifyChannelUpdateFail ] = useState<string>('');
  const channelId = param.id;

  //인풋 변경 이벤트 핸들러
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const value2 = name === 'isDefault'? value === 'O'? true : false : value; 
    dispatch(
        changeField({
            key: name,
            value: value2,
        })
    );
  },[dispatch]);

  const setBreadcrumbList = (targetIndex:number, newItem: {title: string, isLink: boolean} ) => {
    let newBreadcrumbItems = Array.from(breadcrumbItems);
    newBreadcrumbItems[targetIndex] = newItem;
    const reducedBreadcrumbItem = _.compact(_.take(newBreadcrumbItems, targetIndex + 1));
    dispatch(setBreadcrumbListAction(reducedBreadcrumbItem));
  };

  const moveToListPage = useCallback(() => {
    navigation('/notify_channel');
  }, [navigation]);

  const handleSelectNotifyChannel = useCallback(() => {
    if(channelId) dispatch(selectnotifyChannelAction({channelId}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  const handleUpdateNotifyChannel = useCallback(() => {
    dispatch(updatenotifyChannelAction({
      ...notifyChannelItem,
      config: notifyChannelItem.type === 'surem' ? notifyChannelItem.config : null
    }));
  },[dispatch, notifyChannelItem]);

  const handleModal = () => {
    setIsOpenNotifyChannelDeleteModal(true);
  }

  useEffect(() => {
    if(notifyChannelError){
      if (!notifyChannelError.response) setMessageNotifyChannelUpdateFail(notifyChannelError.message);
      else setMessageNotifyChannelUpdateFail(`${notifyChannelError.response.data.code}, ${notifyChannelError.response.data.message}`);

      if(notifyChannelError.response.data.code === 401 || notifyChannelError.response.data.code === 419){
        localStorage.clear();
        navigation('/login');
      }else{
        setIsOpenNotifyChannelUpdateFailModal(true);
      } 
      dispatch(
        changeResult({
          key: 'notifyChannelUpdateError',
          value: null,
        })
      );
      return;
    }
    if(notifyChannelSuccess){
      setIsOpenNotifyChannelUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenNotifyChannelUpdateSuccessModal(false);
        handleSelectNotifyChannel();
      }, 1500);
      dispatch(
        changeResult({
          key: 'notifyChannelUpdateSuccess',
          value: false,
        })
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[notifyChannelSuccess, notifyChannelError, dispatch, handleSelectNotifyChannel]);

  useEffect(() => {
    try {
      if (channelId) handleSelectNotifyChannel();
      
    } catch (error) {
      throw error;
    }
  }, [channelId, handleSelectNotifyChannel]);
  
  useEffect(() => {
    if (channelId) setBreadcrumbList(1,{title: channelId, isLink: false});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  return (
    <Fragment>
      <MainLayout
        refresh={moveToListPage}
        ContentBody={(
          <>
          <NotifyChannelDetail
            notifyChannelItem={notifyChannelItem}
            breadcrumbItems={breadcrumbItems}
            userRole={userRole}
            handleChange={handleChange}
            handleSelectNotifyChannel={handleSelectNotifyChannel}
            handleUpdateNotifyChannel={handleUpdateNotifyChannel}
            handleModal={handleModal}
            moveToListPage={moveToListPage}
          />
          <NotifyChannelDeleteContainer
            isOpen={isOpenNotifyChannelDeleteModal}
            toggle={() => setIsOpenNotifyChannelDeleteModal(!isOpenNotifyChannelDeleteModal)}
            reload={() => moveToListPage()}
            channelId={channelId? channelId : ''}
          />
          <ResponseSuccessModal
            isOpen={isOpenNotifyChannelUpdateSuccessModal}
            toggle={() => setIsOpenNotifyChannelUpdateSuccessModal(!isOpenNotifyChannelUpdateSuccessModal)}
            message='알림 채널 수정이 완료 되었습니다.'
          />
          <ResponseFailModal
            isOpen={isOpenNotifyChannelUpdateFailModal}
            toggle={() => setIsOpenNotifyChannelUpdateFailModal(!isOpenNotifyChannelUpdateFailModal)}
            message={messageNotifyChannelUpdateFail || '알림 채널 수정에 실패 하였습니다.'}
          />
          </>
        )}
      />
    </Fragment>
  );
}

export default NotifyChannelDetailContainer;