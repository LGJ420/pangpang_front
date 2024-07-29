import { Outlet } from "react-router-dom";
import BasicWidthLimitLayout from "../../layouts/BasicWidthLimitLayout";

const CashIndexPage = () => {

    return (
        <BasicWidthLimitLayout>

        <Outlet />
        
        </BasicWidthLimitLayout>
    );
}

export default CashIndexPage;