import _ from 'lodash';
import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LimitButton from '../../components/Commons/LimitSelectBox';
import Pagination from '../../components/Commons/TablePagination';
import HotelNotifyTemplateList from '../../components/HotelNotify/HotelNotifyTemplateList';
import useDebounce from '../../lib/useDebounce';
import { RootState } from '../../stores';
import { listHotelNotifyAction, listHotelNotifyContextAction, setCurrentPageNumberAction, setFilterItemAction, setInitFilterItemAction, setPaginationItemAction } from '../../stores/hotelnotifyList';
import { changePreview } from '../../stores/notifyTemplate';
import { hotelnotifyListState, HotelNotifyTemplateListContainerProps } from '../../types/hotelnotify';
import NotifyTemplatePreviewContainer from '../NotifyTemplate/NotifyTemplatePreviewContainer';
import HotelNotifyTemplateCreateContainer from './HotelNotifyTemplateCreateContainer';
import HotelNotifyTemplateDeleteContainer from './HotelNotifyTemplateDeleteContainer';

/* styled */
const FormCard = styled.article`
    width: 100%;
    position: relative;
`;

const HotelNotifyTemplateListContainer = ({
  isOpen,
  isOpenHotel
}:HotelNotifyTemplateListContainerProps) => {
  const navigation = useNavigate();
  const hotelId = localStorage.getItem('hotel_id');
  const dispatch = useDispatch();
  const { hotelNotifyTemplateListTotal, hotelNotifyTemplateListItems, hotelNotifyTemplateContextItems, hotelNotifyError, currentPageNumber, paginationItem, filterItem, userRole } = useSelector(({ hotelnotifyList, header }:RootState) => ({
      hotelNotifyTemplateListTotal: hotelnotifyList.hotelNotifyTemplateListTotal,
      hotelNotifyTemplateListItems: hotelnotifyList.hotelNotifyTemplateListItems,
      hotelNotifyTemplateContextItems: hotelnotifyList.hotelNotifyTemplateContextItems, 
      hotelNotifyError: hotelnotifyList.hotelNotifyTemplateListError,
      currentPageNumber: hotelnotifyList.currentPageNumber,
      paginationItem: hotelnotifyList.paginationItem,
      filterItem: hotelnotifyList.filterItem,
      userRole: header.userRole,
  }));
  const [ isDebounce, setIsDebounce ] = useState<boolean>(false); //디바운싱 사용 구분을 위해 추가
  const [ isOpenNotifyTemplatePreviewModal, setIsOpenNotifyTemplatePreviewModal ] = useState<boolean>(false);
  const [ isOpenNotifyTemplateCreateModal, setIsOpenNotifyTemplateCreateModal ] = useState<boolean>(false);
  const [ isOpenHotelNotifyTemplateDeleteModal, setIsOpenHotelNotifyTemplateDeleteModal ] = useState<boolean>(false);
  const [ selectedHotelTemplateId, setSelectedHotelTemplateId ] = useState<string>('');

  const handleListHotelNotifyTemplate = useCallback(() => {
    if(isOpenHotel && hotelId){
      dispatch(listHotelNotifyAction({hotelId, ...filterItem, ...paginationItem}));
    }else {
      dispatch(listHotelNotifyAction({...filterItem, ...paginationItem}));
    }
  }, [dispatch, filterItem, hotelId, isOpenHotel, paginationItem]);

  const handleListHotelNotifyTemplateContext = useCallback(() => {
    dispatch(listHotelNotifyContextAction());
  }, [dispatch]);
  

  //필터 핸들링
  const handleFilter =  useCallback((targetItem:any, isDebounce:boolean) => {
      setIsDebounce(isDebounce); //디바운싱 처리를 위해 하위 Component에서 구분을 받아옴
      dispatch(setFilterItemAction({...filterItem, ...targetItem}));
  }, [dispatch, filterItem]);

  //필터 초기화 버튼
  const handleinitFilter = useCallback(() => {
    dispatch(setInitFilterItemAction());
  },[dispatch]);

  //모달 플래그
  const handleModal = useCallback((modalFlag:string, hotelTemplateId:string) => {
    if(modalFlag === 'create'){
      setIsOpenNotifyTemplateCreateModal(true)
    }
    if(modalFlag === 'delete'){
      setSelectedHotelTemplateId(hotelTemplateId);
      setIsOpenHotelNotifyTemplateDeleteModal(true);
    }
  },[]);

  //모달 플래그 (미리보기)
  const handleModalPreview = useCallback((template:string, templateAlt:string, dateFormat:string, locale:string) => {
      dispatch(changePreview({template, templateAlt, dateFormat, locale}));
      setIsOpenNotifyTemplatePreviewModal(true);
  },[dispatch]);

  //현재 페이지 전역상태 등록
  const handleCurrentPageNumber = useCallback((currentPageNumber:number) => {
      dispatch(setCurrentPageNumberAction({currentPageNumber}));
  }, [dispatch]);

  //페이지 전역상태 등록
  const handlePaginationItem = useCallback((paginationItem:hotelnotifyListState['paginationItem']) => {
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

  const handleNotifyContextFormatter = (notifyContext:any) => {
    const selectedNotifyContext = _.find(hotelNotifyTemplateContextItems, ['code', notifyContext]);
    return selectedNotifyContext ? selectedNotifyContext.display : notifyContext;
  };

  //디바운싱 훅으로 이동
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebounce = useCallback(
    useDebounce((handleListHotelNotifyTemplate) => handleListHotelNotifyTemplate(), 300) //0.3초 동안 미입력 시 함수 실행
  ,[]);

  useEffect(() => {
    try {
      if (isOpen) {
        handleListHotelNotifyTemplateContext();
        !isDebounce? handleListHotelNotifyTemplate() : handleDebounce(handleListHotelNotifyTemplate); //디바운싱 처리
      }
    } catch (error) {
      throw error;
    }
  }, [isOpen, isDebounce, handleDebounce, handleListHotelNotifyTemplateContext, handleListHotelNotifyTemplate]);
      
  useEffect(() => {
    if(hotelNotifyError){
      if(hotelNotifyError.response.data.code === 401 || hotelNotifyError.response.data.code === 419){
          localStorage.clear();
          navigation('/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[hotelNotifyError]);

  return (
    <Fragment>
      <FormCard theme={isOpenHotel? 'O' : 'X'}>
        <HotelNotifyTemplateList
          hotelNotifyTemplateListItems={hotelNotifyTemplateListItems}
          hotelNotifyTemplateContextItems={hotelNotifyTemplateContextItems}
          filterItem={filterItem}
          userRole={userRole}
          handleFilter={handleFilter}
          handleinitFilter={handleinitFilter}
          handleModal={handleModal}
          handleModalPreview={handleModalPreview}
          handleNotifyContextFormatter={handleNotifyContextFormatter}
        />
        <LimitButton
          currentLimit={paginationItem.limit}
          changeLimit={changeLimit}
        />
        <Pagination
          total={hotelNotifyTemplateListTotal}
          index={currentPageNumber}
          limit={paginationItem.limit}
          indexChange={changePagination}
        />
      </FormCard>
      
      <NotifyTemplatePreviewContainer
        isOpen={isOpenNotifyTemplatePreviewModal}
        toggle={() => setIsOpenNotifyTemplatePreviewModal(!isOpenNotifyTemplatePreviewModal)}
      />
      <HotelNotifyTemplateCreateContainer
        isOpen={isOpenNotifyTemplateCreateModal}
        toggle={() => setIsOpenNotifyTemplateCreateModal(!isOpenNotifyTemplateCreateModal)}
        reload={() => handleListHotelNotifyTemplate()}
        hotelId={hotelId}
      />
      <HotelNotifyTemplateDeleteContainer
        isOpen={isOpenHotelNotifyTemplateDeleteModal}
        toggle={() => setIsOpenHotelNotifyTemplateDeleteModal(!isOpenHotelNotifyTemplateDeleteModal)}
        reload={() => handleListHotelNotifyTemplate()}
        hotelTemplateId={selectedHotelTemplateId}
      />
    </Fragment>
  );
}

export default HotelNotifyTemplateListContainer;