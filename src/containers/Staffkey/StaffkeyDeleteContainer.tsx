import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import StaffkeyDelete from '../../components/Staffkey/StaffkeyDelete';
import { RootState } from '../../stores';
import { changeResult, deleteStaffMobilekeyAction } from '../../stores/staff';
import { StaffkeyDeleteContainerProps } from '../../types/staff';

const StaffkeyDeleteContainer = ({
  isOpen,
  toggle,
  reload,
  keyId,
}:StaffkeyDeleteContainerProps) => {
  const dispatch = useDispatch();    
  const { staffSuccess, staffError } = useSelector(({ staff }:RootState) => ({
    staffSuccess: staff.staffkeyDeleteSuccess,
    staffError: staff.staffkeyDeleteError,
  }));
  const [ isOpenStaffkeyDeleteSuccessModal, setIsOpenStaffkeyDeleteSuccessModal ] = useState<boolean>(false);
  const [ isOpenStaffkeyDeleteFailModal, setIsOpenStaffkeyDeleteFailModal ] = useState<boolean>(false);
  const [ messageStaffkeyIssueFail, setMessageStaffkeyIssueFail ] = useState<string>('');

  const handleDeleteStaffkey = useCallback(() => {
    dispatch(deleteStaffMobilekeyAction({keyId}));
  },[dispatch, keyId]);

  useEffect(() => {
    if(staffError){
      if (!staffError.response) setMessageStaffkeyIssueFail(staffError.message);
      else setMessageStaffkeyIssueFail(`${staffError.response.data.code}, ${staffError.response.data.message}`);

      if(staffError.response.data.code === 401 || staffError.response.data.code === 419) reload();
      else setIsOpenStaffkeyDeleteFailModal(true);
      dispatch(
        changeResult({
          key: 'staffkeyDeleteError',
          value: null,
        })
      );
      return;
    }
    if(staffSuccess){
      toggle();
      setIsOpenStaffkeyDeleteSuccessModal(true);
      setTimeout(() => {
        setIsOpenStaffkeyDeleteSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'staffkeyDeleteSuccess',
          value: false,
        })
      );
    }
  },[staffSuccess, staffError, dispatch, toggle, reload]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <StaffkeyDelete
              handleDeleteStaffkey={handleDeleteStaffkey}
              toggle={toggle}      
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenStaffkeyDeleteSuccessModal}
        toggle={() => setIsOpenStaffkeyDeleteSuccessModal(!isOpenStaffkeyDeleteSuccessModal)}
        message='???????????? ????????? ?????? ???????????????.'
      />
      <ResponseFailModal
        isOpen={isOpenStaffkeyDeleteFailModal}
        toggle={() => setIsOpenStaffkeyDeleteFailModal(!isOpenStaffkeyDeleteFailModal)}
        message={messageStaffkeyIssueFail || '???????????? ????????? ?????? ???????????????.'}
      />
    </Fragment>
  );
}

export default StaffkeyDeleteContainer;