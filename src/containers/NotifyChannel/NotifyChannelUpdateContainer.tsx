import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import NotifyChannelUpdate from '../../components/NotifyChannel/NotifyChannelUpdate';
import { RootState } from '../../stores';
import { changeField, changeResult, selectnotifyChannelAction, updatenotifyChannelAction } from '../../stores/notifyChannel';
import { NotifyChannelUpdateContainerProps } from '../../types/notifyChannel';

const NotifyChannelUpdateContainer = ({
  isOpen,
  toggle,
  reload,
  channelId,
}:NotifyChannelUpdateContainerProps) => {
  const dispatch = useDispatch();
  const { notifyChannelItem, notifyChannelSuccess, notifyChannelError } = useSelector(({ notifyChannel }:RootState) => ({
      notifyChannelItem: notifyChannel.notifyChannel,
      notifyChannelSuccess: notifyChannel.notifyChannelUpdateSuccess,
      notifyChannelError: notifyChannel.notifyChannelUpdateError,
  }));
  const [ isOpenNotifyChannelUpdateSuccessModal, setIsOpenNotifyChannelUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenNotifyChannelUpdateFailModal, setIsOpenNotifyChannelUpdateFailModal ] = useState<boolean>(false);
  const [ messageNotifyChannelUpdateFail, setMessageNotifyChannelUpdateFail ] = useState<string>('');

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

  const handleSelectNotifyChannel = useCallback(() => {
    dispatch(selectnotifyChannelAction({channelId}));
  },[channelId, dispatch]);

  const handleUpdateNotifyChannel = useCallback(() => {
    dispatch(updatenotifyChannelAction({
      ...notifyChannelItem,
      config: notifyChannelItem.type === 'surem' ? notifyChannelItem.config : null,
    }));
  },[dispatch, notifyChannelItem]);

  useEffect(() => {
    if(notifyChannelError){
      if (!notifyChannelError.response) setMessageNotifyChannelUpdateFail(notifyChannelError.message);
      else setMessageNotifyChannelUpdateFail(`${notifyChannelError.response.data.code}, ${notifyChannelError.response.data.message}`);

      if(notifyChannelError.response.data.code === 401 || notifyChannelError.response.data.code === 419) reload();
      else setIsOpenNotifyChannelUpdateFailModal(true);
      dispatch(
        changeResult({
          key: 'notifyChannelUpdateError',
          value: null,
        })
      );
      return;
    }
    if(notifyChannelSuccess){
      toggle();
      setIsOpenNotifyChannelUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenNotifyChannelUpdateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'notifyChannelUpdateSuccess',
          value: false,
        })
      );
    }
  },[notifyChannelSuccess, notifyChannelError, toggle, reload, dispatch]);

  useEffect(() => {
    if(isOpen){
      if (channelId) handleSelectNotifyChannel();
    }
  }, [channelId, isOpen, handleSelectNotifyChannel]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <NotifyChannelUpdate 
            notifyChannelItem={notifyChannelItem}
            handleChange={handleChange}
            handleUpdateNotifyChannel={handleUpdateNotifyChannel}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
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
    </Fragment>
  );
};

export default NotifyChannelUpdateContainer;