import React, { Fragment, useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NotifyTemplateDeleteContainer from './NotifyTemplateDeleteContainer';
import NotifyTemplatePreviewContainer from './NotifyTemplatePreviewContainer';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import MainLayout from '../../components/Layout/MainLayout';
import NotifyTemplateDetail from '../../components/NotifyTemplate/NotifyTemplateDetail';
import { RootState } from '../../stores';
import { useNavigate, useParams } from 'react-router-dom';
import { changeField, changePreview, changeResult, selectnotifyTemplateAction, updatenotifyTemplateAction } from '../../stores/notifyTemplate';
import { setBreadcrumbListAction } from '../../stores/breadcrumb';
import _ from 'lodash';

const NotifyTemplateDetailContainer = () => {
  const param = useParams();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { notifyTemplateItem, notifyTemplateSuccess, notifyTemplateError, breadcrumbItems, userRole } = useSelector(({ notifyTemplate, breadcrumb, header }:RootState) => ({
      notifyTemplateItem: notifyTemplate.notifyTemplate,
      notifyTemplateSuccess: notifyTemplate.notifyTemplateUpdateSuccess,
      notifyTemplateError: notifyTemplate.notifyTemplateUpdateError,
      breadcrumbItems: breadcrumb.breadcrumbItems,
      userRole: header.userRole,
  }));
  const [ isOpenNotifyTemplatePreviewModal, setIsOpenNotifyTemplatePreviewModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateDeleteModal, setIsOpenNotifyTemplateDeleteModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateUpdateSuccessModal, setIsOpenNotifyTemplateUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateUpdateFailModal, setIsOpenNotifyTemplateUpdateFailModal ] = useState<boolean>(false);
  const [ messageNotifyTemplateUpdateFail, setMessageNotifyTemplateUpdateFail ] = useState<string>('');

  const templateId = param.id;


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

  const setBreadcrumbList = useCallback((targetIndex:number, newItem:{title: string, isLink: boolean} ) => {
    let newBreadcrumbItems = Array.from(breadcrumbItems);
    newBreadcrumbItems[targetIndex] = newItem;
    const reducedBreadcrumbItem = _.compact(_.take(newBreadcrumbItems, targetIndex + 1));
    dispatch(setBreadcrumbListAction(reducedBreadcrumbItem));
  },[breadcrumbItems, dispatch]);

  const handleModal = () => {
    setIsOpenNotifyTemplateDeleteModal(true);
  }

  const moveToListPage = () => {
    navigation('/notify_template');
  };

  const handleSelectNotifyTemplate = useCallback(() => {
    if(templateId) dispatch(selectnotifyTemplateAction({templateId}));
  }, [dispatch, templateId]);

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
      
      if(notifyTemplateError.response.data.code === 401 || notifyTemplateError.response.data.code === 419){
        localStorage.clear();
        navigation('/login');
      }else{
        setIsOpenNotifyTemplateUpdateFailModal(true);
      }
      dispatch(
        changeResult({
          key: 'notifyTemplateUpdateError',
          value: null,
        })
      );
      return;
    }
    if(notifyTemplateSuccess){
      setIsOpenNotifyTemplateUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenNotifyTemplateUpdateSuccessModal(false);
        handleSelectNotifyTemplate();
      }, 1500);
      dispatch(
        changeResult({
          key: 'notifyTemplateUpdateSuccess',
          value: false,
        })
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[notifyTemplateSuccess, notifyTemplateError, dispatch, handleSelectNotifyTemplate]);

  useEffect(() => {
    try {
      if (templateId) handleSelectNotifyTemplate();
    } catch (error) {
      throw error;
    }
  }, [templateId, handleSelectNotifyTemplate]);
  
  useEffect(() => {
    if (templateId) setBreadcrumbList(1,{title: templateId, isLink: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  return (
    <Fragment>
      <MainLayout
        refresh={moveToListPage}
        ContentBody={(
          <>
          <NotifyTemplateDetail
              breadcrumbItems={breadcrumbItems}
              notifyTemplateItem={notifyTemplateItem}
              templateId={templateId}
              userRole={userRole}
              handleChange={handleChange}
              handleModal={handleModal}
              moveToListPage={moveToListPage}
              handleSelectNotifyTemplate={handleSelectNotifyTemplate}
              handleUpdateNotifyTemplate={handleUpdateNotifyTemplate}
              handlePreviewNotifyTemplate={handlePreviewNotifyTemplate}
          />
          <NotifyTemplatePreviewContainer
            isOpen={isOpenNotifyTemplatePreviewModal}
            toggle={() => setIsOpenNotifyTemplatePreviewModal(!isOpenNotifyTemplatePreviewModal)}
          />
          <NotifyTemplateDeleteContainer
            isOpen={isOpenNotifyTemplateDeleteModal}
            toggle={() => setIsOpenNotifyTemplateDeleteModal(!isOpenNotifyTemplateDeleteModal)}
            reload={() => moveToListPage()}
            templateId={templateId? templateId : ''}
          />
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
          </>
        )}
      />
    </Fragment>
  );
}

export default NotifyTemplateDetailContainer;