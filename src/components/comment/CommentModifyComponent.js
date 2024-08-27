import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Button, FormControl, FormLabel, Textarea, Heading,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Text, Flex, Spacer, useColorModeValue, useToast, Spinner, Alert, AlertIcon, useDisclosure
} from '@chakra-ui/react';
import { getCommentById, putComment } from '../../api/commentApi';
import useCustomToken from '../../hooks/useCustomToken';
import { formatDateTime } from "../../util/dateUtil";
import { logout } from '../../hooks/logout';



const CommentModifyComponent = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [commentCreated, setCommentCreated] = useState('');
  const [commentUpdated, setCommentUpdated] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cancelRef = useRef();
  const navigate = useNavigate();
  const { isLogin } = useCustomToken();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchComment = async () => {
      try {
        const data = await getCommentById(id);
        if (data) {
          setCommentContent(data.commentContent);
          setCommentCreated(data.commentCreated || '');
          setCommentUpdated(data.commentUpdated || data.commentCreated);
          setError(null);
        } else {
          setError("Comment Not Found");
          onOpen();
        }
      } catch (error) {
        console.error('Error fetching comment:', error);
        setError("존재하지 않는 댓글입니다.");
        onOpen();
      } finally {
        setIsLoading(false);
      }
    };

    fetchComment();
  }, [id, onOpen]);



  const handleUpdate = (e) => {
    e.preventDefault();
    setConfirmAction(() => saveComment);
    setIsDialogOpen(true);
  };



  const saveComment = async () => {
    try {
      setIsSubmitting(true);
      await putComment(id, { commentContent });
      setCommentUpdated(new Date().toISOString());
      toast({
        title: "댓글이 수정되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(-1);
    } catch (error) {
      console.error('Error updating comment:', error);
      toast({
        title: "댓글 수정에 실패했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      if (error.response.status === 401) {
        alert("토큰 유효 시간이 만료되었습니다.")
        logout(); // import { logout } from '../../hooks/logout'; 추가 필요
      }

    } finally {
      setIsSubmitting(false);
    }
  };



  useEffect(() => {
    if (!isLogin) {
      alert("잘못된 접근 방식입니다.");
      navigate(-1);
    }
  }, [isLogin, navigate]);



  if (!isLogin || isLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
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
            <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
              저장하기
            </Button>
            <Spacer />
            <Button colorScheme="gray" onClick={() => navigate(-1)}>취소</Button>
          </Flex>
        </form>
      </Box>

      <Modal isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight="bold">
            댓글 수정 확인
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            댓글을 정말로 수정하시겠습니까?
          </ModalBody>

          <ModalFooter>
            <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
              아니요
            </Button>
            <Button colorScheme="teal" onClick={() => {
              setIsDialogOpen(false);
              confirmAction();
            }} ml={3} isLoading={isSubmitting}>
              네
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



      {/* Error Modal */}
      <Modal isOpen={isOpen} onClose={() => {
        onClose();
        navigate(-1); // Redirect after closing the error modal
      }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>오류</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="warning">
              <AlertIcon />
              {error || "존재하지 않는 댓글입니다."}
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={() => {
              onClose();
              navigate(-1); // Redirect after closing the error modal
            }}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CommentModifyComponent;