import React, { useState, useRef, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import BuildingUpdate from '../../components/Building/BuildingUpdate';
import { changeProps } from '../../types/commons';
import { changeField, changeResult, initialize, listBuildingTypeAction, selectBuildingAction, updateBuildingAction } from '../../stores/building';
import { BuildingUpdateContainerProps } from '../../types/building';

const BuildingUpdateContainer = ({
  isOpen,
  toggle,
  reload,
  buildingId,
}:BuildingUpdateContainerProps) => {
  const dispatch = useDispatch();
  const { buildingItem, buildingTypeItem, buildingSuccess, buildingError, } = useSelector(({ building }:RootState) => ({
      buildingItem: building.building,
      buildingTypeItem: building.buildingtype,
      buildingSuccess: building.buildingUpdateSuccess,
      buildingError: building.buildingUpdateError,
  }));
  const commonroomInputRef = useRef<any|null>(null);
  const [ isOpenBuildingUpdateSuccessModal, setIsOpenBuildingUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenBuildingUpdateFailModal, setIsOpenBuildingUpdateFailModal ] = useState<boolean>(false);
  const [ messageBuildingUpdateFail, setMessageBuildingUpdateFail ] = useState<string>('');
  const [ editableCommonroom, setEditableCommonroom ] = useState<number|null>(null);

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

  const handleChangeCommonroom = ({id, name}:changeProps) => {
    const commonrooms = buildingItem.commonrooms.map((commonroom:any, index: number) => {
      const new_name = {...commonroom};
        if(commonroom.id){
          if (commonroom.id === id) new_name.name = name;
        }else{
          if (index === id) new_name.name = name;
        }
        return new_name;
    });
    dispatch(
      changeField({
        key: 'commonrooms',
        value: commonrooms,
      })
    );
  };

  const handleEditableCommonroom = (index:number) => {
    setEditableCommonroom(index);
  }

  const handleUpdateBuilding = useCallback(() => {
    dispatch(updateBuildingAction({...buildingItem, buildingId}));
  },[buildingId, buildingItem, dispatch]);

  useEffect(() => {
    if (isOpen){
      //화면이 나타날 때 초기화
      dispatch(initialize());
      dispatch(listBuildingTypeAction());
      dispatch(selectBuildingAction({buildingId}));
      setEditableCommonroom(null);
      setIsOpenBuildingUpdateFailModal(false);
      setIsOpenBuildingUpdateSuccessModal(false);
    }
  }, [buildingId, dispatch, isOpen]);
  
  useEffect(() => {
    if(buildingError){
      if (!buildingError.response) setMessageBuildingUpdateFail(buildingError.message);
      else setMessageBuildingUpdateFail(`${buildingError.response.data.code}, ${buildingError.response.data.message}`);

      if(buildingError.response.data.code === 401 || buildingError.response.data.code === 419) reload();
      else setIsOpenBuildingUpdateFailModal(true);
      dispatch(
        changeResult({
          key: 'buildingUpdateError',
          value: null,
        })
      );
      return;
    }
    if(buildingSuccess){
        toggle();
        setIsOpenBuildingUpdateSuccessModal(true);
        setTimeout(() => {
          setIsOpenBuildingUpdateSuccessModal(false);
          reload();
        }, 1500);
        dispatch(initialize()); //hotel.ts 전역상태 초기화
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
          <BuildingUpdate 
            buildingItem={buildingItem}
            buildingTypeItem={buildingTypeItem}
            commonroomInputRef ={commonroomInputRef}
            editableCommonroom={editableCommonroom}
            handleChange={handleChange}
            handleAddCommonroom={handleAddCommonroom}
            handleRemoveCommonroom={handleRemoveCommonroom}
            handleEditableCommonroom={handleEditableCommonroom}
            handleChangeCommonroom={handleChangeCommonroom}
            handleUpdateBuilding={handleUpdateBuilding}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenBuildingUpdateSuccessModal}
        toggle={() => setIsOpenBuildingUpdateSuccessModal(!isOpenBuildingUpdateSuccessModal)}
        message='빌딩 정보 수정이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenBuildingUpdateFailModal}
        toggle={() => setIsOpenBuildingUpdateFailModal(!isOpenBuildingUpdateFailModal)}
        message={messageBuildingUpdateFail || '빌딩 정보 수정에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default BuildingUpdateContainer;