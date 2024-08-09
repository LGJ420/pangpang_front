import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../../api/commentApi";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";

const CommentListPage = () => {
    const {articleId} = useParams()
    const [comment, setComment] = useState([])

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const data = await getCommentsByArticleId(articleId);
                setComment(data)
            } catch (error) {
                console.error("댓글을 불러오는데 실패했습니다.")
            }
        };
        fetchComment()
    }, [articleId])

    return (
        <Box mt={8}>
            <Stack spacing={4}>
                {comment.map(comment => (
                    <Box key={comment.id} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
                        <Flex justify="space-between" mb={2}>
                            <Text fontWeight="bold">{comment.commentAuthor}</Text>
                            <Flex>
                                <Link to={`/comments/edit/${comment.id}`}>
                                    <Button colorScheme="blue" size="sm" mr={2}>수정</Button>
                                </Link>
                                <Button colorScheme="red" size="sm">삭제</Button>
                            </Flex>
                        </Flex>
                        <Text>{comment.commentContent}</Text>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default CommentListPage;