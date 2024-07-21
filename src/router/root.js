import { lazy } from "react";

const { createBrowserRouter } = require("react-router-dom");

const Main = lazy(()=>import("../pages/MainPage"));
const Notice = lazy(()=>import("../pages/notice/NoticeIndexPage"));
const Product = lazy(()=>import("../pages/product/ProductIndexPage"));
const Article = lazy(()=>import("../pages/article/ArticleIndexPage"));
const Login = lazy(()=>import("../pages/member/MemberLoginPage"));

const root = createBrowserRouter([

    {
        path: "",
        element: <Suspense><Main /></Suspense>
    },
    
    {
        path: "notice",
        element: <Suspense><Notice /></Suspense>
    },
    
    {
        path: "product",
        element: <Suspense><Product /></Suspense>
    },
    
    {
        path: "article",
        element: <Suspense><Article /></Suspense>
    },
    
    {
        path: "login",
        element: <Suspense><Login /></Suspense>
    },

]);

export default root;