import styles from '../../css/memberPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const MemberSignupConfirmPage = () => {

    const navigate = useNavigate();

    // 컴포넌트가 마운트될 때 토큰 확인
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // 이미 로그인된 상태라면 홈으로 리다이렉트
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className={styles.account_management}>
            {/* 회원가입 완료 페이지 */}
            <Link to={'/'}>
                <img src="/images/logo.png" className="w-20 mb-3"/>
            </Link>
            <h1>
                <span>
                팡팡게임즈
                    <br></br>
                    <strong>
                        회원가입
                    </strong>
                    이 
                    <br></br>
                    완료되었습니다
                </span>
            </h1>

            <div className='flex mt-5'>
                <Link to={'/'} className={`bg-[rgb(0,0,139)] text-white p-3 rounded m-5 w-32 text-xl`}>
                    홈으로 가기
                </Link>
                <Link to={'/login'} className={`bg-[rgb(0,0,139)] text-white p-3 rounded m-5 w-32 text-xl`}>
                    로그인 하기
                </Link>
            </div>
        </div>
    );
};

export default MemberSignupConfirmPage;