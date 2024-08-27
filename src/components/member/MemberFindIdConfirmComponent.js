import { useEffect, useState } from 'react';
import styles from '../../css/memberPage.module.css';
import { Link, useLocation, useNavigate } from "react-router-dom";

const MemberFindIdConfirmComponent = () => {

    const location = useLocation();
    const { memberName, memberId } = location.state || {};

    // 잠깐의 렌더링도 방지하기 위한 state
    // 초기값이 false여야 처음부터 방지가능
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {

        if (!location.state) {

            alert("잘못된 접근 방식입니다.");
            navigate(-1);
            return;
        }

        setIsValid(true);

    },[]);


    // 이 조건문은 반드시 리액트 훅보다
    // 그렇지 않으면 이조건이 통과되야 리액트가 발생하는 오류가 생겨
    // 리액트 자체가 작동하지 않는다
    // 그래서 최하단에 배치한다
    if (!isValid) {

        return null;
    }
    return (
        <section className={styles.account_management}>
            <div>
                {/* 아이디 찾기 페이지 */}
                <Link to={'/'}>
                    <img src="/images/logo.png" className="w-20"/>
                </Link>
                <h1>
                    <span>
                        팡팡게임즈
                        <br></br>
                        <strong>
                            아이디 찾기
                        </strong>
                    </span>
                    <hr></hr>
                </h1>

                <div className='my-12 text-2xl'>
                    <span>
                        회원님의 아이디는
                    </span>
                    <span className='font-bold tracking-wide mx-5'>
                        {memberId}
                    </span>
                    <span>
                        입니다
                    </span>
                </div>

                <div>
                    <button
                        className="bg-[rgb(224,26,109)] text-white w-40 h-12 mx-2 text-2xl font-semibold rounded hover:opacity-80"
                        onClick={()=>navigate(`/login`, { replace: true })}>
                        로그인
                    </button>
                    <button
                        className="bg-[rgb(224,26,109)] text-white w-40 h-12 mx-2 text-2xl font-semibold rounded hover:opacity-80"
                        onClick={()=>navigate(`/find/pw`, { replace: true })}>
                        비밀번호 찾기
                    </button>

                </div>
            </div>
        </section>
    );
}

export default MemberFindIdConfirmComponent;