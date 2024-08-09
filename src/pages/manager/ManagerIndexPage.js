import { Outlet } from "react-router-dom";
import BasicWidthLimitLayout from "../../layouts/BasicWidthLimitLayout";

const ManagerIndexPage = () => {

    return (
        
        <BasicWidthLimitLayout>

            <h1>여기는 관리자페이지다 샹</h1>
            <Outlet />

        </BasicWidthLimitLayout>
    );
}

export default ManagerIndexPage;