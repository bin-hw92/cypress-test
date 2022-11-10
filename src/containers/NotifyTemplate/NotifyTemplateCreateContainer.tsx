import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import NotifyTemplateCreate from '../../components/NotifyTemplate/NotifyTemplateCreate';
import { RootState } from '../../stores';
import { changeField, changePreview, changeResult, createnotifyTemplateAction, initialize } from '../../stores/notifyTemplate';
import { NotifyTemplateCreateContainerProps } from '../../types/notifyTemplate';
import NotifyTemplatePreviewContainer from './NotifyTemplatePreviewContainer';

const NotifyTemplateCreateContainer = ({
  isOpen,
  toggle,
  reload,
}:NotifyTemplateCreateContainerProps) => {
  const dispatch = useDispatch();
  const { notifyTemplateItem, notifyTemplateSuccess, notifyTemplateError } = useSelector(({ notifyTemplate }:RootState) => ({
    notifyTemplateItem: notifyTemplate.notifyTemplate,
    notifyTemplateSuccess: notifyTemplate.notifyTemplateCreateSuccess,
    notifyTemplateError: notifyTemplate.notifyTemplateCreateError,
  }));
  const [ isOpenNotifyTemplatePreviewModal, setIsOpenNotifyTemplatePreviewModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateCreateSuccessModal, setIsOpenNotifyTemplateCreateSuccessModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateCreateFailModal, setIsOpenNotifyTemplateCreateFailModal ] = useState<boolean>(false);
  const [ messageNotifyTemplateCreateFail, setMessageNotifyTemplateCreateFail ] = useState<string>('');

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

  const handleCreateNotifyTemplate = useCallback(() => {
    dispatch(createnotifyTemplateAction({...notifyTemplateItem}));
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
      if (!notifyTemplateError.response) setMessageNotifyTemplateCreateFail(notifyTemplateError.message);
      else setMessageNotifyTemplateCreateFail(`${notifyTemplateError.response.data.code}, ${notifyTemplateError.response.data.message}`);

      if(notifyTemplateError.response.data.code === 401 || notifyTemplateError.response.data.code === 419) reload();
      else setIsOpenNotifyTemplateCreateFailModal(true);
      dispatch(
        changeResult({
          key: 'notifyTemplateCreateError',
          value: null,
        })
      );
      return;
    }
    if(notifyTemplateSuccess){
      toggle();
      setIsOpenNotifyTemplateCreateSuccessModal(true);
      setTimeout(() => {
        setIsOpenNotifyTemplateCreateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'notifyTemplateCreateSuccess',
          value: false,
        })
      );
    }
  },[notifyTemplateSuccess, notifyTemplateError, dispatch, toggle, reload]);

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
          <NotifyTemplateCreate 
              notifyTemplateItem={notifyTemplateItem}
              handleChange={handleChange}
              handlePreviewNotifyTemplate={handlePreviewNotifyTemplate}
              handleCreateNotifyTemplate={handleCreateNotifyTemplate}
              toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenNotifyTemplateCreateSuccessModal}
        toggle={() => setIsOpenNotifyTemplateCreateSuccessModal(!isOpenNotifyTemplateCreateSuccessModal)}
        message='알림 템플릿 생성이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenNotifyTemplateCreateFailModal}
        toggle={() => setIsOpenNotifyTemplateCreateFailModal(!isOpenNotifyTemplateCreateFailModal)}
        message={messageNotifyTemplateCreateFail || '알림 템플릿 생성에 실패 하였습니다.'}
      />
      <NotifyTemplatePreviewContainer
        isOpen={isOpenNotifyTemplatePreviewModal}
        toggle={() => setIsOpenNotifyTemplatePreviewModal(!isOpenNotifyTemplatePreviewModal)}
      />
    </Fragment>
  );
};

export default NotifyTemplateCreateContainer;