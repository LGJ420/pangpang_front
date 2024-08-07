import { useEffect, useState, useCallback } from "react"
import { deleteComment, getCommentsByArticleId, postComment } from "../../api/commentApi";
import { Box, Button, Flex, FormControl, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const CommentList = () => {
    const {articleId} = useParams()
    const [comment, setComment] = useState([])
    const [newComment, setNewComment] = useState({commentAuthor:'',commentContent:''})
    const [loading, setLoading] = useState(false);

    const fetchComment = useCallback(async () => {
        try {
            const data = await getCommentsByArticleId(articleId);
            setComment(data);
        } catch (error) {
            console.error("댓글을 불러오는데 실패했습니다.", error);
        }
    }, [articleId]);

    useEffect(() => {
        fetchComment();
    }, [fetchComment]);

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewComment((prev) => ({...prev, [name]: value}))
    }

    const handleAddComment = async () => {
        setLoading(true)
        try {
            const commentData = {
                author: newComment.commentAuthor,
                content: newComment.commentContent,
                articleId
            }
            await postComment(commentData)
            setNewComment({commentAuthor:'', commentContent:''})
            fetchComment()
        } catch (error) {
            console.error("댓글 작성에 실패했습니다.", error)
        }finally {
            setLoading(false)
        }
    };

    const handleDeleteComment = async (id) => {
        try {
            await deleteComment(id);
            fetchComment();
        } catch (error) {
            console.error("댓글 삭제에 실패했습니다.", error)
        }
    };

    return (
        <Box mt={8}>
            <FormControl mb={4}>
                <Input
                    name="author"
                    placeholder="작성자명"
                    value={newComment.author}
                    onChange={handleChange}
                    mb={2}
                />
                <Textarea
                    name="content"
                    placeholder="댓글을 입력하세요"
                    value={newComment.content}
                    onChange={handleChange}
                    rows={4}
                />
                <Button
                    mt={2}
                    colorScheme="teal"
                    isLoading={loading}
                    onClick={handleAddComment}
                >
                    댓글 추가
                </Button>
            </FormControl>

            <Stack spacing={4}>
                {comment.map((comment) => (
                    <Box
                        key={comment.id}
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        bg="gray.50"
                    >
                        <Flex justify="space-between" mb={2}>
                            <Text fontWeight="bold">{comment.author}</Text>
                            <Button colorScheme="red" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                                삭제
                            </Button>
                        </Flex>
                        <Text>{comment.content}</Text>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default CommentList;