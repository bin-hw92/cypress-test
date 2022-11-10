import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import * as xlsx from 'xlsx';
import useDebounce from '../../lib/useDebounce';
import ReportList from '../../components/Report/ReportList';
import { ResponseFailModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { listReportAction, setFilterItemAction, setInitFilterItemAction } from '../../stores/reportList';
import ReportDetail from '../../components/Report/ReportDetail';
import { reportDataExcelColumns, reportListFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { ReportListContainerProps } from '../../types/report';
import { listReportApi } from '../../api/report';
import { useNavigate } from 'react-router-dom';

/* styled */
const FormCard = styled.article`
    padding-bottom: 2rem;
    width: 100%;
    border-radius: 0.3rem;
    position: relative;
`;

const ReportListContainer = ({
  isOpen,
  reportView,
  handleViewChange,
}:ReportListContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { reportListItems, reportError, filterItem, userRole } = useSelector(({ reportList, header }:RootState) => ({
      reportListItems: reportList.reportListItems,
      reportError: reportList.reportListError,
      filterItem: reportList.filterItem,
      userRole: header.userRole,
  }));
  const [ isOpenApiErrorModal, setIsOpenApiErrorModal ] = useState<boolean>(false);
  const [ isDebounce, setIsDebounce ] = useState<boolean>(false); //디바운싱 사용 구분을 위해 추가
  const [ apiErrorMessage, setApiErrorMessage ] = useState<string>('');
  const [ apiErrorSubMessage, setApiErrorSubMessage ] = useState<string>('');
  const [ isOpenReportDetailModal, setIsOpenReportDetailModal ] = useState<boolean>(false);
  const [ selectedReportItem, setSelectedReportItem ] = useState<any>({});

  const handleListReport = useCallback(() => {
      dispatch(listReportAction({...filterItem}));
  }, [dispatch, filterItem]);
  
    //필터 핸들링
    const handleFilter =  useCallback((targetItem:any, isDebounce:boolean) => {
      setIsDebounce(isDebounce); //디바운싱 처리를 위해 하위 Component에서 구분을 받아옴
      dispatch(setFilterItemAction({...filterItem, ...targetItem}));
  }, [dispatch, filterItem]);

  //필터 초기화 버튼
  const handleinitFilter = useCallback(() => {
    dispatch(setInitFilterItemAction());
  },[dispatch]);

  const handleExportDataToExcel = () => {
    if(reportListItems){
      try{
        let excelDataColumns = reportDataExcelColumns(filterItem.reportType);
        const excelDatas = reportListItems.map((report) => {
          const formattedData:any = {};
          excelDataColumns.map((column) => {
            _.set(formattedData, column.name, reportListFormatter(report, column.key, userRole));
            if (!_.isString(formattedData[column.name])) _.set(formattedData, column.name, JSON.stringify(formattedData[column.name]));
            return formattedData;
          });
          return formattedData;
        });
        const worksheet = xlsx.utils.json_to_sheet(excelDatas);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'sheet1');
        xlsx.writeFile(workbook, `${filterItem.reportType}_report.xlsx`);
      } catch (error) {
        setApiErrorMessage('리포트 엑셀 다운로드 실패');
        setApiErrorSubMessage('');
        setIsOpenApiErrorModal(true);
      }
    }
  };

  const handleSelectReport = (reportItem:listReportApi) => {
    setSelectedReportItem(reportItem);
    setIsOpenReportDetailModal(true);
  };

  //디바운싱 훅으로 이동
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebounce = useCallback(
    useDebounce((handleListReport) => handleListReport(), 300) //0.3초 동안 미입력 시 함수 실행
  ,[]);

  useEffect(() => {
    try {
      if (isOpen) !isDebounce? handleListReport() : handleDebounce(handleListReport); //디바운싱 처리
    } catch (error) {
      throw error;
    }
  }, [isOpen, isDebounce, handleDebounce, handleListReport]);
      
  useEffect(() => {
    if(reportError){
      if(reportError.response.data.code === 401 || reportError.response.data.code === 419){
          localStorage.clear();
          navigation('/login');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[reportError]);

  return (
    <Fragment>
      <FormCard>
        <ReportList
          reportListItems={reportListItems}
          filterItem={filterItem}
          userRole={userRole}
          handleFilter={handleFilter}
          handleinitFilter={handleinitFilter}
          handleExportDataToExcel={handleExportDataToExcel}
          handleSelectReport={handleSelectReport}
        />
      </FormCard>
      <ReportDetail
        isOpen={isOpenReportDetailModal}
        toggle={() => setIsOpenReportDetailModal(!isOpenReportDetailModal)}
        reportItem={selectedReportItem}
        reportType={filterItem.reportType}
        userRole={userRole}
      />
      <ResponseFailModal
        isOpen={isOpenApiErrorModal}
        toggle={() => setIsOpenApiErrorModal(!isOpenApiErrorModal)}
        message={apiErrorMessage}
        subMessage={apiErrorSubMessage}
      />
    </Fragment>
  );
}

export default ReportListContainer;