import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { SMSSend } from '../../components/Commons/SMSSend';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeResult, initialize, smsMobileKeyAction, smsPincodeAction, smsSendAction } from '../../stores/sms';
import { SMSSendContainerProps } from '../../types/sms';

export const SMSSendContainer = ({
  isOpen,
  isResend,
  toggle,
  bookingId,
  reload,
}:SMSSendContainerProps) => {
  const dispatch = useDispatch();
  const { smsSendItem, smsSuccess, smsError } = useSelector(({ sms }:RootState) => ({
      smsSendItem: sms.sms,
      smsSuccess: sms.smsSuccess,
      smsError: sms.smsError,
  }));
  const [ isOpenSMSSendSuccessModal, setIsOpenSMSSendSuccessModal ] = useState<boolean>(false);
  const [ isOpenSMSSendFailModal, setIsOpenSMSSendFailModal ] = useState<boolean>(false);
  const [ messageSMSSendFail, setMessageSMSSendFail ] = useState<string>('');

  const typeFormatter = (type:'mobilekey'|'pincode') => {
    const formatter = {
      mobilekey: '모바일키 교환코드',
      pincode: '핀코드',
    };
    return formatter[type];
  };

  const staffkeyMessageFormatter = (exchangekey:string) => {
    return `■ 모바일키 교환번호\n[${exchangekey}]\n■ 앱 바로가기\nhttps://ovalmms.page.link/key`;
  };

  const handleSendSMS = useCallback(() => {
    if (smsSendItem.type === 'pincode' && bookingId){ dispatch(smsPincodeAction({ bookingId, pincodeId: smsSendItem.keyId }));
    }else if(smsSendItem.type === 'mobilekey' && bookingId){ dispatch(smsMobileKeyAction({ bookingId, userId: smsSendItem.keyId }));
    }else{
      const message = staffkeyMessageFormatter(smsSendItem.value? smsSendItem.value : '');
      if(smsSendItem.phoneNumber) dispatch(smsSendAction({ phoneNumber: smsSendItem.phoneNumber, message }));
    }
  },[dispatch, bookingId, smsSendItem.keyId, smsSendItem.phoneNumber, smsSendItem.type, smsSendItem.value]);

  const handleClose = () => {
    toggle();
    reload();
    dispatch(initialize());
    setIsOpenSMSSendSuccessModal(false);
  };

  useEffect(() => {
    if(smsError){
      toggle();
      if (!smsError.response) setMessageSMSSendFail(smsError.message);
      else setMessageSMSSendFail(`${smsError.response.data.code}, ${smsError.response.data.message}`);
      setIsOpenSMSSendFailModal(true);
      dispatch(
        changeResult({
          key: 'smsError',
          value: null,
        })
      );
    }
    if(smsSuccess){
      toggle();
      setIsOpenSMSSendSuccessModal(true);
      setTimeout(() => {
        setIsOpenSMSSendSuccessModal(false);
        handleClose();
      }, 1500);
      dispatch(initialize());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch, smsError, smsSuccess]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
         <SMSSend
            isResend={isResend}
            smsSendItem={smsSendItem}
            typeFormatter={typeFormatter}
            handleClose={handleClose}
            handleSendSMS={handleSendSMS}
         />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenSMSSendSuccessModal}
        toggle={() => setIsOpenSMSSendSuccessModal(!isOpenSMSSendSuccessModal)}
        message='SMS 전송에 성공 하였습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenSMSSendFailModal}
        toggle={() => setIsOpenSMSSendFailModal(!isOpenSMSSendFailModal)}
        message={messageSMSSendFail || 'SMS 전송에 실패 하였습니다.'}
      />
    </Fragment>
  );
}
