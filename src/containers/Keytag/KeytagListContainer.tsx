import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LimitButton from '../../components/Commons/LimitSelectBox';
import Pagination from '../../components/Commons/TablePagination';
import KeytagList from '../../components/Keytag/KeytagList';
import { RootState } from '../../stores';
import { listKeytagAction, setCurrentPageNumberAction, setPaginationItemAction } from '../../stores/keytagList';
import { KeytagListContainerProps, keytagListState } from '../../types/keytag';
import KeytagCreateContainer from './KeytagCreateContainer';
import KeytagDeleteContainer from './KeytagDeleteContainer';
import KeytagUpdateContainer from './KeytagUpdateContainer';

/* styled */
const FormCard = styled.article`
    width: 100%;
    position: relative;
`;

const KeytagListContainer = ({
  isOpen,
  buildingId,
  floorId,
  roomId,
  handleGoBack,
}:KeytagListContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();    
  const { keytagListTotal, keytagListItems, keytagError, currentPageNumber, paginationItem, userRole } = useSelector(({ keytagList, header }:RootState) => ({
    keytagListTotal: keytagList.keytagListTotal,
    keytagListItems: keytagList.keytagListItems,
    keytagError: keytagList.keytagListError,
    currentPageNumber: keytagList.currentPageNumber,
    paginationItem: keytagList.paginationItem,
    userRole: header.userRole,
  })); 
  const [ isOpenKeytagCreateModal, setIsOpenKeytagCreateModal ] = useState<boolean>(false);
  const [ isOpenKeytagUpdateModal, setIsOpenKeytagUpdateModal ] = useState<boolean>(false);
  const [ isOpenKeytagDeleteModal, setIsOpenKeytagDeleteModal ] = useState<boolean>(false);
  const [ selectedKeytagId, setSelectedKeytagId ] = useState<string>('');
  const [ selectedKeytagName, setSelectedKeytagName ] = useState<string>('');

  const handleListKeytag = useCallback(async () => {
    dispatch(listKeytagAction({buildingId, floorId, roomId, ...paginationItem}));
  }, [dispatch, paginationItem, buildingId, floorId,  roomId]);

  //모달 플래그
  const handleModal = useCallback((modalFlag:string, keytagId:string, keytagName:string, status:string) => {
    if(modalFlag === 'create'){
      setIsOpenKeytagCreateModal(true);
    }
    if(modalFlag === 'update'){
      setIsOpenKeytagUpdateModal(true);
      setSelectedKeytagId(keytagId);
    }    
    if(modalFlag === 'delete'){
      if (status === 'installed') return;
      setSelectedKeytagId(keytagId);
      setSelectedKeytagName(keytagName);
      setIsOpenKeytagDeleteModal(true);
    }
  },[]);

  //현재 페이지 전역상태 등록
  const handleCurrentPageNumber = useCallback((currentPageNumber:number) => {
      dispatch(setCurrentPageNumberAction({currentPageNumber}));
  }, [dispatch]);

  //페이지 전역상태 등록
  const handlePaginationItem = useCallback((paginationItem:keytagListState['paginationItem']) => {
      dispatch(setPaginationItemAction({paginationItem}));
  }, [dispatch]);

  //페이지네이션 이동
  const changePagination = useCallback((pageNumber:number) => {
      handleCurrentPageNumber(pageNumber);
      handlePaginationItem({
        ...paginationItem,
        offset: (pageNumber - 1) * paginationItem.limit,
      });
  },[handleCurrentPageNumber, handlePaginationItem, paginationItem]);

  //목록 리미트
  const changeLimit = useCallback((limit:number) => {
      handleCurrentPageNumber(1);
      handlePaginationItem({
          offset: 0,
          limit,
      });
  },[handleCurrentPageNumber, handlePaginationItem]);

  useEffect(() => {
    if (isOpen) {
      if(roomId && floorId && buildingId) handleListKeytag()
    }
  }, [isOpen, handleListKeytag, roomId, floorId, buildingId]);

  useEffect(() => {
    if(keytagError){
      if(keytagError.response.data.code === 401 || keytagError.response.data.code === 419){
        localStorage.clear();
        navigation('/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[keytagError]);

  return (
    <Fragment>
      <FormCard>
        <KeytagList 
          keytagListItems={keytagListItems}
          userRole={userRole}
          handleModal={handleModal}
          handleGoBack={handleGoBack}
        />
        <LimitButton
          currentLimit={paginationItem.limit}
          changeLimit={changeLimit}
        />
        <Pagination
          total={keytagListTotal}
          index={currentPageNumber}
          limit={paginationItem.limit}
          indexChange={changePagination}
        />
      </FormCard>
      <KeytagCreateContainer
        isOpen={isOpenKeytagCreateModal}
        toggle={() => setIsOpenKeytagCreateModal(!isOpenKeytagCreateModal)}
        reload={() => handleListKeytag()}
        buildingId={buildingId}
        floorId={floorId}
        roomId={roomId}
      />
      <KeytagUpdateContainer
        isOpen={isOpenKeytagUpdateModal}
        toggle={() => setIsOpenKeytagUpdateModal(!isOpenKeytagUpdateModal)}
        reload={() => handleListKeytag()}
        buildingId={buildingId}
        floorId={floorId}
        roomId={roomId}
        keytagId={selectedKeytagId}
      />
      <KeytagDeleteContainer
        isOpen={isOpenKeytagDeleteModal}
        toggle={() => setIsOpenKeytagDeleteModal(!isOpenKeytagDeleteModal)}
        reload={() => handleListKeytag()}
        buildingId={buildingId}
        floorId={floorId}
        roomId={roomId}
        keytagId={selectedKeytagId}
        keytagName={selectedKeytagName}
      />
    </Fragment>
  );
}

export default KeytagListContainer;