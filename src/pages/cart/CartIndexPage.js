import { Outlet } from "react-router-dom";

import BasicNoFooterLayout from "../../layouts/BasicNoFooterLayout";

const CartIndexPage = () => {


    return (
        <BasicNoFooterLayout>

        <Outlet />

        </BasicNoFooterLayout>
    )
}

export default CartIndexPage;