import React, { useEffect, useState } from 'react';
import { Box, Button, Text, VStack, Flex, IconButton, useColorModeValue, CloseButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { deleteComment, getMyComments } from '../../api/commentApi';
import useCustomToken from '../../hooks/useCustomToken';

const MypageCommentComponent = () => {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [commentToDelete, setCommentToDelete] = useState(null); // State for the comment to be deleted
    const { isLogin, decodeToken } = useCustomToken();
    const bgColor = useColorModeValue('gray.50', 'gray.800');
    const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal hooks

    const fetchComments = async (page = 1) => {
        if (!isLogin) return;
        try {
            const memberId = decodeToken.id; // Get memberId from token
            console.log('Member ID:', memberId); // Debug memberId
            const data = await getMyComments({ page, size: 5, memberId }); // Fetch comments
            setComments(data.dtoList || []); // Set comments from dtoList
            setTotalPages(Math.ceil(data.totalCount / 5)); // Set total pages based on totalCount
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        if (isLogin) {
            fetchComments(currentPage);
        }
    }, [isLogin, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleClickDelete = (id) => {
        setCommentToDelete(id); // Set the comment ID to be deleted
        onOpen(); // Open the modal
    };

    const confirmDelete = async () => {
        if (commentToDelete) {
            try {
                await deleteComment(commentToDelete); // Delete comment
                fetchComments(currentPage); // Refresh comments after deletion
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
            setCommentToDelete(null); // Clear the comment ID
            onClose(); // Close the modal
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    return (
        <>
            <Box p={6} maxW="container.md" mx="auto" bg={bgColor} borderRadius="md" shadow="md">
                <Text fontSize="2xl" fontWeight="bold" mb={6}>My Comments</Text>
                {comments.length > 0 ? (
                    <VStack spacing={4} align="stretch">
                        {comments.map(comment => (
                            <Box
                                key={comment.id}
                                p={4}
                                borderWidth="1px"
                                borderRadius="md"
                                bg="white"
                                shadow="md"
                                borderColor="gray.200"
                            >
                                <Flex direction="column">
                                    <Flex align="center" mb={2}>
                                        <Text fontWeight="bold" mr={2}>글번호: {comment.articleId}</Text>
                                        <Text fontSize="sm" color="gray.500">
                                            작성일: {formatDateTime(comment.commentCreated)}
                                            {comment.commentUpdated && (
                                                <Text as="span" ml={2} fontSize="sm" color="gray.400">
                                                    (수정일: {formatDateTime(comment.commentUpdated)})
                                                </Text>
                                            )}
                                        </Text>
                                    </Flex>
                                    <Text mb={2}>{comment.commentContent}</Text>
                                    <CloseButton className='ml-auto' onClick={() => handleClickDelete(comment.id)} />
                                </Flex>
                            </Box>
                        ))}
                        {/* Pagination */}
                        <Flex justifyContent="center" alignItems="center" mt={5} fontSize="lg">
                            <IconButton
                                aria-label="Previous Page"
                                icon={<ChevronLeftIcon />}
                                isDisabled={currentPage <= 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                mr={3}
                                _hover={{ bg: 'teal.100', color: 'teal.700' }}
                                _disabled={{ bg: 'gray.200', cursor: 'not-allowed' }}
                            />
                            {[...Array(totalPages).keys()].map(page => (
                                <Button
                                    key={page + 1}
                                    mx={1}
                                    size="sm"
                                    variant={currentPage === page + 1 ? 'solid' : 'outline'}
                                    colorScheme={currentPage === page + 1 ? 'teal' : 'gray'}
                                    onClick={() => handlePageChange(page + 1)}
                                    _hover={{ bg: 'teal.100', color: 'teal.700' }}
                                >
                                    {page + 1}
                                </Button>
                            ))}
                            <IconButton
                                aria-label="Next Page"
                                icon={<ChevronRightIcon />}
                                isDisabled={currentPage >= totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                ml={3}
                                _hover={{ bg: 'teal.100', color: 'teal.700' }}
                                _disabled={{ bg: 'gray.200', cursor: 'not-allowed' }}
                            />
                        </Flex>
                    </VStack>
                ) : (
                    <Text textAlign="center">No comments found.</Text>
                )}
            </Box>

            {/* Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalBody>
                        <Text>정말로 댓글을 삭제하시겠습니까?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={confirmDelete}>
                            네
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            아니요
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default MypageCommentComponent;