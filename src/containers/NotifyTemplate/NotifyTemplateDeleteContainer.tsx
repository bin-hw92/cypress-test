import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import NotifyTemplateDelete from '../../components/NotifyTemplate/NotifyTemplateDelete';
import { RootState } from '../../stores';
import { changeResult, deletenotifyTemplateAction } from '../../stores/notifyTemplate';
import { NotifyTemplateDeleteContainerProps } from '../../types/notifyTemplate';

const NotifyTemplateDeleteContainer = ({
  isOpen,
  toggle,
  reload,
  templateId,
}:NotifyTemplateDeleteContainerProps) => {
  const dispatch = useDispatch();
  const { notifyTemplateSuccess, notifyTemplateError } = useSelector(({ notifyTemplate }:RootState) => ({
    notifyTemplateSuccess: notifyTemplate.notifyTemplateDeleteSuccess,
    notifyTemplateError: notifyTemplate.notifyTemplateDeleteError,
  }));
  const [ isOpenNotifyTemplateDeleteSuccessModal, setIsOpenNotifyTemplateDeleteSuccessModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateDeleteFailModal, setIsOpenNotifyTemplateDeleteFailModal ] = useState<boolean>(false);
  const [ messageNotifyTemplateDeleteFail, setMessageNotifyTemplateDeleteFail ] = useState<string>('');

  const handleDeleteNotifyTemplate = useCallback(() => {
    dispatch(deletenotifyTemplateAction({templateId}));
  },[dispatch, templateId]);

  useEffect(() => {
    if(notifyTemplateError){
      toggle();
      if (!notifyTemplateError.response) setMessageNotifyTemplateDeleteFail(notifyTemplateError.message);
      else setMessageNotifyTemplateDeleteFail(`${notifyTemplateError.response.data.code}, ${notifyTemplateError.response.data.message}`);

      if(notifyTemplateError.response.data.code === 401 || notifyTemplateError.response.data.code === 419) reload();
      else setIsOpenNotifyTemplateDeleteFailModal(true);
      dispatch(
        changeResult({
          key: 'notifyTemplateDeleteError',
          value: null,
        })
      );
      return;
    }
    if(notifyTemplateSuccess){
      toggle();
      setIsOpenNotifyTemplateDeleteSuccessModal(true);
      setTimeout(() => {
        setIsOpenNotifyTemplateDeleteSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'notifyTemplateDeleteSuccess',
          value: false,
        })
      );
    }
  },[notifyTemplateSuccess, notifyTemplateError, toggle, dispatch, reload]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <NotifyTemplateDelete 
            templateId={templateId}
            handleDeleteNotifyTemplate={handleDeleteNotifyTemplate}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenNotifyTemplateDeleteSuccessModal}
        toggle={() => setIsOpenNotifyTemplateDeleteSuccessModal(!isOpenNotifyTemplateDeleteSuccessModal)}
        message='알림 템플릿 삭제가 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenNotifyTemplateDeleteFailModal}
        toggle={() => setIsOpenNotifyTemplateDeleteFailModal(!isOpenNotifyTemplateDeleteFailModal)}
        message={messageNotifyTemplateDeleteFail || '알림 템플릿 삭제에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default NotifyTemplateDeleteContainer;