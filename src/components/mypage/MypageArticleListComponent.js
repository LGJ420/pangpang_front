import { Box, Heading, Text, Button, Stack, Spinner, Alert, AlertIcon, IconButton, Flex, CloseButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteOne, getMyArticles } from '../../api/articleApi';
import MypageTitleComponent from '../common/MypageTitleComponent';
import { formatDateTime } from "../../util/dateUtil";



const MypageArticleListComponent = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10); // Number of posts per page
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState(null); // To store the article ID to delete
    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal controls
    const navigate = useNavigate();



    useEffect(() => {
        const fetchMyArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getMyArticles({ page, size });
                console.log(response);
                setArticles(response.dtoList);
                setTotalPages(response.totalPage); // Set the total number of pages
                setCurrentPage(response.current); // Set the current page number
                setTotalCount(response.totalCount);
            } catch (err) {
                setError('Failed to fetch your articles.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyArticles();
    }, [page, size, refresh]);



    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };



    const handleClickDelete = (id) => {
        setSelectedArticleId(id); // Set the article ID to delete
        onOpen(); // Open the confirmation modal
    };



    const handleConfirmDelete = async () => {
        try {
            await deleteOne(selectedArticleId); // Delete the article
            setRefresh(!refresh); // Refresh the list
        } catch (error) {
            console.error('Error deleting article:', error);
        } finally {
            onClose(); // Close the modal
        }
    };



    const handleCancelDelete = () => {
        setSelectedArticleId(null); // Clear the selected article ID
        onClose(); // Close the modal
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
                내가 쓴 글
            </MypageTitleComponent>

            <h3 className="text-xl my-5 ml-4">
                총 글 개수: {totalCount}
            </h3>

            <Stack spacing={6}>
                {articles.map(article => (
                    <Box 
                        key={article.id} 
                        p={6} 
                        shadow="lg" 
                        borderWidth="1px" 
                        borderRadius="md" 
                        bg="white"
                    >
                    <Flex justifyContent="space-between">
                        <div className='cursor-pointer' onClick={() => navigate(`/article/read/${article.id}`)}>
                            <Flex>
                                <Heading fontSize="xl" mb={2}>
                                    글제목: {article.articleTitle}
                                </Heading> 
                            </Flex>

                                <Text fontSize="sm" color="gray.600" mb={2}>
                                    글번호: {article.id}
                                </Text>

                                {/*내용*/}
                                <Text 
                                    mb={4} 
                                    style={{ whiteSpace: 'pre-wrap' }} 
                                    dangerouslySetInnerHTML={{ __html: formatContent(article.articleContent) }}
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
                                    <Text>조회수: {article.viewCount}</Text>
                                </Flex>
                            </div>

                            <div className='flex flex-col justify-between'>
                                <CloseButton className='ml-auto' onClick={() => handleClickDelete(article.id)} />
                                <Text fontSize="sm" color="gray.500">작성일: {formatDateTime(article.articleCreated)}</Text>
                            </div>
                        </Flex>
                        </Box>
                    ))}
                </Stack>


                
            {/* Pagination Controls */}
            <Flex justifyContent="center" alignItems="center" mt={6} fontSize="lg">
                <IconButton
                    aria-label="Previous Page"
                    icon={<ChevronLeftIcon />}
                    isDisabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    mr={3}
                    _hover={{ bg: 'teal.50', color: 'teal.600' }}
                    _disabled={{ bg: 'gray.200', color: 'gray.500', cursor: 'not-allowed' }}
                />

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => (
                    <Button
                        key={index + 1}
                        mx={1}
                        size="sm"
                        variant={currentPage === index + 1 ? 'solid' : 'outline'}
                        colorScheme={currentPage === index + 1 ? 'teal' : 'gray'}
                        onClick={() => handlePageChange(index + 1)}
                        _hover={{ bg: 'teal.50', color: 'teal.600' }}
                    >
                        {index + 1}
                    </Button>
                ))}

                <IconButton
                    aria-label="Next Page"
                    icon={<ChevronRightIcon />}
                    isDisabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    ml={3}
                    _hover={{ bg: 'teal.50', color: 'teal.600' }}
                    _disabled={{ bg: 'gray.200', color: 'gray.500', cursor: 'not-allowed' }}
                />
            </Flex>

            {/* Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={handleCancelDelete}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Delete</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>정말로 이 글을 삭제하시겠습니까?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
                            네
                        </Button>
                        <Button variant="ghost" onClick={handleCancelDelete}>
                            아니요
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    );
};

export default MypageArticleListComponent;