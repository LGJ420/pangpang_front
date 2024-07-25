import { lazy, Suspense } from "react";
import productRouter from "./productRouter";

const { createBrowserRouter } = require("react-router-dom");

const Main = lazy(()=>import("../pages/MainPage"));
const Notice = lazy(()=>import("../pages/notice/NoticeIndexPage"));
const Pr = lazy(()=>import("../pages/pr/PrIndexPage"));
const Article = lazy(()=>import("../pages/article/ArticleIndexPage"));
const Product = lazy(()=>import("../pages/product/ProductIndexPage"));
const Support = lazy(()=>import("../pages/support/SupportIndexPage"));
const Game = lazy(()=>import("../pages/game/GameIndexPage"));
const Login = lazy(()=>import("../pages/member/MemberLoginPage"));
const Signup = lazy(()=>import("../pages/member/MemberSignupPage"));
const Cash = lazy(()=>import("../pages/cash/CashIndexPage"));

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
        path: "pr",
        element: <Suspense><Pr /></Suspense>
    },
    
    {
        path: "article",
        element: <Suspense><Article /></Suspense>
    },
    
    {
        path: "product",
        element: <Suspense><Product /></Suspense>,
        children: productRouter()
    },
    
    {
        path: "support",
        element: <Suspense><Support /></Suspense>
    },
    
    {
        path: "game",
        element: <Suspense><Game /></Suspense>
    },
    
    {
        path: "login",
        element: <Suspense><Login /></Suspense>
    },
    
    {
        path: "signup",
        element: <Suspense><Signup /></Suspense>
    },
    
    {
        path: "cash",
        element: <Suspense><Cash /></Suspense>
    },

]);

export default root;