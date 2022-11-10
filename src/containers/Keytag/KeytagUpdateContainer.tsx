import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import KeytagUpdate from '../../components/Keytag/KeytagUpdate';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { changeField, changeResult, selectKeytagAction, updateKeytagAction } from '../../stores/keytag';
import { KeytagUpdateContainerProps } from '../../types/keytag';

const KeytagUpdateContainer = ({
  isOpen,
  toggle,
  reload,
  buildingId,
  floorId,
  roomId,
  keytagId,
}:KeytagUpdateContainerProps) => {
  const dispatch = useDispatch();
  const { keytagItem, keytagSuccess, keytagError } = useSelector(({ keytag }:RootState) => ({
      keytagItem: keytag.keytag,
      keytagSuccess: keytag.keytagUpdateSuccess,
      keytagError: keytag.keytagUpdateError,
  }));
  const [ isOpenKeytagUpdateSuccessModal, setIsOpenKeytagUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenKeytagUpdateFailModal, setIsOpenKeytagUpdateFailModal ] = useState<boolean>(false);
  const [ messageKeytagUpdateFail, setMessageKeytagUpdateFail ] = useState<string>('');

  const handleSelectKeytag = useCallback(() => {
    dispatch(selectKeytagAction({buildingId, floorId, roomId, keytagId}));
  },[buildingId, dispatch, floorId, keytagId, roomId]);

  //인풋 변경 이벤트 핸들러
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const value2 = name === 'isMobilekeyIssuable' || name === 'allowSound'? value === 'O'? true : false : value; 
    dispatch(
        changeField({
            key: name,
            value: value2,
        })
    );
  },[dispatch]);

  const handleUpdateKeytag = useCallback(() => {
    dispatch(updateKeytagAction({...keytagItem, buildingId, floorId, roomId, keytagId}));
  },[buildingId, floorId, roomId, keytagId, dispatch, keytagItem]);

  useEffect(() => {
    if (isOpen && roomId){
      handleSelectKeytag();
    } 
  }, [isOpen, roomId, dispatch, handleSelectKeytag]);

  useEffect(() => {
    if(keytagError){
      if (!keytagError.response) setMessageKeytagUpdateFail(keytagError.message);
      else setMessageKeytagUpdateFail(`${keytagError.response.data.code}, ${keytagError.response.data.message}`);

      if(keytagError.response.data.code === 401 || keytagError.response.data.code === 419) reload();
      else setIsOpenKeytagUpdateFailModal(true);
      dispatch(
        changeResult({
          key: 'keytagUpdateError',
          value: null,
        })
      );
      return;
    }
    if(keytagSuccess){
      toggle();
      setIsOpenKeytagUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenKeytagUpdateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'keytagUpdateSuccess',
          value: false,
        })
      );
    }
  },[keytagSuccess, keytagError, toggle, reload, dispatch]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <KeytagUpdate
              keytagItem={keytagItem}
              handleChange={handleChange}
              handleUpdateKeytag={handleUpdateKeytag}
              toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenKeytagUpdateSuccessModal}
        toggle={() => setIsOpenKeytagUpdateSuccessModal(!isOpenKeytagUpdateSuccessModal)}
        message='키택 수정이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenKeytagUpdateFailModal}
        toggle={() => setIsOpenKeytagUpdateFailModal(!isOpenKeytagUpdateFailModal)}
        message={messageKeytagUpdateFail || '키택 수정에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default KeytagUpdateContainer;