import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const MemberLoginPage = () => {

    // 아이디/비밀번호 state
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const navigate = useNavigate();

    // 컴포넌트가 마운트될 때 토큰 확인
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // 이미 로그인된 상태라면 홈으로 리다이렉트
            navigate("/");
        }
    }, [navigate]);
    
    const handleMemberId = (e)=>{
        setMemberId(e.target.value);
    }
    const handleMemberPw = (e)=>{
        setMemberPw(e.target.value);
    }

    const onClickLogin = ()=>{
        
        console.log("click login");
        console.log("ID : " + memberId);
        console.log("PW : " + memberPw);
        
        axios
        .post("http://localhost:8080/api/member/login",{
            memberIdInLogin : memberId,
            memberPwInLogin : memberPw
        })
            .then((response)=>{
                console.log(response.data);
                console.log("======================", "로그인 성공");
                
                if (response.data.token) {
                    localStorage.setItem("memberId", memberId);
                    localStorage.setItem("token", response.data.token);
                    console.log("로그인 성공, 로컬 스토리지에 저장됨");
                    
                    // // ▼로컬스토리지 저장하는데 굳이 세션스토리지까지 저장안해도 될듯?!▼
                    // sessionStorage.setItem("memberId", memberId);
                    // sessionStorage.setItem("token", response.data.token);
                    // console.log("로그인 성공, 세션 스토리지에 저장됨");

                } else {
                    alert("토큰이 응답에 없습니다.");
                }

                // 로그인 후 홈으로 리다이렉트
                navigate("/");
            })
            .catch((error)=>{
                console.error("로그인 요청 중 오류 발생", error);
                alert("아이디 혹은 비밀번호를 잘못 입력하셨습니다.")
            });

        }

        /* 검색 인풋창 엔터키만 눌러도 검색 */
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                onClickLogin();
            }
        }

    return (
            <section className="account_management">

                {/* 로그인 폼 */}
                <div className="w-[25rem]">

                    {/* 로그인 페이지 */}
                    <Link to={'/'}>
                        <img src="/images/logo.png" className="w-20 mb-3"/>
                    </Link>
                    <h1>
                        <span>
                            팡팡게임즈
                            <br></br>
                            <strong>로그인</strong>
                        </span>
                    </h1>

                    <hr></hr>

                    {/* 아이디/비밀번호 입력칸 */}
                    <div>
                        <div>
                            <input 
                            value={memberId}
                            onChange={handleMemberId}
                            onKeyDown={handleKeyDown}
                            placeholder="아이디를 입력해주세요."
                            className="h-12 px-3 placeholder-shown:text-base"></input>
                        </div>
                        <div>
                            <input 
                            value={memberPw}
                            onChange={handleMemberPw}
                            onKeyDown={handleKeyDown}
                            type="password" 
                            placeholder="비밀번호를 입력해주세요."
                            className="h-12 px-3 placeholder-shown:text-base"></input>
                        </div>
                    </div>
                    
                    {/* 로그인 버튼 */}
                    <div
                    className="button"
                    onClick={onClickLogin}>
                        로그인
                    </div>

                    <hr></hr>

                    {/* 링크 이동 */}
                    <div className="flex justify-between">
                        <Link to={'/signup'}>
                            회원가입
                        </Link>
                        <Link to={'/find'}>
                            아이디/비밀번호 찾기
                        </Link>
                        <Link to={'/'}>
                            홈으로 가기
                        </Link>
                    </div>
                </div>
            </section>
    );
}

export default MemberLoginPage;