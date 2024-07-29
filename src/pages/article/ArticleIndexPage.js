import { Outlet } from "react-router-dom";
import BasicWidthLimitLayout from "../../layouts/BasicWidthLimitLayout";

const ArticleIndexPage = () => {

    return (
        <BasicWidthLimitLayout>
            <Outlet/>
        </BasicWidthLimitLayout>
    );
}



export default ArticleIndexPage;