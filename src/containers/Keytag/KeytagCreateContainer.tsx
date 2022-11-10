import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import KeytagCreate from '../../components/Keytag/KeytagCreate';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { changeField, changeResult, createKeytagAction, initialize } from '../../stores/keytag';
import { KeytagCreateContainerProps } from '../../types/keytag';

const KeytagCreateContainer = ({
  isOpen,
  toggle,
  reload,
  buildingId,
  floorId,
  roomId,
}:KeytagCreateContainerProps) => {
  const dispatch = useDispatch();
  const { keytagItem, keytagSuccess, keytagError } = useSelector(({ keytag }:RootState) => ({
      keytagItem: keytag.keytag,
      keytagSuccess: keytag.keytagCreateSuccess,
      keytagError: keytag.keytagCreateError,
  }));
  const [ isOpenKeytagCreateSuccessModal, setIsOpenKeytagCreateSuccessModal ] = useState<boolean>(false);
  const [ isOpenKeytagCreateFailModal, setIsOpenKeytagCreateFailModal ] = useState<boolean>(false);
  const [ messageKeytagCreateFail, setMessageKeytagCreateFail ] = useState<string>('');

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

  const handleCreateKeytag = useCallback(() => {
    dispatch(createKeytagAction({...keytagItem, buildingId, floorId, roomId}));
  },[buildingId, floorId, roomId, dispatch, keytagItem]);

  useEffect(() => {
    if (isOpen && roomId){
      dispatch(initialize());
    } 
  }, [isOpen, roomId, dispatch]);

  useEffect(() => {
    if(keytagError){
      if (!keytagError.response) setMessageKeytagCreateFail(keytagError.message);
      else setMessageKeytagCreateFail(`${keytagError.response.data.code}, ${keytagError.response.data.message}`);

      if(keytagError.response.data.code === 401 || keytagError.response.data.code === 419) reload();
      else setIsOpenKeytagCreateFailModal(true);
      dispatch(
        changeResult({
          key: 'keytagCreateError',
          value: null,
        })
      );
      return;
    }
    if(keytagSuccess){
      toggle();
      setIsOpenKeytagCreateSuccessModal(true);
      setTimeout(() => {
        setIsOpenKeytagCreateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'keytagCreateSuccess',
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
          <KeytagCreate
              keytagItem={keytagItem}
              handleChange={handleChange}
              handleCreateKeytag={handleCreateKeytag}
              toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenKeytagCreateSuccessModal}
        toggle={() => setIsOpenKeytagCreateSuccessModal(!isOpenKeytagCreateSuccessModal)}
        message='키택 생성이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenKeytagCreateFailModal}
        toggle={() => setIsOpenKeytagCreateFailModal(!isOpenKeytagCreateFailModal)}
        message={messageKeytagCreateFail || '키택 생성에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default KeytagCreateContainer;