import useCustomToken from "../../hooks/useCustomToken";
import BasicNoHeightLayout from "../../layouts/BasicNoHeightLayout";


const MypageIndexPage = () => {

    const {decodeToken} = useCustomToken();


    return (

        <BasicNoHeightLayout>
            <section>
                <div className="h-[15rem] bg-sky-200 flex items-center">
                    <img src="/images/profile.png" className="rounded-full border w-52 ml-8"/>
                    <h3 className="text-5xl font-bold p-5 tracking-wider">{decodeToken.memberName}</h3>
                    <div className="text-xl font-semibold pt-6">등급 : {decodeToken.memberRole}</div>
                </div>
                <div className="min-h-[60rem] flex">
                    <div className="w-1/5 p-5 bg-slate-400">
                        <h3 className="text-2xl">
                            메뉴
                        </h3>
                        <ul className="m-0">
                            <li className="my-5">내가 쓴 글</li>
                            <li className="my-5">구매내역</li>
                        </ul>
                    </div>
                    <div className="w-4/5 p-5 bg-red-200">
                        여기다 진짜 보여줄거삼
                    </div>
                </div>

            </section>
        </BasicNoHeightLayout>
    );

}

export default MypageIndexPage;