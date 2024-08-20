import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
} from '@chakra-ui/react';
import { getCommentsByArticleId, postComment, deleteComment } from '../../api/commentApi';
import { useNavigate } from 'react-router-dom';

const CommentListComponent = ({ articleId }) => {
  const [commentContent, setCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [comments, setComments] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false); // 댓글 삭제 모드 여부
  const cancelRef = useRef();
  const navigate = useNavigate();

  // 댓글 목록을 가져오는 함수
  const fetchComments = async () => {
    try {
      const data = await getCommentsByArticleId(articleId);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const handleSubmit = async () => {
    try {
      const newComment = await postComment({
        articleId,
        commentContent,
        commentAuthor,
      });

      // 새로운 댓글을 기존의 댓글 목록에 추가
      setComments((prevComments) => [...prevComments, newComment]);

      // 입력 필드 초기화
      setCommentContent('');
      setCommentAuthor('');

      // 모달 닫기
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsDeleteMode(false); // 댓글 추가 모드
    setIsDialogOpen(true);  // 모달 열기
  };

  const handleEditClick = (id) => {
    navigate(`/comment/modify/${id}`); // 수정 페이지로 이동
  };

  const handleDeleteClick = (commentId) => {
    setDeleteCommentId(commentId);
    setIsDeleteMode(true); // 삭제 모드
    setIsDialogOpen(true); // 삭제 확인 모달 열기
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteComment(deleteCommentId);

      // 댓글 삭제 후 댓글 목록 갱신
      setComments((prevComments) => prevComments.filter(comment => comment.id !== deleteCommentId));

      // 삭제 확인 모달 닫기
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // 날짜와 시간 포맷 함수
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`; // 초 단위 제거
};

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Heading mb={6}>댓글 목록</Heading>

      {/* 댓글 목록 */}
      <Box mt={6} p={4} borderWidth="1px" borderRadius="md" bg="white">
        {comments.length > 0 ? (
          <VStack spacing={4} align="stretch">
            {comments.map(comment => (
              <Box key={comment.id} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
                <Flex direction="column" mb={4} borderBottom="1px" borderColor="gray.200" pb={2}>
                  <Text fontWeight="bold" fontSize="lg" mb={1}>
                    작성자: {comment.commentAuthor}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    작성일: {formatDateTime(comment.commentCreated)}
                  </Text>
                </Flex>

                <Text mb={4} fontSize="md" whiteSpace="pre-wrap">
                  {comment.commentContent}
                </Text>
                
                {/* 버튼들 */}
                <Flex justify="flex-end" gap={3}>
                  <Button colorScheme="blue" onClick={() => handleEditClick(comment.id)}>
                    수정
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDeleteClick(comment.id)}>
                    삭제
                  </Button>
                </Flex>
              </Box>
            ))}
          </VStack>
        ) : (
          <Text textAlign="center">No comments yet.</Text>
        )}
      </Box>

      {/* 댓글 작성 폼 */}
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

      {/* 확인 모달 */}
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {isDeleteMode ? '댓글 삭제 확인' : '댓글 작성 확인'}
            </AlertDialogHeader>

            <AlertDialogBody>
              {isDeleteMode ? '정말로 이 댓글을 삭제하시겠습니까?' : '정말로 댓글을 작성하시겠습니까?'}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                아니오
              </Button>
              <Button colorScheme={isDeleteMode ? 'red' : 'teal'} onClick={isDeleteMode ? handleDeleteConfirm : handleSubmit} ml={3}>
                {isDeleteMode ? '네' : '저장'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default CommentListComponent;