import BasicWidthLimitLayout from "../../layouts/BasicWidthLimitLayout";

const MemberSignupPage = () => {

    return (
        <BasicWidthLimitLayout>

            <section className="h-full flex flex-col items-center justify-center">

            {/* 로그인 페이지 */}
            <h1 class="text-3xl">
                <span>
                    파이널판타지14
                    <br></br>
                    <strong>회원가입</strong>
                </span>
            </h1>

            {/* 로그인 폼 */}
            <form action="회원가입url넣기" method="post">
                <div>
                    <label for="member_ID"></label>
                    <input name="member_ID" id="member_ID" placeholder="아이디를 입력해주세요."></input>
                </div>
                <div>
                    <label for="password"></label>
                    <input name="password" id="password" placeholder="비밀번호"></input>
                </div>
                <div>
                    <label for="password_confirm"></label>
                    <input name="password_confirm" id="password_confirm" placeholder="비밀번호 확인"></input>
                </div>
            <button type="submit">회원가입</button>
            </form>

            </section>

        </BasicWidthLimitLayout>
    );
}

export default MemberSignupPage;