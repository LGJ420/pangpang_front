import { Outlet } from "react-router-dom";
import BasicWidthLimitLayout from "../../layouts/BasicWidthLimitLayout";

const ProductIndexPage = () => {

    return (

        <BasicWidthLimitLayout>

        <Outlet />
        
        </BasicWidthLimitLayout>
        
    );
}

export default ProductIndexPage;