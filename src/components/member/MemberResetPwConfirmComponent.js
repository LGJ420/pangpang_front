import styles from '../../css/memberPage.module.css';
import { Link, useNavigate } from "react-router-dom";

const MemberResetPwConfirmComponent = () => {

    const navigate = useNavigate();

    return (
        <section className={styles.account_management}>
            <div>
            {/* 회원가입 완료 페이지 */}
            <Link to={'/'}>
                <img src="/images/logo.png" className="w-20 mb-3"/>
            </Link>
            <h1>
                <span>
                팡팡게임즈
                    <br></br>
                    <strong>
                        비밀번호 변경
                    </strong>
                    이 
                    <br></br>
                    완료되었습니다
                </span>
            </h1>

            <hr></hr>
                <div>
                    <button
                        className="bg-[rgb(0,0,139)] text-white w-40 h-12 mx-2 text-2xl font-semibold rounded hover:opacity-80"
                        onClick={()=>navigate(`/`, { replace: true })}>
                        홈으로 가기
                    </button>
                    <button
                        className="bg-[rgb(0,0,139)] text-white w-40 h-12 mx-2 text-2xl font-semibold rounded hover:opacity-80"
                        onClick={()=>navigate(`/login`, { replace: true })}>
                        로그인 하기
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MemberResetPwConfirmComponent;