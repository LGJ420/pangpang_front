import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove"
import { getOne } from "../../api/articleApi"
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { useParams } from "react-router-dom"

// 정규 표현식으로 URL을 감지하고 하이퍼링크로 변환하는 함수
const formatContent = (content) => {
  // URL 정규 표현식
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return content.replace(urlPattern, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`)
}

const initState = {
    id: 0,
    articleTitle: '',
    articleContent:'',
    articleAuthor:'',
    articleCreated: null,
    articleUpdated: null
}

const ArticleReadPage = () => {
    const {id} = useParams(); //url에서 id를 추출
    const [serverData, setServerData] = useState(initState)
    const {moveToList, moveToModify} = useCustomMove()

    useEffect(() => {
        const fetchData = async() => {
            try{
                const data = await getOne(id);
                console.log("Fetched article data:", data);
                setServerData(data);
            }catch (error){
                console.error("글을 불러오는데 실패했습니다.", error);
            }
        };

        if(id){
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
        {serverData.updatedTime && `(수정일: ${new Date(serverData.articleUpdated).toLocaleDateString()})`}
      </Text>

      <Box bg="gray.50" p={4} borderRadius="md" mb={4} style={{whiteSpace: 'pre-wrap'}}>
        {/*dangerouslySetInnerHTML을 사용하여 HTML을 삽입*/}
        <Text as="div" dangerouslySetInnerHTML={{__html: formatContent(serverData.articleContent)}}
        sx={{
          '& a': {
            color: 'blue.500',
            textDecoration: 'underline',
            _hover: {
              color: 'blue.700'
            }
          }
        }}/>
      </Box>

      <Flex justify="space-between">
        <Button colorScheme="teal" onClick={() => moveToList()}>
          목록으로 돌아가기
        </Button>
        <Button colorScheme="orange" onClick={() => moveToModify(id)}>
          수정하기
        </Button>
      </Flex>
    </Box>
    )
}

export default ArticleReadPage;