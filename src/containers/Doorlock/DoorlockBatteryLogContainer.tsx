import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DoorlockBatteryLogList from '../../components/Doorlock/DoorlockBatteryLogList';
import { RootState } from '../../stores';
import { changeResult, listDoorlockBatteryAction, setFilterBatteryItemAction, setInitFilterItemAction } from '../../stores/doorlockBatteryList';
import { DoorlockBatteryLogContainerProps } from '../../types/doorlock';

const DoorlockBatteryLogContainer = ({
  isOpen,
  doorlockId,
  hotelId,
  handleGoBack,
  handleErrorApi,
}:DoorlockBatteryLogContainerProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { doorlockBatteryListItems, doorlockBatteryError, filterItem } = useSelector(({ doorlockBatteryList }:RootState) => ({
      doorlockBatteryListItems: doorlockBatteryList.doorlockBatteryListItems,
      filterItem: doorlockBatteryList.filterItem,
      doorlockBatteryError: doorlockBatteryList.doorlockBatteryListError,
  }));

  const handlelistDoorlockBattery = useCallback(() => {
    dispatch(listDoorlockBatteryAction({
      hotelId,
      doorlockId,
      startAt: filterItem.startAt? moment(filterItem.startAt).startOf('day').utc().format() : moment().subtract(1, 'year').startOf('day').utc().format(),
      endAt: filterItem.endAt? moment(filterItem.endAt).startOf('day').utc().format() : moment().endOf('day').utc().format(),
    }));
  }, [dispatch, hotelId, doorlockId, filterItem]);
  
  //필터 핸들링
  const handleFilter =  useCallback((targetItem:any, isDebounce:boolean) => {
    dispatch(setFilterBatteryItemAction({...filterItem, ...targetItem}));
  }, [dispatch, filterItem]);

  //필터 초기화 버튼
  const handleinitFilter = useCallback(() => {
    dispatch(setInitFilterItemAction());
  },[dispatch]);

  useEffect(() => {
    try {
      if (isOpen && doorlockId) {
        handlelistDoorlockBattery();
      }
    } catch (error) {
      throw error;
    }
  }, [isOpen, doorlockId, handlelistDoorlockBattery]);

  useEffect(() => {
    if(doorlockBatteryError){

      if(doorlockBatteryError.response.data.code === 401 || doorlockBatteryError.response.data.code === 419){
        localStorage.clear();
        navigation('/login');
      }else{
        handleErrorApi('battery', doorlockBatteryError);
      } 
      dispatch(
        changeResult({
          key: 'doorlockBatteryError',
          value: null,
        })
      );
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch, doorlockBatteryError, handleErrorApi]);

  return (
      <DoorlockBatteryLogList 
        doorlockBatteryListItems={doorlockBatteryListItems}
        filterItem={filterItem}
        handleGoBack={handleGoBack}
        handleFilter={handleFilter}
        handleinitFilter={handleinitFilter}
      />
  );
};

export default DoorlockBatteryLogContainer;