import React, { useState, useRef, useEffect, Fragment, useCallback, ChangeEvent } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { ResponseSuccessModal, ResponseFailModal } from '../../components/Modal/Response';
import HotelCreate from '../../components/Hotel/HotelCreate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { changeField, changeResult, createExcelUploadAction, createHotelAction, initialize } from '../../stores/hotel';
import { listNotifyChannelListAction } from '../../stores/notifyChannelList';
import { HotelCreateContainerProps } from '../../types/hotel';

const HotelCreateContainer = ({
  isOpen,
  toggle,
  reload,
}:HotelCreateContainerProps) => {
    const dispatch = useDispatch();
    const { hotelItem, hotelSuccess, hotelError, notifyChannelListItems } = useSelector(({ hotel, notifyChannelList }:RootState) => ({
        hotelItem: hotel.hotel,
        hotelSuccess: hotel.hotelCreateSuccess,
        hotelError: hotel.hotelCreateError,
        notifyChannelListItems: notifyChannelList.notifyChannelListItems,
    }));
    const commonroomInputRef = useRef<any|null>(null);
    const [ isOpenHotelCreateSuccessModal, setIsOpenHotelCreateSuccessModal ] = useState<boolean>(false);
    const [ isOpenHotelCreateFailModal, setIsOpenHotelCreateFailModal ] = useState<boolean>(false);
    const [ messageHotelCreateFail, setMessageHotelCreateFail ] = useState<string>('');
    const [ activeTab, setActiveTab ] = useState<number>(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const formData = new FormData();

    /* 핸들링 */
    const handelActiveTab = (number:number)=> {
        setActiveTab(number);
    };

    //인풋 변경 이벤트 핸들러
    const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = e.target;
        const value2 = name === 'useSlimkey'||name === 'allowInfinityPincode'? value === 'O'? true : false : value;
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

  const handleSetFile = (e:ChangeEvent<HTMLInputElement>) => {
    const eTarget = e.target;
    if(eTarget.files) formData.append('file', eTarget.files[0]);
  };

  /* 팝업 초기값 서버에서 가지고 오기?? */
  const handleCreateHotel = useCallback(() => {
    dispatch(createHotelAction({...hotelItem}));
  },[dispatch, hotelItem]);

  /* 파일 업로드 부분??? */
  const handleCreateFacilityByExcelUpload = useCallback(() => {
    dispatch(createExcelUploadAction({file: formData}));
  },[dispatch, formData]);

  useEffect(() => {
    if(hotelError){
      if (!hotelError.response) setMessageHotelCreateFail(hotelError.message);
      else if (hotelError.response.data === undefined) setMessageHotelCreateFail(hotelError.message);
      else setMessageHotelCreateFail(`${hotelError.response.data.code}, ${hotelError.response.data.message}`);

      if(hotelError.response.data.code === 401 || hotelError.response.data.code === 419) reload();
      else setIsOpenHotelCreateFailModal(true);
      
      dispatch(
        changeResult({
          key: 'hotelCreateError',
          value: null,
        })
      );
      return;
    }
    if(hotelSuccess){
        toggle();
        setIsOpenHotelCreateSuccessModal(true);
        setTimeout(() => {
          setIsOpenHotelCreateSuccessModal(false);
          reload();
        }, 1500);
        dispatch(
          changeResult({
            key: 'hotelCreateSuccess',
            value: false,
          })
        );
    }
  },[hotelSuccess, hotelError, toggle, reload, dispatch]);

  useEffect(() => {
    //화면 전환 시
    if(isOpen){
        dispatch(initialize()); //hotel.ts 전역상태 초기화
        dispatch(listNotifyChannelListAction({}));
    }
  }, [dispatch, isOpen]); 

  return (
    <Fragment>
      <Modal
        show={isOpen}
        onHide={() => toggle()}
        centered
        backdrop='static'
      >
        <ModalBody className='m-3' style={{margin:0, padding:0}}>
           <HotelCreate 
                hotelItem={hotelItem}
                activeTab={activeTab}
                commonroomInputRef={commonroomInputRef}
                notifyChannelListItems={notifyChannelListItems}
                handleAddCommonroom={handleAddCommonroom}
                handelActiveTab={handelActiveTab}
                handleChange={handleChange}
                handleRemoveCommonroom={handleRemoveCommonroom}
                handleSetFile={handleSetFile}
                handleCreateHotel={handleCreateHotel}
                handleCreateFacilityByExcelUpload={handleCreateFacilityByExcelUpload}
                toggle={toggle}
           />
        </ModalBody>
      </Modal>
      <ResponseSuccessModal
        isOpen={isOpenHotelCreateSuccessModal}
        toggle={() => setIsOpenHotelCreateSuccessModal(!isOpenHotelCreateSuccessModal)}
        message='단지 생성이 완료 되었습니다.'
      />
      <ResponseFailModal
        isOpen={isOpenHotelCreateFailModal}
        toggle={() => setIsOpenHotelCreateFailModal(!isOpenHotelCreateFailModal)}
        message={messageHotelCreateFail || '단지 생성에 실패 하였습니다.'}
      />
    </Fragment>
  );
};

export default HotelCreateContainer;