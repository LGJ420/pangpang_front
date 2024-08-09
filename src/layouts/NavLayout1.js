import { Link } from "react-router-dom";
import axios from 'axios';
import useCustomToken from "../hooks/useCustomToken";

const NavLayout1 = () => {

    const { isLogin, decodeToken } = useCustomToken();

    // 로그아웃
    const handleLogout = () => {
        axios.post("http://localhost:8080/api/member/logout")
            .then((response)=>{
                // 로그아웃 성공 메세지 출력
                console.log("로그아웃 성공");

                // 로컬 스토리지에서 사용자 정보 및 토큰 삭제
                localStorage.removeItem("memberId");
                localStorage.removeItem("token");
                
                // // 페이지 새로고침
                window.location.reload();
            })

            .catch((error)=>{
                console.error("로그아웃 실패", error);
            });
    }
    
    return (
        <nav id="navbar1">
            <div className="p-2 h-20 flex items-center justify-between w-[1350px] m-auto">
                <Link to={'/'}>
                    <img src="/images/logo_r3.png" className="h-[40px] mx-8"></img>
                </Link>
                {
                isLogin ?
                (
                    // token이 잇으면 = 로그인이 되어있으면
                    <ul className="flex m-0 items-center">
                        <li className="border-r border-r-black">
                            <Link to={'/cart'} className="px-3">
                                장바구니
                            </Link>
                        </li>
                        {/* <li className="border-r border-r-black">
                            <Link to={'/cash'} className="px-3">
                                골드 충전소
                            </Link>
                        </li> */}
                        <li className="border-r border-r-black">
                            <Link to={'/'} className="px-3" 
                            onClick={handleLogout}>
                                로그아웃
                            </Link>
                        </li>
                        <li>
                            <Link to={'/mypage'} className="px-3 flex items-center mr-1">
                                <img src="/images/profile.png" className="w-16 h-16 rounded-full border mr-2"/>
                                {decodeToken.memberName}님, 환영합니다!
                            </Link>
                        </li>
                    </ul>
                ) 
                :
                (
                    // token이 없으면 = 로그인이 안되어있으면
                    <ul className="flex m-0 items-center">
                        <li className="border-r border-r-black">
                            <Link to={'/cart'} className="px-3">
                                장바구니
                            </Link>
                        </li>
                        {/* <li className="border-r border-r-black">
                            <Link to={'/cash'} className="px-3">
                                골드 충전소
                            </Link>
                        </li> */}
                        <li className="border-r border-r-black">
                            <Link to={'/login'} className="px-3">
                                로그인
                            </Link>
                        </li>
                        <li>
                            <Link to={'/signup'} className="px-3">
                                회원가입
                            </Link>
                        </li>
                    </ul>
                )
                }
            </div>
        </nav>
    );
}

export default NavLayout1;