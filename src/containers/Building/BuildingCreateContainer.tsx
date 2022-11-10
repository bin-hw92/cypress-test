import React, { useState, useRef, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import BuildingCreate from '../../components/Building/BuildingCreate';
import { changeField, changeResult, createBuildingAction, initialize, listBuildingTypeAction } from '../../stores/building';
import { BuildingCreateContainerProps } from '../../types/building';

const BuildingCreateContainer = ({
  isOpen,
  toggle,
  reload,
}:BuildingCreateContainerProps) => {
  const hotelId = localStorage.getItem('hotel_id');
  const dispatch = useDispatch();
  const { buildingItem, buildingTypeItem, buildingSuccess, buildingError, } = useSelector(({ building }:RootState) => ({
      buildingItem: building.building,
      buildingTypeItem: building.buildingtype,
      buildingSuccess: building.buildingCreateSuccess,
      buildingError: building.buildingCreateError,
  }));
  const commonroomInputRef = useRef<any|null>(null);
  const [ isOpenBuildingCreateSuccessModal, setIsOpenBuildingCreateSuccessModal ] = useState<boolean>(false);
  const [ isOpenBuildingCreateFailModal, setIsOpenBuildingCreateFailModal ] = useState<boolean>(false);
  const [ messageBuildingCreateFail, setMessageBuildingCreateFail ] = useState<string>('');

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

  const handleAddCommonroom = () => {
    if (!commonroomInputRef.current.value) return;
    const commonrooms = [...buildingItem.commonrooms];
    commonrooms.push({name: commonroomInputRef.current.value});
    dispatch(
      changeField({
          key: 'commonrooms',
          value: commonrooms,
      })
    );
    commonroomInputRef.current.value = null;
  };

  const handleRemoveCommonroom = (index:number) => {
    const commonrooms = [...buildingItem.commonrooms];
    commonrooms.splice(index, 1);
    dispatch(
      changeField({
          key: 'commonrooms',
          value: commonrooms,
      })
    );
  };

  const handleCreateBuilding = useCallback(() => {
    dispatch(createBuildingAction(buildingItem));
  },[buildingItem, dispatch]);

  useEffect(() => {
    if (isOpen){
      dispatch(listBuildingTypeAction());
      dispatch(initialize());
    } 
  }, [isOpen, hotelId, dispatch]);

  useEffect(() => {
    if(buildingError){
      if (!buildingError.response) setMessageBuildingCreateFail(buildingError.message);
      else setMessageBuildingCreateFail(`${buildingError.response.data.code}, ${buildingError.response.data.message}`);

      if(buildingError.response.data.code === 401 || buildingError.response.data.code === 419) reload();
      else setIsOpenBuildingCreateFailModal(true);
      dispatch(
        changeResult({
          key: 'buildingCreateError',
          value: null,
        })
      );
      return;
    }
    if(buildingSuccess){
        toggle();
        setIsOpenBuildingCreateSuccessModal(true);
        setTimeout(() => {
          setIsOpenBuildingCreateSuccessModal(false);
          reload();
        }, 1500);
        dispatch(
          changeResult({
            key: 'buildingCreateSuccess',
            value: false,
          })
        );
    }
  },[buildingSuccess, buildingError, toggle, reload, dispatch]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <BuildingCreate 
            buildingItem={buildingItem}
            buildingTypeItem={buildingTypeItem}
            commonroomInputRef={commonroomInputRef}
            handleAddCommonroom={handleAddCommonroom}
            handleChange={handleChange}
            handleRemoveCommonroom={handleRemoveCommonroom}
            handleCreateBuilding={handleCreateBuilding}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenBuildingCreateSuccessModal}
        toggle={() => setIsOpenBuildingCreateSuccessModal(!isOpenBuildingCreateSuccessModal)}
        message='빌딩 생성이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenBuildingCreateFailModal}
        toggle={() => setIsOpenBuildingCreateFailModal(!isOpenBuildingCreateFailModal)}
        message={messageBuildingCreateFail || '빌딩 생성에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default BuildingCreateContainer;