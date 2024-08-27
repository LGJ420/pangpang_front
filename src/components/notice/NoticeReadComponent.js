import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { deleteNotice, getNoticeOne } from "../../api/noticeApi";
import { deleteNoticeComment, getNoticeComments, postNoticeComment, putNoticeComment } from "../../api/commentApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatDateTime } from "../../util/dateUtil";
import useCustomToken from "../../hooks/useCustomToken";
import BodyTitleComponent from "../common/BodyTitleComponent";


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

const prefix = "http://localhost:8080/api/productreview/view";

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
    const [commentEdit, setCommentEdit] = useState(null);
    const [modifyComment, setModifyComment] = useState({});
    const {decodeToken} = useCustomToken();
    const navigate = useNavigate();
    

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


    // 댓글 작성
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

    // 공지사항 수정
    const handleClickNoticeModify = (noticeId) => {

        navigate(`../modify/${noticeId}`);
    }

    // 공지사항 삭제
    const handleClickNoticeDelete = (noticeId) => {

        // 여유가 되면 모달창을 제작해서 바꿀예정
        // eslint-disable-next-line no-restricted-globals
        const ifDel = confirm("정말로 삭제하시겠습니까?");
        if(ifDel){
            deleteNotice(noticeId)
                .then(()=>{
                    alert("삭제가 완료되었습니다.");
                    navigate(`/notice`, {replace: true});
                })
                .catch(error=>console.log(error));
        }
        
    }

    // 댓글 수정버튼
    const handleClickModifyComment = (commentId) => {

        const commentToEdit = commentData.dtoList.find(dto => dto.id === commentId);
        setModifyComment({ commentContent: commentToEdit.commentContent });
        
        setCommentEdit(commentId);
    }


    // 댓글 수정 입력
    const handleChangeModifyComment = (e) => {

        const updateData = {
            commentContent: e.target.value
        }

        setModifyComment(updateData);
    }


    // 댓글 수정후 수정완료 버튼
    const handleClickModifyCommentComplete = (commentId) => {

        const requestDTO = {id: commentId, ...modifyComment}

        putNoticeComment(requestDTO)
            .then(()=>{
                setCommentEdit(null);
                setModifyComment({});
            })
            .catch(error=>console.log(error))
            .finally(()=>setRefresh(!refresh));
    }



    // 댓글 삭제
    const handleClickCommentDelete = (commentId) => {

        // 여유가 되면 모달창을 제작해서 바꿀예정
        // eslint-disable-next-line no-restricted-globals
        const ifDel = confirm("정말로 삭제하시겠습니까?");
        if(ifDel){
            deleteNoticeComment(commentId)
                .catch(error=>console.log(error))
                .finally(()=>setRefresh(!refresh))
        }

    }



    return (

        <section>
            <BodyTitleComponent title={`공지사항`} path={`notice`}/>
            <hr />
            <div className="text-xl">
                <div className="bg-gray-100 px-5">
                    <div className="flex justify-between pt-5 pr-3 pb-20">
                        <h3 className="w-4/5 text-4xl font-bold">
                            {noticeData.noticeTitle}
                        </h3>
                        {decodeToken.memberRole === "Admin" ?
                        <div>
                            <button className="pr-3 border-r hover:opacity-40"
                                onClick={()=>handleClickNoticeModify(id)}>
                                수정
                            </button>
                            <button className="pl-3 hover:opacity-40"
                                onClick={()=>handleClickNoticeDelete(id)}>
                                삭제
                            </button>
                        </div>
                        :
                        <>
                        </>
                        }
                    </div>
                    <div className="pb-5 flex">
                        <div>작성자 : {noticeData.memberNickname}</div>
                        <div className="px-2 ml-auto">조회수 : {noticeData.noticeHit}</div>
                        <div className="px-2">작성일 : {formatDateTime(noticeData.noticeCreated)}</div>
                    </div>
                </div>
            <hr />
                <p className="p-5 mb-32 rounded-xl">
                    {noticeData.noticeContent}
                </p>
            </div>

        </section>

    );
}

export default NoticeReadComponent;