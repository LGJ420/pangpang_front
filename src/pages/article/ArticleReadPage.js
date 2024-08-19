import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import useCustomMove from "../../hooks/useCustomMove";
import { getOne } from "../../api/articleApi";
import CommentList from "../comment/CommentListPage";

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
  articleContent: '',
  articleAuthor: '',
  articleCreated: null,
  articleUpdated: null,
  viewCount: 0 
};

const ArticleReadPage = () => {
  const { id } = useParams(); // URL에서 id를 추출
  const [serverData, setServerData] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOne(id);
        setServerData(data);
      } catch (error) {
        console.error("글을 불러오는데 실패했습니다.", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
          <Button colorScheme="orange" onClick={() => moveToModify(id)}>
            수정하기
          </Button>
        </Flex>
      </Flex>

      {/* 댓글 리스트 및 작성 컴포넌트 */}
      <CommentList articleId={id} />
    </Box>
  );
};

export default ArticleReadPage;