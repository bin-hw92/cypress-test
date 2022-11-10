import React, {  Fragment } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Filter from '../Commons/Filter';
import Table from '../Commons/Table';
import { dateFormatter } from '../../lib/formatter';
import styled from 'styled-components';
import { BookingListProps } from '../../types/booking';
import { useNamePhoneTableChange, useOrigin } from '../../lib/useInfoChange';

/* styled */
const ContentTitle = styled.div`
    position: relative;
    height: 2rem;

    .excel-upload {
      display: inline-flex;
      margin-top: 1.25rem;
      right: 0;
      height: 100%;
      padding: 0 8px;
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
const ContentButtonForm = styled.div`
  float: right;
  margin-top: 1.25rem;

  .center {
    display: block;
    padding-top: 0;

    .detail {
      right: 0;
    }
    .pl20 {
      padding-left: 1.25rem;
    }
  }
`;
const ContentTopButtonForm = styled.div`
  float: right;
  margin: 1.25rem auto;

  .center {
    display: block;
    padding-top: 0;

    .detail {
      right: 0;
    }
    .pl20 {
      padding-left: 1.25rem;
    }
  }
`;
const ContentButton = styled.button`
  height: 2.3rem;
  min-width: 5rem;
  padding: 0.5rem;
  border-radius: .35rem;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: #044dac;
  border: 0px;
  cursor: pointer;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 20%), 
  0 2px 4px -2px rgb(0 0 0 / 30%);

  :hover {
    background-color: #4c9ffe;
  }
  :disabled {
    background-color: #949494;
    cursor: default;
  }
