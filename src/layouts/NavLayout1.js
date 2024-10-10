import { Link, useNavigate } from "react-router-dom";
import useCustomToken from "../hooks/useCustomToken";
import { useEffect, useState } from "react";
import { getMemberProfileImage, logoutMember } from '../api/memberApi';
import { API_SERVER_HOST } from "../api/serverHost";

const NavLayout1 = () => {

    const { isLogin, decodeToken } = useCustomToken();

    const navigate = useNavigate();

    // 프로필사진
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        // MypageLayoutComponent.js 참고
        if(decodeToken.id){
            const fetchProfileImage = async () => {
                const imagePath = await getMemberProfileImage(decodeToken.sub);
                setImageUrl(imagePath ? `${API_SERVER_HOST}/view/${imagePath}` : '/images/profile.png');
            };

            fetchProfileImage();
        }
    },[isLogin, decodeToken]);

    // 로그아웃
    const handleLogout = async () => {
        try {
            await logoutMember();
            // console.log("로그아웃 성공");
            localStorage.removeItem("memberId");
            localStorage.removeItem("token");
            window.location.reload();
        } catch (error) {
            // console.error("로그아웃 실패", error);
        }
    }


    // 장바구니
    const handleClickCart = () => {

        if(!isLogin){
            
            alert("로그인이 필요합니다");
            return;
        }

        navigate({pathname: "/cart"});
    }
    

    return (
        <nav id="navbar1">
            <div className="p-2 h-14 flex items-center justify-between w-[1350px] m-auto">
                <Link to={'/'}>
                    <img src="/images/logo_r3.png" className="h-[40px] mx-8"></img>
                </Link>
                {
                isLogin ?
                (
                    // token이 잇으면 = 로그인이 되어있으면
                    <ul className="flex m-0 items-center">
                        {/* <li className="border-r border-r-black">
                            <Link to={'/cash'} className="px-3">
                                골드 충전소
                                </Link>
                                </li> */}
                        <li>
                            <Link to={'/mypage'} className="px-3 flex items-center">
                                <img 
                                    src={imageUrl} 
                                    className="object-cover w-12 h-12 rounded-full border mr-1" 
                                    onError={(e) => {
                                        e.target.onerror = null; // 무한 루프 방지
                                        e.target.src = "/images/profile.png"; // 대체 이미지 경로
                                    }}
                                />
                                <span className="font-extrabold">{decodeToken.memberNickname}</span>님, 환영합니다!
                            </Link>
                        </li>
                        <li className="border-l border-l-black">
                            <button className="px-3"
                                onClick={handleClickCart}>
                                장바구니
                            </button>
                        </li>
                        <li className="border-l border-l-black mr-3">
                            <Link to={'/'} className="px-3" 
                            onClick={handleLogout}>
                                로그아웃
                            </Link>
                        </li>
                    </ul>
                ) 
                :
                (
                    // token이 없으면 = 로그인이 안되어있으면
                    <ul className="flex m-0 items-center">
                        <li className="border-r border-r-black">
                            <button className="px-3"
                                onClick={handleClickCart}>
                                장바구니
                            </button>
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
                            <Link to={'/signup'} className="px-3 mr-3">
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