import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Textarea, FormControl, FormLabel } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const CommentModifyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState({ commentAuthor: '', commentContent: '' });

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(`/api/comment/${id}`);
        setComment(response.data);
      } catch (error) {
        console.error('Error fetching comment:', error);
      }
    };

    if (id) {
      fetchComment();
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/comment/${id}`, comment);
      navigate(`/article/${comment.articleId}`);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box p={5} bg="white" borderRadius="md" boxShadow="md" maxW="container.md" mx="auto" my={8}>
      <form onSubmit={handleUpdate}>
        <FormControl mb={4}>
          <FormLabel htmlFor="author">작성자</FormLabel>
          <Input
            id="author"
            name="commentAuthor"
            value={comment.commentAuthor}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="content">댓글 내용</FormLabel>
          <Textarea
            id="content"
            name="commentContent"
            value={comment.commentContent}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          수정 완료
        </Button>
      </form>
    </Box>
  );
};

export default CommentModifyPage;