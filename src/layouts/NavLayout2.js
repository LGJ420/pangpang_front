import { Link } from "react-router-dom";
import useCustomToken from "../hooks/useCustomToken";

const NavLayout2 = () => {

    const {decodeToken} = useCustomToken();

    return (
        <nav id="navbar2" className={`flex items-center h-[70px] min-w-[1350px] sticky top-0 z-20
            ${decodeToken.memberRole === 'Admin' ? 'bg-[rgb(224,26,109)]' : 'bg-black'}`}>
            <div className="flex justify-between w-[1350px] m-auto">
                <ul className="flex items-center text-white text-xl ml-5">
                    <li className="w-32">
                        <Link to={'/notice/'} className="flex items-center justify-center h-[70px] hover:opacity-50">
                            공지사항
                        </Link>
                    </li>
                    <li className="w-32 mx-4">
                        <Link to={'/pr/'} className="flex items-center justify-center h-[70px] hover:opacity-50">
                            게임소개
                        </Link>
                    </li>
                    <li className="w-32 mx-4">
                        <Link to={'/article/'} className="flex items-center justify-center h-[70px] hover:opacity-50">
                            자유게시판
                        </Link>
                    </li>
                    <li className="w-32 mx-4">
                        <Link to={'/product/'} className="flex items-center justify-center h-[70px] hover:opacity-50">
                            쇼핑
                        </Link>
                    </li>
                    <li className="w-32 mx-4">
                        <Link to={'/support'} className="flex items-center justify-center h-[70px] hover:opacity-50">
                            고객센터
                        </Link>
                    </li>
                </ul>
                <a href="/game" className={`flex items-center text-2xl h-[70px] text-white mx-7 px-12 hover:bg-indigo-500
                     ${decodeToken.memberRole === 'Admin' ? 'bg-black' : 'bg-[rgb(224,26,109)]'}`}>
                    GAME START
                </a>

            </div>
        </nav>
    );
}

export default NavLayout2;