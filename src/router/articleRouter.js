import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const List = lazy(()=>import("../pages/article/ArticleListPage"));
const Create = lazy(()=>import("../pages/article/ArticleCreatePage"));
const Read = lazy(()=>import("../pages/article/ArticleReadPage"));
const Modify = lazy(()=>import("../pages/article/ArticleModifyPage"));

const articleRouter = () => {

    return [
        
        {
            path: "",
            element: <Navigate replace to="list" />
        },
        
        {
            path: "list",
            element: <Suspense><List /></Suspense>
        },

        {
            path: "create",
            element: <Suspense><Create /></Suspense>
        },

        {
            path: "read/:id",
            element: <Suspense><Read /></Suspense>
        },

        {
            path: "modify/:id",
            element: <Suspense><Modify /></Suspense>
        }


    ]
}

export default articleRouter;