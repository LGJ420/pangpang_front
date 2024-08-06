import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne, putOne, deleteOne } from "../../api/articleApi";
import { Box, Button, Flex, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
    id: 0,
    articleTitle: '',
    articleAuthor: '',
    articleContent: '',
    articleCreated: null,
    articleUpdated: null
};

const ArticleModifyPage = () => {
    const { id } = useParams();
    const {moveToList,moveToRead} = useCustomMove()
    const [article, setArticle] = useState({ ...initState });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOne(id);
                setArticle(data);
            } catch (error) {
                console.error("글을 불러오는데 실패했습니다.", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle((prev) => ({ ...prev, [name]: value }));
    };

    const handleClickModify = async () => {
        console.log('Handle Click Modify - Article ID:', id)
        setLoading(true);
        try {
            await putOne(id, article);
            alert('수정이 완료되었습니다!');
            moveToRead(id)
        } catch (error) {
            console.error("수정에 실패했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        console.log("handleCancel called")
        moveToRead(id)
    };

    const handleClickDelete = async () => {
        console.log("handleClickDelete called")
        try {
            await deleteOne(id);
            alert('삭제가 완료되었습니다!');
            moveToList()
        } catch (error) {
            console.error("삭제에 실패했습니다.", error);
        }
    };

    return (
        <Box p={5} bg="white" borderRadius="md" boxShadow="md" maxW="container.md" mx="auto" my={8}>
            <Heading as="h1" size="xl" mb={4}>
                <Input
                    name="articleTitle"
                    value={article.articleTitle}
                    onChange={handleChange}
                    placeholder="제목을 입력하세요"
                    variant="flushed"
                    size="lg"
                />
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={2}>
                작성자: {article.articleAuthor}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={4}>
                작성일: {article.articleCreated ? new Date(article.articleCreated).toLocaleDateString() : 'N/A'}{" "}
                {article.articleUpdated && `(수정일: ${new Date(article.articleUpdated).toLocaleDateString()})`}
            </Text>
            <Box bg="gray.50" p={4} borderRadius="md" mb={4}>
                <Textarea
                    name="articleContent"
                    value={article.articleContent}
                    onChange={handleChange}
                    placeholder="내용을 입력하세요"
                    size="lg"
                    minHeight="200px"
                    variant="flushed"
                />
            </Box>
            <Flex justify="space-between">
                <Button colorScheme="red" onClick={handleClickDelete} isLoading={loading}>
                    삭제
                </Button>
                <Button colorScheme="teal" onClick={handleClickModify} isLoading={loading}>
                    저장
                </Button>
                <Button colorScheme="gray" onClick={handleCancel}>
                    취소
                </Button>
            </Flex>
        </Box>
    );
};

export default ArticleModifyPage;