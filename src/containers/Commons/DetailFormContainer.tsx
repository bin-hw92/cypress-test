import { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../components/Layout/MainLayout";
import { RootState } from "../../stores";
import { setBreadcrumbListAction, setMenuItemAction, setMenuTypeAction } from "../../stores/breadcrumb";
import { selectHotelAction } from "../../stores/hotel";
import BuildingListContainer from "../Building/BuildingListContainer";
import HotelDetailContainer from "../Hotel/HotelDetailContainer";
import _ from 'lodash';
import FloorListContainer from "../Floor/FloorListContainer";
import RoomListContainer from "../Room/RoomListContainer";
import DoorlockListContainer from "../Doorlock/DoorlockListContainer";
import BookingListContainer from "../Booking/BookingListContainer";
import ReportListContainer from "../Report/ReportListContainer";
import HotelNotifyTemplateListContainer from "../HotelNotify/HotelNotifyTemplateListContainer";
import StaffListContainer from "../Staff/StaffListContainer";
import BreadcrumbContainer from "./BreadcrumbContainer";
import DashboardContainer from "../Dashboard/DashboardContainer";
import { useNavigate, useParams } from "react-router-dom";
import { setHeaderItemAction } from "../../stores/header";

const DetailFormContainer = () => {
    const param = useParams();
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { breadcrumbItems, menuItem, menuType, hotelItem, hotelError } = useSelector(({ breadcrumb, hotel }:RootState) => ({
        breadcrumbItems: breadcrumb.breadcrumbItems,
        menuItem: breadcrumb.menuItem,
        menuType: breadcrumb.menuType,
        hotelItem: hotel.hotel,
        hotelError: hotel.hotelUpdateError,
    }));

    const setBreadcrumbList = useCallback((targetIndex:number, newItem: {title: string, isLink: boolean} ) => {
        let newBreadcrumbItems = Array.from(breadcrumbItems);
        newBreadcrumbItems[targetIndex] = newItem;
        const reducedBreadcrumbItem = _.compact(_.take(newBreadcrumbItems, targetIndex + 1));
        dispatch(setBreadcrumbListAction(reducedBreadcrumbItem));
    },[breadcrumbItems, dispatch]);

    const handleSelectHotel = useCallback(() => {
        dispatch(selectHotelAction());
    }, [dispatch]);

    //마지막에 접속한 뷰 체인지
    const handleViewChange = useCallback((flag:string, type:string) => {
        dispatch(setMenuTypeAction({key: flag, value: type}));
    },[dispatch]);

    //브라우저 뒤로가기, 앞으로가기 시 다시 세팅
    useEffect(() => {
        if (!localStorage.getItem('hotel_id') && param.id !== undefined){
            localStorage.setItem('hotel_id', param.id);
            if(hotelItem.role === 'master') dispatch(setMenuItemAction({menuItem: 'hotel'}));
            else dispatch(setMenuItemAction({menuItem: 'dashboard'}));
            dispatch(setHeaderItemAction({
              key: 'hotelRole',
              value: hotelItem.role,
            }));
        }
    },[dispatch, hotelItem.role, param.id]);

    useEffect(() => {
        try {
            if (localStorage.getItem('hotel_id')) handleSelectHotel();
        } catch (error) {
            throw error;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(hotelItem.name) setBreadcrumbList(1, {title: hotelItem.name, isLink: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[hotelItem]);
      
    useEffect(() => {
        if(hotelError){
          if(hotelError.response.data.code === 401 || hotelError.response.data.code === 419){
              localStorage.clear();
              navigation('/login');
          }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[hotelError]);
    return (
        <Fragment>
        <MainLayout
          refresh={handleSelectHotel}
          ContentBody={(
            <>
            <BreadcrumbContainer breadcrumbItems={breadcrumbItems} />
            {menuItem === 'hotel' && <HotelDetailContainer isOpen={menuItem === 'hotel'}/>}
            {menuItem === 'building' && <BuildingListContainer isOpen={menuItem === 'building'} buildingView={menuType.building} handleViewChange={handleViewChange}/>}
            {menuItem === 'floor' && <FloorListContainer isOpen={menuItem === 'floor'} floorView={menuType.floor} handleViewChange={handleViewChange}/>}
            {menuItem === 'room' && <RoomListContainer isOpen={menuItem === 'room'} roomView={menuType.room} handleViewChange={handleViewChange}/>}
            {menuItem === 'doorlock' && <DoorlockListContainer isOpen={menuItem === 'doorlock'} doorlockView={menuType.doorlock} handleViewChange={handleViewChange}/>}
            {menuItem === 'booking' && <BookingListContainer isOpen={menuItem === 'booking'} bookingView={menuType.booking} handleViewChange={handleViewChange}/>}
            {menuItem === 'staff' && <StaffListContainer isOpen={menuItem === 'staff'} staffView={menuType.staff} handleViewChange={handleViewChange}/>}
            {menuItem === 'hotelnotify' && <HotelNotifyTemplateListContainer isOpen={menuItem === 'hotelnotify'} isOpenHotel={true}/>}
            {menuItem === 'report' && <ReportListContainer isOpen={menuItem === 'report'} reportView={menuType.report} handleViewChange={handleViewChange}/>}
            {menuItem === 'dashboard' && <DashboardContainer isOpen={menuItem === 'dashboard'}/>}
            </>
          )}
        />
      </Fragment>
    )
}

export default DetailFormContainer;