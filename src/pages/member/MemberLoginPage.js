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
            .post("http://localhost:8080/api/member/login",{
                memberIdInLogin : memberId,
                memberPwInLogin : memberPw
            })
            .then((response)=>{
                console.log(response.data);

                // 첫 번째 조건 : 응답 데이터에 memberId가 정의되지 않은 경우
                // ID가 일치하지 않는 경우
                if(response.data.memberId === undefined){
                    console.log("============================" + response.data.msg);
                    alert("입력하신 ID가 일치하지 않습니다.")
                } 

                // 두 번째 조건 : 응답 데이터에 memberId가 null인 경우
                // ID는 일치하지만, 비밀번호가 일치하지 않는 경우
                else if (response.data.memberId === null){
                    console.log(
                        "======================",
                        "입력하신 비밀번호 가 일치하지 않습니다."
                    );
                    alert("입력하신 비밀번호 가 일치하지 않습니다.");
                } 

                // 세 번째 조건 : 응답 데이터에 memberId가 일치하는 경우
                // ID와 비밀번호 모두 일치하는 경우
                else if (response.data.memberId === memberId) {
                    console.log("======================", "로그인 성공");
                    // sessionStorage에 memberId, memberName 저장
                    sessionStorage.setItem("memberId", memberId); 
                    sessionStorage.setItem("name", response.data.name); 
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
                <div>

                    {/* 로그인 페이지 */}
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
                            placeholder="아이디를 입력해주세요."></input>
                        </div>
                        <div>
                            <input 
                            value={memberPw}
                            onChange={handleMemberPw}
                            type="password" 
                            placeholder="비밀번호를 입력해주세요."></input>
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
                    <div>
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
                </div>
            </section>

    );
}

export default MemberLoginPage;