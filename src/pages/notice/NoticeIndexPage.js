import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

const NoticeIndexPage = () => {

    return (

        <BasicLayout width={'85rem'} minHeight={'72rem'}>

            <Outlet />
        
        </BasicLayout>
    );
}

export default NoticeIndexPage;