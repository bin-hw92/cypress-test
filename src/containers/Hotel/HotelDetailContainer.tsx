import React, { useState, useRef, Fragment, useCallback, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HotelDetail from '../../components/Hotel/HotelDetail';
import { ResponseFailModal, ResponseSuccessModal } from '../../components/Modal/Response';
import { RootState } from '../../stores';
import { changeField, changeResult, selectHotelAction, updateHotelAction } from '../../stores/hotel';
import { listNotifyChannelListAction } from '../../stores/notifyChannelList';
import { changeProps } from '../../types/commons';
import { HotelDetailContainerProps } from '../../types/hotel';
import HotelDeleteContainer from './HotelDeleteContainer';

const HotelDetailContainer = ({
  isOpen,
}:HotelDetailContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { hotelItem, hotelSuccess, hotelError, hotelListTotal, notifyChannelListItems } = useSelector(({ hotel, hotelList, notifyChannelList }:RootState) => ({
      hotelItem: hotel.hotel,
      hotelSuccess: hotel.hotelUpdateSuccess,
      hotelError: hotel.hotelUpdateError,
      hotelListTotal: hotelList.hotelListTotal,
      notifyChannelListItems: notifyChannelList.notifyChannelListItems,
  }));
  const commonroomInputRef = useRef<any|null>(null);
  const [ isOpenHotelDeleteModal, setIsOpenHotelDeleteModal ] = useState<boolean>(false);
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
    const commonrooms = hotelItem.commonrooms.map((commonroom:any, index: number) => {
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

  const handleListNotifyChannel = useCallback(() => {
    dispatch(listNotifyChannelListAction({}));
  }, [dispatch]);

  const handleSelectHotel = useCallback(() => {
    dispatch(selectHotelAction());
  },[dispatch]);

  const handleUpdateHotel = useCallback(() => {
    dispatch(updateHotelAction({...hotelItem}));
  },[dispatch, hotelItem]);

  const handleModal = () => {
    //if (hotelListTotal === 1) return;
    setIsOpenHotelDeleteModal(true);
  }

  const handleReload = () => {
    navigation('/hotel');
  }

  useEffect(() => {
    if(hotelError){
      if (!hotelError.response) setMessageHotelUpdateFail(hotelError.message);
      else setMessageHotelUpdateFail(`${hotelError.response.data.code}, ${hotelError.response.data.message}`);
      setIsOpenHotelUpdateFailModal(true);
      dispatch(
        changeResult({
          key: 'hotelUpdateError',
          value: null,
        })
      );
      return;
    }
    if(hotelSuccess){
      setIsOpenHotelUpdateSuccessModal(true);
      setTimeout(() => {
        setIsOpenHotelUpdateSuccessModal(false);
        handleSelectHotel();
      }, 1500);
      dispatch(
        changeResult({
          key: 'hotelUpdateSuccess',
          value: false,
        })
      );
    }
  },[hotelSuccess, hotelError, dispatch, handleSelectHotel]);

  useEffect(() => {
    if(isOpen){
      handleListNotifyChannel();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isOpen]);

  return (
    <Fragment>
      <HotelDetail 
        hotelItem={hotelItem}
        hotelListTotal={hotelListTotal}
        commonroomInputRef ={commonroomInputRef}
        editableCommonroom={editableCommonroom}
        notifyChannelListItems={notifyChannelListItems}
        handleModal={handleModal}
        handleChange={handleChange}
        handleAddCommonroom={handleAddCommonroom}
        handleRemoveCommonroom={handleRemoveCommonroom}
        handleEditableCommonroom={handleEditableCommonroom}
        handleChangeCommonroom={handleChangeCommonroom}
        handleSelectHotel={handleSelectHotel}
        handleUpdateHotel={handleUpdateHotel}
      />
      <HotelDeleteContainer
        isOpen={isOpenHotelDeleteModal}
        toggle={() => setIsOpenHotelDeleteModal(!isOpenHotelDeleteModal)}
        reload={handleReload}
        hotelName={hotelItem.name}
      />
      <ResponseSuccessModal
        isOpen={isOpenHotelUpdateModal}
        toggle={() => setIsOpenHotelUpdateSuccessModal(!isOpenHotelUpdateModal)}
        message='단지 정보 수정이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenHotelUpdateFailModal}
        toggle={() => setIsOpenHotelUpdateFailModal(!isOpenHotelUpdateFailModal)}
        message={messageHotelUpdateFail || '단지 정보 수정에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default HotelDetailContainer;