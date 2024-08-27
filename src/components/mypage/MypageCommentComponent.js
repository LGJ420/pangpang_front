import React, { useEffect, useState } from 'react';
import {Box,Heading,Text,VStack,Flex,IconButton,CloseButton,Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter,useDisclosure,Spinner,Alert,AlertIcon,ModalCloseButton,Button} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { deleteComment, getMyComments } from '../../api/commentApi';
import useCustomToken from '../../hooks/useCustomToken';
import { useNavigate } from 'react-router-dom';
import MypageTitleComponent from '../common/MypageTitleComponent';
import { formatDateTime } from "../../util/dateUtil";



const MypageCommentComponent = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0); // 추가된 상태 변수
    const [commentToDelete, setCommentToDelete] = useState(null);
    const { isLogin, decodeToken } = useCustomToken();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();



    const fetchComments = async (page = 1) => {
        if (!isLogin) return;
        setLoading(true);
        setError(null);
        try {
            const memberId = decodeToken.id;
            const data = await getMyComments({ page, size: 5, memberId });
            console.log(data);
            setComments(data.dtoList || []);
            setTotalPages(Math.ceil(data.totalCount / 5));
            setTotalCount(data.totalCount);
            setCurrentPage(page);
        } catch (error) {
            setError('Failed to fetch comments.', error);
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




    const formatContent = (content) => {
        if (!content) return '';
        const urlPattern = /(https?:\/\/[^\s]+)/g;
        return content.replace(urlPattern, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
    };



    if (loading) return <Spinner size="xl" />;
    if (error) return (
        <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
        </Alert>
    );



    return (
        <section>
            <MypageTitleComponent>
                내가 쓴 댓글
            </MypageTitleComponent>

            <h3 className="text-xl my-5 ml-4">
                총 댓글 개수: {totalCount}
            </h3>

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
                                <div className='cursor-pointer' onClick={() => navigate(`/article/read/${comment.articleId}`)}>
                                    <Flex direction="column" mb={4}>
                                        <Flex align="center" mb={2}>
                                            <Heading className='cursor-pointer' fontSize="xl" mb={2} 
                                                _hover={{
                                                textDecoration: 'underline',
                                                transform: 'scale(1.05)',
                                                transition: 'transform 0.2s ease, text-decoration 0.2s ease',
                                                color: 'blue.600'
                                            }}
                                            >
                                            글제목: {comment.articleTitle}
                                            </Heading>
                                        </Flex>

                                        <Text fontSize="sm" color="gray.600" mb={2}>
                                            글번호: {comment.articleId}
                                        </Text>
                                        
                                        {/*댓글 내용*/}
                                        <Text 
                                            mb={4} 
                                            style={{ whiteSpace: 'pre-wrap' }} 
                                            dangerouslySetInnerHTML={{ __html: formatContent(comment.commentContent) }}
                                                sx={{
                                                    '& a': {
                                                    color: 'blue.500',
                                                    textDecoration: 'underline',
                                                    _hover: {
                                                    color: 'blue.700'
                                                    }
                                                }
                                            }}
                                        />

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
        </section>
    );
};

export default MypageCommentComponent;