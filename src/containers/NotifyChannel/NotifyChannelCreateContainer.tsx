import React, { useState, useEffect, Fragment, ChangeEvent, useCallback } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import NotifyChannelCreate from '../../components/NotifyChannel/NotifyChannelCreate';
import { changeField, changeResult, createnotifyChannelAction, initialize } from '../../stores/notifyChannel';
import { NotifyChannelCreateContainerProps } from '../../types/notifyChannel';

const NotifyChannelCreateContainer = ({
  isOpen,
  toggle,
  reload,
}:NotifyChannelCreateContainerProps) => {
  const dispatch = useDispatch();
  const { notifyChannelItem, notifyChannelSuccess, notifyChannelError } = useSelector(({ notifyChannel }:RootState) => ({
      notifyChannelItem: notifyChannel.notifyChannel,
      notifyChannelSuccess: notifyChannel.notifyChannelCreateSuccess,
      notifyChannelError: notifyChannel.notifyChannelCreateError,
  }));
  const [ isOpenNotifyChannelCreateSuccessModal, setIsOpenNotifyChannelCreateSuccessModal ] = useState<boolean>(false);
  const [ isOpenNotifyChannelCreateFailModal, setIsOpenNotifyChannelCreateFailModal ] = useState<boolean>(false);
  const [ messageNotifyChannelCreateFail, setMessageNotifyChannelCreateFail ] = useState<string>('');

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

  const handleCreateNotifyChannel = useCallback(() => {
    dispatch(createnotifyChannelAction({
      ...notifyChannelItem,
      config: notifyChannelItem.type === 'surem' ? notifyChannelItem.config : null
    }));
  },[dispatch, notifyChannelItem]);

  useEffect(() => {
    if(notifyChannelError){
      if (!notifyChannelError.response) setMessageNotifyChannelCreateFail(notifyChannelError.message);
      else setMessageNotifyChannelCreateFail(`${notifyChannelError.response.data.code}, ${notifyChannelError.response.data.message}`);

      if(notifyChannelError.response.data.code === 401 || notifyChannelError.response.data.code === 419) reload();
      else setIsOpenNotifyChannelCreateFailModal(true);
      dispatch(
        changeResult({
          key: 'notifyChannelCreateError',
          value: null,
        })
      );
      return;
    }
    if(notifyChannelSuccess){
      toggle();
      setIsOpenNotifyChannelCreateSuccessModal(true);
      setTimeout(() => {
        setIsOpenNotifyChannelCreateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'notifyChannelCreateSuccess',
          value: false,
        })
      );
    }
  },[notifyChannelSuccess, notifyChannelError, dispatch, toggle, reload]);

  useEffect(() => {
    if(isOpen) dispatch(initialize());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isOpen]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <NotifyChannelCreate 
              notifyChannelItem={notifyChannelItem}
              handleChange={handleChange}
              handleCreateNotifyChannel={handleCreateNotifyChannel}
              toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenNotifyChannelCreateSuccessModal}
        toggle={() => setIsOpenNotifyChannelCreateSuccessModal(!isOpenNotifyChannelCreateSuccessModal)}
        message='알림 채널 생성이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenNotifyChannelCreateFailModal}
        toggle={() => setIsOpenNotifyChannelCreateFailModal(!isOpenNotifyChannelCreateFailModal)}
        message={messageNotifyChannelCreateFail || '알림 채널 생성에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default NotifyChannelCreateContainer;