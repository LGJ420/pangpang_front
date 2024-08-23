import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Member = lazy(() => import("../pages/manager/ManagerMemberPage"));
const Product = lazy(() => import("../pages/manager/ManagerProductPage"));
const Article = lazy(() => import("../pages/manager/ManagerArticlePage"));

const managerRouter = () => {

  return [

    {
      path: "",
      element: <Navigate replace to="member" />
    },

    {
      path: "member",
      element: <Suspense><Member /></Suspense>
    },

    {
      path: "product",
      element: <Suspense><Product /></Suspense>
    },

    {
      path: "article",
      element: <Suspense><Article /></Suspense>
    }
  ]
}

export default managerRouter;