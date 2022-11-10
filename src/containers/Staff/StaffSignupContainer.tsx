import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import StaffSignup from '../../components/Staff/StaffSignup';
import { RootState } from '../../stores';
import { changeResult, signupStaffAction, verificationCodeAction, verificationTokenAction } from '../../stores/staff';
import { StaffSignupContainerProps } from '../../types/staff';

const StaffSignupContainer = ({
  isOpen,
  toggle,
  reload,
  staffPhoneNumber,
  staffName,
}:StaffSignupContainerProps) => {
  const dispatch = useDispatch();    
  const { verificationCode, verificationToken, staffSuccess, staffError  } = useSelector(({ staff }:RootState) => ({
    verificationCode: staff.verificationCode,
    verificationToken: staff.verificationToken,
    staffSuccess: staff.staffSignupSuccess,
    staffError: staff.staffSignupError,
  }));
  const initPassword:string = '1234';
  const [ isOpenStaffSignupSuccessModal, setIsOpenStaffSignupSuccessModal ] = useState<boolean>(false);
  const [ isOpenStaffSignupFailModal, setIsOpenStaffSignupFailModal ] = useState<boolean>(false);
  const [ messageStaffSignupFail, setMessageStaffSignupFail ] = useState<string>('');

  const handleSignupStaffVerifiCode = useCallback(() => {
    dispatch(verificationCodeAction({
      phoneNumber: staffPhoneNumber,
      needSignedup: false,
      isTestMode: true
    }));
  },[dispatch, staffPhoneNumber]);
  
  const handleSignupStaffVerifiToken = useCallback(() => {
    dispatch(verificationTokenAction({
      phoneNumber: staffPhoneNumber,
      verificationCode: verificationCode,
    }));
  },[dispatch, staffPhoneNumber, verificationCode]);

  const handleSignupStaff = useCallback(() => {
    dispatch(signupStaffAction({
      name: staffName,
      phoneNumber: staffPhoneNumber,
      verificationToken: verificationToken,
      password: initPassword,
    }));
  },[dispatch, staffName, staffPhoneNumber, verificationToken]);

  useEffect(() => {
    if(staffError){
      toggle();
      if (!staffError.response) setMessageStaffSignupFail(staffError.message);
      else setMessageStaffSignupFail(`${staffError.response.data.code}, ${staffError.response.data.message}`);

      if(staffError.response.data.code === 401 || staffError.response.data.code === 419) reload();
      else setIsOpenStaffSignupFailModal(true);
      dispatch(
        changeResult({
          key: 'staffSignupError',
          value: null,
        })
      );
      return;
    }
    if(verificationCode){
      handleSignupStaffVerifiToken();
      dispatch(changeResult({
        key: 'verificationCode',
        value: '',
      }));
      return;
    }
    if(verificationToken){
      handleSignupStaff();
      dispatch(changeResult({
        key: 'verificationToken',
        value: '',
      }));
      return;
    }
    if(staffSuccess){
      toggle();
      setIsOpenStaffSignupSuccessModal(true);
      setTimeout(() => {
        setIsOpenStaffSignupSuccessModal(false);
        reload();
      }, 1500);
      dispatch(changeResult({
        key: 'staffSignupSuccess',
        value: false,
      }));
    }
  },[dispatch, handleSignupStaff, handleSignupStaffVerifiToken, reload, staffError, staffSuccess, toggle, verificationCode, verificationToken]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <StaffSignup 
            staffName={staffName}
            initPassword={initPassword}
            handleSignupStaffVerifiCode={handleSignupStaffVerifiCode}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenStaffSignupSuccessModal}
        toggle={() => setIsOpenStaffSignupSuccessModal(!isOpenStaffSignupSuccessModal)}
        message='가입 승인이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenStaffSignupFailModal}
        toggle={() => setIsOpenStaffSignupFailModal(!isOpenStaffSignupFailModal)}
        message={messageStaffSignupFail || '가입 승인에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default StaffSignupContainer;