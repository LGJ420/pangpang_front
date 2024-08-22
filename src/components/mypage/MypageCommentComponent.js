import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Text,
    VStack,
    Flex,
    IconButton,
    CloseButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Spinner,
    Alert,
    AlertIcon,
    ModalCloseButton,
    Button
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { deleteComment, getMyComments } from '../../api/commentApi';
import useCustomToken from '../../hooks/useCustomToken';

const MypageCommentComponent = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const { isLogin, decodeToken } = useCustomToken();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fetchComments = async (page = 1) => {
        if (!isLogin) return;
        setLoading(true);
        setError(null);
        try {
            const memberId = decodeToken.id;
            const data = await getMyComments({ page, size: 5, memberId });
            setComments(data.dtoList || []);
            setTotalPages(Math.ceil(data.totalCount / 5));
            setCurrentPage(page);
        } catch (error) {
            setError('Failed to fetch comments.');
        } finally {
            setLoading(false);
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
        setCommentToDelete(id);
        onOpen();
    };

    const confirmDelete = async () => {
        if (commentToDelete) {
            try {
                await deleteComment(commentToDelete);
                fetchComments(currentPage);
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
            setCommentToDelete(null);
            onClose();
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    if (loading) return <Spinner size="xl" />;
    if (error) return (
        <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
        </Alert>
    );

    return (
        <Box p={4} maxW="1200px" mx="auto">
            <Heading as="h3" size="lg" mb={6}>내 댓글</Heading>
            {comments.length > 0 ? (
                <VStack spacing={6} align="stretch">
                    {comments.map(comment => (
                        <Box
                            key={comment.id}
                            p={6}
                            shadow="lg"
                            borderWidth="1px"
                            borderRadius="md"
                            bg="white"
                        >
                            <Flex justifyContent="space-between">
                                <div className='cursor-pointer'>
                                    <Flex direction="column" mb={4}>
                                        <Flex align="center" mb={2}>
                                            <Heading fontSize="xl" mb={2}>
                                                글제목: {comment.articleTitle}
                                            </Heading>
                                        </Flex>
                                        <Text fontSize="sm" color="gray.600" mb={2}>
                                            글번호: {comment.articleId}
                                        </Text>
                                        <Text mb={4}>{comment.commentContent}</Text>
                                        <Flex justify="space-between" align="center" fontSize="sm" color="gray.500">
                                            <Text>조회수: {comment.viewCount}</Text>
                                        </Flex>
                                    </Flex>
                                </div>
                                <div className='flex flex-col justify-between'>
                                    <CloseButton className='ml-auto' onClick={() => handleClickDelete(comment.id)} />
                                    <Text fontSize="sm" color="gray.500">작성일: {formatDateTime(comment.commentCreated)}</Text>
                                </div>
                            </Flex>
                        </Box>
                    ))}
                    {/* Pagination Controls */}
                    <Flex justifyContent="center" alignItems="center" mt={6} fontSize="lg">
                        <IconButton
                            aria-label="Previous Page"
                            icon={<ChevronLeftIcon />}
                            isDisabled={currentPage <= 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            mr={3}
                            _hover={{ bg: 'teal.50', color: 'teal.600' }}
                            _disabled={{ bg: 'gray.200', color: 'gray.500', cursor: 'not-allowed' }}
                        />
                        {[...Array(totalPages).keys()].map(page => (
                            <Button
                                key={page + 1}
                                mx={1}
                                size="sm"
                                variant={currentPage === page + 1 ? 'solid' : 'outline'}
                                colorScheme={currentPage === page + 1 ? 'teal' : 'gray'}
                                onClick={() => handlePageChange(page + 1)}
                                _hover={{ bg: 'teal.50', color: 'teal.600' }}
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
                            _hover={{ bg: 'teal.50', color: 'teal.600' }}
                            _disabled={{ bg: 'gray.200', color: 'gray.500', cursor: 'not-allowed' }}
                        />
                    </Flex>
                </VStack>
            ) : (
                <Text textAlign="center" color="gray.500">댓글을 찾을 수 없습니다.</Text>
            )}

            {/* Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={() => onClose()}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>정말로 댓글을 삭제하시겠습니까?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={confirmDelete}>
                            네
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            아니요
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default MypageCommentComponent;