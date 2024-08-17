import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

const ArticleIndexPage = () => {

    return (

        <BasicLayout width={'85rem'} minHeight={'60rem'}>

            <Outlet/>

        </BasicLayout>
    );
}

export default ArticleIndexPage;