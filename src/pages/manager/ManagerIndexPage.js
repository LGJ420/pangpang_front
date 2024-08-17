import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import MypageLayoutComponent from "../../components/mypage/MypageLayoutComponent";

const ManagerIndexPage = () => {

    return (
        
        <BasicLayout width={'85rem'}>

            <MypageLayoutComponent>
                <Outlet/>
            </MypageLayoutComponent>
    

        </BasicLayout>
    );
}

export default ManagerIndexPage;