import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeResult, deleteUserMobilekeyAction } from '../../stores/booking';
import UserkeyDelete from '../../components/Userkey/UserkeyDelete';
import { UserkeyDeleteContainerProps } from '../../types/userkey';

const UserkeyDeleteContainer = ({
  isOpen,
  toggle,
  reload,
  bookingId,
  keyId,
}:UserkeyDeleteContainerProps) => {
  const dispatch = useDispatch();
  const { userkeyDeleteSuccess, userkeyDeleteError } = useSelector(({ booking }:RootState) => ({
    userkeyDeleteSuccess: booking.userkeyDeleteSuccess,
    userkeyDeleteError: booking.userkeyDeleteError,
  }));
  const [ isOpenKeyDeleteSuccessModal, setIsOpenKeyDeleteSuccessModal ] = useState<boolean>(false);
  const [ isOpenKeyDeleteFailModal, setIsOpenKeyDeleteFailModal ] = useState<boolean>(false);
  const [ messageKeyDeleteFail, setMessageKeyDeleteFail ] = useState<string>('');

  const handleDeleteKey = useCallback(() => {
    dispatch(deleteUserMobilekeyAction({bookingId, keyId}));
  },[bookingId, dispatch, keyId]);

  useEffect(() => {
    if(userkeyDeleteError){
      toggle();
      if (!userkeyDeleteError.response) setMessageKeyDeleteFail(userkeyDeleteError.message);
      else setMessageKeyDeleteFail(`${userkeyDeleteError.response.data.code}, ${userkeyDeleteError.response.data.message}`);

      if(userkeyDeleteError.response.data.code === 401 || userkeyDeleteError.response.data.code === 419) reload();
      else setIsOpenKeyDeleteFailModal(true);
      dispatch(changeResult({
        key: 'userkeyDeleteError',
        value: null,
      }));
    }
    if(userkeyDeleteSuccess){
      toggle();
      setIsOpenKeyDeleteSuccessModal(true);
      setTimeout(() => {
        setIsOpenKeyDeleteSuccessModal(false);
        reload();
      }, 1500);
      dispatch(changeResult({
        key: 'userkeyDeleteSuccess',
        value: false,
      }));
    }
  },[userkeyDeleteSuccess, userkeyDeleteError, toggle, dispatch, reload]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <UserkeyDelete 
              handleDeleteKey={handleDeleteKey}
              toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenKeyDeleteSuccessModal}
        toggle={() => setIsOpenKeyDeleteSuccessModal(!isOpenKeyDeleteSuccessModal)}
        message='키 삭제가 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenKeyDeleteFailModal}
        toggle={() => setIsOpenKeyDeleteFailModal(!isOpenKeyDeleteFailModal)}
        message={messageKeyDeleteFail || '키 삭제에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default UserkeyDeleteContainer;