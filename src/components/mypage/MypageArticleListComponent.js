import { Box, Heading, Text, Button, Stack, Spinner, Alert, AlertIcon, IconButton, Flex, CloseButton, } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { deleteOne, getMyArticles } from '../../api/articleApi';

const MypageArticleListComponent = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10); // Number of posts per page
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getMyArticles({ page, size });
                setArticles(response.dtoList);
                setTotalPages(response.totalPage); // Set the total number of pages
                setCurrentPage(response.current); // Set the current page number
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
        deleteOne(id);
        setRefresh(!refresh);
    }

    if (loading) return <Spinner size="xl" />;
    if (error) return (
        <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
        </Alert>
    );

    return (
        <Box p={4} maxW="1200px" mx="auto">
            <Heading as="h3" size="lg" mb={6} >
                내가 쓴 글
            </Heading>
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
                            <Text mb={4}>{article.articleContent}</Text>
                            <Flex justify="space-between" align="center" fontSize="sm" color="gray.500">
                                <Text>조회수: {article.viewCount}</Text>
                            </Flex>
                        </div>
                        <div className='flex flex-col justify-between'>
                            <CloseButton className='ml-auto' onClick={() => {handleClickDelete(article.id)}}/>
                            <Text>작성일: {new Date(article.articleCreated).toLocaleDateString()}</Text>
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
        </Box>
    );
};

export default MypageArticleListComponent;