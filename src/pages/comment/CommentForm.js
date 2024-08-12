import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Textarea, FormControl, FormLabel, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CommentForm = ({ articleId, onCommentAdded }) => {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/comment', {
        articleId,
        commentAuthor,
        commentContent,
      });
      setCommentAuthor('');
      setCommentContent('');
      if (onCommentAdded) onCommentAdded();
      navigate(`/article/${articleId}`);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <Box bg="gray.50" p={4} borderRadius="md" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="author">작성자</FormLabel>
          <Input
            id="author"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="content">댓글 내용</FormLabel>
          <Textarea
            id="content"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          />
        </FormControl>

        <Flex direction="column" mb={6}>
            <Flex justify="space-between" mb={4}>
                <Button type="submit" colorScheme="teal">
                    댓글 추가
            </Button>
                <Button type="submit" colorScheme="teal" >
                    댓글 수정
            </Button>
            </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default CommentForm;