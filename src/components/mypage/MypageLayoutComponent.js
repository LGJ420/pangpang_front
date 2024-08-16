import { useNavigate } from "react-router-dom";
import useCustomToken from "../../hooks/useCustomToken";
import { useEffect } from "react";

const MypageLayoutComponent = ({children}) => {

    const {isLogin, decodeToken} = useCustomToken();

    const navigate = useNavigate();

    useEffect(()=>{

        // useEffect에도 이렇게 두번에 걸쳐 작업하는이유는
        // 리액트의 비동기 특성때문
        if(!isLogin){

            alert("잘못된 접근 방식입니다.");
            navigate(-1);
        }
    },[isLogin]);


    // 이 조건문은 반드시 리액트 훅보다
    // 그렇지 않으면 이조건이 통과되야 리액트가 발생하는 오류가 생겨
    // 리액트 자체가 작동하지 않는다
    // 그래서 최하단에 배치한다
    if(!isLogin){

        return null;
    }
    return (
        <>
        <section>
            <div className="h-[15rem] flex items-center border-b bg-slate-100">
                <img src="/images/profile.png" className="rounded-full border w-52 ml-8"/>
                <h3 className="text-5xl font-bold p-5 tracking-wider">{decodeToken.memberNickname}</h3>
                <div className="text-2xl font-semibold pt-6 uppercase">등급 : {decodeToken.memberRole}</div>
            </div>
        </section>
        <section>
            <div className="min-h-[60rem] flex">
                <div className="w-1/5 p-5 border-r bg-slate-200">
                    <h3 className="text-2xl font-bold">
                        메뉴
                    </h3>
                    <ul className="m-0">
                        <li className="text-xl my-7 cursor-pointer"
                            onClick={()=>navigate({pathname: `/mypage/profile/cofirm`})}>
                            내 정보 변경
                        </li>
                        <li className="text-xl my-7 cursor-pointer"
                            onClick={()=>navigate({pathname: `/mypage/article`})}>
                            내가 쓴 글
                        </li>
                        <li className="text-xl my-7 cursor-pointer"
                            onClick={()=>navigate({pathname: `/mypage/comment`})}>
                            내가 쓴 댓글
                        </li>
                        <li className="text-xl my-7 cursor-pointer"
                            onClick={()=>navigate({pathname: `/mypage/review`})}>
                            내가 쓴 리뷰
                        </li>
                        <li className="text-xl my-7 cursor-pointer"
                            onClick={()=>navigate({pathname: `/mypage/orders/result`})}>
                            구매내역
                        </li>
                    </ul>
                    <h3 className="text-2xl font-bold mt-10">
                        관리자
                    </h3>
                    <ul className="m-0">
                        <li className="text-xl my-7 cursor-pointer"
                        onClick={()=>navigate({pathname: `/manager/member`})}>
                            회원 관리
                        </li>
                        <li className="text-xl my-7 cursor-pointer">
                            상품 관리
                        </li>
                    </ul>
                </div>
                <div className="w-4/5 p-5">
                    {children}
                </div>
            </div>
        </section>
        </>
    );
}

export default MypageLayoutComponent;