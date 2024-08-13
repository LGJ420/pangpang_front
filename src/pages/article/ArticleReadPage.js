import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import useCustomMove from "../../hooks/useCustomMove";
import { getOne } from "../../api/articleApi";
import CommentList from "../comment/CommentListPage";

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

      <Text fontSize="lg" color="gray.600" mb={2}>
        작성자: {serverData.articleAuthor}
      </Text>

      <Text fontSize="sm" color="gray.500" mb={4}>
        작성일: {serverData.articleCreated ? new Date(serverData.articleCreated).toLocaleDateString() : 'N/A'}{" "}
        {serverData.articleUpdated && `(수정일: ${new Date(serverData.articleUpdated).toLocaleDateString()})`}
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

      <CommentList articleId={id} />
      {/* <CommentCreatePage articleId={id}/> */}
    </Box>
  );
};

export default ArticleReadPage;