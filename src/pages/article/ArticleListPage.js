import { Select, FormControl, Input, Flex, IconButton, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Box, Button, HStack, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { getList } from '../../api/articleApi'; // getList 함수를 import 합니다.
import useCustomMove from '../../hooks/useCustomMove';
import { useNavigate } from 'react-router-dom';

// 페이지네이션 컴포넌트
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

// 게시글 목록 페이지 컴포넌트
const ArticleListPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0); // 초기 상태값을 0으로 설정
    const [error, setError] = useState(null);
    const { page, size, moveToList, moveToRead } = useCustomMove();
    const articlesPerPage = size; // useCustomMove에서 가져온 size 사용

    useEffect(() => {
        const loadArticles = async () => {
            setLoading(true);
            try {
                const data = await getList({ page, size: articlesPerPage });
                console.log('API Response:', data);
                setArticles(data.articles);
                setTotalPages(data.totalPages); // 서버에서 반환된 총 페이지 수
            } catch (err) {
                setError('글을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        loadArticles();
    }, [page, articlesPerPage]);

    const handlePageChange = (newPage) => {
        moveToList({ page: newPage, size: articlesPerPage });
    };

    const navigate = useNavigate();

    const bgColor = useColorModeValue('gray.50', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <>
            <Flex justify="center" p={4} bg="white" borderBottom="1px" borderColor={borderColor} boxShadow="sm" marginTop="100px">
                <FormControl>
                    <Flex alignItems="center" justifyContent="center">
                        <Select placeholder='제목' w="150px" mr={2}>
                            <option>내용</option>
                            <option>등록자명</option>
                        </Select>
                        <Input placeholder='검색어를 입력하세요' w="70%" mr={2} />
                        <IconButton
                            colorScheme='teal'
                            aria-label='Search database'
                            icon={<SearchIcon />}
                        />
                    </Flex>
                </FormControl>
            </Flex>

            <Box p={4} bg={bgColor} borderWidth={1} borderRadius="md" boxShadow="md" className='w-11/12 m-auto' marginTop="20px">
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
                                {articles.map(article => (
                                    <Tr key={article.id} _hover={{ bg: 'gray.100' }} onClick={() => moveToRead(article.id)}>
                                        <Td textAlign="center">{article.id}</Td>
                                        <Td textAlign="center">{article.articleTitle}</Td>
                                        <Td textAlign="center">{article.articleAuthor}</Td>
                                        <Td textAlign="center">{new Date(article.articleCreated).toLocaleDateString()}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}

                <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={handlePageChange}
                />

                <Flex justifyContent="flex-end">
                    <Button mt={4} colorScheme='teal' onClick={() => navigate("../create")}>
                        글쓰기
                    </Button>
                </Flex>
            </Box>
        </>
    );
}

export default ArticleListPage;