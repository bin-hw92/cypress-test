import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import RoomDelete from '../../components/Room/RoomDelete';
import { RootState } from '../../stores';
import { changeResult, deleteRoomAction, initialize } from '../../stores/room';
import { RoomDeleteContainerProps } from '../../types/room';

const RoomDeleteContainer = ({
  isOpen,
  toggle,
  reload,
  buildingId,
  floorId,
  roomId,
  roomName,
}:RoomDeleteContainerProps) => {
  const dispatch = useDispatch();
  const { roomSuccess, roomError, } = useSelector(({ room }:RootState) => ({
      roomSuccess: room.roomDeleteSuccess,
      roomError: room.roomDeleteError,
  }));
  const [ isOpenRoomDeleteSuccessModal, setIsOpenRoomDeleteSuccessModal ] = useState<boolean>(false);
  const [ isOpenRoomDeleteFailModal, setIsOpenRoomDeleteFailModal ] = useState<boolean>(false);
  const [ messageRoomDeleteFail, setMessageRoomDeleteFail ] = useState<string>('');

  const handleDeleteRoom = useCallback(() => {
   dispatch(deleteRoomAction({buildingId, floorId, roomId}));
  },[buildingId, dispatch, floorId, roomId]);

  useEffect(() => {
    if(roomError){
      if (!roomError.response) setMessageRoomDeleteFail(roomError.message);
      else setMessageRoomDeleteFail(`${roomError.response.data.code}, ${roomError.response.data.message}`);

      if(roomError.response.data.code === 401 || roomError.response.data.code === 419) reload();
      else setIsOpenRoomDeleteFailModal(true);
      dispatch(
        changeResult({
          key: 'roomDeleteError',
          value: null,
        })
      );
      return;
    }
    if(roomSuccess){
      toggle();
      setIsOpenRoomDeleteSuccessModal(true);
      setTimeout(() => {
        setIsOpenRoomDeleteSuccessModal(false);
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
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <RoomDelete 
              roomName={roomName}
              handleDeleteRoom={handleDeleteRoom}
              toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenRoomDeleteSuccessModal}
        toggle={() => setIsOpenRoomDeleteSuccessModal(!isOpenRoomDeleteSuccessModal)}
        message='객실 삭제가 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenRoomDeleteFailModal}
        toggle={() => setIsOpenRoomDeleteFailModal(!isOpenRoomDeleteFailModal)}
        message={messageRoomDeleteFail || '객실 삭제에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default RoomDeleteContainer;