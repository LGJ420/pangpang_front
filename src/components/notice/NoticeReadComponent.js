import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getNoticeOne } from "../../api/noticeApi";
import { getNoticeComments } from "../../api/commentApi";


const initNoticeData = {
    id: 0,
    noticeTitle: "",
    noticeContent: "",
    noticeHit: 0,
    noticeCreated: "",
    noticeUpdated: null,
    memberId: 0,
    memberNickname: ""
}


const initCommentData = {
    
    dtoList: [
        {
            id: 0,
            articleId: null,
            commentContent: "",
            memberNickname: "",
            memberId: 0,
            commentCreated: "",
            commentUpdated: null,
            articleTitle: null,
            viewCount: null
        }
    ],
    pageNumList: [],
    pageRequestDTO: {
        page: 1,
        size: 50,
        search: null,
        searchBy: null,
        category: null
    },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}


const NoticeReadComponent = ({id}) => {

    const [noticeData, setNoticeData] = useState(initNoticeData);
    const [commentData, setCommentData] = useState();
    const { moveToList, moveToModify } = useCustomMove();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{

        getNoticeOne(id)
            .then(data=>setNoticeData(data))
            .catch(error=>console.log(error));

        getNoticeComments()
            .then(data=>setCommentData(data))
            .catch(error=>console.log(error))
            .finally(()=>setIsLoading(false));

    },[]);




    return (

        <section>
            <hr />
            <div className="text-xl">
                <div className="bg-gray-100 px-5">
                    <div className="flex justify-between pt-5 pr-3 pb-20">
                        <h3 className="w-4/5 text-4xl font-bold">
                            {noticeData.noticeTitle}
                        </h3>
                        <div>
                            <button className="pr-3 border-r hover:opacity-40">
                                수정
                            </button>
                            <button className="pl-3 hover:opacity-40">
                                삭제
                            </button>
                        </div>
                    </div>
                    <div className="pb-5 flex">
                        <div>작성자 : {noticeData.memberNickname}</div>
                        <div className="px-2 ml-auto">조회수 : {noticeData.noticeHit}</div>
                        <div className="px-2">댓글 : 하드코오디이잉</div>
                        <div className="px-2">작성일 : {noticeData.noticeCreated.substring(0,10)}</div>
                    </div>
                </div>
            <hr />
                <p className="p-5 mb-32 rounded-xl">
                    {noticeData.noticeContent}
                </p>
                <div className="h-32 flex items-center justify-between">
                    <textarea className="w-5/6 h-24 p-4 border"/>
                    <button className="bg-[rgb(224,26,109)] text-white hover:opacity-80 w-1/6 h-24 text-3xl">등록</button>
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