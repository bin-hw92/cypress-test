import _ from 'lodash';
import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import HotelNotifyTemplateCreate from '../../components/HotelNotify/HotelNotifyTemplateCreate';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { listHotelAction } from '../../stores/hotelList';
import { changeField, changeResult, createhotelnotifyAction, initialize } from '../../stores/hotelnotify';
import { listHotelNotifyContextAction } from '../../stores/hotelnotifyList';
import { changeField as changeFieldTemplate, changePreview, initialize as initializeTemplate } from '../../stores/notifyTemplate';
import { listNotifyTemplateListAction } from '../../stores/notifyTemplateList';
import { HotelNotifyTemplateCreateContainerProps } from '../../types/hotelnotify';
import NotifyTemplatePreviewContainer from '../NotifyTemplate/NotifyTemplatePreviewContainer';

const HotelNotifyTemplateCreateContainer = ({
  isOpen,
  toggle,
  reload,
  hotelId,
}:HotelNotifyTemplateCreateContainerProps) => {
  const dispatch = useDispatch();
  const { hotelnotifyItems, hotelnotifySuccess, hotelnotifyError, hotelListItems, notifyTemplateItem, hotelNotifyTemplateContextItems, notifyTemplateListItems } = useSelector(({ hotelnotify, notifyTemplate, hotelList, hotelnotifyList, notifyTemplateList }:RootState) => ({
        hotelnotifyItems: hotelnotify.hotelnotify,
        hotelnotifySuccess: hotelnotify.hotelnotifyCreateSuccess, 
        hotelnotifyError: hotelnotify.hotelnotifyCreateError,
        hotelListItems: hotelList.hotelListItems,
        notifyTemplateItem: notifyTemplate.notifyTemplate, //템플릿 정보
        hotelNotifyTemplateContextItems: hotelnotifyList.hotelNotifyTemplateContextItems,
        notifyTemplateListItems: notifyTemplateList.notifyTemplateListItems,
  }));
  const [ isOpenNotifyTemplatePreviewModal, setIsOpenNotifyTemplatePreviewModal ] = useState<boolean>(false);
  const [ isOpenHotelNotifyTemplateCreateSuccessModal, setIsOpenHotelNotifyTemplateCreateSuccessModal ] = useState<boolean>(false);
  const [ isOpenHotelNotifyTemplateCreateFailModal, setIsOpenHotelNotifyTemplateCreateFailModal ] = useState<boolean>(false);
  const [ messageHotelNotifyTemplateCreateFail, setMessageHotelNotifyTemplateCreateFail ] = useState<string>('');

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

  const handleListHotel = useCallback(() => {
    dispatch(listHotelAction({}));
  },[dispatch]);

  const handleListHotelNotifyTemplateContext = useCallback(() => {
    dispatch(listHotelNotifyContextAction({}));
  },[dispatch]);

  const handleListNotifyTemplate = useCallback(() => {
    dispatch(listNotifyTemplateListAction({}));
  },[dispatch]);

  const handleSelectNotifyTemplate = useCallback((notifyTemplateId:string) => {
    dispatch(
      changeField({
          key: 'notifyTemplateId',
          value: notifyTemplateId,
      })
    );
    const foundNotifyTemplate = _.find(notifyTemplateListItems, ['id', parseInt(notifyTemplateId)]);
    if(foundNotifyTemplate){
      dispatch(changeFieldTemplate({
        key: 'template',
        value: foundNotifyTemplate.template,
      }));
      dispatch(changeFieldTemplate({
        key: 'template_alt',
        value: foundNotifyTemplate.template_alt? foundNotifyTemplate.template_alt : '',
      }));
      dispatch(changeFieldTemplate({
        key: 'date_format',
        value: foundNotifyTemplate.date_format? foundNotifyTemplate.date_format : '',
      }));
      dispatch(changeFieldTemplate({
        key: 'locale',
        value: foundNotifyTemplate.locale? foundNotifyTemplate.locale : '',
      }));
    }
  },[dispatch, notifyTemplateListItems]);

  const handlePreviewNotifyTemplate = () => {
    setIsOpenNotifyTemplatePreviewModal(true);
    dispatch(changePreview(notifyTemplateItem));
  };

  const handleCreateHotelNotifyTemplate = useCallback(() => {
    dispatch(createhotelnotifyAction({...hotelnotifyItems, hotelId: hotelId? hotelId : hotelnotifyItems.hotelId}));
  },[dispatch, hotelId, hotelnotifyItems]);

  useEffect(() => {
    if(hotelnotifyError){
      if (!hotelnotifyError.response) setMessageHotelNotifyTemplateCreateFail(hotelnotifyError.message);
      else setMessageHotelNotifyTemplateCreateFail(`${hotelnotifyError.response.data.code}, ${hotelnotifyError.response.data.message}`);

      if(hotelnotifyError.response.data.code === 401 || hotelnotifyError.response.data.code === 419) reload();
      else setIsOpenHotelNotifyTemplateCreateFailModal(true);
      dispatch(
        changeResult({
          key: 'hotelnotifyCreateError',
          value: null,
        })
      );
    }
    if(hotelnotifySuccess){
      toggle();
      setIsOpenHotelNotifyTemplateCreateSuccessModal(true);
      setTimeout(() => {
        setIsOpenHotelNotifyTemplateCreateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(initialize());
    }
  },[hotelnotifySuccess, hotelnotifyError, toggle, reload, dispatch]);


  useEffect(() => {
    if (isOpen){
      dispatch(initialize()); //단지 템플릿 초기화
      dispatch(initializeTemplate()); //전체 알림 템플릿 초기화
      handleListHotel();
      handleListHotelNotifyTemplateContext();
      handleListNotifyTemplate();
    } 
  }, [dispatch, handleListHotel, handleListHotelNotifyTemplateContext, handleListNotifyTemplate, isOpen]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <HotelNotifyTemplateCreate 
              hotelId={hotelId}
              hotelnotifyItems={hotelnotifyItems}
              notifyTemplateItem={notifyTemplateItem}
              hotelListItems={hotelListItems}
              hotelNotifyTemplateContextItems={hotelNotifyTemplateContextItems}
              notifyTemplateListItems={notifyTemplateListItems}
              handleChange={handleChange}
              handleCreateHotelNotifyTemplate={handleCreateHotelNotifyTemplate}
              handlePreviewNotifyTemplate={handlePreviewNotifyTemplate}
              handleSelectNotifyTemplate={handleSelectNotifyTemplate}
              toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenHotelNotifyTemplateCreateSuccessModal}
        toggle={() => setIsOpenHotelNotifyTemplateCreateSuccessModal(!isOpenHotelNotifyTemplateCreateSuccessModal)}
        message='단지 알림 템플릿 생성이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenHotelNotifyTemplateCreateFailModal}
        toggle={() => setIsOpenHotelNotifyTemplateCreateFailModal(!isOpenHotelNotifyTemplateCreateFailModal)}
        message={messageHotelNotifyTemplateCreateFail || '단지 알림 템플릿 생성에 실패 하였습니다.'}
      />
      <NotifyTemplatePreviewContainer
        isOpen={isOpenNotifyTemplatePreviewModal}
        toggle={() => setIsOpenNotifyTemplatePreviewModal(!isOpenNotifyTemplatePreviewModal)}
      />
    </Fragment>
  );
};

export default HotelNotifyTemplateCreateContainer;