import { Link } from "react-router-dom";
import axios from 'axios';

const MemberSignupConfirmPage = () => {

    return (
        <div className="account_management">
            {/* 회원가입 완료 페이지 */}
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

            <hr></hr>

            <div>
                <Link to={'/'} className="button m-5">
                    홈으로 가기
                </Link>
                <Link to={'/login'} className="button m-5">
                    로그인 하기
                </Link>
            </div>
        </div>
    );
};

export default MemberSignupConfirmPage;