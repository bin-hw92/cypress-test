import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import NotifyTemplateUpdate from '../../components/NotifyTemplate/NotifyTemplateUpdate';
import { RootState } from '../../stores';
import { changeField, changePreview, changeResult, selectnotifyTemplateAction, updatenotifyTemplateAction } from '../../stores/notifyTemplate';
import { NotifyTemplateUpdateContainerProps } from '../../types/notifyTemplate';
import NotifyTemplatePreviewContainer from './NotifyTemplatePreviewContainer';

const NotifyTemplateUpdateContainer = ({
  isOpen,
  toggle,
  reload,
  templateId,
}:NotifyTemplateUpdateContainerProps) => {
  const dispatch = useDispatch();
  const { notifyTemplateItem, notifyTemplateSuccess, notifyTemplateError } = useSelector(({ notifyTemplate }:RootState) => ({
    notifyTemplateItem: notifyTemplate.notifyTemplate,
    notifyTemplateSuccess: notifyTemplate.notifyTemplateUpdateSuccess,
    notifyTemplateError: notifyTemplate.notifyTemplateUpdateError,
  }));

  const [ isOpenNotifyTemplatePreviewModal, setIsOpenNotifyTemplatePreviewModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateUpdateSuccessModal, setIsOpenNotifyTemplateUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateUpdateFailModal, setIsOpenNotifyTemplateUpdateFailModal ] = useState<boolean>(false);
  const [ messageNotifyTemplateUpdateFail, setMessageNotifyTemplateUpdateFail ] = useState<string>('');

  //인풋 변경 이벤트 핸들러
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>|ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    const value2 = name === 'isLMS'? value === 'O'? true : false : value; 
    dispatch(
        changeField({
            key: name,
            value: value2,
        })
    );
  },[dispatch]);

  const handleSelectNotifyTemplate = useCallback(() => {
    dispatch(selectnotifyTemplateAction({templateId}));
  },[dispatch, templateId]);

  const handleUpdateNotifyTemplate = useCallback(() => {
    dispatch(updatenotifyTemplateAction({...notifyTemplateItem}));
  },[dispatch, notifyTemplateItem]);

  const handlePreviewNotifyTemplate = () => {
    dispatch(changePreview({
      template: notifyTemplateItem.template, 
      templateAlt: notifyTemplateItem.templateAlt, 
      dateFormat: notifyTemplateItem.dateFormat, 
      locale: notifyTemplateItem.locale}));
    setIsOpenNotifyTemplatePreviewModal(true);
  };

  useEffect(() => {
    if(notifyTemplateError){
      if (!notifyTemplateError.response) setMessageNotifyTemplateUpdateFail(notifyTemplateError.message);
      else setMessageNotifyTemplateUpdateFail(`${notifyTemplateError.response.data.code}, ${notifyTemplateError.response.data.message}`);

      if(notifyTemplateError.response.data.code === 401 || notifyTemplateError.response.data.code === 419) reload();
      else setIsOpenNotifyTemplateUpdateFailModal(true);
      dispatch(
        changeResult({
          key: 'notifyTemplateUpdateError',
          value: null,
        })
      );
      return;
    }
    if(notifyTemplateSuccess){
      toggle();
      setIsOpenNotifyTemplateUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenNotifyTemplateUpdateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'notifyTemplateUpdateSuccess',
          value: false,
        })
      );
    }
  },[notifyTemplateSuccess, notifyTemplateError, dispatch, toggle, reload]);

  useEffect(() => {
    if (templateId) handleSelectNotifyTemplate();
  }, [templateId, isOpen, handleSelectNotifyTemplate]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <NotifyTemplateUpdate 
              notifyTemplateItem={notifyTemplateItem}
              handleChange={handleChange}
              handleUpdateNotifyTemplate={handleUpdateNotifyTemplate}
              handlePreviewNotifyTemplate={handlePreviewNotifyTemplate}
              toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenNotifyTemplateUpdateSuccessModal}
        toggle={() => setIsOpenNotifyTemplateUpdateSuccessModal(!isOpenNotifyTemplateUpdateSuccessModal)}
        message='알림 템플릿 수정이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenNotifyTemplateUpdateFailModal}
        toggle={() => setIsOpenNotifyTemplateUpdateFailModal(!isOpenNotifyTemplateUpdateFailModal)}
        message={messageNotifyTemplateUpdateFail || '알림 템플릿 수정에 실패 하였습니다.'}
      />
      <NotifyTemplatePreviewContainer
        isOpen={isOpenNotifyTemplatePreviewModal}
        toggle={() => setIsOpenNotifyTemplatePreviewModal(!isOpenNotifyTemplatePreviewModal)}
      />
    </Fragment>
  );
};

export default NotifyTemplateUpdateContainer;