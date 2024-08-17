import { Outlet } from "react-router-dom";
import MypageLayoutComponent from "../../components/mypage/MypageLayoutComponent";
import BasicLayout from "../../layouts/BasicLayout";

const MypageIndexPage = () => {

    return (

        <BasicLayout width={'85rem'}>
            
            <MypageLayoutComponent>

                <Outlet />

            </MypageLayoutComponent>

        </BasicLayout>
    );

}

export default MypageIndexPage;