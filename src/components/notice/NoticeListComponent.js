import { Select, Input, IconButton, Button, Spinner, Flex, Box } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import useCustomToken from '../../hooks/useCustomToken';
import { useEffect, useState } from 'react';
import { getNoticeList } from '../../api/noticeApi';
import useCustomMove from '../../hooks/useCustomMove';
import { useNavigate } from 'react-router-dom';



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

    const [isLoading, setIsLoading] = useState(true);
    const { decodeToken } = useCustomToken();
    const [serverData, setServerData] = useState();



    const navigate = useNavigate();

    useEffect(()=>{

        getNoticeList({page, size})
            .then(data=>{setServerData(data)})
            .catch(e=>console.log(e))
            .finally(()=>setIsLoading(false));

    },[search, page, size, refresh]);



    const handleClickTitle = (id) => {

        moveToRead(id);
    }


    const handleClickAdd = () => {

        navigate('../add');
    }




    return (

        <section>
            {
                isLoading ? 

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

                    serverData !== undefined ?

                    <>
                    {console.log(serverData)}
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
                                className='bg-[rgb(49,49,49)]'
                                aria-label='Search database'
                                icon={<SearchIcon className='text-white text-2xl'/>}/>
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
                                {serverData.dtoList.map((dto) => (
                                <div className='w-[80rem] h-[4rem] text-xl m-auto grid grid-cols-12 border-b'>
                                    <div className='flex items-center justify-center col-span-1'>
                                        {dto.id}
                                    </div>
                                    <div className='flex items-center justify-center col-span-6 cursor-pointer hover:underline hover:text-blue-500 truncate'
                                        onClick={()=>handleClickTitle(dto.id)}>
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

                            <div className='relative mt-10'>
                                <Flex justifyContent="center" alignItems="center" fontSize="25px" className="relative py-10 text-gray-700">
                                    {/* 이전 페이지 */}
                                    {serverData.current > 1 ? <Box cursor={"pointer"} marginRight={7} onClick={() => moveToList({ page: serverData.prevPage })}>{'\u003c'}</Box> :
                                    <></>}

                                    {/* 페이지 넘버 */}
                                    {serverData.pageNumList.map(pageNum => serverData.dtoList.length > 0 ?
                                    (<Box key={pageNum}
                                        marginRight={7} cursor={"pointer"}
                                        className={serverData.current === pageNum ? 'text-[rgb(224,26,109)] border-b' : ''}
                                        onClick={() => moveToList({ page: pageNum })}>{pageNum}</Box>) : <></>)}

                                    {/* 다음 페이지 */}
                                    {serverData.next ? <Box cursor={"pointer"} onClick={() => moveToList({ page: serverData.nextPage })}>{'\u003e'}</Box> : <></>}

                                    {
                                    decodeToken.memberRole === 'Admin' &&
                                    <button className='absolute right-0 text-2xl text-white h-14 w-32 bg-[rgb(77,160,124)] hover:opacity-80'
                                    onClick={handleClickAdd}>
                                        글쓰기
                                    </button>
                                    }
                                </Flex>

                        </div>

                    </>

                    :

                    <div className="relative flex flex-col items-center justify-center text-2xl font-semibold h-[60rem]">
                        <div className='pb-20'>
                            <img src="/images/no_notice.png" className="w-60" />
                            <div className="mt-10">현재 공지사항이 없습니다</div>
                        </div>
                        {
                        decodeToken.memberRole === 'Admin' &&
                        <button className='absolute bottom-0 right-0 text-2xl text-white h-14 w-32 bg-[rgb(77,160,124)] hover:opacity-80'
                            onClick={handleClickAdd}>
                            글쓰기
                        </button>
                        }
                    </div>
            }


        </section>
        

    );
}

export default NoticeListComponent;