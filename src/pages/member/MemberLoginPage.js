import { Link } from "react-router-dom";
import BasicWidthLimitLayout from "../../layouts/BasicWidthLimitLayout";

const MemberLoginPage = () => {

    return (
        <BasicWidthLimitLayout>

            <section className="h-full flex flex-col items-center justify-center">

                {/* 로그인 페이지 */}
                <h1 class="text-3xl">
                    <span>
                        파이널판타지14
                        <br></br>
                        <strong>로그인</strong>
                    </span>
                </h1>

                {/* 로그인 폼 */}
                <form action="로그인url넣기" method="post">
                    <div>
                        <label for="member_ID"></label>
                        <input name="member_ID" id="member_ID" placeholder="아이디를 입력해주세요."></input>
                    </div>
                    <div>
                        <label for="password"></label>
                        <input name="password" id="password" placeholder="비밀번호"></input>
                    </div>
                <button type="submit">로그인</button>
                </form>

                {/* 부가 서비스 */}
                <div>
                    <Link to={'/signup'} className="px-3">
                            회원가입
                    </Link>
                    <a>아이디/비밀번호 찾기</a>
                    <a>홈으로 가기</a>
                </div>
            </section>

        </BasicWidthLimitLayout>
    );
}

export default MemberLoginPage;