import { Select, FormControl, Input, Flex, IconButton, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Box, Button, HStack, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getList } from '../../api/articleApi';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <HStack spacing={4} justify="center" mt={4}>
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                colorScheme="teal"
            >
                이전
            </Button>
            {[...Array(totalPages)].map((_, index) => (
                <Button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    variant={index + 1 === currentPage ? "solid" : "outline"}
                    colorScheme="teal"
                >
                    {index + 1}
                </Button>
            ))}
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                colorScheme="teal"
            >
                다음
            </Button>
        </HStack>
    );
};

const ArticleListPage = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const articlesPerPage = 2;

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const data = await getList();
                setArticles(data);
            } catch (err) {
                setError('글을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        loadArticles();
    }, []);

    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * articlesPerPage;
    const selectedArticles = articles.slice(startIndex, startIndex + articlesPerPage);

    const navigate = useNavigate();
    const bgColor = useColorModeValue('gray.50', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <>
            <Box p={4} bg="white" borderBottom="1px" borderColor={borderColor} boxShadow="sm">
                <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="teal.500">
                    자유게시판
                </Text>
                <Text fontSize="md" textAlign="center" color="gray.600">
                    자유롭게 의견을 나누는 공간입니다!
                </Text>
            </Box>

            <Flex justify="center" p={4} bg="white" borderBottom="1px" borderColor={borderColor} boxShadow="sm">
                <FormControl>
                    <Flex alignItems="center" justifyContent="center">
                        <Select placeholder='제목' w="150px" mr={2}>
                            <option>내용</option>
                            <option>등록자명</option>
                        </Select>
                        <Input placeholder='검색어를 입력하세요' w="300px" mr={2} />
                        <IconButton
                            colorScheme='teal'
                            aria-label='Search database'
                            icon={<SearchIcon />}
                        />
                    </Flex>
                </FormControl>
            </Flex>

            <Box p={4} bg={bgColor} borderWidth={1} borderRadius="md" boxShadow="md" className='w-11/12 m-auto'>
                {loading ? (
                    <Text textAlign="center">Loading...</Text>
                ) : error ? (
                    <Text color="red.500" textAlign="center">{error}</Text>
                ) : (
                    <TableContainer>
                        <Table variant='simple' colorScheme='blue'>
                            <Thead>
                                <Tr>
                                    <Th textAlign="center">글번호</Th>
                                    <Th textAlign="center">제목</Th>
                                    <Th textAlign="center">등록자명</Th>
                                    <Th textAlign="center">등록일</Th>
                                    <Th textAlign="center">조회수</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {selectedArticles.map(article => (
                                    <Tr key={article.id} _hover={{ bg: 'gray.100' }}>
                                        <Td textAlign="center">{article.id}</Td>
                                        <Td textAlign="center">{article.title}</Td>
                                        <Td textAlign="center">{article.author}</Td>
                                        <Td textAlign="center">{article.date}</Td>
                                        <Td textAlign="center">{article.views}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />

                <Flex justifyContent="flex-end">
                    <Button mt={4} colorScheme='teal' onClick={() => navigate('../write')}>
                        글쓰기
                    </Button>
                </Flex>
            </Box>
        </>
    );
}

export default ArticleListPage;