import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const ArticleList = lazy(() => import("../pages/mypage/MypageArticleListPage"));
const CommentList = lazy(() => import("../pages/mypage/MypageCommentPage"));
const ReviewList = lazy(() => import("../pages/mypage/MypageReviewPage"));
const OrdersResult = lazy(() => import("../pages/mypage/MypageOrdersResultPage"));
const Profile = lazy(() => import("../pages/mypage/MypageProfilePage"));

const mypageRouter = () => {

  return [

    {
      path: "",
      element: <Navigate replace to="article" />
    },

    {
      path: "article",
      element: <Suspense><ArticleList /></Suspense>
    },

    {
      path: "comment",
      element: <Suspense><CommentList /></Suspense>
    },

    {
      path: "review",
      element: <Suspense><ReviewList /></Suspense>
    },

    {
      path: "orders/result",
      element: <Suspense><OrdersResult /></Suspense>
    },

    {
      path: "profile",
      element: <Suspense><Profile /></Suspense>
    },

  ]
}

export default mypageRouter;