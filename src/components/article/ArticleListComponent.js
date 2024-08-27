import { Select, Input, IconButton, Button, Spinner, Flex, Box, Badge } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { getList } from '../../api/articleApi';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import useCustomToken from "../../hooks/useCustomToken";
import { formatDateTime } from "../../util/dateUtil";



const initState  = {
    articleList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 1,
    loading: true,
    error: null
}



// Reducer function for useReducer
const serverDataReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_SUCCESS":
        return {
          ...state,
          ...action.payload,
          loading: false,
          error: null,
        };
      case "FETCH_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case "SET_LOADING":
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  };



const ArticleListComponent = () => { 
    const navigate = useNavigate();
    const location = useLocation();

     // Using useReducer for server data state management
    const [serverData, dispatch] = useReducer(serverDataReducer, initState);
    const [searchValue, setSearchValue] = useState('');
    const [searchBy, setSearchBy] = useState('title');

    // Memoized fetchData object using useMemo
    const fetchData = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page")) || 1;
    const search = queryParams.get("search") || "";
    const searchBy = queryParams.get("searchBy") || "title";
    return { page, search, searchBy };
  }, [location.search]);

    const { isLogin } = useCustomToken();



    useEffect(() => {
        const fetchArticles = async () => {
          dispatch({ type: "SET_LOADING" });
          try {
            const data = await getList(fetchData);
            dispatch({
              type: "FETCH_SUCCESS",
              payload: {
                articleList: data.dtoList,
                pageNumList: data.pageNumList,
                pageRequestDTO: data.pageRequestDTO,
                prev: data.prev,
                next: data.next,
                totalCount: data.totalCount,
                prevPage: data.prevPage,
                nextPage: data.nextPage,
                totalPage: data.totalPage,
                current: data.current,
              },
            });
          } catch (err) {
            dispatch({ type: "FETCH_ERROR", payload: "글을 불러오는데 실패했습니다." });
          }
        };
    
        fetchArticles();
      }, [fetchData]);



    // Memoized handleSearch function using useCallback
    const handleSearch = useCallback(() => {
        navigate({
            search: `?search=${encodeURIComponent(searchValue)}&page=1&searchBy=${searchBy}`,
        });
    }, [navigate, searchValue, searchBy]);



    const handleKeyEnter = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };



    // Memoized handlePageChange function using useCallback
    const handlePageChange = useCallback(
        (page) => {
        navigate({
            search: `?search=${encodeURIComponent(fetchData.search)}&page=${page}&searchBy=${fetchData.searchBy}`,
        });
        },
        [navigate, fetchData.search, fetchData.searchBy]
    );



    const isArticleNew = useCallback((dateTime) => {
        const articleDate = new Date(dateTime);
        const now = new Date();
        const nextDayMidnight = new Date(articleDate);
        nextDayMidnight.setDate(articleDate.getDate() + 1);
        nextDayMidnight.setHours(0, 0, 0, 0);
        return now < nextDayMidnight;
      }, []);



    return (
        <section>
            {
                serverData.loading ?
                    <div className="h-[45rem] flex items-center justify-center">
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </div>
                    :
                    serverData.articleList.length > 0 ?
                        <>
                            <div className='flex justify-center text-xl mt-10 mb-5'>
                                <Select
                                    placeholder='검색기준'
                                    w="10rem" mr={2} fontSize="xl"
                                    value={searchBy}
                                    onChange={(e) => setSearchBy(e.target.value)}
                                >
                                    <option value="title">제목</option>
                                    <option value="author">작성자명</option>
                                </Select>

                                <Input
                                    placeholder='검색어를 입력하세요'
                                    w="70%" mr={2} fontSize="xl"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onKeyDown={handleKeyEnter}
                                />

                                <IconButton
                                    className='bg-[rgb(49,49,49)]'
                                    aria-label='Search database'
                                    icon={<SearchIcon className='text-white text-2xl' />}
                                    onClick={handleSearch}
                                />
                            </div>

                            <div className='h-[50rem]'>
                                <div className='w-[80rem] h-[4rem] text-xl m-auto grid grid-cols-12'>
                                    {/* 헤더 행 */}
                                    <div className='flex items-center justify-center col-span-1 bg-gray-100 font-bold'>
                                        글번호
                                    </div>
                                    <div className='flex items-center justify-center col-span-6 bg-gray-100 font-bold'>
                                        제목
                                    </div>
                                    <div className='flex items-center justify-center col-span-2 bg-gray-100 font-bold'>
                                        작성자
                                    </div>
                                    <div className='flex items-center justify-center col-span-2 bg-gray-100 font-bold'>
                                        등록일
                                    </div>
                                    <div className='flex items-center justify-center col-span-1 bg-gray-100 font-bold'>
                                        조회수
                                    </div>
                                </div>



                                {/* 데이터 행 */}
                                {serverData.articleList.map((article) => (
                                    <div key={article.id} className='w-[80rem] h-[4rem] text-xl m-auto grid grid-cols-12 border-b'>
                                        <div className='flex items-center justify-center col-span-1'>
                                            {article.id}
                                        </div>
                                        <div
                                            className='flex items-center justify-center col-span-6 cursor-pointer hover:underline hover:text-blue-500 truncate'
                                            onClick={() => navigate(`/article/read/${article.id}`)}
                                        >
                                            {isArticleNew(article.articleCreated) && (
                                                <Badge ml={2} colorScheme="red">new</Badge>
                                            )}
                                            {article.articleTitle}
                                            {article.commentCount > 0 && (
                                                <span>&#91;{article.commentCount}&#93;</span>
                                            )}
                                        </div>
                                        <div className='flex items-center justify-center col-span-2'>
                                            {article.memberNickname}
                                        </div>
                                        <div className='flex items-center justify-center col-span-2'>
                                            {formatDateTime(article.articleCreated)}
                                        </div>
                                        <div className='flex items-center justify-center col-span-1'>
                                            {article.viewCount || 0}회
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='relative mt-10'>
                                <Flex 
                                    justifyContent="center" 
                                    alignItems="center" 
                                    fontSize="25px" 
                                    className="relative py-10 text-gray-700"
                                >

                                    {/* 이전 페이지 */}
                                    {serverData.prev && (
                                        <Box 
                                            cursor={"pointer"} 
                                            marginRight={7} 
                                            onClick={() => handlePageChange(serverData.prevPage)}
                                        >
                                            {'\u003c'}
                                        </Box>
                                    )}

                                    {/* 페이지 넘버 */}
                                    {serverData.pageNumList.map(pageNum => (
                                        <Box 
                                            key={pageNum}
                                            marginRight={7} 
                                            cursor={"pointer"}
                                            className={
                                                serverData.current === pageNum 
                                                ? 'text-[rgb(224,26,109)] border-b' 
                                                : ''
                                            }
                                            onClick={() => handlePageChange(pageNum)}
                                        >
                                            {pageNum}
                                        </Box>
                                    ))}

                                    {/* 다음 페이지 */}
                                    {serverData.next && (
                                        <Box 
                                            cursor={"pointer"} 
                                            onClick={() => handlePageChange(serverData.nextPage)}
                                        >
                                            {'\u003e'}
                                        </Box>
                                    )}

                                    {isLogin && (
                                        <Button
                                            className='absolute right-0 text-2xl text-white h-14 w-32 bg-[rgb(77,160,124)] hover:opacity-80'
                                            onClick={() => navigate("/article/create")}
                                        >
                                            글쓰기
                                        </Button>
                                    )}
                                </Flex>
                            </div>
                        </>
                        :
                        <div className="relative flex flex-col items-center justify-center text-2xl font-semibold h-[60rem]">
                            <div className='pb-20'>
                                {/* <img src="/images/no_notice.png" className="w-60" /> */}
                                <div className="mt-10">현재 게시글이 없습니다</div>
                            </div>
                            {isLogin && (
                                <Button
                                    className='absolute bottom-0 right-0 text-2xl text-white h-14 w-32 bg-[rgb(77,160,124)] hover:opacity-80'
                                    onClick={() => navigate("/article/create")}
                                >
                                    글쓰기
                                </Button>
                            )}
                        </div>
            }
        </section>
    );
}

export default ArticleListComponent;