import { Link } from "react-router-dom";

const NavLayout1 = () => {

    return (
        <nav id="navbar1">
            <div className="flex items-center justify-between w-[1350px] m-auto">
                <Link to={'/'}>
                    <img src="/images/logo_r3.png" className="h-[40px] mx-8 my-3"></img>
                </Link>
                <ul className="flex mr-5">
                    <li className="border-r border-r-black">
                        <Link to={'/cart'} className="px-3">
                            장바구니
                        </Link>
                    </li>
                    {/* <li className="border-r border-r-black">
                        <Link to={'/cash'} className="px-3">
                            골드 충전소
                        </Link>
                    </li> */}
                    <li className="border-r border-r-black">
                        <Link to={'/login'} className="px-3">
                            로그인
                        </Link>
                    </li>
                    <li>
                        <Link to={'/signup'} className="px-3">
                            회원가입
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavLayout1;