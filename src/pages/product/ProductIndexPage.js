import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

const ProductIndexPage = () => {

    return (

        <BasicLayout width={'85rem'} minHeight={'90rem'}>

            <Outlet />
        
        </BasicLayout>
        
    );
}

export default ProductIndexPage;