import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainLayout from '../../components/Layout/MainLayout';
import HotelList from '../../components/Hotel/HotelList';
import useDebounce from '../../lib/useDebounce';
import { RootState } from '../../stores';
import { setHeaderItemAction } from '../../stores/header';
import { initialize, listHotelAction, setCurrentPageNumberAction, setFilterItemAction, setInitFilterItemAction, setPaginationItemAction } from '../../stores/hotelList';
import { initialize as floorInitialize } from '../../stores/floorList';
import { initialize as buildingInitialize } from '../../stores/buildingList';
import { initialize as roomInitialize } from '../../stores/roomList';
import { setBreadcrumbListAction, setMenuItemAction, initialize as initializeBread } from '../../stores/breadcrumb';
import LimitButton from '../../components/Commons/LimitSelectBox';
import Pagination from '../../components/Commons/TablePagination';
import { useNavigate } from 'react-router-dom';
import HotelCreateContainer from './HotelCreateContainer';
import HotelDeleteContainer from './HotelDeleteContainer';
import HotelUpdateContainer from './HotelUpdateContainer';
import { HotelListState } from '../../types/hotel';
import styled from 'styled-components';

/* Styled */
const ContentTitle2 = styled.div`
  display: flex;
  padding: 0.625rem 1.875rem;
  margin-left: -1.875rem;
  margin-bottom: 0.625rem;
  width: 100%;
  font-weight: bold;
  position: relative;
  height: 2rem;
  background: #ffffff;

  h1,
  h2 {
    cursor: default;
    margin: 0;
    font-size: 1.125rem;
    line-height: 2rem;
  }
`;

const HotelListContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { hotelListTotal, hotelListItems, currentPageNumber, paginationItem, filterItem, hotelError, userRole } = useSelector(({ hotelList, header }:RootState) => ({
    hotelListTotal: hotelList.hotelListTotal,
    hotelListItems: hotelList.hotelListItems,
    currentPageNumber: hotelList.currentPageNumber,
    paginationItem: hotelList.paginationItem,
    filterItem: hotelList.filterItem,
    hotelError: hotelList.hotelListError,
    userRole: header.userRole,
  }));
  const [ isDebounce, setIsDebounce ] = useState<boolean>(false); //???????????? ?????? ????????? ?????? ??????
  const [ isOpenHotelCreateModal, setIsOpenHotelCreateModal ] = useState<boolean>(false); //?????? ?????? ??????
  const [ isOpenHotelUpdateModal, setIsOpenHotelUpdateModal ] = useState<boolean>(false); //?????? ?????? ??????
  const [ isOpenHotelDeleteModal, setIsOpenHotelDeleteModal ] = useState<boolean>(false); //?????? ?????? ??????
  const [ selectedHotelName, setSelectedHotelName ] = useState<string>(''); //?????? ??????

  /* ????????? */
  //?????? ??????
  const handleListHotel = useCallback(() => {
    dispatch(listHotelAction({...filterItem, ...paginationItem}));
  }, [dispatch, filterItem, paginationItem]);

  //MainLayout - refresh
  const changeHotel = useCallback(() => {
    dispatch(initialize());
  }, [dispatch]);

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
  const handleHotelDetail = useCallback((hotelId:string, role:string) => {
    localStorage.setItem('hotel_id', hotelId);
    if(role === 'master') dispatch(setMenuItemAction({menuItem: 'hotel'}));
    else dispatch(setMenuItemAction({menuItem: 'dashboard'}));
    dispatch(setHeaderItemAction({
      key: 'hotelRole',
      value: role,
    }));
    return navigation(`/hotel/${hotelId}`);
  },[navigation, dispatch]);

  //?????? ?????????
  const handleModal = useCallback((modalFlag:string, hotelId:string, hotelName:string) => {
    if(modalFlag === 'create'){
      setIsOpenHotelCreateModal(true)
    }
    if(modalFlag === 'update'){
      localStorage.setItem('hotel_id', hotelId);
      setIsOpenHotelUpdateModal(true);
    }
    if(modalFlag === 'delete'){
      localStorage.setItem('hotel_id', hotelId);
      setSelectedHotelName(hotelName);
      setIsOpenHotelDeleteModal(true);
    }
  },[]);

  //?????? ????????? ???????????? ??????
  const handleCurrentPageNumber = useCallback((currentPageNumber:number) => {
    dispatch(setCurrentPageNumberAction({currentPageNumber}));
  }, [dispatch]);

  //????????? ???????????? ??????
  const handlePaginationItem = useCallback((paginationItem:HotelListState['paginationItem']) => {
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

  //?????????
  const initHotel = useCallback(() => {
    localStorage.removeItem('hotel_id');
    dispatch(setHeaderItemAction({
      key: 'hotelRole',
      value: '',
    }));
  }, [dispatch]);

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
    useDebounce((handleListHotel) => handleListHotel(), 300) //0.3??? ?????? ????????? ??? ?????? ??????
  ,[]);

  //?????? ?????? ?????? ?????? ?????? ?????? ??? ?????????
  const MenuAllinit = useCallback(() => {
    dispatch(buildingInitialize());
    dispatch(floorInitialize());
    dispatch(roomInitialize());
  },[dispatch]);

  useEffect(() => {
    if (localStorage.getItem('hotel_id')) initHotel();
    !isDebounce? handleListHotel() : handleDebounce(handleListHotel); //???????????? ??????
  }, [initHotel, handleListHotel, isDebounce, handleDebounce]);

  useEffect(() => {
    dispatch(initializeBread());
    dispatch(setBreadcrumbListAction([{
      title: '?????? ??????',
      isLink: true,
      path: '/hotel',
    }]));
    MenuAllinit();
  }, [MenuAllinit, dispatch]);

  useEffect(() => {
    if(hotelError){
      if(hotelError.response.data.code === 401 || hotelError.response.data.code === 419){
        localStorage.clear();
        navigation('/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[hotelError]);
  
  return (
    <Fragment>
      <MainLayout
        refresh={changeHotel}
        ContentBody={(
          <>
          <ContentTitle2>
            <h1>?????? ??????</h1>
          </ContentTitle2>
          <HotelList
            hotelListItems={hotelListItems}
            filterItem={filterItem}
            userRole={userRole}
            handleFilter={handleFilter}
            handleinitFilter={handleinitFilter}
            handleHotelDetail={handleHotelDetail}
            handleModal={handleModal}
          />
          <LimitButton
            currentLimit={paginationItem.limit}
            changeLimit={changeLimit}
          />
          <Pagination
            total={hotelListTotal}
            index={currentPageNumber}
            limit={paginationItem.limit}
            indexChange={changePagination}
          />
        <HotelCreateContainer
          isOpen={isOpenHotelCreateModal}
          toggle={() => setIsOpenHotelCreateModal(!isOpenHotelCreateModal)}
          reload={() => handleListHotel()} 
        />
        <HotelUpdateContainer
          isOpen={isOpenHotelUpdateModal}
          toggle={() => setIsOpenHotelUpdateModal(!isOpenHotelUpdateModal)}
          reload={() => handleListHotel()}
        /> 
        <HotelDeleteContainer
          isOpen={isOpenHotelDeleteModal}
          toggle={() => setIsOpenHotelDeleteModal(!isOpenHotelDeleteModal)}
          reload={() => handleListHotel()}
          hotelName={selectedHotelName}
        />
          </>
        )}
      />
    </Fragment>
  );
}

export default HotelListContainer;