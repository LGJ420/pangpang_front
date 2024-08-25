import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import BodyTitleComponent from "../../components/common/BodyTitleComponent";

const NoticeIndexPage = () => {

    return (

        <BasicLayout width={'85rem'} minHeight={'72rem'}>

            <BodyTitleComponent title={`공지사항`} path={`notice`}/>

            <Outlet />
        
        </BasicLayout>
    );
}

export default NoticeIndexPage;