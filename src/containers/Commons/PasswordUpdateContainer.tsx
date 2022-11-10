import React, { useState, useEffect, useCallback, Fragment, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PasswordUpdate from '../../components/Commons/PasswordUpdate';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { changeResult, initializePassword, setHeaderItemAction, updatePasswordAction } from '../../stores/header';
import { PasswordUpdateContainerProps } from '../../types/commons';

const PasswordUpdateContainer = ({
  isOpen,
  toggle,
}:PasswordUpdateContainerProps) => {
  const dispatch = useDispatch();
  const { passwordItem, passwordSuccess, passwordError } = useSelector(({ header }:RootState) => ({
    passwordItem: header.password,
    passwordSuccess: header.passwordSuccess, 
    passwordError: header.passwordError,
  }));
  const [ isOpenPasswordUpdateSuccessModal, setIsOpenPasswordUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenPasswordUpdateFailModal, setIsOpenPasswordUpdateFailModal ] = useState<boolean>(false);
  const [ messagePasswordUpdateFail, setMessagePasswordUpdateFail ] = useState<string>('');

  //인풋 변경 이벤트 핸들러
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    dispatch(
      setHeaderItemAction({
            key: name,
            value: value,
        })
    );
  },[dispatch]);
  
  const handleUpdatePassword = useCallback(() => {
    dispatch(updatePasswordAction({...passwordItem}));
  },[dispatch, passwordItem]);

  useEffect(() => {
    if(passwordError){
      if (!passwordError.response) setMessagePasswordUpdateFail(passwordError.message);
      else setMessagePasswordUpdateFail(`${passwordError.response.data.code}, ${passwordError.response.data.message}`);
      setIsOpenPasswordUpdateFailModal(true);
      dispatch(
        changeResult({
          key: 'passwordError',
          value: null,
        })
      );
      return;
    }
    if(passwordSuccess){
      toggle();
      setIsOpenPasswordUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenPasswordUpdateSuccessModal(false);
      }, 1500);
      dispatch(
        changeResult({
          key: 'passwordSuccess',
          value: false,
        })
      );
    }
  },[passwordSuccess, passwordError, dispatch, toggle]);

  useEffect(() => {
    if(isOpen) dispatch(initializePassword());
  }, [dispatch, isOpen]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <PasswordUpdate 
            passwordItem={passwordItem}
            handleChange={handleChange}
            handleUpdatePassword={handleUpdatePassword}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenPasswordUpdateSuccessModal}
        toggle={() => setIsOpenPasswordUpdateSuccessModal(!isOpenPasswordUpdateSuccessModal)}
        message='비밀번호 변경이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenPasswordUpdateFailModal}
        toggle={() => setIsOpenPasswordUpdateFailModal(!isOpenPasswordUpdateFailModal)}
        message={messagePasswordUpdateFail || '비밀번호 변경에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default PasswordUpdateContainer;