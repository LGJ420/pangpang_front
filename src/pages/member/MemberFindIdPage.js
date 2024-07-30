import { Link } from "react-router-dom";

const MemberFindIdPage = () => {

    return (
        <section className="account_management">

            {/* 아이디 찾기 페이지 */}
            <h1>
                <span>
                    팡이널팡타지14
                    <br></br>
                    <strong>아이디 찾기</strong>
                </span>
                <hr></hr>
            </h1>

            <div>
                000 회원님의 아이디는
                <br></br>
                    <strong>
                    어쩌고저쩌고
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