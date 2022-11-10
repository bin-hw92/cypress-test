import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Commons/Breadcrumb";
import { setMenuItemAction } from "../../stores/breadcrumb";
import { BreadcrumbContainerProps } from "../../types/commons";


const BreadcrumbContainer = ({
    breadcrumbItems,
}:BreadcrumbContainerProps) => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const handleLink = (path:string) => {
        dispatch(setMenuItemAction({menuItem: ''}));
        return navigation(path);
    }

    return <Breadcrumb breadcrumbItems={breadcrumbItems} handleLink={handleLink} />
}

export default BreadcrumbContainer;