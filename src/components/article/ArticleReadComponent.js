import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Button,Modal,ModalBody,ModalCloseButton,ModalContent,ModalFooter,ModalHeader,ModalOverlay,useDisclosure,Alert,AlertIcon,Textarea,} from "@chakra-ui/react";
import useCustomMove from "../../hooks/useCustomMove";
import { deleteOne, getOne } from "../../api/articleApi";
import CommentList from "../comment/CommentListComponent";
import useCustomToken from "../../hooks/useCustomToken";
import { getCommentsByArticleId, postComment } from "../../api/commentApi";
import { formatDateTime } from "../../util/dateUtil";
import DOMPurify from "dompurify";
import { logout } from '../../hooks/logout';



// URL format function
const formatContent = (content) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const formattedContent = content.replace(urlPattern, (url) => 
    `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-700">${url}</a>`
  );
  return DOMPurify.sanitize(formattedContent, {
    ALLOWED_TAGS: ['a'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
  });
};




const initState = {
  id: 0,
  articleTitle: '',
  memberNickname: '',
  memberId: 0,
  articleContent: '',
  articleCreated: null,
  articleUpdated: null,
  viewCount: 0,
  commentCount: 0
};



const ArticleReadComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serverData, setServerData] = useState({ ...initState });
  const [error, setError] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [isCommentSubmitMode, setIsCommentSubmitMode] = useState(false);
  const [isLoginRequired, setIsLoginRequired] = useState(false);
  const [comments, setComments] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { moveToList, moveToModify } = useCustomMove();
  const { isLogin, decodeToken } = useCustomToken();



  // Fetch article data
  const fetchArticleData = async () => {
    try {
      const data = await getOne(id);
      if (data) {
        setServerData(data);
        setComments(data.comments || []);
        setError(null);
      } else {
        setError("Article not found");
        onOpen();
      }
    } catch (error) {
      console.error("글을 불러오는데 실패했습니다.", error);
      setError("존재하지 않는 글입니다.");
      onOpen();
    }
  };



  // Fetch comments separately
  const fetchComments = async () => {
    try {
      const data = await getCommentsByArticleId(id, { page: 1, size: 5 });
      setComments(data.content || []);
      setServerData(prevData => ({
        ...prevData,
        commentCount: data.totalElements // Update comment count based on API response
      }));
    } catch (error) {
      console.error('댓글을 불러오는데 실패했습니다.', error);
    }
  };



  const handleCommentUpdate = async () => {
    const data = await getCommentsByArticleId(id, { page: 1, size: 5 });
    setComments(data.content || []);
    setServerData(prevData => ({
      ...prevData,
      commentCount: data.totalElements // Update comment count based on API response
    }));
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
        alert("토큰 유효 시간이 만료되었습니다.")
        logout(); // import { logout } from '../../hooks/logout'; 추가 필요
      }

      console.error("삭제에 실패했습니다.", error);
      
    } finally {
      onClose();
    }
  };



  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) {
      setIsLoginRequired(true);
      onOpen();
      return;
    }
    if (!commentContent.trim()) {
      alert("내용을 입력해주세요");
      return;
    }
    setIsCommentSubmitMode(true);
    onOpen();
  };



  const handleCommentSubmitConfirm = async () => {
    try {
      await postComment({ articleId: id, commentContent });
      handleCommentUpdate();
      setCommentContent('');
      setIsCommentSubmitMode(false);
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      onClose();
    }
  };



  const isAuthor = isLogin && serverData.memberId === decodeToken.id;



  if (error) {
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
              {error}
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
      <hr />
      <div className="text-xl">
        <div className="bg-gray-100 px-5">
          <div className="flex justify-between pt-5 pr-3 pb-20">
            <h3 className="w-4/5 text-4xl font-bold">
              {serverData.articleTitle}
            </h3>
            <div>
              {isAuthor && (
                <>
                  <button
                    className="pr-3 border-r hover:opacity-40"
                    onClick={() => moveToModify(id)}
                  >
                    수정
                  </button>
                  <button
                    className="pl-3 hover:opacity-40"
                    onClick={onOpen}
                  >
                    삭제
                  </button>
                </>
              )}
              <button
                className="pl-3 hover:opacity-40"
                onClick={() => navigate('/article/list')}
              >
                목록으로 이동
              </button>
            </div>
          </div>

          <div className="pb-5 flex">
            <div>작성자 : {serverData.memberNickname}</div>
            <div className="px-2 ml-auto">조회수 : {serverData.viewCount || 0}회</div>
            <div className="px-2">작성일 : {serverData.articleCreated ? formatDateTime(serverData.articleCreated) : 'N/A'}</div>
            {serverData.articleUpdated && (
              <div className="px-2">수정일 : {formatDateTime(serverData.articleUpdated)}</div>
            )}
          </div>
        </div>
        <hr />
        <p
          className="p-5 mb-32 rounded-xl"
          style={{ whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{ __html: formatContent(serverData.articleContent) }}
        />
        <form onSubmit={handleCommentSubmit}>
          <div className="h-32 flex items-center justify-between">
            <Textarea
              className="w-5/6 h-24 p-4 border"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <Button className="bg-[rgb(224,26,109)] text-white hover:opacity-80 w-1/6 h-24 text-3xl" type="submit">
              등록
            </Button>
          </div>
        </form>
        <div className="pb-3">
          전체 댓글 <span className="text-red-600 font-bold">{serverData.commentCount}</span>개
        </div>
        <hr />
        <CommentList
          articleId={id}
          onCommentAdded={handleCommentUpdate}
        />



        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {isLoginRequired ? '로그인 필요' : isCommentSubmitMode ? '댓글 작성 확인' : '삭제 확인'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {isLoginRequired
                ? '댓글을 작성하려면 먼저 로그인해 주세요.'
                : isCommentSubmitMode
                ? '댓글을 작성하시겠습니까?'
                : '정말로 이 글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'}
            </ModalBody>
            <ModalFooter>
              {isLoginRequired ? (
                <Button colorScheme="teal" onClick={() => navigate('/login')} mr={3}>
                  로그인하기
                </Button>
              ) : (
                <>
                  <Button colorScheme="teal" onClick={isCommentSubmitMode ? handleCommentSubmitConfirm : handleDeleteConfirm} mr={3}>
                    {isCommentSubmitMode ? '작성' : '네'}
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