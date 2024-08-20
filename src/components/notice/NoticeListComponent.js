import { Select, Input, IconButton, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import useCustomToken from '../../hooks/useCustomToken';
import { useState } from 'react';

const data = [
    { id: 1, title: '첫 번째 글', author: '홍길동', date: '2023-08-20', views: 150 },
    { id: 2, title: '두 번째 글', author: '김철수', date: '2023-08-21', views: 85 },
    { id: 2, title: '두 번째 글', author: '김철수', date: '2023-08-21', views: 85 },
    { id: 2, title: '두 번째 글', author: '김철수', date: '2023-08-21', views: 85 },
    { id: 2, title: '두 번째 글', author: '김철수', date: '2023-08-21', views: 85 },
    { id: 2, title: '두 번째 글', author: '김철수', date: '2023-08-21', views: 85 },
    { id: 2, title: '두 번째 글', author: '김철수', date: '2023-08-21', views: 85 },
    { id: 2, title: '두 번째 글', author: '김철수', date: '2023-08-21', views: 85 },
    { id: 2, title: '두 번째 글', author: '김철수', date: '2023-08-21', views: 85 },
    { id: 2, title: '두 번째 글', author: '김철수', date: '2023-08-21', views: 85 },

  ];


const initState = {
    dtoList: [],    // 공지사항 리스트
    pageNumList: [],    // 페이지 번호 리스트
    pageRequestDTO: null,   // 현재 페이지 요청 정보
    prev: false,            // 이전 페이지 존재 여부
    next: false,            // 다음 페이지 존재 여부
    totalCount: 0,          // 전체 데이터 총 개수
    prevPage: 0,            // 이전 페이지 번호, 존재하지 않으면 0 또는 null
    nextPage: 0,            // 다음 페이지 번호, 존재하지 않으면 0 또는 null
    totalPage: 0,           // 전체 페이지 수
    current: 0              // 현재 페이지 번호
  }

const NoticeListComponent = () => {

    const [loading, setLoading] = useState(true);
    const { isLogin } = useCustomToken();
    const [serverData, setServerData] = useState(initState);

    return (

        <div className='pt-10 pl-10 pb-10 pr-3 mb-5'>
            <h1 className="text-5xl mr-auto">공지사항</h1>
            <div className='flex justify-center text-xl mt-10 mb-5'>
                <Select 
                    placeholder='검색기준' 
                    w="10rem" mr={2} fontSize="xl"
                    value="">
                    <option value="">제목</option>
                    <option value="">작성자명</option>
                </Select>

                <Input 
                    placeholder='검색어를 입력하세요' 
                    w="70%" mr={2} fontSize="xl"
                    value=""/>

                <IconButton
                    colorScheme='teal'
                    aria-label='Search database'
                    icon={<SearchIcon />}/>
            </div>


            <div className='w-[80rem] h-[45rem] text-xl m-auto grid grid-cols-10 grid-rows-11'>
                {/* 헤더 행 */}
                <div className='flex items-center justify-center col-span-1 bg-[rgb(240,248,255)] font-bold'>글번호</div>
                <div className='flex items-center justify-center col-span-6 bg-[rgb(240,248,255)] font-bold'>제목</div>
                <div className='flex items-center justify-center col-span-1 bg-[rgb(240,248,255)] font-bold'>작성자</div>
                <div className='flex items-center justify-center col-span-1 bg-[rgb(240,248,255)] font-bold'>등록일</div>
                <div className='flex items-center justify-center col-span-1 bg-[rgb(240,248,255)] font-bold'>조회수</div>

                {/* 데이터 행 */}
                {data.map((item) => (
                <>
                <div className='flex items-center justify-center col-span-1'>{item.id}</div>
                <div className='flex items-center justify-center col-span-6'>{item.title}</div>
                <div className='flex items-center justify-center col-span-1'>{item.author}</div>
                <div className='flex items-center justify-center col-span-1'>{item.date}</div>
                <div className='flex items-center justify-center col-span-1'>{item.views}</div>
                </>
            ))}
            </div>


                

                


            {/* 페이지네이션 */}
            <div className='flex justify-center items-center relative mt-10'>
                    {/* 이전 페이지 */}
                    <IconButton
                        aria-label="Previous Page"
                        icon={<ChevronLeftIcon />}
                        isDisabled={!serverData.prev}
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
                        ml={3}
                        _hover={{ bg: 'teal.100', color: 'teal.700' }}
                        _disabled={{ bg: 'gray.200', cursor: 'not-allowed' }}
                    />

                    <button className='absolute right-0 text-xl text-white rounded h-14 w-32 bg-orange-500 hover:opacity-80'>
                        글쓰기
                    </button>

                </div>




            </div>
        

    );
}

export default NoticeListComponent;