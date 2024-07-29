import { Link } from "react-router-dom";

const MemberLoginPage = () => {

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
                            <input name="memberId" id="memberId" placeholder="아이디를 입력해주세요."></input>
                        </div>
                        <div>
                            <input name="memberPw" id="memberPw" type="password" placeholder="비밀번호를 입력해주세요."></input>
                        </div>
                    </div>
                    <button type="submit">로그인</button>

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