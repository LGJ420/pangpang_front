import { Link } from "react-router-dom";

const MemberLoginPage = () => {

    return (
        <div>
            <Link to={'/'}>
                <img src="/images/logo_c1.png"></img>
            </Link>
            <p>
                여긴 로그인화면이다냥
                빨리 아이디 비번을 넘겨라냥
            </p>
            아디<input></input>
            비번<input></input>
            <button>내놔</button>
        </div>
    );
}

export default MemberLoginPage;