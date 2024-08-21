const NoticeModifyComponent = () => {

    return (

        <section className='pt-10 pl-10 pb-10 pr-3 mb-5'>
            <h1 className="text-5xl mr-auto">공지사항 수정</h1>

            <div className="text-2xl my-10 m-auto">

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