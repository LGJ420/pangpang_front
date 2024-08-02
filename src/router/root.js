import { lazy, Suspense } from "react";
import productRouter from "./productRouter";
import articleRouter from "./articleRouter";
import cartRouter from "./cartRouter";
import cashRouter from "./cashRouter";
import ordersRouter from "./ordersRouter";

const { createBrowserRouter } = require("react-router-dom");


const Test = lazy(()=>import("../pages/TestPage"));


const Main = lazy(()=>import("../pages/MainPage"));
const Notice = lazy(()=>import("../pages/notice/NoticeIndexPage"));
const Pr = lazy(()=>import("../pages/pr/PrIndexPage"));
const Article = lazy(()=>import("../pages/article/ArticleIndexPage"));
const Product = lazy(()=>import("../pages/product/ProductIndexPage"));
const Support = lazy(()=>import("../pages/support/SupportIndexPage"));
const Game = lazy(()=>import("../pages/game/GameIndexPage"));
const Cart = lazy(()=>import("../pages/cart/CartIndexPage"));
const Cash = lazy(()=>import("../pages/cash/CashIndexPage"));
const Orders = lazy(()=>import("../pages/orders/OrdersIndexPage"));
const ReadProduct = lazy(()=>import("../pages/product/ProductDetailPage"));     // 메인페이지에서 상품 상세 페이지로 이동할 때 사용

// 성빈 라우터

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