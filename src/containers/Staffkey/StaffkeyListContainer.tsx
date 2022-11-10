import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/Commons/TablePagination';
import StaffkeyList from '../../components/Staffkey/StaffkeyList';
import { RootState } from '../../stores';
import { listStaffKeyAction, setCurrentPageNumberAction, setPaginationItemAction } from '../../stores/staffkeyList';
import { StaffkeyListContainerProps, staffkeyListState } from '../../types/staff';
import StaffkeyDeleteContainer from './StaffkeyDeleteContainer';
import StaffkeyIssueContainer from './StaffkeyIssueContainer';

const StaffkeyListContainer = ({
  isOpen,
  staffId,
  staffRole,
  handleGoBack,
}:StaffkeyListContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();    
  const { staffkeyListTotal, staffkeyListItems, staffkeyError, currentPageNumber, paginationItem, userRole } = useSelector(({ staffkeyList, header }:RootState) => ({
    staffkeyListTotal: staffkeyList.staffkeyListTotal,
    staffkeyListItems: staffkeyList.staffkeyListItems,
    staffkeyError: staffkeyList.staffkeyListError,
    currentPageNumber: staffkeyList.currentPageNumber,
    paginationItem: staffkeyList.paginationItem,
    userRole: header.userRole,
  }));
  const [ isOpenStaffkeyIssueModal, setIsOpenStaffkeyIssueModal ] = useState<boolean>(false);
  const [ isOpenStaffkeyDeleteModal, setIsOpenStaffkeyDeleteModal ] = useState<boolean>(false);
  const [ selectedStaffkeyId, setSelectedStaffkeyId ] = useState<string>('');

  const handleListStaffkey = useCallback(() => {
    dispatch(listStaffKeyAction({staffId, ...paginationItem}));
  },[dispatch, paginationItem, staffId]);

  const handleSelectStaffkeyDelete = (keyId:string) => {
    setSelectedStaffkeyId(keyId);
    setIsOpenStaffkeyDeleteModal(true);
  };

  //현재 페이지 전역상태 등록
  const handleCurrentPageNumber = useCallback((currentPageNumber:number) => {
    dispatch(setCurrentPageNumberAction({currentPageNumber}));
  }, [dispatch]);

  //페이지 전역상태 등록
  const handlePaginationItem = useCallback((paginationItem:staffkeyListState['paginationItem']) => {
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

  const handleModal = () => {
    setIsOpenStaffkeyIssueModal(true);
  }

  useEffect(() => {
    if(isOpen) handleListStaffkey();
  },[isOpen, handleListStaffkey]);
      
  useEffect(() => {
    if(staffkeyError){
      if(staffkeyError.response.data.code === 401 || staffkeyError.response.data.code === 419){
          localStorage.clear();
          navigation('/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[staffkeyError]);

  return (
    <Fragment>
      <div>
        <StaffkeyList
          staffkeyListItems={staffkeyListItems}
          staffRole={staffRole}
          userRole={userRole}
          handleSelectStaffkeyDelete={handleSelectStaffkeyDelete}
          handleGoBack={handleGoBack}
          handleModal={handleModal}
        />
        <Pagination
          total={staffkeyListTotal}
          index={currentPageNumber}
          limit={paginationItem.limit}
          indexChange={changePagination}
        />
      </div>
      {isOpenStaffkeyIssueModal &&
        <StaffkeyIssueContainer
          isOpen={isOpenStaffkeyIssueModal}
          toggle={() => setIsOpenStaffkeyIssueModal(!isOpenStaffkeyIssueModal)}
          reload={handleListStaffkey}
          staffId={staffId}
        />
      }
      <StaffkeyDeleteContainer
        isOpen={isOpenStaffkeyDeleteModal}
        toggle={() => setIsOpenStaffkeyDeleteModal(!isOpenStaffkeyDeleteModal)}
        reload={handleListStaffkey}
        keyId={selectedStaffkeyId}
      />
    </Fragment>
  );
};

export default StaffkeyListContainer;