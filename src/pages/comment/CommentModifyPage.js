import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCommentById, putComment, deleteComment } from "../../api/commentApi";
import { Box, Button, FormControl, Input, Textarea } from "@chakra-ui/react";

const CommentModifyPage = () => {
    const { commentId } = useParams(); // commentId를 URL에서 추출
    const navigate = useNavigate();
    const [comment, setComment] = useState({ commentAuthor: '', commentContent: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const data = await getCommentById(commentId);
                setComment(data);
            } catch (error) {
                console.error("댓글을 불러오는데 실패했습니다.", error);
            }
        };

        if (commentId) {
            fetchComment();
        }
    }, [commentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComment(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await putComment(commentId, comment);
            alert('댓글이 수정되었습니다.');
            navigate(`/article/read/${comment.articleId}`);
        } catch (error) {
            console.error("댓글 수정에 실패했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteComment(commentId);
            alert('댓글이 삭제되었습니다.');
            navigate(`/article/read/${comment.articleId}`);
        } catch (error) {
            console.error("댓글 삭제에 실패했습니다.", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={5} bg="white" borderRadius="md" boxShadow="md" maxW="container.md" mx="auto" my={8}>
            <FormControl mb={4}>
                <Input
                    name="commentAuthor"
                    value={comment.commentAuthor}
                    onChange={handleChange}
                    placeholder="작성자명"
                />
            </FormControl>
            <FormControl mb={4}>
                <Textarea
                    name="commentContent"
                    value={comment.commentContent}
                    onChange={handleChange}
                    placeholder="댓글 내용"
                    rows={4}
                />
            </FormControl>
            <Button colorScheme="teal" onClick={handleSave} isLoading={loading} mb={2}>
                저장
            </Button>
            <Button colorScheme="red" onClick={handleDelete} isLoading={loading}>
                삭제
            </Button>
        </Box>
    );
};

export default CommentModifyPage;