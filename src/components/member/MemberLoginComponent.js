import styles from '../../css/memberPage.module.css';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { tokenState } from '../../atoms/tokenState';
import { Spinner } from 'react-bootstrap';
import { loginMember } from '../../api/memberApi';
import { Inko } from 'inko';

const MemberLoginComponent = () => {

    // 토큰의 상태를 전역으로 알수있게 리코일을 사용한다
    const [token, setToken] = useRecoilState(tokenState);

    // 아이디/비밀번호 state
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    // 컴포넌트가 마운트될 때 토큰 확인
    useEffect(() => {

        if (token) {
            // 이미 로그인된 상태라면 홈으로 리다이렉트
            navigate("/");
        }
    }, [navigate, token]);
    
    const handleMemberId = (e)=>{
        let inko = new Inko();
        const validInputValue = inko.ko2en(e.target.value);
        setMemberId(validInputValue);
    }
    const handleMemberPw = (e)=>{
        setMemberPw(e.target.value);
    }

    const onClickLogin = async ()=>{
        
        setIsLoading(true);
        
        console.log("click login");
        console.log("ID : " + memberId);
        console.log("PW : " + memberPw);
        
        try {
            const response = await loginMember(memberId, memberPw);
            console.log(response);
            console.log("======================", "로그인 성공");

            if (response) {
                localStorage.setItem("memberId", memberId);
                localStorage.setItem("token", response); // Adjust according to response structure
                console.log("로그인 성공, 로컬 스토리지에 저장됨");
                
                setToken(response);

                // Navigate to home after login
                navigate("/");
            } else {
                alert("토큰이 응답에 없습니다.");
            }
        } catch (error) {
            console.error("로그인 요청 중 오류 발생", error);
            
            // Server response errors
            if (error.response.status === 403) {
                alert("아이디 혹은 비밀번호를 잘못 입력하셨습니다.");
                return

            } else if (error.response.status === 500) {
                alert("서버 오류: 활동이 정지되었습니다.");
                return

            } else {
                alert("로그인 요청 중 알 수 없는 오류가 발생했습니다.");
                return
            }

        } finally {
            setIsLoading(false);
        }
    }   

    /* 검색 인풋창 엔터키만 눌러도 검색 */
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onClickLogin();
        }
    }


    return (
            <section className={styles.account_management}>

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
                            maxLength={20}
                            value={memberId}
                            onChange={handleMemberId}
                            onKeyDown={handleKeyDown}
                            placeholder="아이디를 입력해주세요."
                            className={`${styles.input} h-12 px-3 placeholder-shown:text-base`}></input>
                        </div>
                        <div>
                            <input 
                            maxLength={20}
                            value={memberPw}
                            onChange={handleMemberPw}
                            onKeyDown={handleKeyDown}
                            type="password" 
                            placeholder="비밀번호를 입력해주세요."
                            className={`${styles.input} h-12 px-3 placeholder-shown:text-base`}></input>
                        </div>
                    </div>
                    
                    {/* 로그인 버튼 */}
                    <div
                    className={styles.button}
                    onClick={onClickLogin}>
                        {isLoading ? <Spinner animation="border" role="status" /> : '로그인'}
                    </div>

                    <hr></hr>

                    {/* 링크 이동 */}
                    <div className="flex justify-between">
                        <Link to={'/signup'}>
                            회원가입
                        </Link>
                        <Link to={'/find/id'}>
                            아이디 찾기
                        </Link>
                        <Link to={'/find/pw'}>
                            비밀번호 찾기
                        </Link>
                        <Link to={'/'}>
                            홈으로 가기
                        </Link>
                    </div>
                </div>
            </section>
    );
}

export default MemberLoginComponent;