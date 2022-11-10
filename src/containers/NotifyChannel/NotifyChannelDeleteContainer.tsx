import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import NotifyChannelDelete from '../../components/NotifyChannel/NotifyChannelDelete';
import { RootState } from '../../stores';
import { changeResult, deletenotifyChannelAction } from '../../stores/notifyChannel';
import { NotifyChannelDeleteContainerProps } from '../../types/notifyChannel';

const NotifyChannelDeleteContainer = ({
  isOpen,
  toggle,
  reload,
  channelId,
}:NotifyChannelDeleteContainerProps) => {
  const dispatch = useDispatch();
  const { notifyChannelSuccess, notifyChannelError } = useSelector(({ notifyChannel }:RootState) => ({
      notifyChannelSuccess: notifyChannel.notifyChannelDeleteSuccess,
      notifyChannelError: notifyChannel.notifyChannelDeleteError,
  }));
  const [ isOpenNotifyChannelDeleteSuccessModal, setIsOpenNotifyChannelDeleteSuccessModal ] = useState<boolean>(false);
  const [ isOpenNotifyChannelDeleteFailModal, setIsOpenNotifyChannelDeleteFailModal ] = useState<boolean>(false);
  const [ messageNotifyChannelDeleteFail, setMessageNotifyChannelDeleteFail ] = useState<string>('');

  const handleDeleteNotifyChannel = useCallback(() => {
    dispatch(deletenotifyChannelAction({channelId}));
  },[channelId, dispatch]);

  useEffect(() => {
    if(notifyChannelError){
      toggle();
      if (!notifyChannelError.response) setMessageNotifyChannelDeleteFail(notifyChannelError.message);
      else setMessageNotifyChannelDeleteFail(`${notifyChannelError.response.data.code}, ${notifyChannelError.response.data.message}`);

      if(notifyChannelError.response.data.code === 401 || notifyChannelError.response.data.code === 419) reload();
      else setIsOpenNotifyChannelDeleteFailModal(true);
      dispatch(
        changeResult({
          key: 'notifyChannelDeleteError',
          value: null,
        })
      );
      return;
    }
    if(notifyChannelSuccess){
      toggle();
      setIsOpenNotifyChannelDeleteSuccessModal(true);
      setTimeout(() => {
        setIsOpenNotifyChannelDeleteSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'notifyChannelDeleteSuccess',
          value: false,
        })
      );
    }
  },[notifyChannelSuccess, notifyChannelError, toggle, reload, dispatch]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <NotifyChannelDelete 
            channelId={channelId}
            handleDeleteNotifyChannel={handleDeleteNotifyChannel}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenNotifyChannelDeleteSuccessModal}
        toggle={() => setIsOpenNotifyChannelDeleteSuccessModal(!isOpenNotifyChannelDeleteSuccessModal)}
        message='알림 채널 삭제가 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenNotifyChannelDeleteFailModal}
        toggle={() => setIsOpenNotifyChannelDeleteFailModal(!isOpenNotifyChannelDeleteFailModal)}
        message={messageNotifyChannelDeleteFail || '알림 채널 삭제에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default NotifyChannelDeleteContainer;