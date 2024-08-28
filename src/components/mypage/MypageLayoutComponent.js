import { useNavigate } from "react-router-dom";
import useCustomToken from "../../hooks/useCustomToken";
import { useEffect, useState } from "react";
import { getMemberProfileImage, prefix } from '../../api/memberApi';

const MypageLayoutComponent = ({children}) => {

    const {isLogin, decodeToken} = useCustomToken();
    const [currentPath, setCurrentPath] = useState();

    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState('');

    useEffect(()=>{
        // console.log("decode token : " +decodeToken);
        // console.log('User ID:', decodeToken.id);

        // useEffect에도 이렇게 두번에 걸쳐 작업하는이유는
        // 리액트의 비동기 특성때문
        if(!isLogin){

            alert("잘못된 접근 방식입니다.");
            navigate(-1);
            return; // 로그인하지 않은 경우, 나머지 코드 실행 방지
        }


        // decode token : [object Object]
        // User ID:       여기 토큰.id가 들어가야함↓
        // http://localhost:8080/api/member/view//image
        // decode token : [object Object]
        // User ID: 39      제대로 토큰.id가 들어감↓
        // http://localhost:8080/api/member/view/39/image
        // console.log(`http://localhost:8080/api/member/view/${decodeToken.id}/image`);

        // 위 문제때문에 decodeToken.id 있을때만 실행
        if(decodeToken.id){
            const fetchProfileImage = async () => {
                const imagePath = await getMemberProfileImage(decodeToken.sub);
                setImageUrl(imagePath ? `${prefix}/view/${imagePath}` : '/images/profile.png');
            };

            fetchProfileImage();
        }
    },[isLogin, decodeToken]);


    const handleClickTab = (path) => {

        navigate({pathname: `${path}`});
        setCurrentPath();
    }




    // 이 조건문은 반드시 리액트 훅보다
    // 그렇지 않으면 이조건이 통과되야 리액트가 발생하는 오류가 생겨
    // 리액트 자체가 작동하지 않는다
    // 그래서 최하단에 배치한다
    if(!isLogin){

        return null;
    }
    return (
        <>
        <section>
            <div className="h-[15rem] flex items-center border-b bg-slate-100">
                <img 
                    src={imageUrl} 
                    className="object-cover rounded-full border w-52 h-52 ml-8"
                    onError={(e) => {
                        e.target.onerror = null; // 무한 루프 방지
                        e.target.src = "/images/profile.png"; // 대체 이미지 경로
                    }}
                />
                <h3 className="text-5xl font-bold p-5 tracking-wider">{decodeToken.memberNickname}</h3>
                <div className="text-2xl font-semibold pt-6 uppercase">등급 : {decodeToken.memberRole}</div>
            </div>
        </section>
        <section>
            <div className="min-h-[60rem] flex">
                <div className="w-1/5 p-5 border-r bg-slate-200">
                
                { decodeToken.memberRole === "Admin" ? 
                    <>
                        <h3 className="text-2xl font-bold">
                            관리자
                        </h3>
                        <ul className="m-0 ml-2">
                            <li className="text-xl my-7 cursor-pointer"
                            onClick={()=>navigate({pathname: `/manager/member`})}>
                                회원 관리
                            </li>
                            <li className="text-xl my-7 cursor-pointer"
                            onClick={()=>navigate({pathname: `/manager/product`})}>
                                상품 관리
                            </li>
                        </ul>
                    </>
                    : <></>

                }


                    <h3 className="text-2xl font-bold">
                        메뉴
                    </h3>
                    <ul className="m-0 ml-2">
                        <li className="text-xl my-7 cursor-pointer"
                            onClick={()=>navigate({pathname: `/mypage/profile/confirm`})}>
                            내 정보 변경
                        </li>
                        <li className="text-xl my-7 cursor-pointer"
                            onClick={()=>navigate({pathname: `/mypage/article`})}>
                            내가 쓴 글
                        </li>
                        <li className="text-xl my-7 cursor-pointer"
                            onClick={()=>navigate({pathname: `/mypage/comment`})}>
                            내가 쓴 댓글
                        </li>
                        <li className="text-xl my-7 cursor-pointer"
                            onClick={()=>navigate({pathname: `/mypage/review`})}>
                            내가 쓴 리뷰
                        </li>
                        <li className="text-xl my-7 cursor-pointer"
                            onClick={()=>navigate({pathname: `/mypage/orders/result`})}>
                            구매내역
                        </li>
                    </ul>
                </div>
                <div className="w-4/5 p-7">
                    {children}
                </div>
            </div>
        </section>
        </>
    );
}

export default MypageLayoutComponent;