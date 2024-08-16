import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading } from '@chakra-ui/react';
import { getCommentById, putComment } from '../../api/commentApi';

const CommentModifyPage = () => {
  const { id } = useParams();
  const [commentContent, setCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const data = await getCommentById(id);
        setCommentContent(data.commentContent);
        setCommentAuthor(data.commentAuthor);
      } catch (error) {
        console.error('Error fetching comment:', error);
      }
    };

    fetchComment();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await putComment(id, {
        commentContent,
        commentAuthor
      });
      navigate(-1); // 수정 후 이전 페이지로 돌아감
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Heading mb={6}>댓글 수정</Heading>
      <form onSubmit={handleUpdate}>
        <FormControl mb={4} isRequired>
          <FormLabel>작성자</FormLabel>
          <Input
            type="text"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
          />
        </FormControl>
        <FormControl mb={6} isRequired>
          <FormLabel>댓글 내용</FormLabel>
          <Textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" type="submit">저장하기</Button>
      </form>
    </Box>
  );
};

export default CommentModifyPage;