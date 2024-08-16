import { Outlet } from "react-router-dom";
import BasicNoHeightLayout from "../../layouts/BasicNoHeightLayout";
import MypageLayoutComponent from "../../components/mypage/MypageLayoutComponent";

const ManagerIndexPage = () => {

    return (
        
        <BasicNoHeightLayout>

            <MypageLayoutComponent>
                <Outlet/>
            </MypageLayoutComponent>
    

        </BasicNoHeightLayout>
    );
}

export default ManagerIndexPage;