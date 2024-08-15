import { Outlet } from "react-router-dom";
import BasicWidthLimitLayout from "../../layouts/BasicWidthLimitLayout";
import MypageLayoutComponent from "../../components/mypage/MypageLayoutComponent";

const ManagerIndexPage = () => {

    return (
        
        <BasicWidthLimitLayout>

            <MypageLayoutComponent>
                <Outlet/>
            </MypageLayoutComponent>
    

        </BasicWidthLimitLayout>
    );
}

export default ManagerIndexPage;