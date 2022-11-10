import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import BuildingDelete from '../../components/Building/BuildingDelete';
import { changeResult, deleteBuildingAction, initialize } from '../../stores/building';
import { BuildingDeleteContainerProps } from '../../types/building';

const BuildingDeleteContainer = ({
  isOpen,
  toggle,
  reload,
  buildingId,
  buildingName,
}:BuildingDeleteContainerProps) => {
  const dispatch = useDispatch();
  const { buildingSuccess, buildingError } = useSelector(({ building }:RootState) => ({
      buildingSuccess: building.buildingDeleteSuccess,
      buildingError: building.buildingDeleteError,
  }));
  const [ isOpenBuildingDeleteSuccessModal, setIsOpenBuildingDeleteSuccessModal ] = useState<boolean>(false);
  const [ isOpenBuildingDeleteFailModal, setIsOpenBuildingDeleteFailModal ] = useState<boolean>(false);
  const [ messageBuildingDeleteFail, setMessageBuildingDeleteFail ] = useState<string>('');

  const handleDeleteHotel = useCallback(() => {
    dispatch(deleteBuildingAction({buildingId}));
  },[buildingId, dispatch]);


  useEffect(() => {
    if(buildingError){
      toggle();
      if (!buildingError.response) setMessageBuildingDeleteFail(buildingError.message);
      else setMessageBuildingDeleteFail(`${buildingError.response.data.code}, ${buildingError.response.data.message}`);

      if(buildingError.response.data.code === 401 || buildingError.response.data.code === 419) reload();
      else setIsOpenBuildingDeleteFailModal(true);
      dispatch(
        changeResult({
          key: 'buildingDeleteError',
          value: null,
        })
      );
      return;
    }
    if(buildingSuccess){
      toggle();
      setIsOpenBuildingDeleteSuccessModal(true);
      setTimeout(() => {
        setIsOpenBuildingDeleteSuccessModal(false);
        reload();
      }, 1500);
      dispatch(initialize()); //hotel.ts 전역상태 초기화
    }
  },[dispatch, buildingError, buildingSuccess, reload, toggle]);
  
  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <BuildingDelete 
            buildingName={buildingName}
            toggle={toggle}
            handleDeleteHotel={handleDeleteHotel}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenBuildingDeleteSuccessModal}
        toggle={() => setIsOpenBuildingDeleteSuccessModal(!isOpenBuildingDeleteSuccessModal)}
        message='빌딩 삭제가 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenBuildingDeleteFailModal}
        toggle={() => setIsOpenBuildingDeleteFailModal(!isOpenBuildingDeleteFailModal)}
        message={messageBuildingDeleteFail || '빌딩 삭제에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default BuildingDeleteContainer;