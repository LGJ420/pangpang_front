import useCustomToken from "../../hooks/useCustomToken";

const NoticeModifyComponent = ({id}) => {

    const {decodeToken} = useCustomToken();

    return (

        <section className='pt-10 pl-10 pb-10 pr-3 mb-5'>
            <h1 className="text-5xl mr-auto">공지사항 수정</h1>

            <div className="text-2xl my-10 m-auto">

                <div className="pt-4 flex flex-col">
                    <div>
                        <span className="m-3 font-extrabold">
                            작성자
                        </span>
                        <span className="px-3">
                            {decodeToken.memberNickname}
                        </span>
                        {   decodeToken.memberRole === "Admin" ?

                            <>
                            </>
                            
                            :

                            <span className="text-sm text-red-600 font-extrabold">
                                (경고 : 공지사항은 운영자만 작성할 수 있습니다!)
                            </span>
                        }
                    </div>
                </div>

                <div className="my-10 flex flex-col">
                    <label
                        className="m-3 font-extrabold"
                        htmlFor="noticeTitle">
                        제목
                    </label>
                    <input 
                        className="p-3 rounded border"
                        id="noticeTitle"
                        name="noticeTitle"
                        placeholder="제목을 적어주세요."
                        maxLength={100}/>
                </div>


                <div className="my-10 flex flex-col">
                    <label
                        className="m-3 font-extrabold"
                        htmlFor="noticeContent">
                        내용
                    </label>
                    <textarea 
                        className="p-3 rounded border h-[50rem]"
                        id="noticeContent"
                        name="noticeContent"
                        placeholder="자세한 설명을 적어주세요."
                        maxLength={2000}/>
                </div>

                <div className="flex justify-center">
                    <button
                        className="w-52 h-16 text-3xl bg-orange-600 text-white rounded-2xl hover:opacity-80">
                        등록
                    </button>
                </div>
            </div>

        </section>

    );
}

export default NoticeModifyComponent;