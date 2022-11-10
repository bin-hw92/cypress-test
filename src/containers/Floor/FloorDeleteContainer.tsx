import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FloorDelete from '../../components/Floor/FloorDelete';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { changeResult, deleteFloorAction, initialize } from '../../stores/floor';
import { FloorDeleteContainerProps } from '../../types/floor';

const FloorDeleteContainer = ({
  isOpen,
  toggle,
  reload,
  buildingId,
  floorId,
  floorName,
}:FloorDeleteContainerProps) => {
  const dispatch = useDispatch();
  const { floorSuccess, floorError, } = useSelector(({ floor }:RootState) => ({
    floorSuccess: floor.floorDeleteSuccess,
    floorError: floor.floorDeleteError,
  }));
  const [ isOpenFloorDeleteSuccessModal, setIsOpenFloorDeleteSuccessModal ] = useState<boolean>(false);
  const [ isOpenFloorDeleteFailModal, setIsOpenFloorDeleteFailModal ] = useState<boolean>(false);
  const [ messageFloorDeleteFail, setMessageFloorDeleteFail ] = useState<string>('');

  const handleDeleteFloor = useCallback(() => {
    dispatch(deleteFloorAction({buildingId, floorId}));
  },[buildingId, dispatch, floorId]);

  useEffect(() => {
    if(floorError){
      if (!floorError.response) setMessageFloorDeleteFail(floorError.message);
      else setMessageFloorDeleteFail(`${floorError.response.data.code}, ${floorError.response.data.message}`);

      if(floorError.response.data.code === 401 || floorError.response.data.code === 419) reload();
      else setIsOpenFloorDeleteFailModal(true);
      dispatch(
        changeResult({
          key: 'floorDeleteError',
          value: null,
        })
      );
      return;
    }
    if(floorSuccess){
      toggle();
      setIsOpenFloorDeleteSuccessModal(true);
      setTimeout(() => {
        setIsOpenFloorDeleteSuccessModal(false);
        reload();
      }, 1500);
      dispatch(initialize()); //floor.ts 전역상태 초기화
    }
  },[floorSuccess, floorError, toggle, reload, dispatch]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <FloorDelete 
            floorName={floorName}
            handleDeleteFloor={handleDeleteFloor}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenFloorDeleteSuccessModal}
        toggle={() => setIsOpenFloorDeleteSuccessModal(!isOpenFloorDeleteSuccessModal)}
        message='층 삭제가 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenFloorDeleteFailModal}
        toggle={() => setIsOpenFloorDeleteFailModal(!isOpenFloorDeleteFailModal)}
        message={messageFloorDeleteFail || '층 삭제에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default FloorDeleteContainer;