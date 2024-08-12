import styles from '../../css/memberPage.module.css';
import { Link } from "react-router-dom";

const MemberSignupConfirmPage = () => {

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
                <Link to={'/'} className={`bg-[rgb(0,0,139)] text-white p-3 rounded m-5`}>
                    홈으로 가기
                </Link>
                <Link to={'/login'} className={`bg-[rgb(0,0,139)] text-white p-3 rounded m-5`}>
                    로그인 하기
                </Link>
            </div>
        </div>
    );
};

export default MemberSignupConfirmPage;