import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const List = lazy(() => import("../pages/notice/NoticeListPage"));
const Read = lazy(() => import("../pages/notice/NoticeReadPage"));
const Add = lazy(() => import("../pages/notice/NoticeAddPage"));
const Modify = lazy(() => import("../pages/notice/NoticeModifyPage"));

const noticeRouter = () => {

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
      path: "read/:id",
      element: <Suspense><Read /></Suspense>
    },

    {
      path: "add",
      element: <Suspense><Add /></Suspense>
    },

    {
      path: "modify/:id",
      element: <Suspense><Modify /></Suspense>
    }
    
  ]
}

export default noticeRouter;