import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MultiValue } from 'react-select';
import { ResponseFailModal } from '../../components/Modal/Response';
import StaffkeyIssue from '../../components/Staffkey/StaffkeyIssue';
import { RootState } from '../../stores';
import { listBuildingAction } from '../../stores/buildingList';
import { listCommonRoomAction, initialize as initializeCommon, listCommonRoomBuildingAction } from '../../stores/commonroom';
import { listRoomAction } from '../../stores/roomList';
import { changeAllField } from '../../stores/sms';
import { changeMobileField, changeResult, initialize, initializeMobile, issueStaffMobilekeyAction, selectStaffAction } from '../../stores/staff';
import { StaffkeyIssueContainerProps } from '../../types/staff';
import { SMSSendContainer } from '../Commons/SMSSendContainer';

const StaffkeyIssueContainer = ({
  isOpen,
  toggle,
  reload,
  staffId,
}:StaffkeyIssueContainerProps) => {
  const dispatch = useDispatch();
  const { staffItem, keyIssueItem, staffMobileKeyItem, staffMobileKeyError, buildingItems, roomListItems, commonroomListItems, commonroomBuildingListItems } = useSelector(({ staff, buildingList, roomList, commonroom, hotel }:RootState) => ({
    staffItem: staff.staff,
    keyIssueItem: staff.keyIssueItem,
    staffMobileKeyItem: staff.staffkeyIssueItem,
    staffMobileKeyError: staff.staffkeyIssueError,
    buildingItems: buildingList.buildingListItems,
    roomListItems: roomList.roomListItems,
    commonroomListItems: commonroom.commonroomItems,
    commonroomBuildingListItems: commonroom.commonroomBuildingItems,
  }));
  const hotelId = localStorage.getItem('hotel_id');
  const [ isOpenStaffkeyIssueSuccessModal, setIsOpenStaffkeyIssueSuccessModal ] = useState<boolean>(false);
  const [ isOpenStaffkeyIssueFailModal, setIsOpenStaffkeyIssueFailModal ] = useState<boolean>(false);
  const [ messageStaffkeyIssueFail, setMessageStaffkeyIssueFail ] = useState<string>('');
  const [ commonroomItems, setCommonroomItems ] = useState<any[]>([]);
  const [ roomItems, setRoomItems ] = useState<any[]>([]);

  //?????? ?????? ????????? ?????????
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const value2 = name === 'roomIds'? [e.target.value] : value;
    dispatch(
        changeMobileField({
            key: name,
            value: value2,
        })
    );
  },[dispatch]);

  //?????? ????????? ??????
  const handleChangeDate = useCallback((date:Date, name:string) => {
    date.setSeconds(0, 0);
    dispatch(
      changeMobileField({
            key: name,
            value: date,
        })
    );
  },[dispatch]);

  const handleChangeArray = useCallback((selectedArray:MultiValue<any>, name: string) => {
    if(name === 'roomIds'){
      dispatch(
        changeMobileField({
            key: 'roomIds',
            value: selectedArray ? selectedArray.map((room) => room.value) : [],
        })
      ); 
    }
    if(name === 'commonroomIds'){
      dispatch(
        changeMobileField({
            key: 'commonroomIds',
            value: selectedArray ? selectedArray.map((commonroom) => commonroom.value) : [],
        })
      );
    }
  },[dispatch]);
  
  const handleSelectStaff = useCallback(() => {
    dispatch(selectStaffAction({staffId}));
  },[dispatch, staffId]);

  const handleListCommonroom = useCallback(() => {
    dispatch(listCommonRoomAction({}));
  },[dispatch]);
  
  const handleListBuildingCommonroom = useCallback(() => {
    dispatch(listCommonRoomBuildingAction({buildingId: keyIssueItem.buildingId}));
  },[dispatch, keyIssueItem.buildingId]);

  const handleListRoom = useCallback(() => {
    if(keyIssueItem.buildingId) dispatch(listRoomAction({buildingId: keyIssueItem.buildingId}));
  },[dispatch, keyIssueItem.buildingId]);

  const handleListBuilding = useCallback(() => {
    dispatch(listBuildingAction({}));
  },[dispatch]);

  const handleIssueKey = useCallback(() => {
    dispatch(issueStaffMobilekeyAction({staffId, ...keyIssueItem}));
  },[dispatch, keyIssueItem, staffId]);

  const handleReload = () => {
    reload();
    dispatch(initialize());
  }

  const handleToggle = () => {
    dispatch(changeResult({
      key: 'staffkeyIssueError',
      value: null,
    }));
    toggle();
  }
  
  //issueMobileKey ?????? ??????, ??????
  useEffect(() => {
    if(staffMobileKeyError){      
      if (!staffMobileKeyError.response) setMessageStaffkeyIssueFail(staffMobileKeyError.message);
      else setMessageStaffkeyIssueFail(`${staffMobileKeyError.response.data.code}, ${staffMobileKeyError.response.data.message}`);
      setIsOpenStaffkeyIssueFailModal(true);
      dispatch(changeResult({
        key: 'staffkeyIssueError',
        value: null,
      }));
      return;
    }
    //sms ??????????????? ??????
    if(staffMobileKeyItem){
      dispatch(changeAllField({
        sms: {
          type: 'mobilekey',
          phoneNumber: '82' + Number.parseInt(staffItem.phoneNumber),
          value: staffMobileKeyItem.exchangekey,
        }
      }));
      setIsOpenStaffkeyIssueSuccessModal(true);
    }
  },[staffMobileKeyItem, staffMobileKeyError, dispatch, staffItem]);

  useEffect(() => {
    if (hotelId && isOpen) handleListCommonroom();
  }, [hotelId, isOpen, handleListCommonroom]);

  useEffect(() => {
    if (keyIssueItem.buildingId){
      handleListRoom();
      handleListBuildingCommonroom();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelId, keyIssueItem.buildingId, handleListRoom]);

  useEffect(() => {
    if (hotelId && isOpen) handleListBuilding();
  }, [hotelId, isOpen, handleListBuilding]);

  useEffect(() => {
    if (staffId){
      handleSelectStaff();  
      dispatch(initializeMobile());
      dispatch(initializeCommon());
    }
  }, [staffId, handleSelectStaff, dispatch]);

  useEffect(() => {
    if(roomListItems?.length){
      const newRoomItem = roomListItems.map((room:any) => {
        return room.status === 'installed'? {value: room.id, label: room.name, isDisabled: room.status !== 'installed'} : '';
      });
      setRoomItems(newRoomItem.filter(room => room !== ''));
    }else{
      setRoomItems([]);
    }
  },[roomListItems]);

  useEffect(() => {
    if(commonroomListItems?.length){
      const newCommonItem = commonroomListItems.map((commonroom:any) => {
        return commonroom.status === 'installed' && !commonroom.building_id? {value: commonroom.id, label: commonroom.name,  isDisabled: commonroom.status !== 'installed', building_id: null}: '';
      });
      setCommonroomItems(newCommonItem.filter(common => common !== ''));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[commonroomListItems]);

  useEffect(() => {
    if(commonroomBuildingListItems?.length){
      //?????? ?????? ???????????? ?????? ?????? ??????
      const newCommonroomItems = commonroomItems.map((commonroom:any) => {
        return !commonroom.building_id? {value: commonroom.value, label: commonroom.label,  isDisabled: commonroom.isDisabled, building_id: null }: '';
      });
      //?????? ????????? ?????? ???????????? ??????
      const newCommonItem = commonroomBuildingListItems.map((commonroom:any) => {
        return commonroom.status === 'installed'? {value: commonroom.id, label: commonroom.name,  isDisabled: commonroom.status !== 'installed', building_id: commonroom.building_id}: '';
      });
      //????????? ???????????? ?????????
      const result = newCommonroomItems.filter(common => common !== '').concat(newCommonItem.filter(common => common !== ''));
      setCommonroomItems(result);
    }else{
      //?????? ?????? ???????????? ?????? ?????? ??????
      const newCommonroomItems = commonroomItems.map((commonroom:any) => {
        return !commonroom.building_id? {value: commonroom.value, label: commonroom.label,  isDisabled: commonroom.isDisabled, building_id: null }: '';
      });
      setCommonroomItems(newCommonroomItems.filter(common => common !== ''));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[commonroomBuildingListItems]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <StaffkeyIssue 
            staffItem={staffItem}
            keyIssueItem={keyIssueItem}
            buildingItems={buildingItems}
            roomItems={roomItems} 
            commonroomItems={commonroomItems}
            handleChange={handleChange}
            handleChangeDate={handleChangeDate}
            handleChangeArray={handleChangeArray}
            handleIssueKey={handleIssueKey}
            toggle={handleToggle}
          />
        </ModalBody>
      </Modal>
      <SMSSendContainer
        isOpen={isOpenStaffkeyIssueSuccessModal}
        toggle={() => setIsOpenStaffkeyIssueSuccessModal(!isOpenStaffkeyIssueSuccessModal)}
        reload={() => {
          handleReload();
          toggle();
        }}
      />
      <ResponseFailModal
        isOpen={isOpenStaffkeyIssueFailModal}
        toggle={() => setIsOpenStaffkeyIssueFailModal(!isOpenStaffkeyIssueFailModal)}
        message={messageStaffkeyIssueFail || '???????????? ????????? ?????? ???????????????.'}
      />
    </Fragment>
  );
};

export default StaffkeyIssueContainer;