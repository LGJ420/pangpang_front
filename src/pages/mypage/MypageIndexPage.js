import { Outlet } from "react-router-dom";
import MypageLayoutComponent from "../../components/mypage/MypageLayoutComponent";
import BasicNoHeightLayout from "../../layouts/BasicNoHeightLayout";


const MypageIndexPage = () => {


    return (

        <BasicNoHeightLayout>
            
            <MypageLayoutComponent>

            <Outlet />

            </MypageLayoutComponent>

        </BasicNoHeightLayout>
    );

}

export default MypageIndexPage;