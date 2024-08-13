import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCommentById } from '../../api/commentApi';

const CommentReadPage = () => {
    const { commentId } = useParams();
    const navigate = useNavigate();
    const [comment, setComment] = useState({
        content: '',
        author: '',
        articleId: ''
    });

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const data = await getCommentById(commentId);
                setComment(data);
            } catch (error) {
                console.error('댓글을 불러오는 데 실패했습니다.', error);
            }
        };
        fetchComment();
    }, [commentId]);

    return (
        <Box p={6} maxW="lg" borderWidth={1} borderRadius="lg" boxShadow="lg" mx="auto" bg="gray.50" mt={8}>
            <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center" color="teal.500">
                댓글 보기
            </Text>
            <Text fontSize="lg" mb={4}>
                <strong>작성자:</strong> {comment.author}
            </Text>
            <Text fontSize="md" mb={4}>
                {comment.content}
            </Text>
            <Flex justify="flex-end">
                <Button colorScheme="teal" onClick={() => navigate(`/comment/modify/${commentId}`)}>
                    수정하기
                </Button>
            </Flex>
        </Box>
    );
};

export default CommentReadPage;