import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as xlsx from 'xlsx';
import { Modal, ModalBody } from 'react-bootstrap';
import { dateFormatter } from '../../lib/formatter';
import ExcelDownload from '../../components/Booking/ExcelDownload';
import { ResponseFailModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { listBookingAction } from '../../stores/bookingList';
import { ExcelDownloadContainerProps } from '../../types/booking';

const ExcelDownloadContainer = ({
  isOpen,
  toggle,
}:ExcelDownloadContainerProps) => {
  const dispatch = useDispatch();
  const { filterItem, hotelName, bookingListItems, bookingListError, userRole } = useSelector(({ bookingList, sidebar, header }:RootState) => ({
      filterItem: bookingList.filterItem,
      hotelName: sidebar.hotelName,
      bookingListItems: bookingList.bookingListItems,
      bookingListError: bookingList.bookingListError,
      userRole: header.userRole,
  }));
  const [isDownLoad, setIsDowload] = useState<boolean>(false);
  const [ isOpenExcelDownloadFailModal, setIsOpenExcelDownloadFailModal ] = useState<boolean>(false);

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
  const phoneChange = (phone:string) => {
    const newPhone = [phone.substring(0, phone.length-4)];
    for(let i =0; i < 4; i++){
      newPhone.push('*');
    }
    return newPhone.join('');
  }

  const handleExportDataToExcel = useCallback(() => {
    dispatch(listBookingAction({
      ...filterItem,
      startAt: filterItem.startAt || moment().startOf('day').toDate(),
      offset: null,
      limit: null,
    }));
    setIsDowload(true);
  },[dispatch, filterItem]);

  const handleDownload = useCallback(() => {
    if(bookingListItems){
      const excelDatas:any = [];
      bookingListItems.map((booking) => {
        booking.cards.map((card) => {
          return excelDatas.push({
            '빌딩': booking.building.name,
            '객실': booking.room.name,
            '투숙객명': userRole === 'master'? card.user_name : nameChange(card.user_name),
            '전화번호': userRole === 'master'? card.phone_number : phoneChange(card.phone_number),
            '입실일자': dateFormatter(card.checkin_at),
            '퇴실일자': dateFormatter(card.checkout_at),
            '생성일자': dateFormatter(card.created_at),
            '키타입': '카드키',
            '카드번호': userRole === 'master'? card.card_no : '-',
          });
        });
        booking.mobilekeys.map((mobilekey) => {
          return excelDatas.push({
            '빌딩': booking.building.name,
            '객실': booking.room.name,
            '투숙객명': userRole === 'master'? mobilekey.user_name : nameChange(mobilekey.user_name),
            '전화번호': userRole === 'master'? mobilekey.phone_number : phoneChange(mobilekey.phone_number),
            '입실일자': dateFormatter(mobilekey.checkin_at),
            '퇴실일자': dateFormatter(mobilekey.checkout_at),
            '생성일자': dateFormatter(mobilekey.created_at),
            '키타입': '모바일키',
            '교환번호': userRole === 'master'? mobilekey.exchangekey : '-',
          });
        });
        booking.pincodes.map((pincode) => {
          return excelDatas.push({
            '빌딩': booking.building.name,
            '객실': booking.room.name,
            '투숙객명': userRole === 'master'? pincode.user_name : nameChange(pincode.user_name),
            '전화번호': userRole === 'master'? pincode.phone_number : phoneChange(pincode.phone_number),
            '입실일자': dateFormatter(pincode.checkin_at),
            '퇴실일자': dateFormatter(pincode.checkout_at),
            '생성일자': dateFormatter(pincode.created_at),
            '키타입': '핀코드',
            'QR URL': userRole === 'master'? pincode.qr_url : '-',
            '핀코드': userRole === 'master'? pincode.pincode : '-',
          });
        });
        return booking;
      });
      const worksheet = xlsx.utils.json_to_sheet(excelDatas);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, '예약조회');
      xlsx.writeFile(workbook, `${hotelName}_bookings_${moment().format('YYYYMMDDHHmm')}.xlsx`);
      toggle();
      setIsDowload(false);
    }
  },[bookingListItems, hotelName, toggle, userRole]);

  useEffect(() => {
    if(bookingListItems && isOpen && isDownLoad) handleDownload();
  },[bookingListItems, isOpen, handleDownload, bookingListError, isDownLoad]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <ExcelDownload 
            handleExportDataToExcel={handleExportDataToExcel}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
      <ResponseFailModal
        isOpen={isOpenExcelDownloadFailModal}
        toggle={() => setIsOpenExcelDownloadFailModal(!isOpenExcelDownloadFailModal)}
        message={'Excel 파일 다운로드에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default ExcelDownloadContainer;