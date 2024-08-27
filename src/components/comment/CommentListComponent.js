import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Button, Flex, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useCustomToken from '../../hooks/useCustomToken';
import { getCommentsByArticleId, deleteComment } from '../../api/commentApi';
import { formatDateTime } from "../../util/dateUtil";
import { logout } from '../../hooks/logout';



const CommentListComponent = ({ articleId, onCommentAdded }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(0); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const { isLogin, decodeToken } = useCustomToken();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.100', 'gray.800');



  // Fetch comments with pagination
  const fetchComments = async (page = 1) => {
    try {
      const data = await getCommentsByArticleId(articleId, { page, size: 5 });
      setComments(data.content);
      setTotalPages(data.totalPages);
      setTotalComments(data.totalElements); 
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



  const handleEditClick = (id) => {
    navigate(`/comment/modify/${id}`);
  };



  const handleDeleteClick = (commentId) => {
    setCommentToDelete(commentId);
    setIsDeleteModalOpen(true);
  };



  const handleDeleteConfirm = async () => {
    try {
      await deleteComment(commentToDelete);
      fetchComments(currentPage); // Fetch the updated list of comments
      if (onCommentAdded) {
        onCommentAdded(); // Notify the parent component to update the comment count
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




  const formatContent = (content) => {
    if (!content) return '';
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return content.replace(urlPattern, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
  };



  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchComments(page); // Fetch comments for the new page
    }
  };



  return (
    <section>
      <Box p={4} borderWidth="1px" borderRadius="md" bg={bgColor}>
        {comments.length > 0 ? (
          <VStack spacing={4} align="stretch">
            {comments.map(comment => (
              <Box
                key={comment.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                bg="white"
                shadow="md"
                borderColor="gray.200"
              >
                <Flex direction="column">
                  <Flex align="center" mb={2}>
                    <Text fontWeight="bold" mr={2}>{comment.memberNickname}</Text>
                    <Text fontSize="sm" color="gray.500">
                      작성일: {formatDateTime(comment.commentCreated)}
                      {comment.commentUpdated && (
                        <Text as="span" ml={2} fontSize="sm" color="gray.400">
                          (수정일: {formatDateTime(comment.commentUpdated)})
                        </Text>
                      )}
                    </Text>
                  </Flex>

                  <Text mb={2} style={{ whiteSpace: 'pre-wrap' }}
                        dangerouslySetInnerHTML={{ __html: formatContent(comment.commentContent) }}
                        sx={{
                            '& a': {
                            color: 'blue.500',
                            textDecoration: 'underline',
                            _hover: {
                            color: 'blue.700'
                          }
                        }
                    }}
                  />

                  {isLogin && decodeToken.id === comment.memberId && (
                    <Flex justify="flex-end" gap={2}>
                      <Button colorScheme="blue" onClick={() => handleEditClick(comment.id)}>수정</Button>
                      <Button colorScheme="red" onClick={() => handleDeleteClick(comment.id)}>삭제</Button>
                    </Flex>
                  )}
                </Flex>
              </Box>
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
          <Text textAlign="center">아직 댓글이 없습니다.</Text>
        )}
      </Box>



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