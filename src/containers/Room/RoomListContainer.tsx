import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LimitButton from '../../components/Commons/LimitSelectBox';
import Pagination from '../../components/Commons/TablePagination';
import RoomList from '../../components/Room/RoomList';
import useDebounce from '../../lib/useDebounce';
import { RootState } from '../../stores';
import { listBuildingAction } from '../../stores/buildingList';
import { listRoomAction, setCurrentPageNumberAction, setDetailField, setFilterItemAction, setInitFilterItemAction, setPaginationItemAction } from '../../stores/roomList';
import { RoomListContainerProps, roomListState } from '../../types/room';
import RoomCreateContainer from './RoomCreateContainer';
import RoomDeleteContainer from './RoomDeleteContainer';
import RoomDetailContainer from './RoomDetailContainer';
import RoomUpdateContainer from './RoomUpdateContainer';

/* styled */
const FormCard = styled.article`
    width: 100%;
    position: relative;
`;

const RoomListContainer = ({
  isOpen,
  roomView,
  handleViewChange,
}:RoomListContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();    
  const { roomListTotal, roomListItems, roomError, currentPageNumber, paginationItem, filterItem, buildingListItems, userRole } = useSelector(({ roomList, buildingList, header }:RootState) => ({
    roomListTotal: roomList.roomListTotal,
    roomListItems: roomList.roomListItems,
    roomError: roomList.roomListError,
    currentPageNumber: roomList.currentPageNumber,
    paginationItem: roomList.paginationItem,
    filterItem: roomList.filterItem,
    buildingListItems: buildingList.buildingListItems,
    userRole: header.userRole,
}));
  const hotelId = localStorage.getItem('hotel_id');
  const [ isDebounce, setIsDebounce ] = useState<boolean>(false); //디바운싱 사용 구분을 위해 추가
  const [ isOpenRoomCreateModal, setIsOpenRoomCreateModal ] = useState<boolean>(false);
  const [ isOpenRoomUpdateModal, setIsOpenRoomUpdateModal ] = useState<boolean>(false);
  const [ isOpenRoomDeleteModal, setIsOpenRoomDeleteModal ] = useState<boolean>(false);
  const [ selectedFloorId, setSelectedFloorId ] = useState<string>('');
  const [ selectedRoomId, setSelectedRoomId ] = useState<string>('');
  const [ selectedRoomName, setSelectedRoomName ] = useState<string>('');


  const handleListBuilding = useCallback(async () => {
    dispatch(listBuildingAction({}));
  }, [dispatch]);

  const handleListRoom = useCallback(async () => {
    dispatch(listRoomAction({...filterItem, ...paginationItem}));
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
  const handleRoomDetail = useCallback((buildingId:string, floorId:string, roomId:string) => {
      handleViewChange('room', 'detail');
      dispatch(setDetailField({
        detailField: {
          buildingId,
          floorId,
          roomId
        }
      }));
  },[dispatch, handleViewChange]);

  //모달 플래그
  const handleModal = useCallback((modalFlag:string, roomId:string, floorId:string, roomName:string, status:string) => {
    if(modalFlag === 'create'){
        setIsOpenRoomCreateModal(true)
    }
    if(modalFlag === 'update'){
      setSelectedFloorId(floorId);
      setSelectedRoomId(roomId);
      setIsOpenRoomUpdateModal(true);
    }
    if(modalFlag === 'delete'){
      if (status === 'installed') return;
      setSelectedFloorId(floorId);
      setSelectedRoomId(roomId);
      setSelectedRoomName(roomName);
      setIsOpenRoomDeleteModal(true);
    }
  },[]);

  //현재 페이지 전역상태 등록
  const handleCurrentPageNumber = useCallback((currentPageNumber:number) => {
      dispatch(setCurrentPageNumberAction({currentPageNumber}));
  }, [dispatch]);

  //페이지 전역상태 등록
  const handlePaginationItem = useCallback((paginationItem:roomListState['paginationItem']) => {
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
    useDebounce((listRoom) => listRoom(), 300) //0.3초 동안 미입력 시 함수 실행
  ,[]);

  useEffect(() => {
    if (buildingListItems !== null && buildingListItems.length){
      const buildingIdList = buildingListItems.map(buildingItem => buildingItem.id);
      if(filterItem.buildingId === ''|| !buildingIdList.includes(filterItem.buildingId)) handleFilter({...filterItem, buildingId: buildingListItems[0].id}, false);
    }
  },[buildingListItems, filterItem, handleFilter]);
      
  useEffect(() => {
    if(roomError){
      if(roomError.response.data.code === 401 || roomError.response.data.code === 419){
          localStorage.clear();
          navigation('/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[roomError]);

  useEffect(() => {
    try {
      if (isOpen) {
        handleListBuilding();
        if (filterItem.buildingId) !isDebounce? handleListRoom() : handleDebounce(handleListRoom); //디바운싱 처리
      }
    } catch (error) {
      throw error;
    }
  }, [isOpen, hotelId, filterItem.buildingId, isDebounce, handleDebounce, handleListBuilding, handleListRoom]);

  return (
    <Fragment>
    {roomView === 'list' && <>
      <FormCard hidden={roomView !== 'list'}>
        <RoomList
          roomListItems={roomListItems}
          buildingListItems={buildingListItems}
          filterItem={filterItem}
          userRole={userRole}
          handleFilter={handleFilter}
          handleinitFilter={handleinitFilter}
          handleRoomDetail={handleRoomDetail}
          handleModal={handleModal}
        />
        <LimitButton
          currentLimit={paginationItem.limit}
          changeLimit={changeLimit}
        />
        <Pagination
          total={roomListTotal}
          index={currentPageNumber}
          limit={paginationItem.limit}
          indexChange={changePagination}
        />
      </FormCard>
      <RoomCreateContainer
        isOpen={isOpenRoomCreateModal}
        toggle={() => setIsOpenRoomCreateModal(!isOpenRoomCreateModal)}
        reload={() => handleListRoom()}
        buildingId={filterItem.buildingId}
        floorId={filterItem.floorId}
      />
      <RoomUpdateContainer
        isOpen={isOpenRoomUpdateModal}
        toggle={() => setIsOpenRoomUpdateModal(!isOpenRoomUpdateModal)}
        reload={() => handleListRoom()}
        buildingId={filterItem.buildingId}
        floorId={selectedFloorId}
        roomId={selectedRoomId}
      />
      <RoomDeleteContainer
        isOpen={isOpenRoomDeleteModal}
        toggle={() => setIsOpenRoomDeleteModal(!isOpenRoomDeleteModal)}
        reload={() => handleListRoom()}
        buildingId={filterItem.buildingId}
        floorId={selectedFloorId}
        roomId={selectedRoomId}
        roomName={selectedRoomName}
      />
     </>
    }
    {roomView !== 'list' && 
      <RoomDetailContainer
        isOpen={roomView !== 'list'}
        roomView={roomView}
        listRoom={handleListRoom}
        handleViewChange={handleViewChange}
      />
      }
    </Fragment>
  );
}

export default RoomListContainer;