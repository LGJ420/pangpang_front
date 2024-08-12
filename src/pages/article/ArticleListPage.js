import { Select, FormControl, Input, Flex, IconButton, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Box, Button, useColorModeValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';

import { getList } from '../../api/articleApi';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';

//페이지네이션 초기 상태
const initState = {
    articleList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 1
}

// 게시글 목록 페이지 컴포넌트
const ArticleListPage = () => {
    const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
    const [serverData, setServerData] = useState(initState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchBy, setSearchBy] = useState('title'); //검색 기준 기본값
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getList({ page, size, search: searchValue, searchBy });
                console.log('Fetched articles', data);
                setServerData({
                    articleList: data.dtoList,
                    pageNumList: data.pageNumList,
                    pageRequestDTO: data.pageRequestDTO,
                    prev: data.prev,
                    next: data.next,
                    totalCount: data.totalCount,
                    prevPage: data.prevPage,
                    nextPage: data.nextPage,
                    totalPage: data.totalPage,
                    current: data.current
                });
            } catch (err) {
                console.error("글을 불러오는데 실패했습니다.", err);
                setError("글을 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, [searchValue, searchBy, page, size, refresh]);

    const bgColor = useColorModeValue('gray.50', 'gray.800');

    return (
        <>
            <div className='my-7'>
                <Flex justify="center" p={4} bg="white">
                    <FormControl>
                        <Flex alignItems="center" justifyContent="center">
                            <Select 
                                placeholder='검색기준' 
                                w="150px" mr={2} 
                                value={searchBy} 
                                onChange={(e) => setSearchBy(e.target.value)}>
                                    <option value="title">제목</option>
                                    <option value="author">등록자명</option>
                                </Select>

                                <Input placeholder='검색어를 입력하세요' 
                                w="70%" mr={2} 
                                value={searchValue} 
                                onChange={(e) => setSearchValue(e.target.value)}
                                />

                                <IconButton
                                    colorScheme='teal'
                                    aria-label='Search database'
                                    icon={<SearchIcon />}
                                    onClick={() => moveToList({ page: 1, search: searchValue, searchBy })}
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
                                    {(serverData.articleList || []).map((article) => (
                                        <Tr key={article.id} _hover={{ bg: 'gray.100' }} >
                                            <Td textAlign="center">{article.id}</Td>
                                            <Td textAlign="center" cursor='pointer' textColor="blue" onClick={() =>
                                                moveToRead(article.id)}
                                                _hover={{
                                                    textDecoration: 'underline',
                                                    transform: 'scale(1.05)',
                                                    transition: 'transform 0.2s ease, text-decoration 0.2s ease'
                                                }}
                                            >
                                                {article.articleTitle}</Td>
                                            <Td textAlign="center">{article.articleAuthor}</Td>
                                            <Td textAlign="center">{article.articleCreated ? new Date(article.articleCreated).toLocaleDateString() : '날짜 형식이 맞지 않음'}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )}

                    {/* 페이지네이션 */}
                    <Flex justifyContent="center" alignItems="center" mt={5} fontSize="lg">
                        {/* 이전 페이지 */}
                        <IconButton
                            aria-label="Previous Page"
                            icon={<ChevronLeftIcon />}
                            isDisabled={!serverData.prev}
                            onClick={() => moveToList({ page: serverData.prevPage })}
                            mr={3}
                            _hover={{ bg: 'teal.100', color: 'teal.700' }}
                            _disabled={{ bg: 'gray.200', cursor: 'not-allowed' }}
                        />

                        {/* 페이지 넘버 */}
                        {serverData.pageNumList.map(pageNum => (
                            <Button
                                key={pageNum}
                                mx={1}
                                size="sm"
                                variant={serverData.current === pageNum ? 'solid' : 'outline'}
                                colorScheme={serverData.current === pageNum ? 'teal' : 'gray'}
                                onClick={() => moveToList({ page: pageNum })}
                                _hover={{ bg: 'teal.100', color: 'teal.700' }}
                            >
                                {pageNum}
                            </Button>
                        ))}

                        {/* 다음 페이지 */}
                        <IconButton
                            aria-label="Next Page"
                            icon={<ChevronRightIcon />}
                            isDisabled={!serverData.next}
                            onClick={() => moveToList({ page: serverData.nextPage })}
                            ml={3}
                            _hover={{ bg: 'teal.100', color: 'teal.700' }}
                            _disabled={{ bg: 'gray.200', cursor: 'not-allowed' }}
                        />
                    </Flex>

                    <Flex justifyContent="flex-end">
                        <Button colorScheme='teal' onClick={() => navigate("../create")}>
                            글쓰기
                        </Button>
                    </Flex>
                </Box>
            </div>
        </>
    );
}

export default ArticleListPage;