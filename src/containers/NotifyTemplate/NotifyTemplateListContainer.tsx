import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LimitButton from '../../components/Commons/LimitSelectBox';
import Pagination from '../../components/Commons/TablePagination';
import MainLayout from '../../components/Layout/MainLayout';
import NotifyTemplateList from '../../components/NotifyTemplate/NotifyTemplateList';
import useDebounce from '../../lib/useDebounce';
import { RootState } from '../../stores';
import { setBreadcrumbListAction } from '../../stores/breadcrumb';
import { changePreview } from '../../stores/notifyTemplate';
import { initialize, listNotifyTemplateListAction, setCurrentPageNumberAction, setFilterItemAction, setInitFilterItemAction, setPaginationItemAction } from '../../stores/notifyTemplateList';
import { notifyTemplateListState } from '../../types/notifyTemplate';
import HotelNotifyTemplateListContainer from '../HotelNotify/HotelNotifyTemplateListContainer';
import NotifyTemplateCreateContainer from './NotifyTemplateCreateContainer';
import NotifyTemplateDeleteContainer from './NotifyTemplateDeleteContainer';
import NotifyTemplatePreviewContainer from './NotifyTemplatePreviewContainer';
import NotifyTemplateUpdateContainer from './NotifyTemplateUpdateContainer';

