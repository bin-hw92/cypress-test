import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainLayout from '../../components/Layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../stores';
import { initialize, listNotifyChannelListAction } from '../../stores/notifyChannelList';
import { setBreadcrumbListAction } from '../../stores/breadcrumb';
import NotifyChannelList from '../../components/NotifyChannel/NotifyChannelList';
import NotifyChannelCreateContainer from './NotifyChannelCreateContainer';
import NotifyChannelDeleteContainer from './NotifyChannelDeleteContainer';
import NotifyChannelUpdateContainer from './NotifyChannelUpdateContainer';

const NotifyChannelListContainer = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { notifyChannelListItems, notifyChannelError, userRole } = useSelector(({ notifyChannelList, header }:RootState) => ({
      notifyChannelListItems: notifyChannelList.notifyChannelListItems,
      notifyChannelError: notifyChannelList.notifyChannelListError,
      userRole: header.userRole,
  }));
  const [ isOpenNotifyChannelCreateModal, setIsOpenNotifyChannelCreateModal ] = useState<boolean>(false);
  const [ isOpenNotifyChannelUpdateModal, setIsOpenNotifyChannelUpdateModal ] = useState<boolean>(false);
  const [ isOpenNotifyChannelDeleteModal, setIsOpenNotifyChannelDeleteModal ] = useState<boolean>(false);
  const [ selectedChannelId, setSelectedChannelId ] = useState<string>('');

  const changeHotel = useCallback(() => {
    dispatch(initialize());
  }, [dispatch]);

  const handleListNotifyChannel = useCallback(() => {
    dispatch(listNotifyChannelListAction());
  }, [dispatch]);
  

  //모달 플래그
  const handleModal = useCallback((modalFlag:string, channelId:string) => {
    if(modalFlag === 'create'){
      setIsOpenNotifyChannelCreateModal(true)
    }
    if(modalFlag === 'update'){
      setSelectedChannelId(channelId);
      setIsOpenNotifyChannelUpdateModal(true);
    }
    if(modalFlag === 'delete'){
      setSelectedChannelId(channelId);
      setIsOpenNotifyChannelDeleteModal(true);
    }
    if(modalFlag === 'detail'){
      navigation(`/notify_channel/${channelId}`);
    }
  },[navigation]);

  useEffect(() => {
    handleListNotifyChannel();
  }, [handleListNotifyChannel]);

  useEffect(() => {
    dispatch(setBreadcrumbListAction([{
      title: '알림 채널 목록',
      isLink: true,
      path: '/notify_channel',
    }]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
      
  useEffect(() => {
    if(notifyChannelError){
      if(notifyChannelError.response.data.code === 401 || notifyChannelError.response.data.code === 419){
          localStorage.clear();
          navigation('/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[notifyChannelError]);

  return (
    <Fragment>
      <MainLayout
        refresh={changeHotel}
        ContentBody={(
          <>
          <div>
          <NotifyChannelList
            notifyChannelListItems={notifyChannelListItems}
            userRole={userRole}
            handleModal={handleModal}
          />
          {/* <LimitButton
            currentLimit={paginationItem.limit}
            changeLimit={changeLimit}
          />
          <Pagination
            total={notifyChannelListTotal}
            index={currentPageNumber}
            limit={paginationItem.limit}
            indexChange={changePagination}
          /> */}
          </div>
          <NotifyChannelCreateContainer
            isOpen={isOpenNotifyChannelCreateModal}
            toggle={() => setIsOpenNotifyChannelCreateModal(!isOpenNotifyChannelCreateModal)}
            reload={() => handleListNotifyChannel()}
          />
          <NotifyChannelUpdateContainer
            isOpen={isOpenNotifyChannelUpdateModal}
            toggle={() => setIsOpenNotifyChannelUpdateModal(!isOpenNotifyChannelUpdateModal)}
            reload={() => handleListNotifyChannel()}
            channelId={selectedChannelId}
          />
          <NotifyChannelDeleteContainer
            isOpen={isOpenNotifyChannelDeleteModal}
            toggle={() => setIsOpenNotifyChannelDeleteModal(!isOpenNotifyChannelDeleteModal)}
            reload={() => handleListNotifyChannel()}
            channelId={selectedChannelId}
          /> 
          </>
        )}
      />
    </Fragment>
  );
}

export default NotifyChannelListContainer;