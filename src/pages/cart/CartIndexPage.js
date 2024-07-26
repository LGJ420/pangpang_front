import { Outlet } from "react-router-dom";
import BasicWidthLimitLayout from "../../layouts/BasicWidthLimitLayout";

const CartIndexPage = () => {


    return (
        <BasicWidthLimitLayout>

        <Outlet />

        </BasicWidthLimitLayout>
    )
}

export default CartIndexPage;