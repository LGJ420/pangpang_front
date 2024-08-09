import { lazy, Suspense } from "react";
import productRouter from "./productRouter";
import articleRouter from "./articleRouter";
import cartRouter from "./cartRouter";
import cashRouter from "./cashRouter";
import ordersRouter from "./ordersRouter";
import managerRouter from "./managerRouter";

const { createBrowserRouter } = require("react-router-dom");


// 테스트
const Test = lazy(()=>import("../pages/TestPage"));

// 메인
const Main = lazy(()=>import("../pages/MainPage"));

// 공지사항
const Notice = lazy(()=>import("../pages/notice/NoticeIndexPage"));

// 게임소개
const Pr = lazy(()=>import("../pages/pr/PrIndexPage"));

// 자유게시판
const Article = lazy(()=>import("../pages/article/ArticleIndexPage"));

// 상점
const Product = lazy(()=>import("../pages/product/ProductIndexPage"));

// 고객센터
const Support = lazy(()=>import("../pages/support/SupportIndexPage"));

// 게임
const Game = lazy(()=>import("../pages/game/GameIndexPage"));

// 장바구니
const Cart = lazy(()=>import("../pages/cart/CartIndexPage"));

// 골드 충전소
const Cash = lazy(()=>import("../pages/cash/CashIndexPage"));

// 주문
const Orders = lazy(()=>import("../pages/orders/OrdersIndexPage"));

// 관리자
const Manager = lazy(()=>import("../pages/manager/ManagerIndexPage"));

// 로그인
const Login = lazy(()=>import("../pages/member/MemberLoginPage"));

// 회원가입
const Signup = lazy(()=>import("../pages/member/MemberSignupPage"));

// 회원가입 완료
const SignupConfirm = lazy(()=>import("../pages/member/MemberSignupConfirmPage"));

// 아이디, 비밀번호 찾기
const Find = lazy(()=>import("../pages/member/MemberFindPage"));

// 아이디 찾기(아이디 보여줌)
const FindId = lazy(()=>import("../pages/member/MemberFindIdPage"));

// 비밀번호 변경
const FindPw = lazy(()=>import("../pages/member/MemberFindPwPage"));

// 비밀번호 변경 완료
const FindPwConfirm = lazy(()=>import("../pages/member/MemberFindPwConfirmPage"));



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
        path: "cart",
        element: <Suspense><Cart /></Suspense>,
        children: cartRouter()
    },
    
    {
        path: "cash",
        element: <Suspense><Cash /></Suspense>,
        children: cashRouter()
    },
    
    {
        path: "orders",
        element: <Suspense><Orders /></Suspense>,
        children: ordersRouter()
    },

    {
        path: "manager",
        element: <Suspense><Manager /></Suspense>,
        children: managerRouter()
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
        path: "signup_confirm",
        element: <Suspense><SignupConfirm /></Suspense>
    },

    {
        path: "find",
        element: <Suspense><Find /></Suspense>
    },

    {
        path: "find_id",
        element: <Suspense><FindId /></Suspense>
    },

    {
        path: "find_pw",
        element: <Suspense><FindPw /></Suspense>
    },

    {
        path: "find_pw/confirm",
        element: <Suspense><FindPwConfirm /></Suspense>
    },
    

]);

export default root;