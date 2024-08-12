import React, { useState } from 'react';
import { Box, Button, FormControl, Input, Textarea, Text } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { postComment } from '../../api/commentApi';

const CommentCreatePage = () => {
    const { articleId } = useParams();
    const navigate = useNavigate();
    const [comment, setComment] = useState({
        articleId: articleId,
        content: '',
        author: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComment((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await postComment(comment);
            alert('댓글이 성공적으로 작성되었습니다!');
            navigate(`/article/read/${articleId}`); // 댓글 작성 후 게시글 읽기 페이지로 이동
        } catch (error) {
            alert('댓글 작성에 실패했습니다.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={6} maxW="lg" borderWidth={1} borderRadius="lg" boxShadow="lg" mx="auto" bg="gray.50" mt={8}>
            <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center" color="teal.500">
                댓글 작성
            </Text>
            <FormControl mb={4}>
                <Input
                    name="author"
                    placeholder="작성자명을 입력하세요"
                    value={comment.author}
                    onChange={handleChange}
                    variant="filled"
                    bg="white"
                    focusBorderColor="teal.400"
                    borderRadius="md"
                />
            </FormControl>
            <FormControl mb={6}>
                <Textarea
                    name="content"
                    placeholder="댓글 내용을 입력하세요"
                    value={comment.content}
                    onChange={handleChange}
                    variant="filled"
                    bg="white"
                    focusBorderColor="teal.400"
                    borderRadius="md"
                    rows={4}
                />
            </FormControl>
            <Button
                colorScheme="teal"
                size="lg"
                width="full"
                onClick={handleSubmit}
                isLoading={loading}
                loadingText="작성 중..."
                borderRadius="md"
                shadow="md"
            >
                작성하기
            </Button>
        </Box>
    );
};

export default CommentCreatePage;