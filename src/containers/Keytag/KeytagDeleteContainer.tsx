import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import KeytagDelete from '../../components/Keytag/KeytagDelete';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { changeResult, deleteKeytagAction, initialize } from '../../stores/keytag';
import { KeytagDeleteContainerProps } from '../../types/keytag';

const KeytagDeleteContainer = ({
  isOpen,
  toggle,
  reload,
  buildingId,
  floorId,
  roomId,
  keytagId,
  keytagName,
}:KeytagDeleteContainerProps) => {
  const dispatch = useDispatch();
  const { keytagSuccess, keytagError, } = useSelector(({ keytag }:RootState) => ({
      keytagSuccess: keytag.keytagDeleteSuccess,
      keytagError: keytag.keytagDeleteError,
  }));
  const [ isOpenKeytagDeleteSuccessModal, setIsOpenKeytagDeleteSuccessModal ] = useState<boolean>(false);
  const [ isOpenKeytagDeleteFailModal, setIsOpenKeytagDeleteFailModal ] = useState<boolean>(false);
  const [ messageKeytagDeleteFail, setMessageKeytagDeleteFail ] = useState<string>('');

  const handleDeleteKeytag = useCallback(() => {
   dispatch(deleteKeytagAction({buildingId, floorId, roomId, keytagId}));
  },[buildingId, dispatch, floorId, roomId, keytagId]);

  useEffect(() => {
    if(keytagError){
      if (!keytagError.response) setMessageKeytagDeleteFail(keytagError.message);
      else setMessageKeytagDeleteFail(`${keytagError.response.data.code}, ${keytagError.response.data.message}`);

      if(keytagError.response.data.code === 401 || keytagError.response.data.code === 419) reload();
      else setIsOpenKeytagDeleteFailModal(true);
      dispatch(
        changeResult({
          key: 'keytagDeleteError',
          value: null,
        })
      );
      return;
    }
    if(keytagSuccess){
      toggle();
      setIsOpenKeytagDeleteSuccessModal(true);
      setTimeout(() => {
        setIsOpenKeytagDeleteSuccessModal(false);
        reload();
      }, 1500);
      dispatch(initialize()); //keytag.ts ???????????? ?????????
    }
  },[keytagSuccess, keytagError, toggle, reload, dispatch]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <KeytagDelete
              keytagName={keytagName}
              handleDeleteKeytag={handleDeleteKeytag}
              toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenKeytagDeleteSuccessModal}
        toggle={() => setIsOpenKeytagDeleteSuccessModal(!isOpenKeytagDeleteSuccessModal)}
        message='?????? ????????? ?????? ???????????????.'
      />
      <ResponseFailModal
        isOpen={isOpenKeytagDeleteFailModal}
        toggle={() => setIsOpenKeytagDeleteFailModal(!isOpenKeytagDeleteFailModal)}
        message={messageKeytagDeleteFail || '?????? ????????? ?????? ???????????????.'}
      />
    </Fragment>
  );
}

export default KeytagDeleteContainer;