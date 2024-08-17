import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

const CashIndexPage = () => {

    return (

        <BasicLayout width={'85rem'} minHeight={'60rem'}>

            <Outlet />
        
        </BasicLayout>
    );
}

export default CashIndexPage;