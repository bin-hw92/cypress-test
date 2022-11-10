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
  const [ isDebounce, setIsDebounce ] = useState<boolean>(false); //디바운싱 사용 구분을 위해 추가
  const [ isOpenNotifyTemplatePreviewModal, setIsOpenNotifyTemplatePreviewModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateCreateModal, setIsOpenNotifyTemplateCreateModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateUpdateModal, setIsOpenNotifyTemplateUpdateModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateDeleteModal, setIsOpenNotifyTemplateDeleteModal ] = useState<boolean>(false);
  const [ selectedTemplateId, setSelectedTemplateId ] = useState<string>('');

  //MainLayout - refresh용
  const changeHotel = useCallback(() => {
    dispatch(initialize()); //templateList 기본값 초기화
  }, [dispatch]);

  const handleListNotifyTemplate = useCallback(() => {
    dispatch(listNotifyTemplateListAction({...filterItem, ...paginationItem}));
  }, [dispatch, filterItem, paginationItem]);

  
    //필터 핸들링
  const handleFilter =  useCallback((targetItem:any, isDebounce:boolean) => {
    setIsDebounce(isDebounce); //디바운싱 처리를 위해 하위 Component에서 구분을 받아옴
    dispatch(setFilterItemAction({...filterItem, ...targetItem}));
  }, [dispatch, filterItem]);

  //필터 초기화 버튼
  const handleinitFilter = useCallback(() => {
    dispatch(setInitFilterItemAction());
  },[dispatch]);

  //상세화면 이동용
  const handleTemplateDetail = useCallback((templateId:string) => {
    navigation(`/notify_template/${templateId}`);
  },[navigation]);

  //모달 플래그 (미리보기)
  const handleModalPreview = useCallback((template:string, templateAlt:string, dateFormat:string, locale:string) => {
    dispatch(changePreview({template, templateAlt, dateFormat, locale}));
    setIsOpenNotifyTemplatePreviewModal(true);
  },[dispatch]);

  //모달 플래그
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

  //현재 페이지 전역상태 등록
  const handleCurrentPageNumber = useCallback((currentPageNumber:number) => {
      dispatch(setCurrentPageNumberAction({currentPageNumber}));
  }, [dispatch]);

  //페이지 전역상태 등록
  const handlePaginationItem = useCallback((paginationItem:notifyTemplateListState['paginationItem']) => {
      dispatch(setPaginationItemAction({paginationItem}));
  }, [dispatch]);

  //페이지네이션 이동
  const changePagination = useCallback((pageNumber:number) => {
      handleCurrentPageNumber(pageNumber);
      handlePaginationItem({
        ...paginationItem,
        offset: (pageNumber - 1) * paginationItem.limit,
      });
  },[handleCurrentPageNumber, handlePaginationItem, paginationItem]);

  //목록 리미트
  const changeLimit = useCallback((limit:number) => {
      handleCurrentPageNumber(1);
      handlePaginationItem({
          offset: 0,
          limit,
      });
  },[handleCurrentPageNumber, handlePaginationItem]);

  //디바운싱 훅으로 이동
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebounce = useCallback(
    useDebounce((handleListNotifyTemplate) => handleListNotifyTemplate(), 300) //0.3초 동안 미입력 시 함수 실행
  ,[]);

  useEffect(() => {
    try {
      !isDebounce? handleListNotifyTemplate() : handleDebounce(handleListNotifyTemplate); //디바운싱 처리
    } catch (error) {
      throw error;
    }
  }, [handleListNotifyTemplate, isDebounce, handleDebounce]);

  useEffect(() => {
    dispatch(setBreadcrumbListAction([{
      title: '알림 템플릿 목록',
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
            <h1>{homeMenuItem === 'template'? '알림 템플릿 목록' : '단지 알림 템플릿 목록'}</h1>
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