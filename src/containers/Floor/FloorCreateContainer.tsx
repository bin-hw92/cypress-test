import React, { useState, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FloorCreate from '../../components/Floor/FloorCreate';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { changeField, initialize, createFloorAction, changeResult } from '../../stores/floor';
import { FloorCreateContainerProps } from '../../types/floor';

const FloorCreateContainer = ({
  isOpen,
  toggle,
  reload,
  buildingId,
}:FloorCreateContainerProps) => {
  const dispatch = useDispatch();
  const { floorItem, floorSuccess, floorError, } = useSelector(({ floor }:RootState) => ({
    floorItem: floor.floor,
    floorSuccess: floor.floorCreateSuccess,
    floorError: floor.floorCreateError,
  }));
  const [ isOpenFloorCreateSuccessModal, setIsOpenFloorCreateSuccessModal ] = useState<boolean>(false);
  const [ isOpenFloorCreateFailModal, setIsOpenFloorCreateFailModal ] = useState<boolean>(false);
  const [ messageFloorCreateFail, setMessageFloorCreateFail ] = useState<string>('');

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

  const handleCreateFloor = useCallback(() => {
    dispatch(createFloorAction({...floorItem, buildingId}));
  },[buildingId, dispatch, floorItem]);

  useEffect(() => {
    if (isOpen){
      dispatch(initialize());
    } 
  }, [isOpen, dispatch]);

  useEffect(() => {
    if(floorError){
      if (!floorError.response) setMessageFloorCreateFail(floorError.message);
      else setMessageFloorCreateFail(`${floorError.response.data.code}, ${floorError.response.data.message}`);

      if(floorError.response.data.code === 401 || floorError.response.data.code === 419) reload();
      else setIsOpenFloorCreateFailModal(true);
      dispatch(
        changeResult({
          key: 'floorCreateError',
          value: null,
        })
      );
      return;
    }
    if(floorSuccess){
      toggle();
      setIsOpenFloorCreateSuccessModal(true);
      setTimeout(() => {
        setIsOpenFloorCreateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(
        changeResult({
          key: 'floorCreateSuccess',
          value: false,
        })
      );
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
          <FloorCreate 
            floorItem={floorItem}
            handleChange={handleChange}
            handleCreateFloor={handleCreateFloor}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenFloorCreateSuccessModal}
        toggle={() => setIsOpenFloorCreateSuccessModal(!isOpenFloorCreateSuccessModal)}
        message='층 생성이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenFloorCreateFailModal}
        toggle={() => setIsOpenFloorCreateFailModal(!isOpenFloorCreateFailModal)}
        message={messageFloorCreateFail || '층 생성에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default FloorCreateContainer;