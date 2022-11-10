import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import RoomUpdate from '../../components/Room/RoomUpdate';
import { RootState } from '../../stores';
import { changeField, changeResult, initialize, selectRoomAction, updateRoomAction } from '../../stores/room';
import { RoomUpdateContainerProps } from '../../types/room';

const RoomUpdateContainer = ({
  isOpen,
  toggle,
  reload,
  buildingId,
  floorId,
  roomId,
}:RoomUpdateContainerProps) => {
  const dispatch = useDispatch();
  const { roomItem, roomSuccess, roomError, } = useSelector(({ room }:RootState) => ({
      roomItem: room.room,
      roomSuccess: room.roomUpdateSuccess,
      roomError: room.roomUpdateError,
  }));
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

  const handleSelectRoom = useCallback(() => {
    dispatch(selectRoomAction({buildingId, floorId, roomId}));
  },[buildingId, dispatch, floorId, roomId]);

  const handleUpdateRoom = useCallback(() => {
    dispatch(updateRoomAction({...roomItem, buildingId, floorId, roomId}));
  },[buildingId, dispatch, floorId, roomId, roomItem]);

  useEffect(() => {
    if (isOpen && roomId){
      //화면이 나타날 때 초기화
      dispatch(initialize());
      handleSelectRoom();
      setIsOpenRoomUpdateFailModal(false);
      setIsOpenRoomUpdateSuccessModal(false);
    } 
  }, [buildingId, roomId, isOpen, floorId, handleSelectRoom, dispatch]);
  
  useEffect(() => {
    if(roomError){
      if (!roomError.response) setMessageRoomUpdateFail(roomError.message);
      else setMessageRoomUpdateFail(`${roomError.response.data.code}, ${roomError.response.data.message}`);

      if(roomError.response.data.code === 401 || roomError.response.data.code === 419) reload();
      else setIsOpenRoomUpdateFailModal(true);
      dispatch(
        changeResult({
          key: 'roomUpdateError',
          value: null,
        })
      );
      return;
    }
    if(roomSuccess){
      toggle();
      setIsOpenRoomUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenRoomUpdateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(initialize()); //room.ts 전역상태 초기화
    }
  },[roomSuccess, roomError, toggle, reload, dispatch]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <RoomUpdate
                roomItem={roomItem}
                handleChange={handleChange}
                handleUpdateRoom={handleUpdateRoom}
                toggle={toggle}
          />
        </ModalBody>
      </Modal>
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
};

export default RoomUpdateContainer;