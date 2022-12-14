import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FloorList from '../../components/Floor/FloorList';
import useDebounce from '../../lib/useDebounce';
import LimitButton from "../../components/Commons/LimitSelectBox";
import Pagination from '../../components/Commons/TablePagination';
import { RootState } from '../../stores';
import { listBuildingAction } from '../../stores/buildingList';
import { listFloorAction, setCurrentPageNumberAction, setDetailField, setFilterItemAction, setInitFilterItemAction, setPaginationItemAction } from '../../stores/floorList';
import styled from 'styled-components';
import FloorCreateContainer from './FloorCreateContainer';
import FloorUpdateContainer from './FloorUpdateContainer';
import FloorDeleteContainer from './FloorDeleteContainer';
import FloorDetailContainer from './FloorDetailContainer';
import { FloorListContainerProps, floorListState } from '../../types/floor';
import { useNavigate } from 'react-router-dom';

/* styled */
const FormCard = styled.article`
    width: 100%;
    position: relative;
`;

const FloorListContainer = ({
    isOpen,
    floorView,
    handleViewChange
}:FloorListContainerProps) => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { floorListTotal, floorListItems, floorError, currentPageNumber, paginationItem, filterItem, buildingListItems, userRole } = useSelector(({ floorList, buildingList, header }:RootState) => ({
        floorListTotal: floorList.floorListTotal,
        floorListItems: floorList.floorListItems,
        floorError: floorList.floorListError,
        currentPageNumber: floorList.currentPageNumber,
        paginationItem: floorList.paginationItem,
        filterItem: floorList.filterItem,
        buildingListItems: buildingList.buildingListItems,
        userRole: header.userRole,
    }));
    const hotelId = localStorage.getItem('hotel_id');
    const [ isDebounce, setIsDebounce ] = useState<boolean>(false); //???????????? ?????? ????????? ?????? ??????
    const [ isOpenFloorCreateModal, setIsOpenFloorCreateModal ] = useState<boolean>(false);
    const [ isOpenFloorUpdateModal, setIsOpenFloorUpdateModal ] = useState<boolean>(false);
    const [ isOpenFloorDeleteModal, setIsOpenFloorDeleteModal ] = useState<boolean>(false);
    const [ selectedFloorId, setSelectedFloorId ] = useState<string>('');
    const [ selectedFloorName, setSelectedFloorName ] = useState<string>('');

    const handellistBuilding = useCallback(() => {
        dispatch(listBuildingAction({}));
    },[dispatch]);

    const handlelistFloor = useCallback(() => {
        dispatch(listFloorAction({...filterItem, ...paginationItem}));
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
    const handleFloorDetail = useCallback((buildingId:string, floorId:string) => {
        handleViewChange('floor', 'detail');
        dispatch(setDetailField({
            detailField: {
                buildingId,
                floorId,
            }
        }));
    },[dispatch, handleViewChange]);

    //?????? ?????????
    const handleModal = useCallback((modalFlag:string, floorId:string, floorName:string) => {
        if(modalFlag === 'create'){
            setSelectedFloorId(floorId);
            setIsOpenFloorCreateModal(true)
        }
        if(modalFlag === 'update'){
            setSelectedFloorId(floorId);
            setIsOpenFloorUpdateModal(true);
        }
        if(modalFlag === 'delete'){
            setSelectedFloorId(floorId);
            setSelectedFloorName(floorName);
            setIsOpenFloorDeleteModal(true);
        }
    },[]);


    //?????? ????????? ???????????? ??????
    const handleCurrentPageNumber = useCallback((currentPageNumber:number) => {
        dispatch(setCurrentPageNumberAction({currentPageNumber}));
    }, [dispatch]);

    //????????? ???????????? ??????
    const handlePaginationItem = useCallback((paginationItem:floorListState['paginationItem']) => {
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
        useDebounce((handlelistFloor) => handlelistFloor(), 300) //0.3??? ?????? ????????? ??? ?????? ??????
    ,[]);

    useEffect(() => {
        if (buildingListItems !== null && buildingListItems.length){
            const buildingIdList = buildingListItems.map(buildingItem => buildingItem.id);
            if(filterItem.buildingId === ''|| !buildingIdList.includes(filterItem.buildingId)) handleFilter({...filterItem, buildingId: buildingListItems[0].id}, false);
        }else{
            if(filterItem.buildingId !== '') handleFilter({...filterItem, buildingId: ''}, false);
        }
    },[buildingListItems, filterItem, handleFilter]);
    
    useEffect(() => {
        try {
        if (isOpen) {
            handellistBuilding();
            if (filterItem.buildingId) !isDebounce? handlelistFloor() : handleDebounce(handlelistFloor); //???????????? ??????
        }
        } catch (error) {
        throw error;
        }
    }, [isOpen, handellistBuilding, handlelistFloor, hotelId, filterItem.buildingId, isDebounce, handleDebounce]);
      
    useEffect(() => {
        if(floorError){
          if(floorError.response.data.code === 401 || floorError.response.data.code === 419){
              localStorage.clear();
              navigation('/login');
          }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[floorError]);

  return (
    <Fragment>
    {floorView === 'list' && <>
        <FormCard hidden={floorView !== 'list'}>
            <FloorList
                floorListItems={floorListItems}
                buildingListItems={buildingListItems}
                filterItem={filterItem}
                userRole={userRole}
                handleFilter={handleFilter}
                handleinitFilter={handleinitFilter}
                handleFloorDetail={handleFloorDetail}
                handleModal={handleModal}
            />
            <LimitButton
                currentLimit={paginationItem.limit}
                changeLimit={changeLimit}
            />
            <Pagination
                total={floorListTotal}
                index={currentPageNumber}
                limit={paginationItem.limit}
                indexChange={changePagination}
            />
      </FormCard>
      <FloorCreateContainer
            isOpen={isOpenFloorCreateModal}
            toggle={() => setIsOpenFloorCreateModal(!isOpenFloorCreateModal)}
            reload={() => handlelistFloor()}
            buildingId={filterItem.buildingId}
       />
       <FloorUpdateContainer
            isOpen={isOpenFloorUpdateModal}
            toggle={() => setIsOpenFloorUpdateModal(!isOpenFloorUpdateModal)}
            reload={() => handlelistFloor()}
            buildingId={filterItem.buildingId}
            floorId={selectedFloorId}
       />
       <FloorDeleteContainer
            isOpen={isOpenFloorDeleteModal}
            toggle={() => setIsOpenFloorDeleteModal(!isOpenFloorDeleteModal)}
            reload={() => handlelistFloor()}
            buildingId={filterItem.buildingId}
            floorId={selectedFloorId}
            floorName={selectedFloorName}
       />
      </>
    }
    {floorView === 'detail' && 
     <FloorDetailContainer
        isOpen={floorView === 'detail'}
        listFloor={handlelistFloor}
        handleViewChange={handleViewChange}
      />
    }
    </Fragment>
  );
}

export default FloorListContainer;