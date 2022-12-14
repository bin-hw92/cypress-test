import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LimitButton from '../../components/Commons/LimitSelectBox';
import Pagination from '../../components/Commons/TablePagination';
import DoorlockList from '../../components/Doorlock/DoorlockList';
import useDebounce from '../../lib/useDebounce';
import { RootState } from '../../stores';
import { listBuildingAction } from '../../stores/buildingList';
import { listDoorlockAction, setCurrentPageNumberAction, setDetailField, setFilterItemAction, setInitFilterItemAction, setPaginationItemAction, setSortItemAction } from '../../stores/doorlockList';
import { listFloorAction } from '../../stores/floorList';
import { DoorlockListContainerProps, doorlockListState } from '../../types/doorlock';
import DoorlockDetailContainer from './DoorlockDetailContainer';
import DoorlockUninstallContainer from './DoorlockUninstallContainer';

/* styled */
const FormCard = styled.article`
    width: 100%;
    position: relative;
`;

const DoorlockListContainer = ({
  isOpen,
  doorlockView,
  handleViewChange
}:DoorlockListContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { doorlockListTotal, doorlockListItems, doorlockError, currentPageNumber, paginationItem, filterItem, sortItem, floorListItems, buildingListItems, userRole, hotelRole } = useSelector(({ doorlockList, floorList, buildingList, header }:RootState) => ({
    doorlockListTotal: doorlockList.doorlockListTotal,
    doorlockListItems: doorlockList.doorlockListItems,
    doorlockError: doorlockList.doorlockListError,
    currentPageNumber: doorlockList.currentPageNumber,
    paginationItem: doorlockList.paginationItem,
    filterItem: doorlockList.filterItem,
    sortItem:  doorlockList.sortItem,
    floorListItems: floorList.floorListItems,
    buildingListItems: buildingList.buildingListItems,
    userRole: header.userRole,
    hotelRole: header.hotelRole,
  }));
  const [ isDebounce, setIsDebounce ] = useState<boolean>(false); //???????????? ?????? ????????? ?????? ??????
  const [ isOpenDoorlockUninstallModal, setIsOpenDoorlockUninstallModal ] = useState<boolean>(false);
  const [ selectedDoorlockId, setSelectedDoorlockId ] = useState<string>('');
  const [ selectedDoorlockName, setSelectedDoorlockName ] = useState<string>('');

  const handleListBuilding = useCallback(() => {
    dispatch(listBuildingAction({}));
  }, [dispatch]);

  const handleListFloor = useCallback(() => {
    dispatch(listFloorAction({...filterItem}));
  }, [dispatch, filterItem]);

  const handleListDoorlock = useCallback(() => {
    dispatch(listDoorlockAction({...filterItem, ...sortItem, ...paginationItem}));
  }, [dispatch, filterItem, sortItem, paginationItem]);
  
  //?????? ?????????
  const handleFilter =  useCallback((targetItem:any, isDebounce:boolean) => {
      setIsDebounce(isDebounce); //???????????? ????????? ?????? ?????? Component?????? ????????? ?????????
      dispatch(setFilterItemAction({...filterItem, ...targetItem}));
  }, [dispatch, filterItem]);

  //?????? ????????? ??????
  const handleinitFilter = useCallback(() => {
    dispatch(setInitFilterItemAction());
  },[dispatch]);

  //?????? ????????? ???????????? ??????
  const handleCurrentPageNumber = useCallback((currentPageNumber:number) => {
      dispatch(setCurrentPageNumberAction({currentPageNumber}));
  }, [dispatch]);

  //????????? ???????????? ??????
  const handlePaginationItem = useCallback((paginationItem:doorlockListState['paginationItem']) => {
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

  const changeSort = useCallback((sort:string) => {
    if (sortItem.sort === sort) {
      dispatch(setSortItemAction({
        sortItem:{
          ...sortItem,
          order: sortItem.order === 'desc' ? 'asc':'desc',
        }
      }));
    } else {
      dispatch(setSortItemAction({
        sortItem:{
          sort,
          order: 'desc',
        }
      }));
    }
  },[dispatch, sortItem]);

  //???????????? ?????????
  const handleDoorlockDetail = useCallback((doorlockId:string) => {
      handleViewChange('doorlock', 'detail');
      dispatch(setDetailField(doorlockId));
  },[dispatch, handleViewChange]);

//?????? ?????????
const handleModal = useCallback((modalFlag:string, doorlockId:string, status: string, doorlockName:string ) => {
  if(modalFlag === 'delete'){
    if (status !== 'installed') return;
    if (hotelRole === 'manager') return;
      setSelectedDoorlockId(doorlockId);
      setSelectedDoorlockName(doorlockName);
      setIsOpenDoorlockUninstallModal(true);
  }
},[hotelRole]);

  //???????????? ????????? ??????
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebounce = useCallback(
    useDebounce((handleListDoorlock) => handleListDoorlock(), 300) //0.3??? ?????? ????????? ??? ?????? ??????
  ,[]);

  useEffect(() => {
    if (isOpen) {
      handleListBuilding();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  
  useEffect(() => {
    if (isOpen) {
      if (filterItem.buildingId) handleListFloor();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, filterItem.buildingId]);
  
  useEffect(() => {
    if (isOpen){
     !isDebounce? handleListDoorlock() : handleDebounce(handleListDoorlock); //???????????? ??????
    }
  }, [isOpen, isDebounce, handleDebounce, handleListDoorlock]);
      
  useEffect(() => {
    if(doorlockError){
      if(doorlockError.response.data.code === 401 || doorlockError.response.data.code === 419){
          localStorage.clear();
          navigation('/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[doorlockError]);

  return (
    <Fragment>
      {doorlockView === 'list' && <>
      <FormCard hidden={doorlockView !== 'list'}>
        <DoorlockList
            doorlockListItems={doorlockListItems}
            buildingListItems={buildingListItems}
            floorListItems={floorListItems}
            filterItem={filterItem}
            sortItem={sortItem}
            userRole={userRole}
            hotelRole={hotelRole}
            handleFilter={handleFilter}
            handleinitFilter={handleinitFilter}
            handleDoorlockDetail={handleDoorlockDetail}
            handleModal={handleModal}
            changeSort={changeSort}
        />
        <LimitButton
          currentLimit={paginationItem.limit}
          changeLimit={changeLimit}
        />
        <Pagination
          total={doorlockListTotal}
          index={currentPageNumber}
          limit={paginationItem.limit}
          indexChange={changePagination}
        />
      </FormCard>
      <DoorlockUninstallContainer
        isOpen={isOpenDoorlockUninstallModal}
        toggle={() => setIsOpenDoorlockUninstallModal(!isOpenDoorlockUninstallModal)}
        reload={() => handleListDoorlock()}
        doorlockId={selectedDoorlockId}
        doorlockName={selectedDoorlockName}
      />
      </>
    }
    {doorlockView !== 'list' && 
      <DoorlockDetailContainer
        isOpen={doorlockView === 'detail'||doorlockView === 'battery'||doorlockView === 'log'}
        doorlockView={doorlockView}
        handleViewChange={handleViewChange}
      />
    }
    </Fragment>
  );
}

export default DoorlockListContainer;