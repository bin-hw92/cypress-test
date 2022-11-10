import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LeftMenu from "../../components/Commons/LeftMenu";
import { RootState } from "../../stores";
import { setHomeMenuItemAction, setMenuItemAction } from "../../stores/breadcrumb";


const LeftMenuContainer = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const { menuItem, homeMenuItem, userName, userRole, hotelRole } = useSelector(({ breadcrumb, header }:RootState) => ({
        menuItem: breadcrumb.menuItem,
        homeMenuItem: breadcrumb.homeMenuItem,
        userName: header.name,
        userRole: header.userRole,
        hotelRole: header.hotelRole,
    }));

    const handleMenuItem = (menuItem:string) => {
        dispatch(setMenuItemAction({menuItem}));
    }

    const handleHomeMenuItem = (homeMenuItem:string) => {
        dispatch(setHomeMenuItemAction({homeMenuItem}));
        if(homeMenuItem === ''){
            return navigation(`/hotel`);
        }
        if(homeMenuItem === 'template' || homeMenuItem === 'hotelnotify'){
            return navigation('/notify_template');
        }
        if(homeMenuItem === 'channel'){
            return navigation('/notify_channel');
        }
        if(homeMenuItem === 'dashboard'){
            return navigation('/dashboard');
        }
        if(homeMenuItem === 'doorlock'){
            return navigation('/doorlock');
        }
    }

    return <LeftMenu 
                menuItem={menuItem} 
                homeMenuItem={homeMenuItem}
                hotelRole={hotelRole}
                userName={userName}
                userRole={userRole}
                handleMenuItem={handleMenuItem} 
                handleHomeMenuItem={handleHomeMenuItem}
            />
}

export default LeftMenuContainer;