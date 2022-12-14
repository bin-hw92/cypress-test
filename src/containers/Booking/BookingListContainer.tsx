import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDebounce from '../../lib/useDebounce';
import styled from 'styled-components';
import Pagination from '../../components/Commons/TablePagination';
import LimitButton from '../../components/Commons/LimitSelectBox';
import BookingList from '../../components/Booking/BookingList';
import { RootState } from '../../stores';
import { listBookingAction, setCurrentPageNumberAction, setDetailField, setFilterItemAction, setInitFilterItemAction, setPaginationItemAction, setSortItemAction } from '../../stores/bookingList';
import { listBuildingAction } from '../../stores/buildingList';
import moment from 'moment';
import BookingCreateContainer from './BookingCreateContainer';
import ExcelUploadContainer from './ExcelUploadContainer';
import ExcelDownloadContainer from './ExcelDownloadContainer';
import BookingCancelContainer from './BookingCancelContainer';
import KeyIssueContainer from '../Userkey/UserkeyIssueContainer';
import BookingUpdateContainer from './BookingUpdateContainer';
import BookingDetailContainer from './BookingDetailContainer';
import { BookingListContainerProps, bookingListState } from '../../types/booking';
import { useNavigate } from 'react-router-dom';

/* styled */
const FormCard = styled.article`
    width: 100%;
    position: relative;
`;

