import { Link, useLocation } from "react-router-dom";

const MemberFindIdPage = () => {

    const location = useLocation();
    const {memberName, memberId} = location.state || {};

    return (
        <section className="account_management">

            {/* 아이디 찾기 페이지 */}
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

            <div>
                {memberName} 회원님의 아이디는
                <br></br>
                    <strong>
                    {memberId}
                        </strong>
                <br></br>
                입니다
            </div>

            <div>
                <Link to={'/find'} className="px-5 button m-10">
                    비밀번호 찾기
                </Link>

                <Link to={'/login'} className="px-5 button m-10">
                    로그인
                </Link>
            </div>
        </section>
    );
}

export default MemberFindIdPage;