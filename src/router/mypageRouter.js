import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const ArticleList = lazy(() => import("../pages/mypage/MypageArticleListPage"));
const OrdersResult = lazy(() => import("../pages/mypage/MypageOrdersResultPage"));
const Profile = lazy(() => import("../pages/mypage/MypageProfilePage"));

const mypageRouter = () => {

  return [

    {
      path: "",
      element: <Navigate replace to="articlelist" />
    },

    {
      path: "articlelist",
      element: <Suspense><ArticleList /></Suspense>
    },

    {
      path: "ordersresult",
      element: <Suspense><OrdersResult /></Suspense>
    },

    {
      path: "profile",
      element: <Suspense><Profile /></Suspense>
    },

  ]
}

export default mypageRouter;