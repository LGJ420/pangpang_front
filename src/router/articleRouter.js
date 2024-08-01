import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const List = lazy(()=>import("../pages/article/ArticleListPage"));
const Create = lazy(()=>import("../pages/article/ArticleWritePage"));
// const Read = lazy(()=>import("../내가 만든 경로 쓰기"));
// const Create = lazy(()=>import("../내가 만든 경로 쓰기"));
// const Modify = lazy(()=>import("../내가 만든 경로 쓰기"));

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
        }

        // {
        //     //:ano 내가 작명한 이 이름을 인식하니까 주의
        //     path: "read/:ano",
        //     element: <Suspense><Read /></Suspense>
        // },

        // {
        //     path: "create",
        //     element: <Suspense><Create /></Suspense>
        // },

        // {
        //     path: "modify/:ano",
        //     element: <Suspense><Modify /></Suspense>
        // }


    ]
}

export default articleRouter;