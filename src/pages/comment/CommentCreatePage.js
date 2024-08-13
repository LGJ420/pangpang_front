// import React, { useState, useRef } from 'react';
// import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading, List, ListItem, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
// import { postComment } from '../../api/commentApi';

// const CommentCreatePage = ({ articleId }) => {
//   const [commentContent, setCommentContent] = useState('');
//   const [commentAuthor, setCommentAuthor] = useState('');
//   const [comments, setComments] = useState([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const cancelRef = useRef();

//   const handleSubmit = async () => {
//     try {
//       const newComment = await postComment({
//         articleId,
//         commentContent,
//         commentAuthor,
//       });

//       // 새로운 댓글을 기존의 댓글 목록에 추가
//       setComments((prevComments) => [...prevComments, newComment]);

//       // 입력 필드 초기화
//       setCommentContent('');
//       setCommentAuthor('');

//       // 모달 닫기
//       setIsDialogOpen(false);
//     } catch (error) {
//       console.error('Error creating comment:', error);
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     setIsDialogOpen(true);  // 모달 열기
//   };

//   return (
//     <Box p={6} maxW="container.md" mx="auto">
//       <Heading mb={6}>Create Comment</Heading>
//       <form onSubmit={handleFormSubmit}>
//         <FormControl mb={4} isRequired>
//           <FormLabel>Author</FormLabel>
//           <Input
//             type="text"
//             value={commentAuthor}
//             onChange={(e) => setCommentAuthor(e.target.value)}
//           />
//         </FormControl>
//         <FormControl mb={6} isRequired>
//           <FormLabel>Comment</FormLabel>
//           <Textarea
//             value={commentContent}
//             onChange={(e) => setCommentContent(e.target.value)}
//           />
//         </FormControl>
//         <Button colorScheme="teal" type="submit">Submit</Button>
//       </form>

//       <AlertDialog
//         isOpen={isDialogOpen}
//         leastDestructiveRef={cancelRef}
//         onClose={() => setIsDialogOpen(false)}
//       >
//         <AlertDialogOverlay>
//           <AlertDialogContent>
//             <AlertDialogHeader fontSize="lg" fontWeight="bold">
//               댓글 작성 확인
//             </AlertDialogHeader>

//             <AlertDialogBody>
//               정말로 댓글을 작성하시겠습니까?
//             </AlertDialogBody>

//             <AlertDialogFooter>
//               <Button colorScheme="teal" onClick={handleSubmit} ml={3}>
//                 네
//               </Button>
//               <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
//                 아니오
//               </Button>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialogOverlay>
//       </AlertDialog>
//     </Box>
//   );
// };

// export default CommentCreatePage;