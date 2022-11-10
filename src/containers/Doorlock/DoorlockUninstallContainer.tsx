import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DoorlockUninstall from '../../components/Doorlock/DoorlockUninstall';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { changeResult, initialize, uninstallDoorlockAction } from '../../stores/doorlock';
import { DoorlockUninstallContainerProps } from '../../types/doorlock';

const DoorlockUninstallContainer = ({
  isOpen,
  toggle,
  reload,
  doorlockId,
  doorlockName,
  hotelId,
}:DoorlockUninstallContainerProps) => {
  const dispatch = useDispatch();
  const { doorlockSuccess, doorlockError, } = useSelector(({ doorlock }:RootState) => ({
    doorlockSuccess: doorlock.doorlockUninstallSuccess,
    doorlockError: doorlock.doorlockUninstallError,
  }));
  const [isOpenDoorlockUninstallSuccessModal, setIsOpenDoorlockUninstallSuccessModal] = useState<boolean>(false);
  const [isOpenDoorlockUninstallFailModal, setIsOpenDoorlockUninstallFailModal] = useState<boolean>(false);
  const [ messageDoorlockUninstallFail, setMessageDoorlockUninstallFail ] = useState<string>('');

  const handleUninstallDoorlock = useCallback(() => {
    dispatch(uninstallDoorlockAction({hotelId, doorlockId}));
  },[dispatch, hotelId, doorlockId]);

  useEffect(() => {
    if(doorlockError){
      if (!doorlockError.response) setMessageDoorlockUninstallFail(doorlockError.message);
      else setMessageDoorlockUninstallFail(`${doorlockError.response.data.code}, ${doorlockError.response.data.message}`);

      if(doorlockError.response.data.code === 401 || doorlockError.response.data.code === 419) reload();
      else setIsOpenDoorlockUninstallFailModal(true);
      dispatch(
        changeResult({
          key: 'doorlockUninstallError',
          value: null,
        })
      );
      return;
    }
    if(doorlockSuccess){
      toggle();
      setIsOpenDoorlockUninstallSuccessModal(true);
      setTimeout(() => {
        setIsOpenDoorlockUninstallSuccessModal(false);
        reload();
      }, 1500);
      dispatch(initialize()); //doorlock.ts 전역상태 초기화
    }
  },[doorlockSuccess, doorlockError, toggle, reload, dispatch]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <DoorlockUninstall 
            doorlockName={doorlockName}
            handleUninstallDoorlock={handleUninstallDoorlock}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenDoorlockUninstallSuccessModal}
        toggle={() => setIsOpenDoorlockUninstallSuccessModal(!isOpenDoorlockUninstallSuccessModal)}
        message='도어락 설치 삭제가 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenDoorlockUninstallFailModal}
        toggle={() => setIsOpenDoorlockUninstallFailModal(!isOpenDoorlockUninstallFailModal)}
        message={messageDoorlockUninstallFail || '도어락 설치 삭제에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default DoorlockUninstallContainer;