import BasicLayout from "../../layouts/BasicLayout";

const MemberLoginPage = () => {

    return (
        <BasicLayout>

        <section className="h-full flex flex-col items-center justify-center">
            <p>
                여긴 로그인화면이다냥
                빨리 아이디 비번을 넘겨라냥
            </p>
            아디<input></input>
            비번<input></input>
            <button>내놔</button>
        </section>

        </BasicLayout>
    );
}

export default MemberLoginPage;