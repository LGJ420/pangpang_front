import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getNoticeOne } from "../../api/noticeApi";
import { getNoticeComments, postNoticeComment } from "../../api/commentApi";
import { useSearchParams } from "react-router-dom";
import { formatDateTime } from "../../util/dateUtil";


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

const initRequestDTO = {


}


const getNum = (param, defaultValue) => {

    if (!param) {
        return defaultValue;
    }

    return parseInt(param);
}


const NoticeReadComponent = ({id}) => {

    const [noticeData, setNoticeData] = useState(initNoticeData);
    const [commentData, setCommentData] = useState(initCommentData);
    const [requestDTO, setRequestDTO] = useState({});
    const { moveToList, moveToModify } = useCustomMove();
    const [ refresh, setRefresh ] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [queryParams] = useSearchParams();
    

    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 50);

    useEffect(()=>{

        getNoticeOne(id)
            .then(data=>setNoticeData(data))
            .catch(error=>console.log(error));

        getNoticeComments(id, {page, size})
            .then(data=>setCommentData(data))
            .catch(error=>console.log(error))
            .finally(()=>setIsLoading(false));

    },[refresh]);


    const handleChangeComment = (e) => {

        requestDTO[e.target.name] = e.target.value;

        setRequestDTO({...requestDTO});
    }

    const handleClickComment = () => {

        console.log(requestDTO);
        postNoticeComment(id, requestDTO)
            .catch(error=>console.log(error))
            .finally(()=>setRefresh(!refresh));
    }



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
                        <div className="px-2">댓글 : {commentData.dtoList.length}</div>
                        <div className="px-2">작성일 : {formatDateTime(noticeData.noticeCreated)}</div>
                    </div>
                </div>
            <hr />
                <p className="p-5 mb-32 rounded-xl">
                    {noticeData.noticeContent}
                </p>
                <div className="h-32 flex items-center justify-between">
                    <textarea className="w-5/6 h-24 p-4 border"
                        name="commentContent"
                        onChange={handleChangeComment}/>
                    <button className="bg-[rgb(224,26,109)] text-white hover:opacity-80 w-1/6 h-24 text-3xl"
                        onClick={handleClickComment}>
                        등록
                    </button>
                </div>
            </div>
            


            <div className="pb-3">
                전체 댓글 <span className="text-red-600 font-bold">{commentData.dtoList.length}</span>개
            </div>

            {
                commentData.dtoList.map(dto=>
                    <>
                    <hr />
                    <div className="py-4 flex justify-between">
                        <div>
                            <div className="flex items-center">
                                <img
                                    className="w-10 h-10 mr-2 rounded-full border"
                                    src="/images/profile.png" />
                                <div className="mr-2">
                                    {dto.memberNickname}
                                </div>
                            </div>
                        </div>
                        <p className="w-2/3">
                            {dto.commentContent}
                        </p>
                        <div>{formatDateTime(dto.commentCreated)}</div>
                    </div>
                    </>
                )
            }
            


        </section>

    );
}

export default NoticeReadComponent;