import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import StaffUpdate from '../../components/Staff/StaffUpdate';
import { RootState } from '../../stores';
import { changeField, changeResult, selectStaffAction, updateStaffAction } from '../../stores/staff';
import { StaffUpdateContainerProps } from '../../types/staff';

const StaffUpdateContainer = ({
  isOpen,
  toggle,
  reload,
  staffId,
}:StaffUpdateContainerProps) => {
  const dispatch = useDispatch();    
  const { staffItem, staffSuccess, staffError, hotelRole  } = useSelector(({ staff, header }:RootState) => ({
    staffItem: staff.staff,
    staffSuccess: staff.staffUpdateSuccess,
    staffError: staff.staffUpdateError,
    hotelRole: header.hotelRole,
  }));
  const [ isOpenStaffUpdateSuccessModal, setIsOpenStaffUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenStaffUpdateFailModal, setIsOpenStaffUpdateFailModal ] = useState<boolean>(false);
  const [ messageStaffUpdateFail, setMessageStaffUpdateFail ] = useState<string>('');

  //인풋 변경 이벤트 핸들러
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    dispatch(
        changeField({
            key: name,
            value: value,
        })
    );
},[dispatch]);

  const handleSelectStaff = useCallback(() => {
    dispatch(selectStaffAction({staffId}));
  },[dispatch, staffId]);

  const handleUpdateStaff = useCallback(() => {
    dispatch(updateStaffAction({...staffItem, staffId}));
  },[dispatch, staffId, staffItem]);

  useEffect(() => {
    if(staffError){
      if (!staffError.response) setMessageStaffUpdateFail(staffError.message);
      else setMessageStaffUpdateFail(`${staffError.response.data.code}, ${staffError.response.data.message}`);

      if(staffError.response.data.code === 401 || staffError.response.data.code === 419) reload();
      else setIsOpenStaffUpdateFailModal(true);
      dispatch(
        changeResult({
          key: 'staffUpdateError',
          value: null,
        })
      );
      return;
    }
    if(staffSuccess){
      toggle();
      setIsOpenStaffUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenStaffUpdateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'staffUpdateSuccess',
          value: false,
        })
      );
    }
  },[staffSuccess, staffError, dispatch, toggle, reload]);

  useEffect(() => {
    if (isOpen && staffId) handleSelectStaff();
  }, [staffId, isOpen, handleSelectStaff]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <StaffUpdate 
            staffItem={staffItem}
            hotelRole={hotelRole}
            handleChange={handleChange}
            handleUpdateStaff={handleUpdateStaff}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenStaffUpdateSuccessModal}
        toggle={() => setIsOpenStaffUpdateSuccessModal(!isOpenStaffUpdateSuccessModal)}
        message='스태프 정보 수정이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenStaffUpdateFailModal}
        toggle={() => setIsOpenStaffUpdateFailModal(!isOpenStaffUpdateFailModal)}
        message={messageStaffUpdateFail || '스태프 정보 수정에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default StaffUpdateContainer;