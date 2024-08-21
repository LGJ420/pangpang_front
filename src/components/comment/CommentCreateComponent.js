// import React, { useState } from 'react';
// import {
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   Button,
//   Heading,
// } from '@chakra-ui/react';
// import { postComment } from '../../api/commentApi';

// const CommentCreateComponent = ({ articleId, onCommentAdded }) => {
//   const [commentContent, setCommentContent] = useState('');
//   const [commentAuthor, setCommentAuthor] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const newComment = await postComment({
//         articleId,
//         commentContent,
//         commentAuthor,
//       });

//       // Call the parent callback to add the new comment to the list
//       onCommentAdded(newComment);

//       // Clear the form fields
//       setCommentContent('');
//       setCommentAuthor('');
//     } catch (error) {
//       console.error('Error creating comment:', error);
//     }
//   };

//   return (
//     <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
//       <Heading mb={6}>댓글 작성</Heading>
//       <form onSubmit={handleSubmit}>
//         <FormControl mb={4} isRequired>
//           <FormLabel>작성자</FormLabel>
//           <Input
//             type="text"
//             value={commentAuthor}
//             onChange={(e) => setCommentAuthor(e.target.value)}
//           />
//         </FormControl>
//         <FormControl mb={6} isRequired>
//           <FormLabel>댓글 내용</FormLabel>
//           <Textarea
//             value={commentContent}
//             onChange={(e) => setCommentContent(e.target.value)}
//           />
//         </FormControl>
//         <Button colorScheme="teal" type="submit" width="full">
//           저장
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default CommentCreateComponent;