import React, { useState, useRef, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import HotelUpdate from '../../components/Hotel/HotelUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeField, updateHotelAction, selectHotelAction, initialize, changeResult } from '../../stores/hotel';
import { changeProps } from '../../types/commons';
import { listNotifyChannelListAction } from '../../stores/notifyChannelList';
import { HotelUpdateContainerProps } from '../../types/hotel';

const HotelUpdateContainer = ({
  isOpen,
  toggle,
  reload,
}:HotelUpdateContainerProps) => {
  const dispatch = useDispatch();
  const { hotelItem, hotelSuccess, hotelError, notifyChannelListItems } = useSelector(({ hotel, notifyChannelList }:RootState) => ({
      hotelItem: hotel.hotel,
      hotelSuccess: hotel.hotelUpdateSuccess,
      hotelError: hotel.hotelUpdateError,
      notifyChannelListItems: notifyChannelList.notifyChannelListItems,
  }));
  const commonroomInputRef = useRef<any|null>(null);
  const [ isOpenHotelUpdateModal, setIsOpenHotelUpdateSuccessModal ] = useState<boolean>(false);
  const [ isOpenHotelUpdateFailModal, setIsOpenHotelUpdateFailModal ] = useState<boolean>(false);
  const [ messageHotelUpdateFail, setMessageHotelUpdateFail ] = useState<string>('');
  const [ editableCommonroom, setEditableCommonroom ] = useState<number|null>(null);


  //인풋 변경 이벤트 핸들러
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const value2 = name === 'useSlimkey'||name === 'allowInfinityPincode'||name === 'apphotelstory'||name === 'appElevatorBtn'? value === 'O'? true : false : value; 
    dispatch(
        changeField({
            key: name,
            value: value2,
        })
    );
  },[dispatch]);

  const handleAddCommonroom = () => {
    if (!commonroomInputRef.current.value) return;
    const commonrooms = [...hotelItem.commonrooms];
    commonrooms.push({name: commonroomInputRef.current.value});
    commonroomInputRef.current.value = null;
    dispatch(
      changeField({
          key: 'commonrooms',
          value: commonrooms,
      })
    );
  };

  const handleChangeCommonroom = ({id, name}:changeProps) => {
    const commonrooms = hotelItem.commonrooms.map((commonroom:any, index:number) => {
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

  const handleRemoveCommonroom = (index:number) => {
    const commonrooms = [...hotelItem.commonrooms];
    commonrooms.splice(index, 1);
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

  const handleUpdateHotel = useCallback(() => {
    dispatch(updateHotelAction({...hotelItem}));
  },[dispatch, hotelItem]);

  //처음에 해당 호텔 정보 받아오기
  useEffect(() => {
    if(isOpen){
      dispatch(selectHotelAction());
      dispatch(listNotifyChannelListAction({}));
    }
  },[dispatch, isOpen]);
  

  //호텔 수정 완료 후
  useEffect(() => {
    if(hotelError){
      if (!hotelError.response) setMessageHotelUpdateFail(hotelError.message);
      else setMessageHotelUpdateFail(`${hotelError.response.data.code}, ${hotelError.response.data.message}`);

      if(hotelError.response.data.code === 401 || hotelError.response.data.code === 419) reload();
      else setIsOpenHotelUpdateFailModal(true);
      dispatch(
        changeResult({
          key: 'hotelUpdateError',
          value: null,
        })
      );
      return;
    }
    if(hotelSuccess){
      toggle();
      setIsOpenHotelUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenHotelUpdateSuccessModal(false);
        reload();
      }, 1500);
      dispatch(initialize()); //hotel.ts 전역상태 초기화
    }
  },[hotelSuccess, hotelError, toggle, reload, dispatch]);

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='text-center m-3' style={{margin:0, padding:0}}>
        <HotelUpdate
                hotelItem={hotelItem}
                commonroomInputRef ={commonroomInputRef}
                editableCommonroom={editableCommonroom}
                notifyChannelListItems={notifyChannelListItems}
                handleChange={handleChange}
                handleAddCommonroom={handleAddCommonroom}
                handleRemoveCommonroom={handleRemoveCommonroom}
                handleEditableCommonroom={handleEditableCommonroom}
                handleChangeCommonroom={handleChangeCommonroom}
                handleUpdateHotel={handleUpdateHotel}
                toggle={toggle}
           /> 
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenHotelUpdateModal}
        toggle={() => setIsOpenHotelUpdateSuccessModal(!isOpenHotelUpdateModal)}
        message='단지 정보 변경에 성공 하였습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenHotelUpdateFailModal}
        toggle={() => setIsOpenHotelUpdateFailModal(!isOpenHotelUpdateFailModal)}
        message={messageHotelUpdateFail || '단지 정보 변경에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default HotelUpdateContainer;