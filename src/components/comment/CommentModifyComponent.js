import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Heading,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
  Flex,
  Spacer,
  useColorModeValue
} from '@chakra-ui/react';
import { getCommentById, putComment } from '../../api/commentApi';
import useCustomToken from '../../hooks/useCustomToken';

const CommentModifyComponent = () => {
  const { id } = useParams();
  const [commentContent, setCommentContent] = useState('');
  const [commentCreated, setCommentCreated] = useState('');
  const [commentUpdated, setCommentUpdated] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const cancelRef = useRef();
  const navigate = useNavigate();
  const { isLogin } = useCustomToken();
  const bgColor = useColorModeValue('gray.50', 'gray.800'); // For background color

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const data = await getCommentById(id);
        setCommentContent(data.commentContent);
        setCommentCreated(data.commentCreated || '');
        setCommentUpdated(data.commentUpdated || data.commentCreated); // Default to creation time if update time is not available
      } catch (error) {
        console.error('Error fetching comment:', error);
      }
    };

    fetchComment();
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setConfirmAction(() => () => {
      saveComment();
      navigate(-1);
    });
    setIsDialogOpen(true);
  };

  const saveComment = async () => {
    try {
      await putComment(id, { commentContent });
      setCommentUpdated(new Date().toISOString()); // Update local time
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  useEffect(() => {
    if (!isLogin) {
      alert("잘못된 접근 방식입니다.");
      navigate(-1);
    }
  }, [isLogin, navigate]);

  if (!isLogin) {
    return null;
  }

  return (
    <Box p={6} maxW="container.md" mx="auto" bg={bgColor} borderRadius="md" shadow="md">
      <Heading mb={6}>댓글 수정</Heading>
      
      <Flex direction="row" mb={6} align="center" gap={4}>
        <Text fontSize="sm" color="gray.500">
          작성일: {formatDateTime(commentCreated)}
        </Text>
        {commentUpdated && (
          <Text fontSize="sm" color="gray.500">
            수정일: {formatDateTime(commentUpdated)}
          </Text>
        )}
      </Flex>
      
      <Box mb={6} p={4} borderWidth="1px" borderRadius="md" bg="white">
        <form onSubmit={handleUpdate}>
          <FormControl mb={4} isRequired>
            <FormLabel>댓글 내용</FormLabel>
            <Textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
          </FormControl>
          <Flex align="center">
            <Button colorScheme="teal" type="submit">저장하기</Button>
            <Spacer />
            <Button colorScheme="gray" onClick={() => navigate(-1)}>취소</Button>
          </Flex>
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
              댓글 수정 확인
            </AlertDialogHeader>

            <AlertDialogBody>
              댓글을 정말로 수정하시겠습니까?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                아니요
              </Button>
              <Button colorScheme="teal" onClick={() => {
                setIsDialogOpen(false);
                confirmAction();
              }} ml={3}>
                네
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default CommentModifyComponent;