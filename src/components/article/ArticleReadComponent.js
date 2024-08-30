import { useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Alert, AlertIcon, Textarea } from "@chakra-ui/react";
import useCustomMove from "../../hooks/useCustomMove";
import { deleteOne, getOne } from "../../api/articleApi";
import CommentList from "../comment/CommentListComponent";
import useCustomToken from "../../hooks/useCustomToken";
import { getCommentsByArticleId, postComment } from "../../api/commentApi";
import { formatDateTime } from "../../util/dateUtil";
import { logout } from '../../hooks/logout';
import { formatContent } from "../../util/contentUtil";
import BodyTitleComponent from "../common/BodyTitleComponent";



const initState = {
  serverData: {
    id: 0,
    articleTitle: '',
    memberNickname: '',
    memberId: 0,
    articleContent: '',
    articleCreated: null,
    articleUpdated: null,
    viewCount: 0,
    commentCount: 0
  },
  error: null,
  commentContent: '',
  isCommentSubmitMode: false,
  isLoginRequired: false,
  comments: []
};



// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SERVER_DATA':
      return { ...state, serverData: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_COMMENT_CONTENT':
      return { ...state, commentContent: action.payload };
    case 'TOGGLE_COMMENT_SUBMIT_MODE':
      return { ...state, isCommentSubmitMode: !state.isCommentSubmitMode };
    case 'SET_LOGIN_REQUIRED':
      return { ...state, isLoginRequired: action.payload };
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload };
    case 'SET_COMMENT_COUNT':
      return { ...state, serverData: { ...state.serverData, commentCount: action.payload } };
    default:
      return state;
  }
};



const ArticleReadComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { moveToList, moveToModify } = useCustomMove();
  const { isLogin, decodeToken } = useCustomToken();
  const isAuthor = isLogin && state.serverData.memberId === decodeToken.id;
  const isAdmin = isLogin && decodeToken.memberRole === "Admin";



  // Fetch article data
  const fetchArticleData = async () => {
    try {
      const data = await getOne(id);
      if (data) {
        dispatch({ type: 'SET_SERVER_DATA', payload: data });
        dispatch({ type: 'SET_COMMENTS', payload: data.comments || [] });
        dispatch({ type: 'SET_ERROR', payload: null });
      } else {
        dispatch({ type: 'SET_ERROR', payload: "Article not found" });
        onOpen();
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: "존재하지 않는 글입니다." });
      onOpen();
    }
  };



  // Fetch comments
  const fetchComments = async () => {
    try {
      const data = await getCommentsByArticleId(id, { page: 1, size: 5 });
      dispatch({ type: 'SET_COMMENTS', payload: data.content || [] });
      dispatch({ type: 'SET_COMMENT_COUNT', payload: data.totalElements });
    } catch (error) {
      console.error('댓글을 불러오는데 실패했습니다.', error);
    }
  };



  const handleCommentUpdate = async () => {
    const data = await getCommentsByArticleId(id, { page: 1, size: 5 });
    dispatch({ type: 'SET_COMMENTS', payload: data.content || [] });
    dispatch({ type: 'SET_COMMENT_COUNT', payload: data.totalElements });
  };



  useEffect(() => {
    if (id) {
      fetchArticleData();
      fetchComments();
    }
  }, [id]);



  const handleDeleteConfirm = async () => {
    try {
      await deleteOne(id);
      moveToList();
    } catch (error) {
      if (error.response.status === 401) {
        alert("토큰 유효 시간이 만료되었습니다.");
        logout();
      }
    } finally {
      onClose();
    }
  };



  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) {
      dispatch({ type: 'SET_LOGIN_REQUIRED', payload: true });
      onOpen();
      return;
    }
    if (!state.commentContent.trim()) {
      alert("내용을 입력해주세요");
      return;
    }
    dispatch({ type: 'TOGGLE_COMMENT_SUBMIT_MODE' });
    onOpen();
  };



  const handleCommentSubmitConfirm = async () => {
    try {
      await postComment({ articleId: id, commentContent: state.commentContent });
      handleCommentUpdate();
      dispatch({ type: 'SET_COMMENT_CONTENT', payload: '' });
      dispatch({ type: 'TOGGLE_COMMENT_SUBMIT_MODE' });
    } catch (error) {
      if (error.response.status === 401) {
        alert("토큰 유효 시간이 만료되었습니다.");
        logout();
      }
    } finally {
      onClose();
    }
  };



  if (state.error) {
    return (
      <Modal isOpen={isOpen} onClose={() => {
        onClose();
        navigate(-1);
      }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>경고</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="warning">
              <AlertIcon />
              {state.error}
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={() => {
              onClose();
              navigate(-1);
            }}>
              돌아가기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }



  return (
    <section>
      <BodyTitleComponent title={`자유게시판`} path={`article`} />
      <hr />
      <div className="text-xl">
        <div className="bg-gray-100 px-5">
          <div className="flex justify-between pt-5 pr-3 pb-20">
            <h3 className="w-4/5 text-4xl font-bold">
              {state.serverData.articleTitle}
            </h3>
            <div>
              {isAuthor ? (
                <>
                  <button
                    className="pr-3 border-r hover:opacity-40"
                    onClick={() => moveToModify(id)}
                  >
                    수정
                  </button>
                  <button className="pl-3 hover:opacity-40" onClick={onOpen}>
                    삭제
                  </button>
                </>
              ) : isAdmin ? (
                <button className="pl-3 hover:opacity-40" onClick={onOpen}>
                  삭제
                </button>
              ) : null}
            </div>
          </div>

          <div className="pb-5 flex items-end">
            <div>작성자 : {state.serverData.memberNickname}</div>
            <div className="px-4 ml-auto">조회수 : {state.serverData.viewCount || 0}회</div>
            <div>
              <div className="px-2">작성일 : {state.serverData.articleCreated ? formatDateTime(state.serverData.articleCreated) : 'N/A'}</div>
              {state.serverData.articleUpdated && (
                <div className="px-2">수정일 : {formatDateTime(state.serverData.articleUpdated)}</div>
              )}
            </div>
          </div>
        </div>
        <hr />
        <p
          className="p-5 mb-32 rounded-xl"
          style={{ whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{ __html: formatContent(state.serverData.articleContent) }}
        />
        <form onSubmit={handleCommentSubmit}>
          <div className="h-32 flex items-center justify-between">
            <Textarea
              className="w-5/6 h-24 p-4 border"
              value={state.commentContent}
              onChange={(e) => dispatch({ type: 'SET_COMMENT_CONTENT', payload: e.target.value })}
            />
            <Button className="bg-[rgb(224,26,109)] text-white hover:opacity-80 w-1/6 h-24 text-3xl" type="submit">
              등록
            </Button>
          </div>
        </form>
        <div className="pb-3">
          전체 댓글 <span className="text-red-600 font-bold">{state.serverData.commentCount}</span>개
        </div>
        <CommentList
          articleId={id}
          onCommentAdded={handleCommentUpdate}
        />

        

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {state.isLoginRequired ? '로그인 필요' : state.isCommentSubmitMode ? '댓글 작성 확인' : '삭제 확인'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {state.isLoginRequired
                ? '댓글을 작성하려면 먼저 로그인해 주세요.'
                : state.isCommentSubmitMode
                ? '댓글을 작성하시겠습니까?'
                : '정말로 이 글을 삭제하시겠습니까?'}
            </ModalBody>
            <ModalFooter>
              {state.isLoginRequired ? (
                <Button colorScheme="teal" onClick={() => navigate('/login')} mr={3}>
                  로그인하기
                </Button>
              ) : (
                <>
                  <Button colorScheme="teal" onClick={state.isCommentSubmitMode ? handleCommentSubmitConfirm : handleDeleteConfirm} mr={3}>
                    {state.isCommentSubmitMode ? '작성' : '네'}
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    취소
                  </Button>
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
};

export default ArticleReadComponent;