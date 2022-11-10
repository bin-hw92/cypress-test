import React, { Fragment, useState, useEffect, useCallback, ChangeEvent } from 'react';
import RoomDetail from '../../components/Room/RoomDetail';
import RoomDeleteContainer from './RoomDeleteContainer';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeField, changeResult, selectRoomAction, updateRoomAction, initialize } from '../../stores/room';
import { RoomDetailContainerProps } from '../../types/room';
import styled from 'styled-components';
import KeytagListContainer from '../Keytag/KeytagListContainer';
import { useNavigate } from 'react-router-dom';

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
      z-index: 9;

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

const RoomDetailContainer = ({
  isOpen,
  roomView,
  listRoom,
  handleViewChange,
}:RoomDetailContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { roomItem, roomSuccess, roomError, detailField, userRole } = useSelector(({ room, roomList, header }:RootState) => ({
    roomItem: room.room,
    roomSuccess: room.roomUpdateSuccess,
    roomError: room.roomUpdateError,
    detailField: roomList.detailField,
    userRole: header.userRole,
}));
  const [ isOpenRoomDeleteModal, setIsOpenRoomDeleteModal ] = useState<boolean>(false);
  const [ isOpenRoomUpdateSuccessModal, setIsOpenRoomUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenRoomUpdateFailModal, setIsOpenRoomUpdateFailModal ] = useState<boolean>(false);
  const [ messageRoomUpdateFail, setMessageRoomUpdateFail ] = useState<string>('');

  //인풋 변경 이벤트 핸들러
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const value2 = name === 'allowKeytag'? value === 'O'? true : false : value; 
    dispatch(
        changeField({
            key: name,
            value: value2,
        })
    );
  },[dispatch]);

  const handleModal = () => {
    setIsOpenRoomDeleteModal(true);
  }

  const handleGoBack = () => {
    listRoom();
    handleViewChange('room', 'list');
    dispatch(initialize());
  }

  const reload = () => {
    listRoom();
    handleViewChange('room', 'list');
  };

  const handleSelectRoom = useCallback(() => {
    dispatch(selectRoomAction({buildingId: detailField.buildingId, floorId: detailField.floorId, roomId: detailField.roomId}));
  },[dispatch, detailField]);

  const handleUpdateRoom = useCallback(() => {
    dispatch(updateRoomAction({...roomItem, buildingId: detailField.buildingId, floorId: detailField.floorId, roomId: detailField.roomId}));
  },[dispatch, roomItem, detailField]);

  const handleRoomType = useCallback((type:'detail'|'keytag') => {
    handleViewChange('room', type);
  },[handleViewChange]);

  useEffect(() => {
    try {
      if (isOpen && detailField.roomId) handleSelectRoom();
    } catch (error) {
      throw error;
    }
  }, [handleSelectRoom, isOpen, detailField.roomId]);

  useEffect(()=> {
    if(roomError){
      if (!roomError.response) setMessageRoomUpdateFail(roomError.message);
      else setMessageRoomUpdateFail(`${roomError.response.data.code}, ${roomError.response.data.message}`);

      if(roomError.response.data.code === 401 || roomError.response.data.code === 419){
        localStorage.clear();
        navigation('/login');
      }else{
        setIsOpenRoomUpdateFailModal(true);
      }
      dispatch(
        changeResult({
          key: 'roomUpdateError',
          value: null,
        })
      );
      return;
    }
    if(roomSuccess){
      setIsOpenRoomUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenRoomUpdateSuccessModal(false);
        handleSelectRoom();
        dispatch(
          changeResult({
            key: 'roomUpdateSuccess',
            value: false,
          })
        );
      }, 1500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[roomSuccess, roomError, handleSelectRoom, dispatch]);

  return (
    <Fragment>
      <FormTabWrap>
        <ul>
          <li className={`tab-item ${roomView !== 'detail' ? 'inactive':''}`}
            onClick={() => handleRoomType('detail')}
          >객실 정보</li>
          <li className={`tab-item ${roomView !== 'keytag' ? 'inactive':''}`}
            onClick={() => handleRoomType('keytag')}
          >키택 목록</li>
        </ul>
      </FormTabWrap>
      
      {roomView === 'detail' &&
        <RoomDetail
          roomItem={roomItem}
          userRole={userRole}
          handleChange={handleChange}
          handleUpdateRoom={handleUpdateRoom}
          handleSelectRoom={handleSelectRoom}
          handleModal={handleModal}
          handleGoBack={handleGoBack} 
        />
      }
      {roomView === 'keytag' &&
        <KeytagListContainer
          isOpen={roomView === 'keytag'}
          buildingId={detailField.buildingId}
          floorId={detailField.floorId}
          roomId={detailField.roomId}
          handleGoBack={handleGoBack}
        />
      }
      <RoomDeleteContainer
        isOpen={isOpenRoomDeleteModal}
        toggle={() => setIsOpenRoomDeleteModal(!isOpenRoomDeleteModal)}
        reload={reload}
        buildingId={detailField.buildingId}
        floorId={detailField.floorId}
        roomId={detailField.roomId}
        roomName={roomItem.name}
      />
      <ResponseSuccessModal
        isOpen={isOpenRoomUpdateSuccessModal}
        toggle={() => setIsOpenRoomUpdateSuccessModal(!isOpenRoomUpdateSuccessModal)}
        message='객실 정보 수정이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenRoomUpdateFailModal}
        toggle={() => setIsOpenRoomUpdateFailModal(!isOpenRoomUpdateFailModal)}
        message={messageRoomUpdateFail || '객실 정보 수정에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default RoomDetailContainer;