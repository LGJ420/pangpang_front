import { useNavigate } from "react-router-dom";
import useCustomToken from "../../hooks/useCustomToken";

const MypageLayoutComponent = ({children}) => {

    const {decodeToken} = useCustomToken();

    const navigate = useNavigate();

    return (
        <>
        <section>
            <div className="h-[15rem] bg-sky-200 flex items-center">
                <img src="/images/profile.png" className="rounded-full border w-52 ml-8"/>
                <h3 className="text-5xl font-bold p-5 tracking-wider">{decodeToken.memberNickname}</h3>
                <div className="text-xl font-semibold pt-6">등급 : {decodeToken.memberRole}</div>
            </div>
        </section>
        <section>
            <div className="min-h-[60rem] flex">
                <div className="w-1/5 p-5 bg-slate-400">
                    <h3 className="text-2xl">
                        메뉴
                    </h3>
                    <ul className="m-0">
                        <li className="my-5 cursor-pointer"
                            onClick={()=>navigate({pathname: `./articlelist`})}>
                            내가 쓴 글
                        </li>
                        <li className="my-5 cursor-pointer"
                            onClick={()=>navigate({pathname: `./ordersresult`})}>
                            구매내역
                        </li>
                        <li className="my-5 cursor-pointer"
                            onClick={()=>navigate({pathname: `./confirmBeforeProfile`})}>
                            내 정보 변경
                        </li>
                    </ul>
                    <h3 className="text-2xl">
                        관리자
                    </h3>
                    <ul className="m-0">
                        <li className="my-5 cursor-pointer">
                            회원 관리
                        </li>
                        <li className="my-5 cursor-pointer">
                            상품 관리
                        </li>
                    </ul>
                </div>
                <div className="w-4/5 p-5 bg-red-200">
                    {children}
                </div>
            </div>
        </section>
        </>
    );
}

export default MypageLayoutComponent;