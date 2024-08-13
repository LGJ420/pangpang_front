import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Button, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CommentList = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comment?articleId=${articleId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [articleId]);

  const handleEdit = (commentId) => {
    navigate(`/article/edit-comment/${commentId}`);
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/comment/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <Box>
      <Stack spacing={4}>
        {comments.map(comment => (
          <Box key={comment.id} p={4} bg="gray.50" borderRadius="md" boxShadow="md">
            <Text fontWeight="bold">{comment.commentAuthor}</Text>
            <Text mt={2}>{comment.commentContent}</Text>
            <Stack direction="row" spacing={4} mt={4}>
              <Button colorScheme="blue" onClick={() => handleEdit(comment.id)}>
                수정
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(comment.id)}>
                삭제
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default CommentList;