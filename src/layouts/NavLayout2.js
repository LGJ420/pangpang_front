import { Link } from "react-router-dom";

const NavLayout2 = () => {

    return (
        <nav id="navbar2" className="flex items-center bg-black h-[70px] min-w-[1350px] sticky top-0 z-20">
            <div className="flex justify-between w-[1350px] m-auto">
                <ul className="flex items-center text-white text-xl ml-5">
                    <li className="ml-3 mr-10">
                        <Link to={'/notice/'} className="flex items-center h-[70px] hover:opacity-50">
                            공지사항
                        </Link>
                    </li>
                    <li className="mx-10">
                        <Link to={'/pr/'} className="flex items-center h-[70px] hover:opacity-50">
                            게임소개
                        </Link>
                    </li>
                    <li className="mx-10">
                        <Link to={'/article/'} className="flex items-center h-[70px] hover:opacity-50">
                            자유게시판
                        </Link>
                    </li>
                    <li className="mx-10">
                        <Link to={'/product/'} className="flex items-center h-[70px] hover:opacity-50">
                            쇼핑
                        </Link>
                    </li>
                    <li className="mx-10">
                        <Link to={'/support'} className="flex items-center h-[70px] hover:opacity-50">
                            고객센터
                        </Link>
                    </li>
                </ul>
                <a href="/game" className="flex items-center text-2xl h-[70px] text-white bg-[rgb(224,26,109)] mx-7 px-12 hover:bg-indigo-500">
                    GAME START
                </a>

            </div>
        </nav>
    );
}

export default NavLayout2;