import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import { Box, Text, VStack, Button, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import useCustomToken from '../../hooks/useCustomToken';
import { getCommentsByArticleId, deleteComment, putComment } from '../../api/commentApi';
import { formatDateTime } from '../../util/dateUtil';
import { logout } from '../../hooks/logout';
import { formatContent } from '../../util/contentUtil';



// Initial state for the reducer
const initState = {
  comments: [],
  currentPage: 1,
  totalPages: 1,
  isDeleteModalOpen: false,
  commentToDelete: null,
  commentEdit: null,
  modifyComment: ''
};




// Reducer function to manage state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return {
        ...state,
        comments: action.payload.comments,
        totalPages: action.payload.totalPages
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };
    case 'TOGGLE_DELETE_MODAL':
      return {
        ...state,
        isDeleteModalOpen: !state.isDeleteModalOpen
      };
    case 'SET_COMMENT_TO_DELETE':
      return {
        ...state,
        commentToDelete: action.payload
      };
    case 'SET_COMMENT_EDIT':
      return {
        ...state,
        commentEdit: action.payload.id,
        modifyComment: action.payload.content
      };
    case 'UPDATE_MODIFY_COMMENT':
      return {
        ...state,
        modifyComment: action.payload
      };
    case 'CLEAR_EDIT_STATE':
      return {
        ...state,
        commentEdit: null,
        modifyComment: ''
      };
    default:
      return state;
  }
};



