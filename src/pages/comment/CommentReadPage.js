import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId } from "../../api/commentApi";
import { Box, Button, Text } from "@chakra-ui/react";
import CommentForm from "./CommentForm";
import useCustomMove from "../../hooks/useCustomMove"; // 훅을 import

const CommentReadPage = () => {
    const { articleId } = useParams();
    const [comments, setComments] = useState([]);
    const { moveToModify } = useCustomMove(); // 훅 사용

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await getCommentsByArticleId(articleId);
                setComments(commentsData);
            } catch (error) {
                console.error("댓글을 불러오는데 실패했습니다.", error);
            }
        };
        fetchComments();
    }, [articleId]);

    return (
        <Box mt={8}>
            <CommentForm articleId={articleId} />
            <Box mt={8}>
                {comments.map((comment) => (
                    <Box key={comment.id} p={4} borderWidth={1} borderRadius="md" bg="gray.50" mb={4}>
                        <Text fontWeight="bold">{comment.commentAuthor}</Text>
                        <Text>{comment.commentContent}</Text>
                        <Button mt={2} onClick={() => moveToModify(comment.id)}>수정</Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default CommentReadPage;