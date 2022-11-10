import React, { Fragment } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faXmark } from '@fortawesome/free-solid-svg-icons'
import { dateFormatter, reportDateFormatter, reportHourFormatter, reportKeyTypeFormatter, staffRoleFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { formatDatProps, ReportDetailProps } from '../../types/report';
import { listReportApi } from '../../api/report';

/* styled */
const FormCardWrap = styled.div`
width: 100%;
margin: auto;
border-radius: 0.3rem;

  .inline-flex {
    display: flex;
    position: relative;
    margin: 0 1.25rem;
    width: calc(100% - 40px);
    height: 100%;
    text-align: left;
    border: 1px solid #cccccc;
    border-radius: 0.35rem;

    &.detail {
        margin-top: 1.75rem;
    }
    &.tab {
        border-top-left-radius: 0;
    }
    .w-100 {
      flex: 1;
      padding: 1.25rem 0;
      width: 100%;

      .card-text {
        display: flex;
        width: calc(100% - 1.25rem);
        padding: 0 0.625rem;
        align-items: center;
        
        p {
          margin: 0;
          padding: 1rem 0.875rem;
          width: 30%;
          font-size: 0.875rem;
          color: #555555;
          line-height: 1.8rem;
          border-bottom: 1px solid #e3e8f0;
          background: #e3e8f0;
          box-sizing: inherit;

          span {
            font-size: 12px;
          }
          .required {
            margin-left: 3px;
            font-size: 0.875rem !important;
            color: #ef4b56;
          }
        }

        .card-text-display {
          margin-left: 20px;
        }
      }
    }
  }
.card-foot {
  display: inline-flex;
  margin: 0 1.25rem;
  padding: 1.25rem 0;
  width: calc(100% - 40px);
  height: 2rem;
  justify-content: center;

  .btn-item-close {
    padding: 0.5rem;
    height: 2.3rem;
    width: 5rem;
    font-size: 0.875rem;
    font-weight: bold;
    color: #ffffff;
    border: 0px;
    border-radius: 0.35rem;
    background-color: #6c6969;
    cursor: pointer;
    box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 0 2px 4px -2px rgb(0 0 0 / 30%);

    :hover {
        background: #949494;
    }
  }
}
`;
const FormCardTitle = styled.div`
  display: inline-flex;
  position: relative;
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
  width: 100%;
  text-align: left;
  color: #ffffff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  background: #044dac;
  box-sizing: border-box;

  h1 {
    margin: 0;
    font-size: 18px;

    span {
        margin: 0 5px;
        font-size: 0.875rem;
        color: #e6e5e8;
    }
  }
  svg {
    position: absolute;
    top: 1rem;
    right: 1.25rem;
    font-size: 1.625rem;
    cursor: pointer;
  }
`;

const ReportDetail = ({
  isOpen,
  toggle,
  reportItem,
  reportType,
  userRole,
}:ReportDetailProps) => {
  const reportColumn = {
    userkey: [
      { label: '키타입', key: 'key_type' },
      { label: '내용', key: 'operation' },
      { label: '빌딩', key: 'building_name' },
      { label: '객실', key: 'json_destination.room' },
      { label: '예약자명', key: 'grantee_name' },
      { label: '전화번호', key: 'grantee_phone_number' },
      { label: '입실일', key: 'start_at_day' },
      { label: '입실시간', key: 'start_at_hour' },
      { label: '퇴실일', key: 'end_at_day' },
      { label: '퇴실시간', key: 'end_at_hour' },
      { label: '스태프', key: 'actor_name' },
      { label: '시컨스', key: 'json_context.seq_num' },
      { label: '생성일자', key: 'created_at' },
    ],
    facility: [
      { label: '시설', key: 'facility_name' },
      { label: '빌딩', key: 'building_name', hidden: ['hotel', 'building'].includes(reportItem.report_subtype) },
      { label: '내용', key: 'operation' },
      { label: '상세내용', key: 'json_diffs', hidden: !reportItem.json_diffs },
      { label: '스태프', key: 'actor_name' },
      { label: '생성일자', key: 'created_at' },
    ],
    staff: [
      { label: '행위자 이름', key: 'actor_name' },
      { label: '행위자 전화번호', key: 'actor_phone_number' },
      { label: '행위자 권한', key: 'actor_role' },
      { label: '내용', key: 'operation' },
      { label: '키타입', key: 'key_type', hidden: !reportItem.key_type },
      { label: '상세내용', key: 'json_diffs', hidden: !reportItem.json_diffs },
      { label: '객실', key: 'json_destination.rooms', hidden: !reportItem.json_destination },
      { label: '대상자 이름', key: 'grantee_name' },
      { label: '대상자 전화번호', key: 'grantee_phone_number' },
      { label: '대상자 권한', key: 'grantee_role' },
      { label: '생성일자', key: 'created_at' },
    ],
    user_mobilekey: [
      { label: '빌딩', key: 'building_name' },
      { label: '객실', key: 'json_destination.room' },
      { label: '내용', key: 'operation' },
      { label: '사용자명', key: 'actor_name' },
      { label: '전화번호', key: 'actor_phone_number' },
      { label: '생성일자', key: 'created_at' },
    ],
  };

  const formatData = (reportItem:listReportApi, key:formatDatProps, userRole: string) => {
    switch (key) {
      case 'operation':
        return reportItem.operation ? reportItem.operation.replace('Hotel', 'Property') : '-';
      case 'key_type':
        return reportKeyTypeFormatter(reportItem.key_type);
      case 'actor_role':
        return staffRoleFormatter(reportItem.actor_role);
      case 'grantee_role':
        return staffRoleFormatter(reportItem.grantee_role);
      case 'start_at_day':
        return reportItem.json_context ?
          reportDateFormatter(reportItem.json_context.start_at) : '-';
      case 'start_at_hour':
        return reportItem.json_context ?
          reportHourFormatter(reportItem.json_context.start_at) : '-';
      case 'end_at_day':
        return reportItem.json_context ?
          reportDateFormatter(reportItem.json_context.end_at) : '-';
      case 'end_at_hour':
        return reportItem.json_context ?
          reportHourFormatter(reportItem.json_context.end_at) : '-';
      case 'json_destination.room':
        return reportItem.json_destination ? reportItem.json_destination.room : '-';
      case 'json_destination.rooms':
        return reportItem.json_destination ? reportItem.json_destination.rooms : '-';
      case 'json_context.seq_num':
        return reportItem.json_context ? reportItem.json_context.seq_num : '-';
      case 'json_diffs':
        return reportItem.json_diffs ? jsonDiffsFormatter(reportItem.json_diffs) : '-';
      case 'created_at':
        return dateFormatter(reportItem.created_at);
      case 'actor_name':
        return reportItem[key]? userRole === 'master'? reportItem[key] : nameChange(reportItem[key]) : '-';
      case 'grantee_name':
        return reportItem[key]? userRole === 'master'? reportItem[key] : nameChange(reportItem[key]) : '-';
      case 'grantee_phone_number':
        return reportItem[key]? userRole === 'master'? reportItem[key] : phoneChange(reportItem[key]) : '-';
      case 'actor_phone_number':
        return reportItem[key]? userRole === 'master'? reportItem[key] : phoneChange(reportItem[key]) : '-';
      default:
        return reportItem[key] || '-';
    };
  };
  //formatter에서 훅 사용이 제한적이라서 여기에 따로 옮김
  const nameChange = (name:string) => {
    const startStr = name.substring(0,1);
    const endStr = name.substring(name.length-1);
    const newName = [];
    for(let i =0; i < name.length; i++){
      if(i === 0) newName.push(startStr);
      else if(i === name.length-1) newName.push(endStr);
      else newName.push('*');
    }
    name = '';
    return newName.join('');
  }
  const phoneChange = (phone:number) => {
    const oldPhone = String(phone);
    const newPhone = [oldPhone.substring(0, oldPhone.length-4)];
    for(let i =0; i < 4; i++){
      newPhone.push('*');
    }
    return newPhone.join('');
  }

  const jsonDiffsFormatter = (diffs:listReportApi['json_diffs']) => {
    return (
      <span>
        {diffs.map((diff, index) =>
          <Fragment>
            <span key={index}>
              {diff.key + ': ' + diff.oldValue + ' -> ' + diff.newValue}
            </span><br/>
          </Fragment>
        )}
      </span>
    );
  };

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
          <FormCardWrap id='report-detail'>
            <FormCardTitle>
              <h1>리포트 상세정보</h1>
              <FontAwesomeIcon icon={faXmark} onClick={() => toggle()}/>
            </FormCardTitle>
            <div className='inline-flex'>
              <div className='w-100'>
                {reportColumn[reportType].map((column:any, index:number) => (
                  <div className='card-text' key={index} hidden={column.hidden}>
                    <p>
                      <b>{column.label}</b>
                    </p>
                    <div className='card-text-display'>
                      {formatData(reportItem, column.key, userRole)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='card-foot center'>
              <div className='form-item-close'>
                <button className='btn-item-close' id='report-detail-close-btn' onClick={() => toggle()}>
                  <FontAwesomeIcon icon={faTimesCircle} style={{paddingRight:'3px'}}/><span>닫기</span>
                </button>
              </div>
            </div>
          </FormCardWrap>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ReportDetail;