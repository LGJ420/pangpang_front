import { lazy, Suspense } from "react";
import productRouter from "./productRouter";
import articleRouter from "./articleRouter";

const { createBrowserRouter } = require("react-router-dom");


const Test = lazy(()=>import("../pages/TestPage"));


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


/**
 * 
 * 라우터는 경로로 이동시켜주게 해준다
 * 
 * 예를들어 path에 list써져있으면
 * localhost:8080/list 가 된다 
 * 
 * element는 뭘보여줄지 써주는데 IndexPage 보여주면된다
 * 
 * Member는 MemberIndexPage라고 안하고 바로 MemberLoginPage로 가게했는데
 * 이유는 책이 이렇게 하길래 일단 이렇게 해놓은 상태이다
 * 맘에 안드는건 언제든지 바꿔도된다
 * 
 * 
 * 그리고 간혹가다 children이 있는데
 * 저게 바로 Index 페이지에서 Outlet(아울렛)쓰면 저 자식들로 갈수있게 해주는거다
 */



const root = createBrowserRouter([

    {
        path: "test",
        element: <Suspense><Test /></Suspense>
    },

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
        element: <Suspense><Article /></Suspense>,
        children: articleRouter()
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