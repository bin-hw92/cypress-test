import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LimitButton from '../../components/Commons/LimitSelectBox';
import Pagination from '../../components/Commons/TablePagination';
import StaffList from '../../components/Staff/StaffList';
import useDebounce from '../../lib/useDebounce';
import { RootState } from '../../stores';
import { listStaffAction, listStaffCntAction, setCurrentPageNumberAction, setDetailField, setFilterItemAction, setInitFilterItemAction, setPaginationItemAction } from '../../stores/staffList';
import { StaffListContainerProps, staffListState } from '../../types/staff';
import StaffkeyIssueContainer from '../Staffkey/StaffkeyIssueContainer';
import StaffCreateContainer from './StaffCreateContainer';
import StaffDeleteContainer from './StaffDeleteContainer';
import StaffDetailContainer from './StaffDetailContainer';
import StaffSignupContainer from './StaffSignupContainer';
import StaffUpdateContainer from './StaffUpdateContainer';

/* styled */
const FormCard = styled.article`
    width: 100%;
    position: relative;
`;

const StaffListContainer = ({
  isOpen,
  staffView,
  handleViewChange,
}:StaffListContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();    
  const { staffListTotal, staffListItems, staffError, currentPageNumber, paginationItem, filterItem, staffListCntItems, userRole, userPhoneNumber, hotelRole } = useSelector(({ staffList, header }:RootState) => ({
    staffListTotal: staffList.staffListTotal,
    staffListItems: staffList.staffListItems,
    staffError: staffList.staffListError,
    currentPageNumber: staffList.currentPageNumber,
    paginationItem: staffList.paginationItem,
    filterItem: staffList.filterItem,
    staffListCntItems: staffList.staffListCntItems,
    userRole: header.userRole,
    userPhoneNumber: header.phoneNumber,
    hotelRole: header.hotelRole,
  }));
  const [ isDebounce, setIsDebounce ] = useState<boolean>(false); //디바운싱 사용 구분을 위해 추가
  const [ isOpenStaffCreateModal, setIsOpenStaffCreateModal ] = useState<boolean>(false);
  const [ isOpenStaffUpdateModal, setIsOpenStaffUpdateModal ] = useState<boolean>(false);
  const [ isOpenStaffkeyIssueModal, setIsOpenStaffkeyIssueModal ] = useState<boolean>(false);
  const [ isOpenStaffSignupModal, setIsOpenStaffSignupModal ] = useState<boolean>(false);
  const [ isOpenStaffDeleteModal, setIsOpenStaffDeleteModal ] = useState<boolean>(false);
  const [ selectedStaffId, setSelectedStaffId ] = useState<string>('');
  const [ selectedStaffName, setSelectedStaffName ] = useState<string>('');
  const [ selectedStaffPhoneNumber, setSelectedStaffPhoneNumber ] = useState<string>('');
  const [ selectMasterCount, setSelectMasterCount ] = useState<number>(0);

  const handleListStaff = useCallback(() => {
    dispatch(listStaffAction({...filterItem, ...paginationItem}));
    dispatch(listStaffCntAction());
  }, [dispatch, filterItem, paginationItem]);

  const handleResetStaffId = () => {
    setSelectedStaffId('');
  }

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
  const handleStaffDetail = useCallback((staffId:string) => {
      handleViewChange('staff', 'detail');
      dispatch(setDetailField(staffId));
  },[dispatch, handleViewChange]);

  //모달 플래그
  const handleModal = useCallback((modalFlag:string, staffId:string, staffName:string, role:string, phone_number:string, status:string) => {
    if(modalFlag === 'create'){
      setIsOpenStaffCreateModal(true)
    }
    
    if(modalFlag === 'update'){
      if(hotelRole === 'manager' && (role === 'master' || role === 'manager_mobilekey' || role === 'doorlock_setting')) return;
      if(hotelRole === 'manager' && role === 'manager' && userPhoneNumber !== phone_number) return;

      setSelectedStaffId(staffId);
      setIsOpenStaffUpdateModal(true);
    }
    if(modalFlag === 'delete'){
      if(hotelRole === 'master' && role === 'master' && selectMasterCount === 1) return;
      if(hotelRole === 'master' && role === 'master' && status !== 'granted') return;
      if(hotelRole === 'manager' && (role === 'master' || role === 'manager_mobilekey' || role === 'doorlock_setting')) return;
      if(hotelRole === 'manager' && role === 'manager' && userPhoneNumber !== phone_number) return;

      setSelectedStaffId(staffId);
      setSelectedStaffName(staffName)
      setIsOpenStaffDeleteModal(true);
    }
  },[selectMasterCount, userPhoneNumber, hotelRole]);
  
  //모달 플래그
  const handleModalUser = useCallback((modalFlag:string, staffId:string, staffName:string, staffPhoneNumber:string, status:string, role:string, phone_number:string) => {
    if(modalFlag === 'issue'){
      if (role === 'master') return;
      if(hotelRole === 'manager' && (role === 'master' || role === 'manager_mobilekey' || role === 'doorlock_setting')) return;
      if(hotelRole === 'manager' && role === 'manager' && userPhoneNumber !== phone_number) return;

      setSelectedStaffId(staffId);
      setIsOpenStaffkeyIssueModal(true);
    }
    if(modalFlag === 'signup'){
      if (status === 'granted' || hotelRole === 'manager') return;
      setSelectedStaffPhoneNumber(staffPhoneNumber);
      setSelectedStaffName(staffName)
      setIsOpenStaffSignupModal(true);
    }
  },[userPhoneNumber, hotelRole]);

  //현재 페이지 전역상태 등록
  const handleCurrentPageNumber = useCallback((currentPageNumber:number) => {
      dispatch(setCurrentPageNumberAction({currentPageNumber}));
  }, [dispatch]);

  //페이지 전역상태 등록
  const handlePaginationItem = useCallback((paginationItem:staffListState['paginationItem']) => {
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
    useDebounce((handleListStaff) => handleListStaff(), 300) //0.3초 동안 미입력 시 함수 실행
  ,[]);

  useEffect(() => {
    try {
      if (isOpen){
        !isDebounce? handleListStaff() : handleDebounce(handleListStaff); //디바운싱 처리
      } 
    } catch (error) {
      throw error;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, handleListStaff, isDebounce, handleDebounce]);

  useEffect(() => {
    if(staffListCntItems?.length){
      setSelectMasterCount(staffListCntItems.filter((item:any) => item.role === 'master' && item.status === 'granted').length);
    }
  },[staffListCntItems]);
      
  useEffect(() => {
    if(staffError){
      if(staffError.response.data.code === 401 || staffError.response.data.code === 419){
          localStorage.clear();
          navigation('/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[staffError]);

  return (
    <Fragment>
      {staffView === 'list' && <>
          <FormCard>
            <StaffList
              staffListItems={staffListItems}
              filterItem={filterItem}
              selectMasterCount={selectMasterCount}
              userRole={userRole}
              userPhoneNumber={userPhoneNumber}
              hotelRole={hotelRole}
              handleFilter={handleFilter}
              handleinitFilter={handleinitFilter}
              handleModal={handleModal}
              handleModalUser={handleModalUser}
              handleStaffDetail={handleStaffDetail}           
            />
            <LimitButton
              currentLimit={paginationItem.limit}
              changeLimit={changeLimit}
            />
            <Pagination
              total={staffListTotal}
              index={currentPageNumber}
              limit={paginationItem.limit}
              indexChange={changePagination}
            />
          </FormCard>
          <StaffCreateContainer
            isOpen={isOpenStaffCreateModal}
            toggle={() => setIsOpenStaffCreateModal(!isOpenStaffCreateModal)}
            reload={() => handleListStaff()}
          />
          <StaffUpdateContainer
            isOpen={isOpenStaffUpdateModal}
            toggle={() => setIsOpenStaffUpdateModal(!isOpenStaffUpdateModal)}
            reload={() => handleListStaff()}
            staffId={selectedStaffId}
          />
          <StaffDeleteContainer
            isOpen={isOpenStaffDeleteModal}
            toggle={() => setIsOpenStaffDeleteModal(!isOpenStaffDeleteModal)}
            reload={() => handleListStaff()}
            staffId={selectedStaffId}
            staffName={selectedStaffName}
          />
          {isOpenStaffkeyIssueModal &&
            <StaffkeyIssueContainer
              isOpen={isOpenStaffkeyIssueModal}
              toggle={() => setIsOpenStaffkeyIssueModal(!isOpenStaffkeyIssueModal)}
              reload={() => handleListStaff()}
              staffId={selectedStaffId}
            />
          }
          {isOpenStaffSignupModal &&
            <StaffSignupContainer
              isOpen={isOpenStaffSignupModal}
              toggle={() => setIsOpenStaffSignupModal(!isOpenStaffSignupModal)}
              reload={() => handleListStaff()}
              staffPhoneNumber={selectedStaffPhoneNumber}
              staffName={selectedStaffName}
            />
          }
        </>
      }
      { staffView !== 'list' &&
        <StaffDetailContainer
          isOpen={staffView === 'detail' || staffView === 'staffkey'}
          staffView={staffView}
          listStaff={handleListStaff}
          handleViewChange={handleViewChange}
          handleResetStaffId={handleResetStaffId}
        />
       }
    </Fragment>
  );
}

export default StaffListContainer;