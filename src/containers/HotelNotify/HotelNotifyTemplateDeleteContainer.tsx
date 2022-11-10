import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import HotelNotifyTemplateDelete from '../../components/HotelNotify/HotelNotifyTemplateDelete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeResult, deletehotelnotifyAction, initialize } from '../../stores/hotelnotify';
import { HotelNotifyTemplateDeleteContainerProps } from '../../types/hotelnotify';

const HotelNotifyTemplateDeleteContainer = ({
  isOpen,
  toggle,
  reload,
  hotelTemplateId,
}:HotelNotifyTemplateDeleteContainerProps) => {
  const dispatch = useDispatch();
  const { hotelnotifySuccess, hotelnotifyError } = useSelector(({ hotelnotify }:RootState) => ({
      hotelnotifySuccess: hotelnotify.hotelnotifyDeleteSuccess,
      hotelnotifyError: hotelnotify.hotelnotifyDeleteError,
  }));
  const [ isOpenHotelNotifyTemplateDeleteSuccessModal, setIsOpenHotelNotifyTemplateDeleteSuccessModal ] = useState<boolean>(false);
  const [ isOpenHotelNotifyTemplateDeleteFailModal, setIsOpenHotelNotifyTemplateDeleteFailModal ] = useState<boolean>(false);
  const [ messageHotelNotifyTemplateDeleteFail, setMessageHotelNotifyTemplateDeleteFail ] = useState<string>('');

  const handleDeleteHotelNotifyTemplate = useCallback(() => {
    dispatch(deletehotelnotifyAction({hotelTemplateId}));
  },[dispatch, hotelTemplateId]);

  useEffect(() => {
    if(hotelnotifyError){
      toggle();
      if (!hotelnotifyError.response) setMessageHotelNotifyTemplateDeleteFail(hotelnotifyError.message);
      else setMessageHotelNotifyTemplateDeleteFail(`${hotelnotifyError.response.data.code}, ${hotelnotifyError.response.data.message}`);

      if(hotelnotifyError.response.data.code === 401 || hotelnotifyError.response.data.code === 419) reload();
      else setIsOpenHotelNotifyTemplateDeleteFailModal(true);
      dispatch(
        changeResult({
          key: 'hotelnotifyDeleteError',
          value: null,
        })
      );
      return;
    }
    if(hotelnotifySuccess){
      toggle();
      setIsOpenHotelNotifyTemplateDeleteSuccessModal(true);
      setTimeout(() => {
        setIsOpenHotelNotifyTemplateDeleteSuccessModal(false);
        reload();
      }, 1500);
      dispatch(initialize()); //hotelnotify.ts 전역상태 초기화
    }
  },[hotelnotifySuccess, hotelnotifyError, toggle, reload, dispatch]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <HotelNotifyTemplateDelete
              hotelTemplateId={hotelTemplateId}
              handleDeleteHotelNotifyTemplate={handleDeleteHotelNotifyTemplate}
              toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenHotelNotifyTemplateDeleteSuccessModal}
        toggle={() => setIsOpenHotelNotifyTemplateDeleteSuccessModal(!isOpenHotelNotifyTemplateDeleteSuccessModal)}
        message='단지 알림 템플릿 삭제가 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenHotelNotifyTemplateDeleteFailModal}
        toggle={() => setIsOpenHotelNotifyTemplateDeleteFailModal(!isOpenHotelNotifyTemplateDeleteFailModal)}
        message={messageHotelNotifyTemplateDeleteFail || '단지 알림 템플릿 삭제에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default HotelNotifyTemplateDeleteContainer;