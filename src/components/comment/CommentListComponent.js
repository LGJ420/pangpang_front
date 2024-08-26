import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Button, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import useCustomToken from '../../hooks/useCustomToken';
import { getCommentsByArticleId, deleteComment } from '../../api/commentApi';

const CommentListComponent = ({ articleId, onCommentAdded }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(0); // Track total comments
  const { isLogin, decodeToken } = useCustomToken();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.100', 'gray.800');

  // Fetch comments with pagination
  const fetchComments = async (page = 1) => {
    try {
      const data = await getCommentsByArticleId(articleId, { page, size: 5 });
      setComments(data.content);
      setTotalPages(data.totalPages);
      setTotalComments(data.totalElements); // Update total comments
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
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      handleDeleteConfirm(commentId);
    }
  };

  const handleDeleteConfirm = async (commentId) => {
    try {
      await deleteComment(commentId);
      fetchComments(currentPage); // Fetch the updated list of comments
      if (onCommentAdded) {
        onCommentAdded(); // Notify the parent component to update the comment count
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
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
            <Flex justifyContent="center" alignItems="center" mt={5} fontSize="lg">
              <IconButton
                aria-label="Previous Page"
                icon={<ChevronLeftIcon />}
                isDisabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                mr={3}
                _hover={{ bg: 'teal.100', color: 'teal.700' }}
                _disabled={{ bg: 'gray.200', cursor: 'not-allowed' }}
              />

              {[...Array(totalPages).keys()].map(page => (
                <Button
                  key={page + 1}
                  mx={1}
                  size="sm"
                  variant={currentPage === page + 1 ? 'solid' : 'outline'}
                  colorScheme={currentPage === page + 1 ? 'teal' : 'gray'}
                  onClick={() => handlePageChange(page + 1)}
                  _hover={{ bg: 'teal.100', color: 'teal.700' }}
                >
                  {page + 1}
                </Button>
              ))}

              <IconButton
                aria-label="Next Page"
                icon={<ChevronRightIcon />}
                isDisabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                ml={3}
                _hover={{ bg: 'teal.100', color: 'teal.700' }}
                _disabled={{ bg: 'gray.200', cursor: 'not-allowed' }}
              />
            </Flex>
          </VStack>
        ) : (
          <Text textAlign="center">아직 댓글이 없습니다.</Text>
        )}
      </Box>
    </section>
  );
};

export default CommentListComponent;