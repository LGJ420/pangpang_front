import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getNoticeOne } from "../../api/noticeApi";


const initData = {
    id: 0,
    noticeTitle: "",
    noticeContent: "",
    noticeHit: 0,
    noticeCreated: "",
    noticeUpdated: null,
    memberId: 0,
    memberNickname: ""
}



const NoticeReadComponent = ({id}) => {

    const [serverData, setServerData] = useState(initData);
    const { moveToList, moveToModify } = useCustomMove();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{

        getNoticeOne(id)
            .then(data=>setServerData(data))
            .catch(error=>console.log(error))
            .finally(()=>setIsLoading(false));
    },[]);  




    return (

        <section className='pt-10 pl-10 pr-3'>
            <h1 className="text-5xl mb-10">공지사항</h1>
            <hr />
            <div className="text-xl">
                <div className="bg-gray-100 px-5">
                    <h3 className="text-4xl font-bold py-5">
                        {serverData.noticeTitle}
                    </h3>
                    <div className="pb-5 flex">
                        <div>작성자 : {serverData.memberNickname}</div>
                        <div className="px-2 ml-auto">조회수 : {serverData.noticeHit}</div>
                        <div className="px-2">댓글 : 하드코오디이잉</div>
                        <div className="px-2">작성일 : {serverData.noticeCreated.substring(0,10)}</div>
                    </div>
                </div>
            <hr />
                <p className="p-5 rounded-xl">
                    {serverData.noticeContent}
                </p>
                <div className="h-32 mt-16 flex items-center justify-between">
                    <textarea className="w-5/6 h-24 p-4 border"/>
                    <button className="bg-blue-600 text-white hover:opacity-80 w-1/6 h-24 ml-5 rounded-2xl text-2xl">댓글 쓰기</button>
                </div>
            </div>
            


            <div className="pb-3">
                전체 댓글 <span className="text-red-600 font-bold">7</span>개
            </div>
            <hr />
            <div className="py-4 flex justify-between">
                <div>
                    <div className="flex items-center">
                        <img
                            className="w-10 h-10 mr-2 rounded-full border"
                            src="/images/profile.png" />
                        <div className="mr-2">
                            아이디입니당
                        </div>
                    </div>
                </div>
                <p className="w-2/3">
                    야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐
                </p>
                <div>2023-01-01</div>
            </div>
            <hr />
            <div className="py-4 flex justify-between">
                <div>
                    <div className="flex items-center">
                        <img
                            className="w-10 h-10 mr-2 rounded-full border"
                            src="/images/profile.png" />
                        <div className="mr-2">
                            아이디입니당
                        </div>
                    </div>
                </div>
                <p className="w-2/3">
                    야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐
                </p>
                <div>2023-01-01</div>
            </div>
            <hr />
            <div className="py-4 flex justify-between">
                <div>
                    <div className="flex items-center">
                        <img
                            className="w-10 h-10 mr-2 rounded-full border"
                            src="/images/profile.png" />
                        <div className="mr-2">
                            아이디입니당
                        </div>
                    </div>
                </div>
                <p className="w-2/3">
                    야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐야이 새끼야 이딴걸 패치라고하냐
                </p>
                <div>2023-01-01</div>
            </div>


        </section>

    );
}

export default NoticeReadComponent;