`;

const BookingList = ({
  bookingListItems,
  buildingListItems,
  filterItem,
  sortItem,
  userRole,
  handleFilter,
  handleinitFilter,
  handleBookingDetail,
  handleModal,
  changeSort,
}:BookingListProps) => {
  
  return (
    <Fragment>
        <ContentTitle2>
          <Filter
            columns={[
              {
                key: 'startAt',
                type: 'datePicker',
                placeholder: '입실일자',
                value: filterItem.startAt === ''? '' : moment(filterItem.startAt).toDate(),
                action: handleFilter,
                selectsStart: true,
                minDate: moment().startOf('day').toDate(),
                maxDate: filterItem.endAt === ''? '' : moment(filterItem.endAt).toDate(),
                endDate: filterItem.endAt === ''? '' : moment(filterItem.endAt).toDate(),
                showTimeSelect: true,
                isRemoveButton: true,
              },
              {
                key: 'endAt',
                type: 'datePicker',
                placeholder: '퇴실일자',
                value: filterItem.endAt === ''? '' : moment(filterItem.endAt).toDate(),
                action: handleFilter,
                selectsEnd: true,
                minDate: filterItem.startAt === ''? moment().startOf('day').toDate() : moment(filterItem.startAt).toDate(),
                startDate: filterItem.startAt === ''? '' : moment(filterItem.startAt).toDate(),
                showTimeSelect: true,
                isRemoveButton: true,
              },
              {
                key: 'buildingId',
                type: 'select',
                size: 'xlg',
                placeholder: '빌딩',
                value: filterItem.buildingId,
                action: handleFilter,
                selectItems: buildingListItems? buildingListItems : '',
                selectItemKey: 'name',
                selectItemValue: 'id',
                isRemoveButton: true,
              },
              {
                key: 'roomName',
                size: 'lg',
                placeholder: '객실',
                value: filterItem.roomName,
                action: handleFilter,
              },
              {
                key: 'phoneNumber',
                size: 'lg',
                placeholder: '전화번호',
                value: filterItem.phoneNumber,
                action: handleFilter,
              },
            ]}
            init={handleinitFilter}
          />
        </ContentTitle2>
        <ContentTitle>
          {userRole === 'master' &&
            <div className='excel-upload' onClick={() => handleModal('excelUpload', '', '', '', '')}>
              <img className='excel-logo' src='../assets/images/excel.png' alt='excel_logo'></img>
              <span>예약 생성 업로드</span>
            </div>
          }
          <div className='excel-upload ml-10' onClick={() => handleModal('excelDownload', '', '', '', '')}>
            <img className='excel-logo' src='../assets/images/excel.png' alt='excel_logo'></img>
            <span>예약 정보 다운로드</span>
          </div>
          {userRole === 'master'? (
            <ContentTopButtonForm>
              <ContentButton onClick={() => handleModal('create', '', '', '', '')}>
                <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
                <span>예약 생성</span>
              </ContentButton>
            </ContentTopButtonForm>
            ) : (<div style={{margin: '1.25rem auto', float: 'right', height: '2rem', width: '1px'}}></div>)
          }
        </ContentTitle>
        <Table
          columns={[
            {
              key: 'view',
              text: '상세보기',
              width: '8%',
              moveToPage: {
                func: handleBookingDetail,
                params: ['id'],
              },
            },
            {
              key: 'user.name',
              // key: 'user_name',
              text: '예약자명',
              width: '14%',
              formatter: {
                func: userRole === 'master'? useOrigin : useNamePhoneTableChange,
                params: ['user.name', 'user.phone_number'],
                // func: (userName) => userName,
                // params: ['user_name'],
              },
            },
            {
              key: 'checkin_at',
              text: '입실일자',
              width: '12%',
              formatter: {
                func: dateFormatter,
                // func: (checkinAt) => checkinAt,
                params: ['checkin_at'],
              },
            },
            {
              key: 'checkout_at',
              text: '퇴실일자',
              width: '12%',
              formatter: {
                func: dateFormatter,
                // func: (checkoutAt) => checkoutAt,
                params: ['checkout_at'],
              },
            },
            {
              key: 'building.name',
              text: '빌딩',
              width: '11%',
            },
            {
              key: 'room.name',
              // key: 'room_name',
              text: '객실',
              width: '10%',
              sort: {
                func: changeSort,
                params: 'room_name',
                selected: sortItem.sort === 'room_name',
                order: sortItem.sort === 'room_name' ? sortItem.order : 'desc',
              },
            },
            {
              key: 'cards',
              text: '카드키 갯수',
              width: '7%',
              formatter: {
                func: (cards:string) => cards.length,
                params: ['cards'],
              },
            },
            {
              key: 'mobilekeys',
              text: '모바일키 갯수',
              width: '7%',
              formatter: {
                func: (mobilekeys:string) => mobilekeys.length,
                params: ['mobilekeys'],
              },
            },
            {
              key: 'pincodes',
              text: '핀코드 갯수',
              width: '7%',
              formatter: {
                func: (pincodes:string) => pincodes.length,
                params: ['pincodes'],
              },
            },
            {
              key: 'created_at',
              text: '생성일자',
              width: '12%',
              formatter: {
                func: dateFormatter,
                params: ['created_at'],
              },
            },
            {
              key: 'button',
              text: '',
              width: '5%',
              items: [
                {
                  text: '예약 수정',
                  action: {
                    func: (bookingId:string) => handleModal('update', bookingId, '', '', ''),
                    params: ['id'],
                  },
                },
                {
                  text: '키 발급',
                  action: {
                    func: (bookingId:string, buildingId:string, roomId:string, roomName:string) => handleModal('keyIssue', bookingId, buildingId, roomId, roomName),
                    params: ['id', 'building.id', 'room.id' ,'room.name'],
                  },
                },
                {
                  text: '예약 삭제',
                  action: {
                    func: (bookingId:string) => handleModal('delete', bookingId, '', '', ''),
                    params: ['id'],
                  },
                },
              ],
            },
          ]}
          datas={bookingListItems}
          userRole={userRole}
        />
        {userRole === 'master' &&
          <ContentButtonForm>
            <ContentButton onClick={() => handleModal('create', '', '', '', '')}>
              <FontAwesomeIcon icon={faPlusCircle} className='icon-item-add'/>
              <span>예약 생성</span>
            </ContentButton>
          </ContentButtonForm>
        }
    </Fragment>
  );
};

export default BookingList;