import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const CommentList = lazy(() => import("../pages/comment/CommentListPage"))
const CommentCreate = lazy(() => import("../pages/comment/CommentCreatePage"))
const CommentModify = lazy(() => import("../pages/comment/CommentModifyPage"))

const commentRouter = () => {
    return [
        {
            path:"",
            element:<Navigate replace to="list"/>
        },
        {
            path: "list",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <CommentList />
                </Suspense>
            )
        },
        {
            path: "create/:articleId",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <CommentCreate />
                </Suspense>
            )
        },
        {
            path: "modify/:commentId",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <CommentModify />
                </Suspense>
            )
        }
    ];
}

export default commentRouter;
