import { Link } from "react-router-dom";

const NavLayout1 = () => {

    return (
        <nav id="navbar1" className="flex items-center justify-between">
            <Link to={'/'}>
                <img src="/images/logo_r3.png" className="h-[60px] mx-8 my-3"></img>
            </Link>
            <ul className="flex mr-5">
                <li className="border-r border-r-black">
                    <Link to={'/login'} className="px-3">
                        로그인
                    </Link>
                </li>
                <li className="border-r border-r-black">
                    <Link to={'/signup'} className="px-3">
                        회원가입
                    </Link>
                </li>
                <li>
                    <Link to={'/cash'} className="px-3">
                        골드 충전소
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavLayout1;