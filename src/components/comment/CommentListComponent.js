import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Heading,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  IconButton,
  useColorModeValue,
  AlertDialogFooter
} from '@chakra-ui/react';
import { getCommentsByArticleId, postComment, deleteComment } from '../../api/commentApi';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import useCustomToken from '../../hooks/useCustomToken';

const CommentListComponent = ({ articleId }) => {
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isCommentSubmitMode, setIsCommentSubmitMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isLogin, decodeToken } = useCustomToken();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  // Fetch comments with pagination
  const fetchComments = async (page = 1) => {
    try {
      console.log(`Fetching comments for page: ${page}`); // Debugging log
      const data = await getCommentsByArticleId(articleId, { page, size: 5 });
      console.log('Fetched comments:', data); // Debugging log
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      setIsDeleteMode(false);
      setIsDialogOpen(true);
    } else {
      setIsCommentSubmitMode(true);
      setIsDialogOpen(true);
    }
  };

  const handleCommentSubmitConfirm = async () => {
    try {
      await postComment({
        articleId,
        commentContent,
      });
      setCommentContent('');
      setIsDialogOpen(false);
      fetchComments(currentPage); // Refresh comments list
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleEditClick = (id) => {
    navigate(`/comment/modify/${id}`);
  };

  const handleDeleteClick = (commentId) => {
    setDeleteCommentId(commentId);
    setIsDeleteMode(true);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteComment(deleteCommentId);
      setComments((prevComments) => prevComments.filter(comment => comment.id !== deleteCommentId));
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Heading mb={6}>댓글 목록</Heading>

      <Box mt={6} p={4} borderWidth="1px" borderRadius="md" bg={bgColor}>
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
                  <Text mb={2}>{comment.commentContent}</Text>
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

      <Heading mt={8} mb={6}>댓글 작성</Heading>
      <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
        <form onSubmit={handleFormSubmit}>
          <FormControl mb={6} isRequired>
            <FormLabel>댓글 내용</FormLabel>
            <Textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="teal" type="submit" width="full">
            저장
          </Button>
        </form>
      </Box>

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {isDeleteMode ? '댓글 삭제 확인' : isCommentSubmitMode ? '댓글 작성 확인' : '로그인 필요'}
            </AlertDialogHeader>

            <AlertDialogBody>
              {isDeleteMode 
                ? '정말로 이 댓글을 삭제하시겠습니까?' 
                : isCommentSubmitMode 
                  ? '정말로 댓글을 작성하시겠습니까?' 
                  : '로그인 먼저 해주십시오.'}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                취소
              </Button>
              {(isDeleteMode || isCommentSubmitMode) && (
                <Button 
                  colorScheme={isDeleteMode ? "red" : "teal"} 
                  onClick={isDeleteMode ? handleDeleteConfirm : handleCommentSubmitConfirm} 
                  ml={3}>
                  네
                </Button>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default CommentListComponent;