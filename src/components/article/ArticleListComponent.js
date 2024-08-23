import { Select, FormControl, Input, Flex, IconButton, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Box, Button, useColorModeValue, Badge } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import { getList } from '../../api/articleApi';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import useCustomToken from "../../hooks/useCustomToken";

const ArticleListComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [serverData, setServerData] = useState({
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
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchBy, setSearchBy] = useState('title'); // 검색 기준 기본값
    const [fetchData, setFetchData] = useState({ page: 1, search: '', searchBy: 'title' }); // 검색 조건 저장
    const { isLogin } = useCustomToken();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = parseInt(queryParams.get('page')) || 1;
        const search = queryParams.get('search') || '';
        const searchBy = queryParams.get('searchBy') || 'title';

        setFetchData({ page, search, searchBy });

        const fetchArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getList({ page, search, searchBy });
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
                setError("글을 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [location.search]); // location.search가 변경될 때만 호출



    const handleSearch = () => {
        navigate({
            search: `?search=${encodeURIComponent(searchValue)}&page=1&searchBy=${searchBy}`
        });
    };



    const handleKeyEnter = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // Enter 키를 누르면 검색 실행
        }
    };



    const handlePageChange = (page) => {
        navigate({
            search: `?search=${encodeURIComponent(fetchData.search)}&page=${page}&searchBy=${fetchData.searchBy}`
        });
    };



    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`; // 초 단위 제거
    };



    // 게시글이 최근에 작성한 글인지 확인하는 함수
    const isArticleNew = (dateTime) => {
        const now = new Date();
        const articleDate = new Date(dateTime);

        // 현재 시간과 게시글 작성일 사이의 날짜 차이 계산
        const differenceInTime = now.getTime() - articleDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        // 게시글이 어제, 오늘 작성되었을 때 true를 반환 
        return differenceInDays < 1 || (differenceInDays >= 1 && differenceInDays < 2);
    };

    const bgColor = useColorModeValue('gray.50', 'gray.800');

    return (
        <div className='py-7'>
            <Flex justify="center" p={4} bg="white">
                <FormControl>
                    <Flex alignItems="center" justifyContent="center">
                        <Select 
                            placeholder='검색기준' 
                            w="150px" mr={2} 
                            value={searchBy} 
                            onChange={(e) => setSearchBy(e.target.value)}
                        >
                            <option value="title">제목</option>
                            <option value="author">작성자명</option>
                        </Select>

                        <Input 
                            placeholder='검색어를 입력하세요' 
                            w="70%" mr={2} 
                            value={searchValue} 
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleKeyEnter} // Enter 키 이벤트 핸들러 추가
                        />

                        <IconButton
                            colorScheme='teal'
                            aria-label='Search database'
                            icon={<SearchIcon />}
                            onClick={handleSearch} // 검색 버튼 클릭 시 검색 처리
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
                                    <Th textAlign="center">작성자</Th>
                                    <Th textAlign="center">등록일</Th>
                                    <Th textAlign="center">조회수</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {(serverData.articleList || []).map((article) => (
                                    <Tr key={article.id} _hover={{ bg: 'gray.100' }} >
                                        <Td textAlign="center">{article.id}</Td>
                                        <Td 
                                            textAlign="center" 
                                            cursor='pointer' 
                                            textColor="blue" 
                                            onClick={() => navigate(`/article/read/${article.id}`)}
                                            _hover={{
                                                textDecoration: 'underline',
                                                transform: 'scale(1.05)',
                                                transition: 'transform 0.2s ease, text-decoration 0.2s ease'
                                            }}
                                        >
                                            {isArticleNew(article.articleCreated) && (
                                                <Badge ml={2} colorScheme="red">new</Badge>  // 최신글일 경우 new 생성 
                                            )}
                                            {article.articleTitle}                                            
                                            {article.commentCount === 0 ? <></> : <>&#91; {article.commentCount} &#93;</>}   
                                        </Td>
                                        <Td textAlign="center">{article.memberNickname}</Td> {/* 작성자 데이터 추가 */}
                                        <Td textAlign="center">{article.articleCreated ? formatDateTime(article.articleCreated) : '날짜 형식이 맞지 않음'}</Td>
                                        <Td textAlign="center">{article.viewCount || 0}회</Td> 
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
                        onClick={() => handlePageChange(serverData.prevPage)}
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
                            onClick={() => handlePageChange(pageNum)}
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
                        onClick={() => handlePageChange(serverData.nextPage)}
                        ml={3}
                        _hover={{ bg: 'teal.100', color: 'teal.700' }}
                        _disabled={{ bg: 'gray.200', cursor: 'not-allowed' }}
                    />
                </Flex>

                {isLogin ? 
                    <Flex justifyContent="flex-end">
                        <Button colorScheme='teal' onClick={() => navigate("/article/create")}>
                            글쓰기
                        </Button> 
                    </Flex> 
                    : 
                    <></>
                }
            </Box>
        </div>
    );
};

export default ArticleListComponent;