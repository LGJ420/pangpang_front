import { Select, Input, IconButton, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import useCustomToken from '../../hooks/useCustomToken';
import { useEffect, useState } from 'react';
import { getNoticeList } from '../../api/noticeApi';
import useCustomMove from '../../hooks/useCustomMove';



const initState = {

    dtoList: [
        {
            id: 0,
            noticeTitle: "",
            noticeContent: "",
            noticeHit: 0,
            noticeCreated: "",
            noticeUpdated: null,
            memberId: 0,
            memberNickname: ""
        }
    ],
    pageNumList: [],
    pageRequestDTO: {
        page: 0,
        size: 0,
        search: null,
        searchBy: null
    },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const NoticeListComponent = () => {

    const {search, page, size, refresh, moveToRead, moveToList} = useCustomMove();

    const [loading, setLoading] = useState(true);
    const { isLogin } = useCustomToken();
    const [serverData, setServerData] = useState(initState);


    useEffect(()=>{

        getNoticeList({page, size})
            .then(data=>{setServerData(data); console.log(data)})
            .catch(e=>console.log(e))
            .finally(()=>setLoading(false));

    },[search, page, size, refresh]);





    return (

        <section className='pt-10 pl-10 pb-10 pr-3 mb-5'>
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

            <div className='h-[50rem]'>
                <div className='w-[80rem] h-[4rem] text-xl m-auto grid grid-cols-12'>
                    {/* 헤더 행 */}
                    <div className='flex items-center justify-center col-span-1 bg-[rgb(240,248,255)] font-bold'>
                        글번호
                    </div>
                    <div className='flex items-center justify-center col-span-6 bg-[rgb(240,248,255)] font-bold'>
                        제목
                    </div>
                    <div className='flex items-center justify-center col-span-2 bg-[rgb(240,248,255)] font-bold'>
                        작성자
                    </div>
                    <div className='flex items-center justify-center col-span-2 bg-[rgb(240,248,255)] font-bold'>
                        등록일
                    </div>
                    <div className='flex items-center justify-center col-span-1 bg-[rgb(240,248,255)] font-bold'>
                        조회수
                    </div>
                </div>
                    {/* 데이터 행 */}
                    {serverData.dtoList.map((dto) => (
                    <div className='w-[80rem] h-[4rem] text-xl m-auto grid grid-cols-12'>
                        <div className='flex items-center justify-center col-span-1'>
                            {dto.id}
                        </div>
                        <div className='flex items-center justify-center col-span-6 cursor-pointer hover:underline hover:text-blue-500'>
                            {dto.noticeTitle}
                        </div>
                        <div className='flex items-center justify-center col-span-2'>
                            {dto.memberNickname}
                        </div>
                        <div className='flex items-center justify-center col-span-2'>
                            {dto.noticeCreated.substring(0,10)}
                        </div>
                        <div className='flex items-center justify-center col-span-1'>
                            {dto.noticeHit}
                        </div>
                    </div>
                ))}
            </div>


                

                


            {/* 페이지네이션 */}
            <div className='flex justify-center items-center relative mt-16'>
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




        </section>
        

    );
}

export default NoticeListComponent;