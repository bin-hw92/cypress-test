import React, { useState, Fragment, useCallback, ChangeEvent, useEffect } from 'react';
import FloorDetail from '../../components/Floor/FloorDetail';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeField, changeResult, selectFloorAction, updateFloorAction } from '../../stores/floor';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import FloorDeleteContainer from './FloorDeleteContainer';
import { FloorDetailContainerProps } from '../../types/floor';

const FloorDetailContainer = ({
  isOpen,
  listFloor,
  handleViewChange
}:FloorDetailContainerProps) => {
  const dispatch = useDispatch();
  const { floorItem, floorSuccess, floorError, detailField, userRole } = useSelector(({ floor, floorList, header }:RootState) => ({
    floorItem: floor.floor,
    floorSuccess: floor.floorUpdateSuccess,
    floorError: floor.floorUpdateError,
    detailField: floorList.detailField,
    userRole: header.userRole,
  }));
  const [ isOpenFloorDeleteModal, setIsOpenFloorDeleteModal ] = useState<boolean>(false);
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
    dispatch(selectFloorAction({buildingId: detailField.buildingId, floorId: detailField.floorId}));
  },[detailField, dispatch]);

  const handleModal = () => {
    setIsOpenFloorDeleteModal(true);
  }

  const handleGoBack = () => {
    listFloor();
    handleViewChange('floor', 'list');
    dispatch(
      changeResult({
        key: 'floorUpdateError',
        value: null,
      })
    );
  }

  const reload = () => {
    listFloor();
    handleViewChange('floor', 'list');
  };

  const handleUpdateFloor = useCallback(() => {
    dispatch(updateFloorAction({...floorItem, buildingId: detailField.buildingId, floorId: detailField.floorId}));
  },[dispatch, floorItem, detailField]);

  useEffect(()=> {
    if(floorError){
      if (!floorError.response) setMessageFloorUpdateFail(floorError.message);
      else setMessageFloorUpdateFail(`${floorError.response.data.code}, ${floorError.response.data.message}`);

      if(floorError.response.data.code === 401 || floorError.response.data.code === 419) reload();
      else setIsOpenFloorUpdateFailModal(true);
    }
    if(floorSuccess){
      setIsOpenFloorUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenFloorUpdateSuccessModal(false);
        handleSelectFloor();
        dispatch(
          changeResult({
            key: 'floorUpdateSuccess',
            value: false,
          })
        );
      }, 1500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[floorSuccess, floorError, handleSelectFloor, dispatch]);

  useEffect(() => {
    try {
      if (isOpen && detailField.buildingId && detailField.floorId) handleSelectFloor();
    } catch (error) {
      throw error;
    }
  }, [isOpen, detailField, handleSelectFloor]);

  return (
    <Fragment>
      <FloorDetail
        floorItem={floorItem}
        userRole={userRole}
        handleChange={handleChange}
        handleUpdateFloor={handleUpdateFloor}
        handleSelectFloor={handleSelectFloor}
        handleModal={handleModal}
        handleGoBack={handleGoBack} 
      />
      <FloorDeleteContainer
        isOpen={isOpenFloorDeleteModal}
        toggle={() => setIsOpenFloorDeleteModal(!isOpenFloorDeleteModal)}
        reload={reload}
        buildingId={detailField.buildingId}
        floorId={detailField.floorId}
        floorName={floorItem.name}
      />
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

export default FloorDetailContainer;