import { Select, FormControl, Input, Flex, IconButton, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Box, Button, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { getList } from '../../api/articleApi'; 
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';

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
    const {page, size, search, refresh, moveToList, moveToRead} = useCustomMove();

    const [serverData, setServerData] = useState(initState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async() => {
            setLoading(true);
            setError(null);
            try {
                const data =await getList({ page, size, search });
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
            }catch (err) {
                console.error("글을 불러오는데 실패했습니다.", err);
                setError("글을 불러오는데 실패했습니다.");
            }finally{
                setLoading(false);
            }
        };
        fetchArticles();
    },[search, page, size, refresh]);


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
                            onClick={() => moveToList({page: 1})}
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
                                {(serverData.articleList || []).map((article, index) => (
                                    <Tr key={index} _hover={{ bg: 'gray.100' }} onClick={() => moveToRead(article.id)}>
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

                {/* 페이지네이션*/}
                <Flex justifyContent="center" fontSize="25px" className='pb-20 text-gray-700'>
                    {/*이전 페이지*/}
                    {serverData.prev ? <Box cursor={"pointer"} marginRight={7} onClick={() => moveToList({ page: serverData.prevPage})}>{'\u003c'}</Box> :<></>}

                {/* 페이지 넘버 */}
                {serverData.pageNumList.map(pageNum => 
                (<Box key={pageNum}
                marginRight={7} 
                cursor={"pointer"}
                className={serverData.current === pageNum ? 'text-gray-500 border-b' : ''}
                onClick={() => moveToList({ page: pageNum })}>
                {pageNum}
                </Box>
                ))}

                {/* 다음 페이지 */}
                {serverData.next ? <Box cursor={"pointer"} onClick={() => moveToList({ page: serverData.nextPage })}>{'\u003e'}</Box> : <></>}
                </Flex>

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