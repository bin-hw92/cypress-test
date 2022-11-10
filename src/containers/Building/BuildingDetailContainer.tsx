import React, { useState, useRef, useCallback, ChangeEvent, useEffect, Fragment } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeField, changeResult, listBuildingTypeAction, selectBuildingAction, updateBuildingAction } from '../../stores/building';
import { changeProps } from '../../types/commons';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import BuildingDetail from '../../components/Building/BuildingDetail';
import BuildingDeleteContainer from './BuildingDeleteContainer';
import { BuildingDetailContainerProps } from '../../types/building';

const BuildingDetailContainer = ({
    isOpen,
    listBuilding,
    handleViewChange
}:BuildingDetailContainerProps) => {
  const dispatch = useDispatch();
  const { buildingItem, buildingTypeItem, buildingSuccess, buildingError, detailField, userRole } = useSelector(({ building, buildingList, header }:RootState) => ({
      buildingItem: building.building,
      buildingTypeItem: building.buildingtype,
      buildingSuccess: building.buildingUpdateSuccess,
      buildingError: building.buildingUpdateError,
      detailField: buildingList.detailField,
      userRole: header.userRole,
  }));
  const commonroomInputRef = useRef<any|null>(null);
  const [ isOpenBuildingDeleteModal, setIsOpenBuildingDeleteModal ] = useState<boolean>(false);
  const [ isOpenBuildingUpdateSuccessModal, setIsOpenBuildingUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenBuildingUpdateFailModal, setIsOpenBuildingUpdateFailModal ] = useState<boolean>(false);
  const [ messageBuildingUpdateFail, setMessageBuildingUpdateFail ] = useState<string>('');
  const [ editableCommonroom, setEditableCommonroom ] = useState<number|null>(null);

  const handleSelectBuilding = useCallback(() => {
    dispatch(selectBuildingAction({buildingId: detailField.buildingId}));
  },[detailField.buildingId, dispatch]);

  const handleListBuildingType = useCallback(() => {
    dispatch(listBuildingTypeAction());
  },[dispatch]);

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
    const commonrooms = buildingItem.commonrooms.map((commonroom:any, index:number) => {
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

  const dateFormatter = (date:Date) => {
    return moment(date).format('YYYY-MM-DD HH:mm');
  };

  const handleModal = () => {
    setIsOpenBuildingDeleteModal(true);
  }
  const handleGoBack = () => {
    listBuilding();
    handleViewChange('building', 'list');
    setEditableCommonroom(null);
    dispatch(
      changeResult({
        key: 'buildingUpdateError',
        value: null,
      })
    );
  }

  const reload = () => {
    listBuilding();
    handleViewChange('building', 'list');
  };

  const handleUpdateBuilding = useCallback(() => {
    dispatch(updateBuildingAction({...buildingItem, buildingId: detailField.buildingId}));
  },[detailField.buildingId, buildingItem, dispatch]);

  useEffect(()=> {
    if(buildingError){
      if (!buildingError.response) setMessageBuildingUpdateFail(buildingError.message);
      else setMessageBuildingUpdateFail(`${buildingError.response.data.code}, ${buildingError.response.data.message}`);

      if(buildingError.response.data.code === 401 || buildingError.response.data.code === 419) reload();
      else setIsOpenBuildingUpdateFailModal(true);
    }
    if(buildingSuccess){
      setIsOpenBuildingUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenBuildingUpdateSuccessModal(false);
        handleSelectBuilding();
        dispatch(
          changeResult({
            key: 'buildingUpdateSuccess',
            value: false,
          })
        );
      }, 1500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[buildingSuccess, buildingError, handleSelectBuilding, dispatch]);

  useEffect(() => {
    try {
      if (isOpen && detailField.buildingId) {
        handleListBuildingType();
        handleSelectBuilding();
      }
    } catch (error) {
      throw error;
    }
  }, [isOpen, detailField.buildingId, handleSelectBuilding, handleListBuildingType]);

  return (
      <Fragment>
          <BuildingDetail
            buildingItem={buildingItem}
            buildingTypeItem={buildingTypeItem}
            commonroomInputRef={commonroomInputRef}
            editableCommonroom={editableCommonroom}
            userRole={userRole}
            dateFormatter={dateFormatter}
            handleChange={handleChange}
            handleAddCommonroom={handleAddCommonroom}
            handleRemoveCommonroom={handleRemoveCommonroom}
            handleEditableCommonroom={handleEditableCommonroom}
            handleChangeCommonroom={handleChangeCommonroom}
            handleUpdateBuilding={handleUpdateBuilding}
            handleSelectBuilding={handleSelectBuilding}
            handleModal={handleModal}
            handleGoBack={handleGoBack} 
          />
          <BuildingDeleteContainer
            isOpen={isOpenBuildingDeleteModal}
            toggle={() => setIsOpenBuildingDeleteModal(!isOpenBuildingDeleteModal)}
            reload={reload}
            buildingId={detailField.buildingId}
            buildingName={buildingItem.name} 
          />
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

export default BuildingDetailContainer;