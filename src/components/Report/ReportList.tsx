import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Filter from '../Commons/Filter';
import { reportListFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { ReportListProps } from '../../types/report';

/* styled */
const ContentTitle = styled.div`
    position: relative;
    margin-bottom: 2.5rem;
    height: 2.3rem;
    box-sizing: border-box;

    .excel-upload {
      display: inline-flex;
      margin-top: 1.25rem;
      right: 0;
      height: 2rem;
      padding: 0 0.5rem;
      font-size: 0.875rem;
      font-weight: bold;
      color: #333333;
      cursor: pointer;
      border-radius: .35rem;
      background-color: #ffffff;
      box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.20),
      0 2px 4px -2px rgba(0, 0, 0, 0.30);

      :hover {
        background-color: darkgreen;
        color: #e6e5e8;
      }
      span {
        padding-top: 0.375rem;
        padding-left: 0.25rem;
      }
    }
`;
const ContentTitle2 = styled.div`
  position: absolute;
  top: -3.1875rem;
  right: 0;
  height: 2rem;
`;
const TableWrap = styled(Table)`
  margin: auto;
  width: 100%
  color: #333333;
  background-color: #ffffff;
  border-spacing: unset;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%),
  0 2px 4px -2px rgb(0 0 0 / 30%);
  border-radius: 0.35rem;

thead {
  display: table-header-group;
  border-color: inherit;
  font-weight: bold;
  font-size: 0.875rem;
}
tbody {
  display: table-row-group;
  border-color: inherit;
  font-size: 0.875rem;
  color: #333333;

  tr:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }
  tr:first-child td {
    border-top: unset;
  }
  
  tr .report-detail {
    border-top: 0;
    text-align: center;
  }
  tr .report-detail div {
    display: inline-block;
    text-align: left;
  }
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
  text-align: left;
}
td {
  padding: 1.125rem 0.5rem;
  border-top: 1px solid #dddddd;
  font-weight: 400;

  &.no-list-data {
    text-align: center;
  }
  
  &.action-button {
    span {
      cursor: pointer;
      border-radius: 1rem;

      :hover {
        color: #4c9ffe;
      }
    }
  }
  &.action-button.list {
    span {
      padding: 6px 11px;

      :hover {
        color: #e6e5e8;
      }
    }
  }
  
  .status-granting {
    color: #ff9800;
    background-color: rgba(255, 152, 0, 0.08);
    border-radius: .35rem;
    padding: 4px 8px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .status-installed,
  .status-granted {
    color: #4caf50;
    background-color: rgba(76, 175, 80, 0.08);
    border-radius: .35rem;
    padding: 4px 8px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .status-created,
  .status-cleaning {
    color: #f44336;
    background-color: rgba(244, 67, 54, 0.08);
    border-radius: .35rem;
    padding: 4px 8px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  :first-child {
    padding: .65rem 2rem;
  }
  .no-list-data {
    text-align: center;
  }
  .action-button span {
    cursor: pointer;
    border-radius: 1rem;

    :hover {
      color: #4c9ffe;
    }
  }
  .action-button.list span {
    padding: 6px 11px;

    :hover {
      color: #e6e5e8;
    }
  }
}
`;
const TableTH = styled.th`
  padding: 1.125rem .5rem;
  background: #3a4254;
  border-bottom: 1px solid #3a4254;
  top: 60px;
  word-break: keep-all;
  cursor: default;
  color: #ffffff;
  font-weight: 600;

  :first-child {
    border-top-left-radius: .35rem;
    padding: 1.125rem;
  }
  :last-child {
    border-top-right-radius: .35rem;
    padding: .75rem 2rem;
  }
  span svg {
    color: #adb0bb;

    :hover svg {
      display: initial;
    }
  }
  width: ${(props) => props.theme};
`

const ReportList = ({
  reportListItems,
  filterItem,
  userRole,
  handleFilter,
  handleinitFilter,
  handleExportDataToExcel,
  handleSelectReport,
}:ReportListProps) => {
  const reportTypeList = [
    { key: '????????? ?????????', value: 'userkey' },
    { key: '???????????? ?????????', value: 'facility' },
    { key: '??????????????? ?????????', value: 'staff' },
    { key: '???????????? ???????????? ?????????', value: 'user_mobilekey' },
  ];
  const reportTableConfig = {
    userkey: [
      { th: '?????????', td: 'key_type', width: '7%' },
      { th: '??????', td: 'operation', width: '10%' },
      { th: '??????', td: 'building_name', width: '9%' },
      { th: '??????', td: 'json_destination.room', width: '7%' },
      { th: '????????????', td: 'grantee_name', width: '8%' },
      { th: '????????????', td: 'grantee_phone_number', width: '8%' },
      { th: '?????????', td: 'start_at_day', width: '7%' },
      { th: '????????????', td: 'start_at_hour', width: '4%' },
      { th: '?????????', td: 'end_at_day', width: '7%' },
      { th: '????????????', td: 'end_at_hour', width: '4%' },
      { th: '?????????', td: 'actor_name', width: '8%' },
      { th: '?????????', td: 'json_context.seq_num', width: '3%' },
      { th: '????????????', td: 'created_at', width: '10%' },
    ],
    facility: [
      { th: '??????', td: 'facility_name', width: '14%' },
      { th: '??????', td: 'building_name', width: '14%' },
      { th: '??????', td: 'operation', width: '30%' },
      { th: '?????????', td: 'actor_name', width: '14%' },
      { th: '????????????', td: 'created_at', width: '20%' },
    ],
    staff: [
      { th: '????????? ??????', td: 'actor_name', width: '10%' },
      { th: '????????? ????????????', td: 'actor_phone_number', width: '12%' },
      { th: '????????? ??????', td: 'actor_role', width: '10%' },
      { th: '??????', td: 'operation', width: '16%' },
      { th: '????????? ??????', td: 'grantee_name', width: '10%' },
      { th: '????????? ????????????', td: 'grantee_phone_number', width: '12%' },
      { th: '????????? ??????', td: 'grantee_role', width: '10%' },
      { th: '????????????', td: 'created_at', width: '12%' },
    ],
    user_mobilekey: [
      { th: '??????', td: 'building_name', width: '15%' },
      { th: '??????', td: 'json_destination.room', width: '12%' },
      { th: '??????', td: 'operation', width: '23%' },
      { th: '????????????', td: 'actor_name', width: '12%' },
      { th: '????????????', td: 'actor_phone_number', width: '15%' },
      { th: '????????????', td: 'created_at', width: '15%' },
    ],
  };

  return (
    <Fragment>
      <ContentTitle2>
        <Filter
          columns={[
            {
              key: 'reportType',
              type: 'select',
              placeholder: 'Type',
              value: filterItem.reportType,
              action: handleFilter,
              selectItems: reportTypeList,
              selectItemKey: 'key',
              selectItemValue: 'value',
            },
            {
              key: 'buildingName',
              size: 'md',
              placeholder: '????????????',
              value: filterItem.buildingName,
              action: handleFilter,
              hidden: filterItem.reportType === 'staff',
            },
          ]}
          init={handleinitFilter}
        />
      </ContentTitle2>
      <ContentTitle>
        <div className='excel-upload' onClick={() => handleExportDataToExcel()}>
          <img className='excel-logo' src='../assets/images/excel.png' alt='excel_logo'></img>
          <span>????????????</span>
        </div>
      </ContentTitle>
      <TableWrap>
        <thead>
          <tr>
            <TableTH theme={'8%'}>????????????</TableTH>
            {reportTableConfig[filterItem.reportType].map((reportTable, index) => (
              <TableTH key={index} theme={reportTable.width}>{reportTable.th}</TableTH>
            ))}
            <TableTH theme={'2%'}></TableTH>
          </tr>
        </thead>
        <tbody>
          {reportListItems?
            reportListItems.length > 0 ?
              reportListItems.map((report, index) => (
                <tr key={index}>
                  <td className='action-button'>
                    <span onClick={() => handleSelectReport(report)}><FontAwesomeIcon icon={faSearch}/></span>
                  </td>
                  {reportTableConfig[filterItem.reportType].map((reportTable, index) => (
                    <td key={index}>{reportListFormatter(report, reportTable.td, userRole)}</td>
                  ))}
                  <td></td>
                </tr>
              ))
              : <tr>
                  <td colSpan={reportTableConfig[filterItem.reportType].length + 2} className='no-list-data'>
                    No data
                  </td>
                </tr>
          :''}
        </tbody>
      </TableWrap>
    </Fragment>
  );
};

export default ReportList;