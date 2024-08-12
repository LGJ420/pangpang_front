import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { postComment } from "../../api/commentApi"
import { Box, FormControl, Input, Textarea } from "@chakra-ui/react"
import { Button } from "react-bootstrap"

const CommentCreatePage = () => {
    const {articleId} = useParams()
    const navigate = useNavigate()
    const [newComment, setNewComment] = useState({commentAtuthor:'', commentContent: ''})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewComment(prev => ({...prev, [name]: value}))
    }

    const handleAddComment = async () => {
        setLoading(true)
        try {
            await postComment({...newComment, articleId})
            navigate(`/article/read/${articleId}`)
        } catch (error) {
            console.error("댓글 작성에 실패했습니다.", error)
        }finally{
            setLoading(false)
        }
    };

    return (
        <Box mt={8}>
            <FormControl mb={4}>
                <Input
                    name="commentAuthor"
                    placeholder="작성자명"
                    value={newComment.commentAuthor}
                    onChange={handleChange}
                    mb={2}
                />
                <Textarea
                    name="commentContent"
                    placeholder="댓글을 입력하세요"
                    value={newComment.commentContent}
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
        </Box>
    );
}

export default CommentCreatePage;