import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LimitButton from '../../components/Commons/LimitSelectBox';
import Pagination from '../../components/Commons/TablePagination';
import DoorlockAllList from '../../components/Doorlock/DoorlockAllList';
import MainLayout from '../../components/Layout/MainLayout';
import useDebounce from '../../lib/useDebounce';
import { RootState } from '../../stores';
import { listBuildingAction } from '../../stores/buildingList';
import { initialize, listDoorlockAction, listDoorlockInitAction, setCurrentPageNumberAction, setFilterItemAction, setFilterItemHotelAction, setInitFilterItemAction, setPaginationItemAction, setSortItemAction } from '../../stores/doorlockAllList';
import { listFloorAction } from '../../stores/floorList';
import { listHotelAction } from '../../stores/hotelList';
import { doorlockListState } from '../../types/doorlock';
import DoorlockUninstallContainer from './DoorlockUninstallContainer';

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
const DoorlockAllListContainer = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { doorlockListTotal, doorlockListItems, doorlockError, currentPageNumber, paginationItem, filterItem, sortItem, floorListItems, buildingListItems, userRole, hotelRole, hotelListItems } = useSelector(({ doorlockAllList, floorList, buildingList, header, hotelList }:RootState) => ({
    doorlockListTotal: doorlockAllList.doorlockAllListTotal,
    doorlockListItems: doorlockAllList.doorlockAllListItems,
    doorlockError: doorlockAllList.doorlockAllListError,
    currentPageNumber: doorlockAllList.currentPageNumber,
    paginationItem: doorlockAllList.paginationItem,
    filterItem: doorlockAllList.filterItem,
    sortItem:  doorlockAllList.sortItem,
    floorListItems: floorList.floorListItems,
    buildingListItems: buildingList.buildingListItems,
    userRole: header.userRole,
    hotelRole: header.hotelRole,
    hotelListItems: hotelList.hotelListItems,
  }));
  const [ isDebounce, setIsDebounce ] = useState<boolean>(false); //???????????? ?????? ????????? ?????? ??????
  const [ isOpenDoorlockUninstallModal, setIsOpenDoorlockUninstallModal ] = useState<boolean>(false);
  const [ selectedHotelListItems, setSelectedHotelListItems ] = useState<any[]>([]);
  const [ selectedDoorlockId, setSelectedDoorlockId ] = useState<string>('');
  const [ selectedDoorlockName, setSelectedDoorlockName ] = useState<string>('');

  //MainLayout - refresh???
  const changeDoorlock = useCallback(() => {
    dispatch(initialize()); //doorlockAllList ????????? ?????????
  }, [dispatch]);

  const handleListHotel = useCallback(() => {
    dispatch(listHotelAction({}));
  }, [dispatch]);

  const handleListBuilding = useCallback(() => {
    dispatch(listBuildingAction({hotelId: filterItem.hotelId}));
  }, [dispatch, filterItem]);

  const handleListFloor = useCallback(() => {
    dispatch(listFloorAction({...filterItem, hotelId: filterItem.hotelId}));
  }, [dispatch, filterItem]);

  const handleListDoorlock = useCallback(() => {
    dispatch(listDoorlockAction({...filterItem, ...sortItem, ...paginationItem}));
  }, [dispatch, filterItem, sortItem, paginationItem]);

  const handleListDoorlockInit = () => {
    dispatch(listDoorlockInitAction());
  };
  
  //?????? ?????????
  const handleFilter =  useCallback((targetItem:any, isDebounce:boolean) => {
      setIsDebounce(isDebounce); //???????????? ????????? ?????? ?????? Component?????? ????????? ?????????
      dispatch(setFilterItemAction({...filterItem, ...targetItem}));
  }, [dispatch, filterItem]);
  
  //?????? ?????????
  const handleFilterHotel =  useCallback((targetItem:any, isDebounce:boolean) => {
      setIsDebounce(isDebounce); //???????????? ????????? ?????? ?????? Component?????? ????????? ?????????
      dispatch(setFilterItemHotelAction({value: targetItem.hotelId.value, label: targetItem.hotelId.label}));
  }, [dispatch]);

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
    navigation(`/doorlock/${doorlockId}`);
  },[navigation]);

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
    handleListHotel();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  useEffect(() => {
    if(hotelListItems){
      if(hotelListItems.length){
        setSelectedHotelListItems(
          hotelListItems.map((item:any) => {
            return {value: item.id, label: item.name}
          })
        )
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[hotelListItems]);
    
  useEffect(() => {
    if(filterItem.hotelId) handleListBuilding();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[filterItem.hotelId]);
    
  useEffect(() => {
    if(filterItem.buildingId) handleListFloor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[filterItem.buildingId]);

  useEffect(() => {
    if(filterItem.hotelId){
      !isDebounce? handleListDoorlock() : handleDebounce(handleListDoorlock); //???????????? ??????
    }else{
      handleListDoorlockInit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDebounce, filterItem.hotelId, handleDebounce, handleListDoorlock]);
      
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
      <MainLayout
        refresh={changeDoorlock}
        ContentBody={(
          <>
          <ContentTitle2>
            <h1>????????? ??????</h1>
            {/* <FontAwesomeIcon icon={faFilter} className={`filter-link ${isFilter? 'filter-on' : ''}`} onClick={() => setIsFilter(!isFilter)}/> */}
          </ContentTitle2>
          <FormCard>
            <DoorlockAllList
                doorlockListItems={doorlockListItems}
                selectedHotelListItems={selectedHotelListItems}
                buildingListItems={buildingListItems}
                floorListItems={floorListItems}
                filterItem={filterItem}
                sortItem={sortItem}
                userRole={userRole}
                handleFilter={handleFilter}
                handleFilterHotel={handleFilterHotel}
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
            hotelId={filterItem.hotelId}
          />
        </>
        )}
      />
    </Fragment>
  );
}

export default DoorlockAllListContainer;