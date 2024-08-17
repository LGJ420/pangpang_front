import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

const CartIndexPage = () => {

    return (

        <BasicLayout minWidth={'85rem'} minHeight={'60rem'} isFooter={false}>

            <Outlet />

        </BasicLayout>
    )
}

export default CartIndexPage;