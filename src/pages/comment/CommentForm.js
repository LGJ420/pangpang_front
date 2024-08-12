import { Box, Button, FormControl, Input, Textarea } from "@chakra-ui/react";

const CommentForm = ({ comment, onChange, onSubmit, onDelete, loading }) => {
    return (
        <Box p={5} bg="white" borderRadius="md" boxShadow="md" maxW="container.md" mx="auto" my={8}>
            <FormControl mb={4}>
                <Input
                    name="commentAuthor"
                    value={comment.commentAuthor || ''}
                    onChange={onChange}
                    placeholder="작성자명"
                />
            </FormControl>
            <FormControl mb={4}>
                <Textarea
                    name="commentContent"
                    value={comment.commentContent || ''}
                    onChange={onChange}
                    placeholder="댓글 내용"
                    rows={4}
                />
            </FormControl>
            <Button colorScheme="teal" onClick={onSubmit} isLoading={loading} mb={2}>
                {comment.id ? '저장' : '댓글 추가'}
            </Button>
            {comment.id && (
                <Button colorScheme="red" onClick={onDelete} isLoading={loading}>
                    삭제
                </Button>
            )}
        </Box>
    );
};

export default CommentForm;