const BookingListContainer = ({
  isOpen,
  bookingView,
  handleViewChange,
}:BookingListContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { hotelItem, bookingListTotal, bookingListItems, bookingError, currentPageNumber, paginationItem, filterItem, sortItem, buildingListItems, userRole } = useSelector(({ hotel, bookingList, buildingList, header }:RootState) => ({
      hotelItem: hotel.hotel,
      bookingListTotal: bookingList.bookingListTotal,
      bookingListItems: bookingList.bookingListItems,
      bookingError: bookingList.bookingListError,
      currentPageNumber: bookingList.currentPageNumber,
      paginationItem: bookingList.paginationItem,
      filterItem: bookingList.filterItem,
      sortItem: bookingList.sortItem,
      buildingListItems: buildingList.buildingListItems,
      userRole: header.userRole,
  }));
  const [ isDebounce, setIsDebounce ] = useState<boolean>(false); //???????????? ?????? ????????? ?????? ??????
  const [ isOpenBookingCreateModal, setIsOpenBookingCreateModal ] = useState<boolean>(false);
  const [ isOpenExcelUploadModal, setIsOpenExcelUploadModal ] = useState<boolean>(false);
  const [ isOpenExcelDownloadModal, setIsOpenExcelDownloadModal ] = useState<boolean>(false);
  const [ isOpenBookingUpdateModal, setIsOpenBookingUpdateModal ] = useState<boolean>(false);
  const [ isOpenKeyIssueModal, setIsOpenKeyIssueModal ] = useState<boolean>(false);
  const [ isOpenBookingCancelModal, setIsOpenBookingCancelModal ] = useState<boolean>(false);
  const [ selectedBuildingId, setSelectedBuildingId ] = useState<string>('');
  const [ selectedBookingId, setSelectedBookingId ] = useState<string>('');
  const [ selectedRoomId, setSelectedRoomId ] = useState<string>('');
  const [ selectedRoomName, setSelectedRoomName ] = useState<string>('');


  const handleListBuilding = useCallback(() => {
    dispatch(listBuildingAction({}));
  }, [dispatch]);

  const handleListBooking = useCallback( () => {
    dispatch(listBookingAction({ 
      ...filterItem,
      startAt: filterItem.startAt || moment().startOf('day').toDate(),
      ...sortItem,
      ...paginationItem,}));
  }, [dispatch, filterItem, paginationItem, sortItem]);

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
  const handlePaginationItem = useCallback((paginationItem:bookingListState['paginationItem']) => {
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
  const handleBookingDetail = useCallback((bookingId:string) => {
      handleViewChange('booking', 'detail');
      dispatch(setDetailField(bookingId));
  },[dispatch, handleViewChange]);

  //?????? ?????????
  const handleModal = useCallback((modalFlag:string, bookingId:string, buildingId:string, roomId:string, roomName:string ) => {
    if(modalFlag === 'delete'){
      setSelectedBookingId(bookingId);
      setIsOpenBookingCancelModal(true);
    }
    if(modalFlag === 'update'){
      setSelectedBookingId(bookingId);
      setIsOpenBookingUpdateModal(true);
    }
    if(modalFlag === 'create'){
      setIsOpenBookingCreateModal(true)
    }
    if(modalFlag === 'keyIssue'){
      setSelectedBookingId(bookingId);
      setSelectedBuildingId(buildingId);
      setSelectedRoomId(roomId);
      setSelectedRoomName(roomName);
      setIsOpenKeyIssueModal(true);
    }
    if(modalFlag === 'excelUpload'){
      setIsOpenExcelUploadModal(true);
    }
    if(modalFlag === 'excelDownload'){
      setIsOpenExcelDownloadModal(true);
    }
  },[]);

  //???????????? ????????? ??????
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebounce = useCallback(
    useDebounce((handleListBooking) => handleListBooking(), 300) //0.3??? ?????? ????????? ??? ?????? ??????
  ,[]);

  useEffect(() => {
      if (isOpen) {
        handleListBuilding();
      }
  }, [handleListBuilding, isOpen]);
  
  useEffect(() => {
    if (isOpen) {
      !isDebounce? handleListBooking() : handleDebounce(handleListBooking); //???????????? ??????
    }
  }, [handleDebounce, handleListBooking, isDebounce, isOpen]);

  useEffect(() => {
    if(bookingError){
      if(bookingError.response.data.code === 401 || bookingError.response.data.code === 419){
        localStorage.clear();
        navigation('/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[bookingError]);

  return (
    <Fragment>
      {bookingView === 'list' && <>
        <FormCard hidden={bookingView !== 'list'}>
          <BookingList
            bookingListItems={bookingListItems}
            buildingListItems={buildingListItems}
            filterItem={filterItem}
            sortItem={sortItem}
            userRole={userRole}
            handleFilter={handleFilter}
            handleinitFilter={handleinitFilter}
            handleBookingDetail={handleBookingDetail}
            handleModal={handleModal}
            changeSort={changeSort}
          />
          <LimitButton
            currentLimit={paginationItem.limit}
            changeLimit={changeLimit}
          />
          <Pagination
            total={bookingListTotal}
            index={currentPageNumber}
            limit={paginationItem.limit}
            indexChange={changePagination}
          />
        </FormCard>
        {isOpenBookingCreateModal &&
          <BookingCreateContainer
            isOpen={isOpenBookingCreateModal}
            toggle={() => setIsOpenBookingCreateModal(!isOpenBookingCreateModal)}
            reload={() => handleListBooking()}
          />
        }
        <ExcelUploadContainer
          isOpen={isOpenExcelUploadModal}
          toggle={() => setIsOpenExcelUploadModal(!isOpenExcelUploadModal)}
          reload={() => handleListBooking()}
        />
        {isOpenExcelDownloadModal && 
          <ExcelDownloadContainer
            isOpen={isOpenExcelDownloadModal}
            toggle={() => setIsOpenExcelDownloadModal(!isOpenExcelDownloadModal)}
          />
        }
        <BookingUpdateContainer
          isOpen={isOpenBookingUpdateModal}
          toggle={() => setIsOpenBookingUpdateModal(!isOpenBookingUpdateModal)}
          reload={() => handleListBooking()}
          bookingId={selectedBookingId}
        />
        {isOpenKeyIssueModal &&
          <KeyIssueContainer
            isOpen={isOpenKeyIssueModal}
            toggle={() => setIsOpenKeyIssueModal(!isOpenKeyIssueModal)}
            reload={() => handleListBooking()}
            buildingId={selectedBuildingId}
            bookingId={selectedBookingId}
            roomId={selectedRoomId}
            roomName={selectedRoomName}
            allowInfinityPincode={hotelItem.allowInfinityPincode}
          />
        }
        
        <BookingCancelContainer
          isOpen={isOpenBookingCancelModal}
          toggle={() => setIsOpenBookingCancelModal(!isOpenBookingCancelModal)}
          reload={() => handleListBooking()}
          bookingId={selectedBookingId}
        />
      </>
      }
      {bookingView !== 'list' && 
      <BookingDetailContainer
        isOpen={bookingView === 'detail'||bookingView === 'keyList'}
        bookingView={bookingView}
        listBooking={handleListBooking}
        handleViewChange={handleViewChange}
      />}
    </Fragment>
  );
}

export default BookingListContainer;