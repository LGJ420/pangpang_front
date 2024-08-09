import BasicNoHeightLayout from "../../layouts/BasicNoHeightLayout";


const MypageIndexPage = () => {

    return (

        <BasicNoHeightLayout>
            <section>
                <div className="bg-sky-200">
                    <h1>마이페이지</h1>
                </div>
                <div className="h-[60rem] flex">
                    <div className="w-1/5 bg-slate-400">
                        <ul className="m-0">
                            <li>내가 쓴 글</li>
                            <li>구매내역</li>
                        </ul>
                    </div>
                    <div className="w-4/5 bg-red-200">
                        여기다 진짜 보여줄거삼
                    </div>
                </div>

            </section>
        </BasicNoHeightLayout>
    );

}

export default MypageIndexPage;