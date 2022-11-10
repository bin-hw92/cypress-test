import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import StaffCreate from '../../components/Staff/StaffCreate';
import { RootState } from '../../stores';
import { changeField, changeResult, createStaffAction, initialize } from '../../stores/staff';
import { StaffCreateContainerProps } from '../../types/staff';

const StaffCreateContainer = ({
  isOpen,
  toggle,
  reload,
}:StaffCreateContainerProps) => {
  const dispatch = useDispatch();    
  const { staffItem, staffSuccess, staffError, hotelRole  } = useSelector(({ staff, header }:RootState) => ({
    staffItem: staff.staff,
    staffSuccess: staff.staffCreateSuccess,
    staffError: staff.staffCreateError,
    hotelRole: header.hotelRole,
  }));
  const [ isOpenStaffCreateSuccessModal, setIsOpenStaffCreateSuccessModal ] = useState<boolean>(false);
  const [ isOpenStaffCreateFailModal, setIsOpenStaffCreateFailModal ] = useState<boolean>(false);
  const [ messageStaffCreateFail, setMessageStaffCreateFail ] = useState<string>('');

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

  const handleCreateStaff = useCallback(() => {
    const reqNum = staffItem.countryNumber + Number.parseInt(staffItem.phoneNumber);
    dispatch(createStaffAction({...staffItem, phoneNumber: reqNum}));
  },[dispatch, staffItem]);

  useEffect(() => {
    if(staffError){
      if (!staffError.response) setMessageStaffCreateFail(staffError.message);
      else setMessageStaffCreateFail(`${staffError.response.data.code}, ${staffError.response.data.message}`);

      if(staffError.response.data.code === 401 || staffError.response.data.code === 419) reload();
      else setIsOpenStaffCreateFailModal(true);
      dispatch(
        changeResult({
          key: 'staffCreateError',
          value: null,
        })
      );
      return;
    }
    if(staffSuccess){
      toggle();
      setIsOpenStaffCreateSuccessModal(true);
      setTimeout(() => {
        setIsOpenStaffCreateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(initialize());
    }
  },[staffSuccess, staffError, toggle, reload, dispatch]);

  useEffect(() => {
    if(isOpen) dispatch(initialize());
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
          <StaffCreate 
            staffItem={staffItem}
            hotelRole={hotelRole}
            handleChange={handleChange}
            handleCreateStaff={handleCreateStaff}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenStaffCreateSuccessModal}
        toggle={() => setIsOpenStaffCreateSuccessModal(!isOpenStaffCreateSuccessModal)}
        message='스태프 생성이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenStaffCreateFailModal}
        toggle={() => setIsOpenStaffCreateFailModal(!isOpenStaffCreateFailModal)}
        message={messageStaffCreateFail || '스태프 생성에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default StaffCreateContainer;