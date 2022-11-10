import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import StaffDelete from '../../components/Staff/StaffDelete';
import { RootState } from '../../stores';
import { changeResult, deleteStaffAction } from '../../stores/staff';
import { StaffDeleteContainerProps } from '../../types/staff';

const StaffDeleteContainer = ({
  isOpen,
  toggle,
  reload,
  staffId,
  staffName,
}:StaffDeleteContainerProps) => {
  const dispatch = useDispatch();    
  const { staffSuccess, staffError } = useSelector(({ staff }:RootState) => ({
    staffSuccess: staff.staffDeleteSuccess,
    staffError: staff.staffDeleteError,
  }));
  const [ isOpenStaffDeleteSuccessModal, setIsOpenStaffDeleteSuccessModal ] = useState<boolean>(false);
  const [ isOpenStaffDeleteFailModal, setIsOpenStaffDeleteFailModal ] = useState<boolean>(false);
  const [ messageStaffDeleteFail, setMessageStaffDeleteFail ] = useState<string>('');

  const handleDeleteStaff = useCallback(() => {
    dispatch(deleteStaffAction({staffId}));
  },[dispatch, staffId]);

  useEffect(() => {
    if(staffError){
      toggle();
      if (!staffError.response) setMessageStaffDeleteFail(staffError.message);
      else setMessageStaffDeleteFail(`${staffError.response.data.code}, ${staffError.response.data.message}`);

      if(staffError.response.data.code === 401 || staffError.response.data.code === 419) reload();
      else setIsOpenStaffDeleteFailModal(true);
      dispatch(
        changeResult({
          key: 'staffDeleteError',
          value: null,
        })
      );
      return;
    }
    if(staffSuccess){
      toggle();
      setIsOpenStaffDeleteSuccessModal(true);
      setTimeout(() => {
        setIsOpenStaffDeleteSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'staffDeleteSuccess',
          value: false,
        })
      );
    }
  },[staffSuccess, staffError, toggle, dispatch, reload]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <StaffDelete 
             staffName={staffName}
             handleDeleteStaff={handleDeleteStaff}
             toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenStaffDeleteSuccessModal}
        toggle={() => setIsOpenStaffDeleteSuccessModal(!isOpenStaffDeleteSuccessModal)}
        message='스태프 삭제가 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenStaffDeleteFailModal}
        toggle={() => setIsOpenStaffDeleteFailModal(!isOpenStaffDeleteFailModal)}
        message={messageStaffDeleteFail || '스태프 삭제에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default StaffDeleteContainer;