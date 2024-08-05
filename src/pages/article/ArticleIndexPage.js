import { Outlet } from "react-router-dom";
import BasicNoHeightLayout from "../../layouts/BasicNoHeightLayout";

const ArticleIndexPage = () => {

    return (
        <BasicNoHeightLayout>
            <Outlet/>
        </BasicNoHeightLayout>
    );
}



export default ArticleIndexPage;