/* styled */
const FormCard = styled.article`
    width: 100%;
    position: relative;
`;
const ContentTitle2 = styled.div`
display: flex;
padding: 0.625rem 1.875rem;
margin-left: -1.875rem;
margin-bottom: 0.625rem;
width: 100%;
height: 2rem;
font-weight: bold;
position: relative;
background: #ffffff;

  h1,
  h2 {
    cursor: default;
    margin: 0;
    line-height: 2rem;
  }
`;
const NotifyTemplateListContainer = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { notifyTemplateListTotal, notifyTemplateListItems, notifyTemplateError, currentPageNumber, paginationItem, filterItem, homeMenuItem, userRole } = useSelector(({ notifyTemplateList, breadcrumb, header }:RootState) => ({
      notifyTemplateListTotal: notifyTemplateList.notifyTemplateListTotal,
      notifyTemplateListItems: notifyTemplateList.notifyTemplateListItems,
      notifyTemplateError: notifyTemplateList.notifyTemplateListError,
      currentPageNumber: notifyTemplateList.currentPageNumber,
      paginationItem: notifyTemplateList.paginationItem,
      filterItem: notifyTemplateList.filterItem,
      homeMenuItem: breadcrumb.homeMenuItem,
      userRole: header.userRole,
  }));
  const [ isDebounce, setIsDebounce ] = useState<boolean>(false); //???????????? ?????? ????????? ?????? ??????
  const [ isOpenNotifyTemplatePreviewModal, setIsOpenNotifyTemplatePreviewModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateCreateModal, setIsOpenNotifyTemplateCreateModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateUpdateModal, setIsOpenNotifyTemplateUpdateModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateDeleteModal, setIsOpenNotifyTemplateDeleteModal ] = useState<boolean>(false);
  const [ selectedTemplateId, setSelectedTemplateId ] = useState<string>('');

  //MainLayout - refresh???
  const changeHotel = useCallback(() => {
    dispatch(initialize()); //templateList ????????? ?????????
  }, [dispatch]);

  const handleListNotifyTemplate = useCallback(() => {
    dispatch(listNotifyTemplateListAction({...filterItem, ...paginationItem}));
  }, [dispatch, filterItem, paginationItem]);

  
    //?????? ?????????
  const handleFilter =  useCallback((targetItem:any, isDebounce:boolean) => {
    setIsDebounce(isDebounce); //???????????? ????????? ?????? ?????? Component?????? ????????? ?????????
    dispatch(setFilterItemAction({...filterItem, ...targetItem}));
  }, [dispatch, filterItem]);

  //?????? ????????? ??????
  const handleinitFilter = useCallback(() => {
    dispatch(setInitFilterItemAction());
  },[dispatch]);

  //???????????? ?????????
  const handleTemplateDetail = useCallback((templateId:string) => {
    navigation(`/notify_template/${templateId}`);
  },[navigation]);

  //?????? ????????? (????????????)
  const handleModalPreview = useCallback((template:string, templateAlt:string, dateFormat:string, locale:string) => {
    dispatch(changePreview({template, templateAlt, dateFormat, locale}));
    setIsOpenNotifyTemplatePreviewModal(true);
  },[dispatch]);

  //?????? ?????????
  const handleModal = useCallback((modalFlag:string, templateId:string, desc:string) => {
    if(modalFlag === 'create'){
      setIsOpenNotifyTemplateCreateModal(true)
    }
    if(modalFlag === 'update'){
      setSelectedTemplateId(templateId);
      setIsOpenNotifyTemplateUpdateModal(true);
    }
    if(modalFlag === 'delete'){
      setSelectedTemplateId(templateId);
      setIsOpenNotifyTemplateDeleteModal(true);
    }
  },[]);

  //?????? ????????? ???????????? ??????
  const handleCurrentPageNumber = useCallback((currentPageNumber:number) => {
      dispatch(setCurrentPageNumberAction({currentPageNumber}));
  }, [dispatch]);

  //????????? ???????????? ??????
  const handlePaginationItem = useCallback((paginationItem:notifyTemplateListState['paginationItem']) => {
      dispatch(setPaginationItemAction({paginationItem}));
  }, [dispatch]);

  //?????????????????? ??????
  const changePagination = useCallback((pageNumber:number) => {
      handleCurrentPageNumber(pageNumber);
      handlePaginationItem({
        ...paginationItem,
        offset: (pageNumber - 1) * paginationItem.limit,
      });
  },[handleCurrentPageNumber, handlePaginationItem, paginationItem]);

  //?????? ?????????
  const changeLimit = useCallback((limit:number) => {
      handleCurrentPageNumber(1);
      handlePaginationItem({
          offset: 0,
          limit,
      });
  },[handleCurrentPageNumber, handlePaginationItem]);

  //???????????? ????????? ??????
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebounce = useCallback(
    useDebounce((handleListNotifyTemplate) => handleListNotifyTemplate(), 300) //0.3??? ?????? ????????? ??? ?????? ??????
  ,[]);

  useEffect(() => {
    try {
      !isDebounce? handleListNotifyTemplate() : handleDebounce(handleListNotifyTemplate); //???????????? ??????
    } catch (error) {
      throw error;
    }
  }, [handleListNotifyTemplate, isDebounce, handleDebounce]);

  useEffect(() => {
    dispatch(setBreadcrumbListAction([{
      title: '?????? ????????? ??????',
      isLink: true,
      path: '/notify_template',
    }]));
  }, [dispatch]);

  useEffect(() => {
    if(notifyTemplateError){
      if(notifyTemplateError.response.data.code === 401 || notifyTemplateError.response.data.code === 419){
        localStorage.clear();
        navigation('/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[notifyTemplateError]);

  return (
    <Fragment>
      <MainLayout
        refresh={changeHotel}
        ContentBody={(
          <>
          <ContentTitle2>
            <h1>{homeMenuItem === 'template'? '?????? ????????? ??????' : '?????? ?????? ????????? ??????'}</h1>
            {/* <FontAwesomeIcon icon={faFilter} className={`filter-link ${isFilter? 'filter-on' : ''}`} onClick={() => setIsFilter(!isFilter)}/> */}
          </ContentTitle2>
          <FormCard hidden={homeMenuItem !== 'template'}>
            <NotifyTemplateList
              notifyTemplateListItems={notifyTemplateListItems}
              filterItem={filterItem}
              userRole={userRole}
              handleFilter={handleFilter}
              handleinitFilter={handleinitFilter}
              handleModal={handleModal}
              handleModalPreview={handleModalPreview}
              handleTemplateDetail={handleTemplateDetail}
            />
            <LimitButton
              currentLimit={paginationItem.limit}
              changeLimit={changeLimit}
            />
            <Pagination
              total={notifyTemplateListTotal}
              index={currentPageNumber}
              limit={paginationItem.limit}
              indexChange={changePagination}
            />
          </FormCard>
          <FormCard hidden={homeMenuItem !== 'hotelnotify'}>
            <HotelNotifyTemplateListContainer
              isOpen={homeMenuItem === 'hotelnotify'}
            />
          </FormCard>
          <NotifyTemplatePreviewContainer
            isOpen={isOpenNotifyTemplatePreviewModal}
            toggle={() => setIsOpenNotifyTemplatePreviewModal(!isOpenNotifyTemplatePreviewModal)}
          />
          <NotifyTemplateCreateContainer
            isOpen={isOpenNotifyTemplateCreateModal}
            toggle={() => setIsOpenNotifyTemplateCreateModal(!isOpenNotifyTemplateCreateModal)}
            reload={() => handleListNotifyTemplate()}
          />
          <NotifyTemplateDeleteContainer
            isOpen={isOpenNotifyTemplateDeleteModal}
            toggle={() => setIsOpenNotifyTemplateDeleteModal(!isOpenNotifyTemplateDeleteModal)}
            reload={() => handleListNotifyTemplate()}
            templateId={selectedTemplateId}
          />
          <NotifyTemplateUpdateContainer
            isOpen={isOpenNotifyTemplateUpdateModal}
            toggle={() => setIsOpenNotifyTemplateUpdateModal(!isOpenNotifyTemplateUpdateModal)}
            reload={() => handleListNotifyTemplate()}
            templateId={selectedTemplateId}
          />
          </>
        )}
      />
    </Fragment>
  );
}

export default NotifyTemplateListContainer;