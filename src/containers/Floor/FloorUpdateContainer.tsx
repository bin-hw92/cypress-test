import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FloorUpdate from '../../components/Floor/FloorUpdate';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { changeField, changeResult, initialize, selectFloorAction, updateFloorAction } from '../../stores/floor';
import { FloorUpdateContainerProps } from '../../types/floor';

const FloorUpdateContainer = ({
  isOpen,
  toggle,
  reload,
  buildingId,
  floorId,
}:FloorUpdateContainerProps) => {
  const dispatch = useDispatch();
  const { floorItem, floorSuccess, floorError, } = useSelector(({ floor }:RootState) => ({
    floorItem: floor.floor,
    floorSuccess: floor.floorUpdateSuccess,
    floorError: floor.floorUpdateError,
  }));
  const [ isOpenFloorUpdateSuccessModal, setIsOpenFloorUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenFloorUpdateFailModal, setIsOpenFloorUpdateFailModal ] = useState<boolean>(false);
  const [ messageFloorUpdateFail, setMessageFloorUpdateFail ] = useState<string>('');

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

  const handleSelectFloor = useCallback(() => {
    dispatch(selectFloorAction({buildingId, floorId}));
  },[buildingId, dispatch, floorId]);

  const handleUpdateFloor = useCallback(() => {
    dispatch(updateFloorAction({...floorItem, buildingId, floorId}));
  },[buildingId, dispatch, floorId, floorItem]);

  useEffect(() => {
    if (isOpen && floorId){
      //화면이 나타날 때 초기화
      dispatch(initialize());
      handleSelectFloor();
      setIsOpenFloorUpdateFailModal(false);
      setIsOpenFloorUpdateSuccessModal(false);
    } 
  }, [buildingId, dispatch, floorId, handleSelectFloor, isOpen]);

  useEffect(() => {
    if(floorError){
      if (!floorError.response) setMessageFloorUpdateFail(floorError.message);
      else setMessageFloorUpdateFail(`${floorError.response.data.code}, ${floorError.response.data.message}`);

      if(floorError.response.data.code === 401 || floorError.response.data.code === 419) reload();
      else setIsOpenFloorUpdateFailModal(true);
      dispatch(
        changeResult({
          key: 'floorUpdateError',
          value: null,
        })
      );
      return;
    }
    if(floorSuccess){
      toggle();
      setIsOpenFloorUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenFloorUpdateSuccessModal(false);
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
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <FloorUpdate
            floorItem={floorItem}
            handleChange={handleChange}
            handleUpdateFloor={handleUpdateFloor}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenFloorUpdateSuccessModal}
        toggle={() => setIsOpenFloorUpdateSuccessModal(!isOpenFloorUpdateSuccessModal)}
        message='층 정보 수정이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenFloorUpdateFailModal}
        toggle={() => setIsOpenFloorUpdateFailModal(!isOpenFloorUpdateFailModal)}
        message={messageFloorUpdateFail || '층 정보 수정에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default FloorUpdateContainer;