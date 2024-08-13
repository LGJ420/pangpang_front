import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Divider } from '@chakra-ui/react';
import { getCommentsByArticleId } from '../../api/commentApi';

const CommentList = ({ articleId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByArticleId(articleId);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [articleId]);

  return (
    <Box mt={6} p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Text fontSize="lg" fontWeight="bold" mb={4}>Comments</Text>
      {comments.length > 0 ? (
        <VStack spacing={4} align="stretch">
          {comments.map(comment => (
            <Box key={comment.id} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
              <Text fontWeight="bold" mb={2}>{comment.commentAuthor}</Text>
              <Text>{comment.commentContent}</Text>
              <Divider mt={2} />
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No comments yet.</Text>
      )}
    </Box>
  );
};

export default CommentList;