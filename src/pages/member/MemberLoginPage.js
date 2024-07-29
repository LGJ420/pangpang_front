import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const MemberLoginPage = () => {

    {/* 아이디/비밀번호 state */}
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");
    
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
            .post("http://localhost:8080/api/login",{
                memberId : memberId,
                memberPw : memberPw
            })
            .then((res)=>{
                console.log(res);

                // 첫 번째 조건 : 응답 데이터에 memberId가 정의되지 않은 경우
                // ID가 일치하지 않는 경우
                if(res.data.memberId === undefined){
                    console.log("============================" + res.data.msg);
                    alert("입력하신 ID가 일치하지 않습니다.")
                    
                } 

                // 두 번째 조건 : 응답 데이터에 memberId가 null인 경우
                // ID는 일치하지만, 비밀번호가 일치하지 않는 경우
                else if (res.data.memberId === null){
                    console.log(
                        "======================",
                        "입력하신 비밀번호 가 일치하지 않습니다."
                    );
                    alert("입력하신 비밀번호 가 일치하지 않습니다.");
                } 

                // 세 번째 조건 : 응답 데이터에 memberId가 일치하는 경우
                // ID와 비밀번호 모두 일치하는 경우
                else if (res.data.memberId === memberId) {
                    console.log("======================", "로그인 성공");
                    sessionStorage.setItem("memberId", memberId); 
                    sessionStorage.setItem("name", res.data.name); 
                }

                // 작업 완료 되면 페이지 이동(새로고침)
                document.location.href="/";
            })
            .catch((error)=>{
                console.error("로그인 요청 중 오류 발생", error);
            });
    }
    return (
            <section className="account_management">

                {/* 로그인 폼 */}
                <form action="로그인url넣기" method="post">

                    {/* 로그인 페이지 */}
                    <h1>
                        <span>
                            팡이널팡타지14
                            <br></br>
                            <strong>로그인</strong>
                        </span>
                    </h1>

                    <hr></hr>

                    {/* 아이디/비밀번호 입력칸 */}
                    <div>
                        <div>
                            <input 
                            name="memberId" 
                            id="memberId" 
                            value={memberId}
                            onChange={handleMemberId}
                            placeholder="아이디를 입력해주세요."></input>
                        </div>
                        <div>
                            <input 
                            name="memberPw" 
                            id="memberPw" 
                            value={memberPw}
                            onChange={handleMemberPw}
                            type="password" 
                            placeholder="비밀번호를 입력해주세요."></input>
                        </div>
                    </div>
                    <button
                    onClick={onClickLogin}>로그인</button>

                    <hr></hr>

                    {/* 링크 이동 */}
                    <div className="">
                        <Link to={'/signup'} className="px-5">
                            회원가입
                        </Link>
                        <Link to={'/find'} className="px-5">
                            아이디/비밀번호 찾기
                        </Link>
                        <Link to={'/'} className="px-5">
                            홈으로 가기
                        </Link>
                    </div>
                </form>
            </section>

    );
}

export default MemberLoginPage;