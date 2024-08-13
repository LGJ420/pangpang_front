import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading } from '@chakra-ui/react';
import { postComment } from '../../api/commentApi';

const CommentCreatePage = ({ articleId }) => {
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postComment({
        articleId,
        commentContent,
        commentAuthor,
      });
      navigate(-1);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Heading mb={6}>Create Comment</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Author</FormLabel>
          <Input
            type="text"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
          />
        </FormControl>
        <FormControl mb={6} isRequired>
          <FormLabel>Comment</FormLabel>
          <Textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default CommentCreatePage;