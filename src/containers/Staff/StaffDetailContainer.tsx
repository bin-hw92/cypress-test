import React, { Fragment, useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import StaffDetail from '../../components/Staff/StaffDetail';
import { RootState } from '../../stores';
import { changeField, changeResult, initialize, selectStaffAction, updateStaffAction } from '../../stores/staff';
import { StaffDetailContainerProps } from '../../types/staff';
import StaffkeyListContainer from '../Staffkey/StaffkeyListContainer';
import StaffDeleteContainer from './StaffDeleteContainer';
import StaffSignupContainer from './StaffSignupContainer';

/* styled */
const FormTabWrap = styled.nav`
  display: inline-flex;
  margin: 16px auto 0 auto;

  ul {
    display: inline-flex;
    list-style: none;
    margin: auto;
    padding: 0;

    .tab-item {
      position: relative;
      bottom: -1px;
      margin: auto;
      padding: 0 15px;
      height: 36px;
      min-width: 130px;
      color: #555555;
      line-height: 35px;
      text-align: center;
      border: 1px solid #cccccc;
      border-top-left-radius: 0.35rem;
      border-top-right-radius: 0.35rem;
      border-bottom: 1px solid #ffffff;
      background-color: #ffffff;
      cursor: default;

      &.inactive {
        color: #555555;
        border: 1px solid #cccccc;
        border-bottom: 0;
        background-color: #edf3f4;
        cursor: pointer;
        
        &:hover {    
          text-decoration: underline;
          text-underline-position: under;
        }
      }
    }
  }
`;

const StaffDetailContainer = ({
  isOpen,
  staffView,
  listStaff,
  handleViewChange,
  handleResetStaffId,
}:StaffDetailContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();    
  const { staffItem, staffSuccess, staffError, staffListCntItems, userRole, hotelRole, userPhoneNumber, detailField } = useSelector(({ staff, staffList, header }:RootState) => ({
    staffItem: staff.staff,
    staffSuccess: staff.staffUpdateSuccess,
    staffError: staff.staffUpdateError,
    staffListCntItems: staffList.staffListCntItems,
    userRole: header.userRole,
    hotelRole: header.hotelRole,
    userPhoneNumber: header.phoneNumber,
    detailField: staffList.detailField,
  }));
  const [ isOpenStaffSignupModal, setIsOpenStaffSignupModal ] = useState<boolean>(false);
  const [ isOpenStaffDeleteModal, setIsOpenStaffDeleteModal ] = useState<boolean>(false);
  const [ isOpenStaffUpdateSuccessModal, setIsOpenStaffUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenStaffUpdateFailModal, setIsOpenStaffUpdateFailModal ] = useState<boolean>(false);
  const [ messageStaffUpdateFail, setMessageStaffUpdateFail ] = useState<string>('');
  const [ selectMasterCount, setSelectMasterCount ] = useState<number>(0);

  //인풋 변경 이벤트 핸들러
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    dispatch(
        changeField({
            key: name,
            value: value,
        })
    );
},[dispatch]);

  const reload = () => {
    listStaff();
    handleViewChange('staff', 'list');
    dispatch(initialize());
    handleResetStaffId();
  };

  const handleSelectStaff = useCallback(() => {
    dispatch(selectStaffAction({staffId: detailField.staffId}));
  }, [dispatch, detailField.staffId]);

  const handleUpdateStaff = useCallback(() => {
    dispatch(updateStaffAction({...staffItem, staffId: detailField.staffId}));
  },[dispatch, detailField.staffId, staffItem]);

  const handleGoBack = () => {
    listStaff();
    handleViewChange('staff', 'list');
    dispatch(initialize());
    handleResetStaffId();
  };

  const handleStaffType = useCallback((type:'detail'|'staffkey') => {
    handleViewChange('staff', type);
  },[handleViewChange]);

  const handleSelectStaffSignup = () => {
    if (staffItem.status === 'granted' || hotelRole === 'manager') return;
    setIsOpenStaffSignupModal(true);
  };

  useEffect(() => {
    if(staffError){
      if (!staffError.response) setMessageStaffUpdateFail(staffError.message);
      else setMessageStaffUpdateFail(`${staffError.response.data.code}, ${staffError.response.data.message}`);

      if(staffError.response.data.code === 401 || staffError.response.data.code === 419){
        localStorage.clear();
        navigation('/login');
      }else{
        setIsOpenStaffUpdateFailModal(true);
      }
      dispatch(
        changeResult({
          key: 'staffUpdateError',
          value: null,
        })
      );
      return;
    }
    if(staffSuccess){
      setIsOpenStaffUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenStaffUpdateSuccessModal(false);
        handleSelectStaff();
      }, 1500);
      dispatch(
        changeResult({
          key: 'staffUpdateSuccess',
          value: false,
        })
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[staffSuccess, staffError, dispatch, handleSelectStaff]);

  useEffect(() => {
    try {
      if (isOpen && staffView === 'detail' && detailField.staffId) {
        handleSelectStaff();
      }
    } catch (error) {
      throw error;
    }
  }, [isOpen, staffView, detailField.staffId, handleSelectStaff]);

  const handleModal = () => {
    const newPhone = staffItem.countryNumber + Number.parseInt(staffItem.phoneNumber);
    if(hotelRole === 'master' && staffItem.role === 'master' && selectMasterCount === 1) return;
    if(hotelRole === 'master' && staffItem.role === 'master' && staffItem.status !== 'granted') return;
    if(hotelRole === 'manager' && (staffItem.role === 'master' || staffItem.role === 'manager_mobilekey' || staffItem.role === 'doorlock_setting')) return;
    if(hotelRole === 'manager' && staffItem.role === 'manager' && userPhoneNumber !== newPhone) return;
    setIsOpenStaffDeleteModal(true);
  }

  useEffect(() => {
    if(staffListCntItems?.length){
      setSelectMasterCount(staffListCntItems.filter((item:any) => item.role === 'master' && item.status === 'granted').length);
    }
  },[staffListCntItems]);

  return (
    <Fragment>
      <FormTabWrap>
        <ul>
          <li className={`tab-item ${staffView !== 'detail' ? 'inactive':''}`}
            onClick={() => handleStaffType('detail')}
          >스태프 정보</li>
          <li className={`tab-item ${staffView !== 'staffkey' ? 'inactive':''}`}
            onClick={() => handleStaffType('staffkey')}
          >스태프키 목록</li>
        </ul>
      </FormTabWrap>
      <div hidden={staffView !== 'detail'}>
        <StaffDetail
          staffItem={staffItem}
          selectMasterCount={selectMasterCount}
          userRole={userRole}
          hotelRole={hotelRole}
          userPhoneNumber={userPhoneNumber}
          handleChange={handleChange}
          handleGoBack={handleGoBack}
          handleModal={handleModal}
          handleSelectStaff={handleSelectStaff}
          handleUpdateStaff={handleUpdateStaff}
          handleSelectStaffSignup={handleSelectStaffSignup}
        />
      </div>
      <div hidden={staffView !== 'staffkey'}>
          <StaffkeyListContainer
            isOpen={staffView === 'staffkey'}
            staffId={detailField.staffId}
            staffRole={staffItem.role}
            handleGoBack={handleGoBack}
          />
      </div>
        <StaffSignupContainer
          isOpen={isOpenStaffSignupModal}
          toggle={() => setIsOpenStaffSignupModal(!isOpenStaffSignupModal)}
          reload={() => listStaff()}
          staffPhoneNumber={staffItem.countryNumber + Number.parseInt(staffItem.phoneNumber)}
          staffName={staffItem.name}
        />
        <StaffDeleteContainer
          isOpen={isOpenStaffDeleteModal}
          toggle={() => setIsOpenStaffDeleteModal(!isOpenStaffDeleteModal)}
          reload={reload}
          staffId={detailField.staffId}
          staffName={staffItem.name}
        />
        <ResponseSuccessModal
          isOpen={isOpenStaffUpdateSuccessModal}
          toggle={() => setIsOpenStaffUpdateSuccessModal(!isOpenStaffUpdateSuccessModal)}
          message='스태프 정보 수정이 완료 되었습니다.'
        />
        <ResponseFailModal
          isOpen={isOpenStaffUpdateFailModal}
          toggle={() => setIsOpenStaffUpdateFailModal(!isOpenStaffUpdateFailModal)}
          message={messageStaffUpdateFail || '스태프 정보 수정에 실패 하였습니다.'}
        />
    </Fragment>
  );
}

export default StaffDetailContainer;