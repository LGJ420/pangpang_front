import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Button, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import useCustomToken from '../../hooks/useCustomToken';
import { getCommentsByArticleId, deleteComment, putComment } from '../../api/commentApi';
import { formatDateTime } from '../../util/dateUtil';
import { logout } from '../../hooks/logout';
import { formatContent } from '../../util/contentUtil';

const CommentListComponent = ({ articleId, onCommentAdded }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [commentEdit, setCommentEdit] = useState(null);
  const [modifyComment, setModifyComment] = useState('');
  const { isLogin, decodeToken } = useCustomToken();

  // Fetch comments with pagination
  const fetchComments = async (page = 1) => {
    try {
      const data = await getCommentsByArticleId(articleId, { page, size: 5 });
      setComments(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments(currentPage);
  }, [articleId, currentPage]);

  useEffect(() => {
    if (onCommentAdded) {
      fetchComments(currentPage);
    }
  }, [onCommentAdded]);

  const handleEditClick = (id, content) => {
    setCommentEdit(id);
    setModifyComment(content);
  };

  const handleChangeModifyComment = (e) => {
    setModifyComment(e.target.value);
  };

  const handleClickModifyCommentComplete = async () => {
    if (commentEdit === null) return;

    try {
      await putComment( commentEdit, {commentContent: modifyComment });
      fetchComments(currentPage);
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    } finally {
      setCommentEdit(null);
      setModifyComment('');
    }
  };

  const handleDeleteClick = (commentId) => {
    setCommentToDelete(commentId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteComment(commentToDelete);
      fetchComments(currentPage);
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      
      console.error('Error deleting comment:', error);
      
      if (error.response.status === 401) {
        alert("토큰 유효 시간이 만료되었습니다.")
        logout(); // import { logout } from '../../hooks/logout'; 추가 필요
      }

    } finally {
      setIsDeleteModalOpen(false);
      setCommentToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setCommentToDelete(null);
  };



  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchComments(page);
    }
  };

  return (
    <section>
      
      {comments.length > 0 ? (
        
        <VStack spacing={4} align="stretch">
          {comments.map(comment => (
            <>
            <hr></hr>
            <Box
              key={comment.id}>
              <div className="pt-2 pb-4 min-h-24 flex justify-between">
                <div>
                  <div className='flex items-center'>
                    <img
                      className="w-10 h-10 mr-2 rounded-full border"
                      src={`http://localhost:8080/api/productreview/view/${comment.memberImage}`} // Adjusted the image URL
                      alt="Profile"
                      onError={(e) => {
                        e.target.onerror = null; // 무한 루프 방지
                        e.target.src = "/images/profile.png"; // 대체 이미지 경로
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
            </>
          ))}

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