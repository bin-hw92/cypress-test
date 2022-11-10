import React, { Fragment, useCallback, useEffect } from 'react';
import DoorlockLogList from '../../components/Doorlock/DoorlockLogList';
import LimitButton from '../../components/Commons/LimitSelectBox';
import Pagination from '../../components/Commons/TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeResult, listDoorlockLogAction, setCurrentPageNumberAction, setFilterLogItemAction, setPaginationItemAction, setSortItemAction } from '../../stores/doorlockLogList';
import { DoorlockLogListContainerProps, DoorlockLogListState } from '../../types/doorlock';
import { useNavigate } from 'react-router-dom';

const DoorlockLogListContainer = ({
  isOpen,
  doorlockId,
  hotelId,
  handleGoBack,
  handleErrorApi,
}:DoorlockLogListContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { doorlockLogListTotal, doorlockLogListItems, doorlockLogError, currentPageNumber, paginationItem, filterItem, sortItem } = useSelector(({ doorlockLogList }:RootState) => ({
      doorlockLogListTotal: doorlockLogList.doorlockLogListTotal,
      doorlockLogListItems: doorlockLogList.doorlockLogListItems,
      doorlockLogError: doorlockLogList.doorlockLogListError,
      currentPageNumber: doorlockLogList.currentPageNumber,
      paginationItem: doorlockLogList.paginationItem,
      filterItem: doorlockLogList.filterItem,
      sortItem: doorlockLogList.sortItem,
  }));

  const handlelistDoorlockLog = useCallback(() => {
    dispatch(listDoorlockLogAction({...filterItem, ...paginationItem, ...sortItem, hotelId, doorlockId}));
  }, [dispatch, hotelId, doorlockId, filterItem, paginationItem, sortItem]);
  
  //필터 핸들링
  const handleFilter =  useCallback((targetItem:any, isDebounce:boolean) => {
      dispatch(setFilterLogItemAction({...filterItem, ...targetItem}));
  }, [dispatch, filterItem]);

  //필터 초기화 버튼
  const handleinitFilter = useCallback(() => {
    dispatch(setFilterLogItemAction({
      ...filterItem, 
      filterItem: {
        logType: '',
      }
    }));
  },[dispatch, filterItem]);

  //현재 페이지 전역상태 등록
  const handleCurrentPageNumber = useCallback((currentPageNumber:number) => {
      dispatch(setCurrentPageNumberAction({currentPageNumber}));
  }, [dispatch]);

  //페이지 전역상태 등록
  const handlePaginationItem = useCallback((paginationItem:DoorlockLogListState['paginationItem']) => {
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

  //정렬
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

  //디바운싱 훅으로 이동
  // eslint-disable-next-line react-hooks/exhaustive-deps
/*   const handleDebounce = useCallback(
      useDebounce((handlelistDoorlockLog) => handlelistDoorlockLog(), 300) //0.3초 동안 미입력 시 함수 실행
  ,[]); */

  useEffect(() => {
    try {
      if (isOpen && doorlockId) {
        handlelistDoorlockLog();
      }
    } catch (error) {
      throw error;
    }
  }, [isOpen, doorlockId, handlelistDoorlockLog, filterItem]);

  useEffect(() => {
    if(doorlockLogError){
      if(doorlockLogError.response.data.code === 401 || doorlockLogError.response.data.code === 419){
        localStorage.clear();
        navigation('/login');
      }else{
        handleErrorApi('log', doorlockLogError);
      }
      dispatch(
        changeResult({
          key: 'doorlockLogError',
          value: null,
        })
      );
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch, doorlockLogError, handleErrorApi]);

  return (
    <Fragment>
      <DoorlockLogList
          doorlockLogListItems={doorlockLogListItems}
          filterItem={filterItem}
          sortItem={sortItem}
          handleGoBack={handleGoBack}
          handleFilter={handleFilter}
          handleinitFilter={handleinitFilter}
          changeSort={changeSort}
      />
      <LimitButton
        currentLimit={paginationItem.limit}
        changeLimit={changeLimit}
      />
      <Pagination
        total={doorlockLogListTotal}
        index={currentPageNumber}
        limit={paginationItem.limit}
        indexChange={changePagination}
      />
    </Fragment>
  );
};

export default DoorlockLogListContainer;