const CommentListComponent = ({ articleId, onCommentAdded }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { comments, currentPage, totalPages, isDeleteModalOpen, commentToDelete, commentEdit, modifyComment } = state;
  const { isLogin, decodeToken } = useCustomToken();
  const page_size = 5;



  // Fetch comments with pagination
  const fetchComments = useCallback(async (page = 1) => {
    try {
      const data = await getCommentsByArticleId(articleId, { page, size: page_size });
      dispatch({
        type: 'SET_COMMENTS',
        payload: { comments: data.content, totalPages: data.totalPages }
      });
      dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    } catch (error) {
      // console.error('Error fetching comments:', error);
    }
  }, [articleId]);



  useEffect(() => {
    if (onCommentAdded) 
      fetchComments(currentPage);
  }, [currentPage, onCommentAdded, fetchComments]);



  const handleEditClick = useCallback((id, content) => {
    dispatch({ type: 'SET_COMMENT_EDIT', payload: { id, content } });
  }, []);



  const handleChangeModifyComment = useCallback((e) => {
    dispatch({ type: 'UPDATE_MODIFY_COMMENT', payload: e.target.value });
  }, []);



  const handleClickModifyCommentComplete = useCallback(async () => {
    if (commentEdit === null) return;
    try {
      await putComment(commentEdit, { commentContent: modifyComment });
      fetchComments(currentPage);
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      // console.error('Error updating comment:', error);
    } finally {
      dispatch({ type: 'CLEAR_EDIT_STATE' });
    }
  }, [commentEdit, modifyComment, currentPage, onCommentAdded, fetchComments]);



  const handleDeleteClick = useCallback((commentId) => {
    dispatch({ type: 'SET_COMMENT_TO_DELETE', payload: commentId });
    dispatch({ type: 'TOGGLE_DELETE_MODAL' });
  }, []);



  const handleDeleteConfirm = useCallback(async () => {
    try {
      await deleteComment(commentToDelete);
      fetchComments(currentPage);
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      // console.error('Error deleting comment:', error);
      if (error.response?.status === 401) {
        alert("토큰 유효 시간이 만료되었습니다.");
        logout();
      } else {
        alert('댓글을 삭제하는 중 오류가 발생했습니다.');
      }
    } finally {
      dispatch({ type: 'TOGGLE_DELETE_MODAL' });
      dispatch({ type: 'SET_COMMENT_TO_DELETE', payload: null });
    }
  }, [commentToDelete, currentPage, onCommentAdded, fetchComments]);

  const handleCloseModal = useCallback(() => {
    dispatch({ type: 'TOGGLE_DELETE_MODAL' });
    dispatch({ type: 'SET_COMMENT_TO_DELETE', payload: null });
  }, []);



  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
      fetchComments(page);
    }
  }, [totalPages, fetchComments]);



  // Memoize the comment list to avoid unnecessary re-renders
  const memoizedComments = useMemo(() => (
    comments.map(comment => (
      <Box key={comment.id}>
        <div className="pt-2 pb-4 min-h-24 flex justify-between">
          <div>
            <div className='flex items-center'>
              <img
                className="w-10 h-10 mr-2 rounded-full border object-cover"
                src={`http://15.165.219.211:8080/api/productreview/view/${comment.memberImage}`}
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/profile.png";
                }}
              />
              <div className="font-bold">
                {comment.memberNickname}
              </div>
            </div>
          </div>

          <div className="w-2/3">
            {commentEdit === comment.id ? (
              <textarea
                className="p-2 border resize-none w-full"
                value={modifyComment}
                name="commentContent"
                rows={3}
                maxLength={200}
                onChange={handleChangeModifyComment}
              />
            ) : (
              <p className="whitespace-pre-wrap">
                <span dangerouslySetInnerHTML={{ __html: formatContent(comment.commentContent) }} />
              </p>
            )}
          </div>

          <div className="flex flex-col items-end justify-between">
            <div className="text-sm text-gray-500 pr-1">
              작성일: {formatDateTime(comment.commentCreated)}
            </div>
            {comment.commentUpdated && (
              <div className="text-sm text-gray-400">
                (수정일: {formatDateTime(comment.commentUpdated)})
              </div>
            )}

            {isLogin && decodeToken.id === comment.memberId && (
              <div className="flex pt-3">
                {commentEdit === comment.id ? (
                  <button className="px-2 hover:opacity-80" onClick={handleClickModifyCommentComplete}>
                    수정 완료
                  </button>
                ) : (
                  <button className="px-2 hover:opacity-80" onClick={() => handleEditClick(comment.id, comment.commentContent)}>
                    수정
                  </button>
                )}
                <button className="px-2 hover:opacity-80" onClick={() => handleDeleteClick(comment.id)}>
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </Box>
    ))
  ), [comments, commentEdit, modifyComment, handleChangeModifyComment, handleClickModifyCommentComplete, handleEditClick, handleDeleteClick, isLogin, decodeToken.id]);



  return (
    <section>     
      {comments.length > 0 ? (        
        <VStack spacing={4} align="stretch">
          {memoizedComments}
          {/* Pagination */}
          <Flex justifyContent="center" alignItems="center" fontSize="25px" className="relative py-10 text-gray-700 mt-5">
            {/* Previous Page */}
            {currentPage > 1 && (
              <Box cursor={"pointer"} marginRight={7} onClick={() => handlePageChange(currentPage - 1)}>
                {'\u003c'}
              </Box>
            )}

            {/* Page Numbers */}
            {[...Array(totalPages).keys()].map(pageNum => (
              <Box key={pageNum + 1}
                   marginRight={7}
                   cursor={"pointer"}
                   className={currentPage === pageNum + 1 ? 'text-[rgb(224,26,109)] border-b' : ''}
                   onClick={() => handlePageChange(pageNum + 1)}>
                {pageNum + 1}
              </Box>
            ))}

            {/* Next Page */}
            {currentPage < totalPages && (
              <Box cursor={"pointer"} onClick={() => handlePageChange(currentPage + 1)}>
                {'\u003e'}
              </Box>
            )}
          </Flex>
        </VStack>      
      ) : (
        <Text textAlign="center" marginTop="5rem">아직 댓글이 없습니다.</Text>
      )}



      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>댓글 삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            정말로 이 댓글을 삭제하시겠습니까?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteConfirm} mr={3}>
              삭제
            </Button>
            <Button variant="ghost" onClick={handleCloseModal}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default CommentListComponent;