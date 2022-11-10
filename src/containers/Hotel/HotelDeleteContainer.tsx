import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import { useDispatch, useSelector } from 'react-redux';
import { RootState }from '../../stores/index';
import { changeResult, deleteHotelAction, initialize } from '../../stores/hotel';
import HotelDelete from '../../components/Hotel/HotelDelete';
import { HotelDeleteContainerProps } from '../../types/hotel';

const HotelDeleteContainer = ({
  isOpen,
  toggle,
  reload,
  hotelName,
}:HotelDeleteContainerProps) => {
  const dispatch = useDispatch();
  const { hotelSuccess, hotelError } = useSelector(({ hotel }:RootState) => ({
    hotelSuccess: hotel.hotelDeleteSuccess,
    hotelError: hotel.hotelDeleteError,
}));
const [ isOpenHotelDeleteSuccessModal, setIsOpenHotelDeleteSuccessModal ] = useState<boolean>(false);
const [ isOpenHotelDeleteFailModal, setIsOpenHotelDeleteFailModal ] = useState<boolean>(false);
const [ messageHotelDeleteFail, setMessageHotelDeleteFail ] = useState<string>('');

  const handleDeleteHotel = useCallback(() => {
    dispatch(deleteHotelAction());
  },[dispatch]);


  useEffect(() => {
    if(hotelError){
      if (!hotelError.response) setMessageHotelDeleteFail(hotelError.message);
      else setMessageHotelDeleteFail(`${hotelError.response.data.code}, ${hotelError.response.data.message}`);

      if(hotelError.response.data.code === 401 || hotelError.response.data.code === 419) reload();
      else setIsOpenHotelDeleteFailModal(true);
      dispatch(
        changeResult({
          key: 'hotelDeleteError',
          value: null,
        })
      );
      return;
    }
    if(hotelSuccess){
      toggle();
      setIsOpenHotelDeleteSuccessModal(true);
      setTimeout(() => {
        setIsOpenHotelDeleteSuccessModal(false);
        localStorage.removeItem('hotel_id');
        reload();
      }, 1500);
      dispatch(initialize()); //hotel.ts 전역상태 초기화
    }
  },[dispatch, hotelError, hotelSuccess, reload, toggle]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        size='sm'
      >
        <ModalBody className='text-center m-3'>
          <HotelDelete
            hotelName={hotelName}
            toggle={toggle}
            handleDeleteHotel={handleDeleteHotel}
          />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenHotelDeleteSuccessModal}
        toggle={() => setIsOpenHotelDeleteSuccessModal(!isOpenHotelDeleteSuccessModal)}
        message='단지 삭제가 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenHotelDeleteFailModal}
        toggle={() => setIsOpenHotelDeleteFailModal(!isOpenHotelDeleteFailModal)}
        message={messageHotelDeleteFail || '단지 삭제에 실패 하였습니다.'}
      />
    </Fragment>
  );
}

export default HotelDeleteContainer;