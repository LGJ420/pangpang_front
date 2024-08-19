import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import useCustomMove from "../../hooks/useCustomMove";
import { deleteOne, getOne } from "../../api/articleApi";
import CommentList from "../comment/CommentListComponent";
import useCustomToken from "../../hooks/useCustomToken";


// 날짜와 시간 포맷 함수
const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`; // 초 단위 제거
};

const formatContent = (content) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return content.replace(urlPattern, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
};

const initState = {
  id: 0,
  articleTitle: '',
  memberNickname: '',
  memberId: 0,
  articleContent: '',
  articleCreated: null,
  articleUpdated: null,
  viewCount: 0 
};

const ArticleReadComponent = () => {
  const { id } = useParams(); // URL에서 id를 추출
  const [serverData, setServerData] = useState({...initState});
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { moveToList, moveToModify } = useCustomMove();
  const { isLogin, decodeToken } = useCustomToken();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOne(id);
        setServerData(data);
        console.log("data:", data);
      } catch (error) {
        console.error("글을 불러오는데 실패했습니다.", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleDeleteConfirm = async () => {
    try {
      await deleteOne(id);
      moveToList();
    } catch (error) {
      console.error("삭제에 실패했습니다.", error);
    } finally {
      onClose();
    }
  };
    

  // 현재 사용자가 작성자인지 확인
  const isAuthor = isLogin && serverData.memberId === decodeToken.id;

  return (
    <Box p={5} bg="white" borderRadius="md" boxShadow="md" maxW="container.md" mx="auto" my={8}>
      <Heading as="h1" size="xl" mb={4}>
        {serverData.articleTitle}
      </Heading>


      {/*작성자*/}
      <Text fontSize="lg" color="gray.600" mb={2}>
        작성자: {serverData.memberNickname}
      </Text>


      {/*작성일 및 수정일*/}
      <Text fontSize="sm" color="gray.500" mb={4}>
        작성일: {serverData.articleCreated ? formatDateTime(serverData.articleCreated) : 'N/A'}{" "}
        {serverData.articleUpdated && `(수정일: ${formatDateTime(serverData.articleUpdated)})`}
      </Text>


      {/*조회수*/}
      <Text fontSize="sm" color="gray.500" mb={4}>
        조회수: {serverData.viewCount || 0}회 
      </Text>

      <Box bg="gray.50" p={4} borderRadius="md" mb={4} style={{ whiteSpace: 'pre-wrap' }}>
        <Text as="div" dangerouslySetInnerHTML={{ __html: formatContent(serverData.articleContent) }}
          sx={{
            '& a': {
              color: 'blue.500',
              textDecoration: 'underline',
              _hover: {
                color: 'blue.700'
              }
            }
          }} />
      </Box>

      <Flex direction="column" mb={6}>
        <Flex justify="space-between" mb={4}>
          <Button colorScheme="teal" onClick={() => moveToList()}>
            목록으로 돌아가기
          </Button>
          {isAuthor?
            <Button colorScheme="orange" onClick={() => moveToModify(id)}>
              수정하기
            </Button>
          :<></>}

          {isAuthor?
          <Button colorScheme="red" onClick={onOpen} isLoading={loading}>
            삭제
          </Button>
          :<></>}
        </Flex>
      </Flex>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            정말로 이 글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteConfirm} mr={3}>
              네
            </Button>
            <Button variant="ghost" onClick={onClose}>
              아니오
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 댓글 리스트 및 작성 컴포넌트 */}
      <CommentList articleId={id} />
    </Box>
  );
};

export default ArticleReadComponent;