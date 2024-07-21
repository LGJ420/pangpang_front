import { Link } from "react-router-dom";

const NavLayout2 = () => {

    return (
        <nav id="navbar2" className="flex justify-between bg-black h-[80px]">
            <ul className="flex items-center text-white text-xl ml-5">
                <li className="ml-3 mr-10 hover:opacity-50">
                    <Link to={'/notice/'}>
                        공지사항
                    </Link>
                </li>
                <li className="mx-10 hover:opacity-50">
                    <Link to={'/pr/'}>
                        게임소개
                    </Link>
                </li>
                <li className="mx-10 hover:opacity-50">
                    <Link to={'/article/'}>
                        자유게시판
                    </Link>
                </li>
                <li className="mx-10 hover:opacity-50">
                    <Link to={'/product/'}>
                        상점
                    </Link>
                </li>
                <li className="mx-10 hover:opacity-50">
                    <Link to={'/support'}>
                        고객센터
                    </Link>
                </li>
            </ul>
            <Link to={'/game'} className="flex items-center text-2xl text-white bg-blue-600 mx-7 px-12 hover:bg-indigo-500">
                GAME START
            </Link>
        </nav>
    );
}

export default NavLayout2;