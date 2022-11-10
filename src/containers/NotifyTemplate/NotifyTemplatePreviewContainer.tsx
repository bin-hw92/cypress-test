import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseFailModal } from '../../components/Modal/Response';
import NotifyTemplatePreview from '../../components/NotifyTemplate/NotifyTemplatePreview';
import { RootState } from '../../stores';
import { changePreview, previewNotifyTemplateAction } from '../../stores/notifyTemplate';
import { NotifyTemplatePreviewContainerProps } from '../../types/notifyTemplate';

const NotifyTemplatePreviewContainer = ({
  isOpen,
  toggle,
}:NotifyTemplatePreviewContainerProps) => {
  const dispatch = useDispatch();
  const { notifyPreviewState, notifyTemplatePreview, notifyTemplatePreviewError } = useSelector(({ notifyTemplate }:RootState) => ({
    notifyPreviewState: notifyTemplate.notifyPreviewState,
    notifyTemplatePreview: notifyTemplate.notifyTemplatePreview,
    notifyTemplatePreviewError: notifyTemplate.notifyTemplatePreviewError,
  }));
  const [ isOpenNotifyTemplatePreviewFailModal, setIsOpenNotifyTemplatePreviewFailModal ] = useState<boolean>(false);
  const [ messageNotifyTemplatePreviewFail, setMessageNotifyTemplatePreviewFail ] = useState<string>('');

  const handlePreviewNotifyTemplate = useCallback(() => {
    dispatch(previewNotifyTemplateAction(notifyPreviewState));
  },[dispatch, notifyPreviewState]);

  const handleToggle = () => {
    dispatch(changePreview({template:'', templateAlt:'', dateFormat:'', locale:''})); //미리보기 초기화
    toggle();
  };

  useEffect(() => {
    if (isOpen && notifyPreviewState && notifyPreviewState.template){
      handlePreviewNotifyTemplate();
    } 
  }, [isOpen, handlePreviewNotifyTemplate, notifyPreviewState]);

  useEffect(() => {
    if(notifyTemplatePreviewError){
      if (!notifyTemplatePreviewError.response) setMessageNotifyTemplatePreviewFail(notifyTemplatePreviewError.message);
      else setMessageNotifyTemplatePreviewFail(`${notifyTemplatePreviewError.response.data.code}, ${notifyTemplatePreviewError.response.data.message}`);
      setIsOpenNotifyTemplatePreviewFailModal(true);
    }
  },[notifyTemplatePreviewError]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => handleToggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <NotifyTemplatePreview 
              notifyTemplatePreview={notifyTemplatePreview}
              toggle={handleToggle}
          />
        </ModalBody>
      </Modal>
      <ResponseFailModal
        isOpen={isOpenNotifyTemplatePreviewFailModal}
        toggle={() => setIsOpenNotifyTemplatePreviewFailModal(!isOpenNotifyTemplatePreviewFailModal)}
        message={messageNotifyTemplatePreviewFail || '알림 템플릿 생성에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default NotifyTemplatePreviewContainer;