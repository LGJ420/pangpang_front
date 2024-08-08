import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

const NavLayout1 = () => {

    // 토큰 유(로그인O)무(로그인X) 따지는 state
    const [isToken, setIsToken] = useState(false);
    // 사용자 이름을 저장할 state
    const [memberName, setMemberName] = useState("");

    useEffect(() => {
        // 로그인해야 로컬스토리지에 토큰이 저장됨
        const token = localStorage.getItem("token");
        console.log(token);
        
        if (token) {
            // 토큰이 있으면 state를 true로 바꿈
            setIsToken(true);

            // 토큰에서 페이로드 부분 추출
            const payload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
            console.log(payload);

            // Base64를 디코딩하여 문자열을 얻음
            const base64Decoded = atob(payload);

            // UTF-8로 설정
            const uint8Array = new Uint8Array(base64Decoded.length);
            for (let i = 0; i < base64Decoded.length; i++) {
                uint8Array[i] = base64Decoded.charCodeAt(i);
            }

            // 문자열로 변환
            const decoder = new TextDecoder('utf-8');
            const jsonString = decoder.decode(uint8Array);
            console.log("토큰 payload 문자열 : " + jsonString);

            // JSON 문자열을 객체로 파싱
            const decJson = JSON.parse(jsonString);
            console.log("토큰 payload 객체 : " + decJson.memberName);

            // 사용자 이름 상태를 업데이트
            setMemberName(decJson.memberName);
        } else {
            setIsToken(false);
            setMemberName(""); // 토큰이 없으면 사용자 이름도 초기화
        }
    }, []); // 빈 배열로 변경하여 컴포넌트 마운트 시 한 번만 실행

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
            <div className="flex items-center justify-between w-[1350px] m-auto">
                <Link to={'/'}>
                    <img src="/images/logo_r3.png" className="h-[40px] mx-8 my-3"></img>
                </Link>
                {
                isToken ?
                (
                    // token이 잇으면 = 로그인이 되어있으면
                    <ul className="flex mr-5">
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
                            <Link to={'/마이페이지url'} className="px-3">
                                {memberName}님, 환영합니다!
                            </Link>
                        </li>
                        <li>
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
                    <ul className="flex mr-5">
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