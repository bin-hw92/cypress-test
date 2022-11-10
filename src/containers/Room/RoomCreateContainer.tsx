import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import RoomCreate from '../../components/Room/RoomCreate';
import { RootState } from '../../stores';
import { listFloorAction } from '../../stores/floorList';
import { changeField, changeResult, createRoomAction, initialize } from '../../stores/room';
import { RoomCreateContainerProps } from '../../types/room';

const RoomCreateContainer = ({
  isOpen,
  toggle,
  reload,
  buildingId,
  floorId,
}:RoomCreateContainerProps) => {
  const dispatch = useDispatch();
  const { roomItem, roomSuccess, roomError, floorListItems, } = useSelector(({ room, floorList }:RootState) => ({
      roomItem: room.room,
      roomSuccess: room.roomCreateSuccess,
      roomError: room.roomCreateError,
      floorListItems: floorList.floorListItems,
  }));
  const [ isOpenRoomCreateSuccessModal, setIsOpenRoomCreateSuccessModal ] = useState<boolean>(false);
  const [ isOpenRoomCreateFailModal, setIsOpenRoomCreateFailModal ] = useState<boolean>(false);
  const [ messageRoomCreateFail, setMessageRoomCreateFail ] = useState<string>('');

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

  const handleListFloor = useCallback(() => {
    dispatch(listFloorAction({buildingId}));
  },[buildingId, dispatch]);

  const handleCreateRoom = useCallback(() => {
    dispatch(createRoomAction({...roomItem, buildingId}));
  },[buildingId, dispatch, roomItem]);

  useEffect(() => {
    if (isOpen && buildingId){
      handleListFloor();
      dispatch(initialize());
    } 
  }, [isOpen, buildingId, handleListFloor, dispatch]);

  useEffect(() => {
    if(roomError){
      if (!roomError.response) setMessageRoomCreateFail(roomError.message);
      else setMessageRoomCreateFail(`${roomError.response.data.code}, ${roomError.response.data.message}`);

      if(roomError.response.data.code === 401 || roomError.response.data.code === 419) reload();
      else setIsOpenRoomCreateFailModal(true);
      dispatch(
        changeResult({
          key: 'roomCreateError',
          value: null,
        })
      );
      return;
    }
    if(roomSuccess){
      toggle();
      setIsOpenRoomCreateSuccessModal(true);
      setTimeout(() => {
        setIsOpenRoomCreateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'roomCreateSuccess',
          value: false,
        })
      );
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
          <RoomCreate 
              roomItem={roomItem}
              floorListItems={floorListItems}
              handleChange={handleChange}
              handleCreateRoom={handleCreateRoom}
              toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenRoomCreateSuccessModal}
        toggle={() => setIsOpenRoomCreateSuccessModal(!isOpenRoomCreateSuccessModal)}
        message='객실 생성이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenRoomCreateFailModal}
        toggle={() => setIsOpenRoomCreateFailModal(!isOpenRoomCreateFailModal)}
        message={messageRoomCreateFail || '객실 생성에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default RoomCreateContainer;