import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BuildingList from "../../components/Building/BuildingList";
import LimitButton from "../../components/Commons/LimitSelectBox";
import Pagination from '../../components/Commons/TablePagination';
import useDebounce from "../../lib/useDebounce";
import { RootState } from "../../stores";
import { listBuildingAction, setCurrentPageNumberAction, setDetailField, setFilterItemAction, setInitFilterItemAction, setPaginationItemAction } from "../../stores/buildingList";
import { BuildingListContainerProps, buildingListState } from "../../types/building";
import BuildingCreateContainer from "./BuildingCreateContainer";
import BuildingDeleteContainer from "./BuildingDeleteContainer";
import BuildingDetailContainer from "./BuildingDetailContainer";
import BuildingUpdateContainer from "./BuildingUpdateContainer";

/* styled */
const FormCard = styled.article`
    width: 100%;
    position: relative;
`;

const BuildingListContainer = ({
    isOpen,
    buildingView,
    handleViewChange
}:BuildingListContainerProps) => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { buildingListTotal, buildingListItems, buildingError, currentPageNumber, paginationItem, filterItem, userRole } = useSelector(({ buildingList, header }:RootState) => ({
        buildingListTotal: buildingList.buildingListTotal,
        buildingListItems: buildingList.buildingListItems,
        buildingError: buildingList.buildingListError,
        currentPageNumber: buildingList.currentPageNumber,
        paginationItem: buildingList.paginationItem,
        filterItem: buildingList.filterItem,
        userRole: header.userRole,
    }));
    const [ isDebounce, setIsDebounce ] = useState<boolean>(false); //디바운싱 사용 구분을 위해 추가
    const [ isOpenBuildingCreateModal, setIsOpenBuildingCreateModal ] = useState<boolean>(false);
    const [ isOpenBuildingUpdateModal, setIsOpenBuildingUpdateModal ] = useState<boolean>(false);
    const [ isOpenBuildingDeleteModal, setIsOpenBuildingDeleteModal ] = useState<boolean>(false);
    const [ selectedBuildingId, setSelectedBuildingId ] = useState<string>('');
    const [ selectedBuildingName, setSelectedBuildingName ] = useState<string>('');

    const handleListBuilding = useCallback(() => {
        dispatch(listBuildingAction({...filterItem, ...paginationItem}));
    }, [dispatch, filterItem, paginationItem]);
  
    //필터 핸들링
    const handleFilter =  useCallback((targetItem:any, isDebounce:boolean) => {
        setIsDebounce(isDebounce); //디바운싱 처리를 위해 하위 Component에서 구분을 받아옴
        dispatch(setFilterItemAction({...filterItem, ...targetItem}));
    }, [dispatch, filterItem]);

    //필터 초기화 버튼
    const handleinitFilter = useCallback(() => {
        dispatch(setInitFilterItemAction());
    },[dispatch]);

    //상세화면 이동용
    const handleBuildingDetail = useCallback((buildingId:string) => {
        handleViewChange('building', 'detail');
        dispatch(setDetailField(buildingId));
    },[handleViewChange, dispatch]);

  //모달 플래그
  const handleModal = useCallback((modalFlag:string, buildingId:string, buildingName:string) => {
    if(modalFlag === 'create'){
        setSelectedBuildingId(buildingId);
        setIsOpenBuildingCreateModal(true)
    }
    if(modalFlag === 'update'){
        setSelectedBuildingId(buildingId);
        setIsOpenBuildingUpdateModal(true);
    }
    if(modalFlag === 'delete'){
        setSelectedBuildingId(buildingId);
        setSelectedBuildingName(buildingName);
        setIsOpenBuildingDeleteModal(true);
    }
  },[]);

    //현재 페이지 전역상태 등록
    const handleCurrentPageNumber = useCallback((currentPageNumber:number) => {
        dispatch(setCurrentPageNumberAction({currentPageNumber}));
    }, [dispatch]);

    //페이지 전역상태 등록
    const handlePaginationItem = useCallback((paginationItem:buildingListState['paginationItem']) => {
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
  
    //디바운싱 훅으로 이동
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDebounce = useCallback(
      useDebounce((handleListBuilding) => handleListBuilding(), 300) //0.3초 동안 미입력 시 함수 실행
    ,[]);
  
    useEffect(() => {
      try {
        if (isOpen) !isDebounce? handleListBuilding() : handleDebounce(handleListBuilding); //디바운싱 처리
      } catch (error) {
        throw error;
      }
    }, [isOpen, handleListBuilding, isDebounce, handleDebounce]);
    
    useEffect(() => {
        if(buildingError){
        if(buildingError.response.data.code === 401 || buildingError.response.data.code === 419){
            localStorage.clear();
            navigation('/login');
        }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[buildingError]);

    return (
        <>
        {buildingView === 'list' && <>
            <FormCard hidden={buildingView !== 'list'}>
                    <BuildingList 
                        buildingListItems={buildingListItems}
                        filterItem={filterItem}
                        userRole={userRole}
                        handleFilter={handleFilter}
                        handleinitFilter={handleinitFilter}
                        handleBuildingDetail={handleBuildingDetail}
                        handleModal={handleModal}
                    />
                    <LimitButton
                        currentLimit={paginationItem.limit}
                        changeLimit={changeLimit}
                    />
                    <Pagination
                        total={buildingListTotal}
                        index={currentPageNumber}
                        limit={paginationItem.limit}
                        indexChange={changePagination}
                    />
            </FormCard>
            <BuildingCreateContainer
                isOpen={isOpenBuildingCreateModal}
                toggle={() => setIsOpenBuildingCreateModal(!isOpenBuildingCreateModal)}
                reload={() => handleListBuilding()}
            />
            <BuildingUpdateContainer
                isOpen={isOpenBuildingUpdateModal}
                toggle={() => setIsOpenBuildingUpdateModal(!isOpenBuildingUpdateModal)}
                reload={() => handleListBuilding()}
                buildingId={selectedBuildingId}
            />
            <BuildingDeleteContainer
                isOpen={isOpenBuildingDeleteModal}
                toggle={() => setIsOpenBuildingDeleteModal(!isOpenBuildingDeleteModal)}
                reload={() => handleListBuilding()}
                buildingId={selectedBuildingId}
                buildingName={selectedBuildingName}
            />
            </>
        }
        {buildingView === 'detail' &&
            <BuildingDetailContainer
                isOpen={buildingView === 'detail'}
                listBuilding={handleListBuilding}
                handleViewChange={handleViewChange}
            />
        }
        </>
        
    )
};

export default BuildingListContainer;