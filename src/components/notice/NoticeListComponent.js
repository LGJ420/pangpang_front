import { Select, FormControl, Input, Flex, IconButton, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Box, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import useCustomToken from '../../hooks/useCustomToken';
import { useState } from 'react';

const initState = {
    dtoList: [],    // 상품 데이터 리스트
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

        <div className='py-7'>
            <Flex justify="center" p={4} bg="white">
                <FormControl>
                    <Flex alignItems="center" justifyContent="center">
                        <Select 
                            placeholder='검색기준' 
                            w="150px" mr={2} 
                            value=""
                        >
                            <option value="">제목</option>
                            <option value="">작성자명</option>
                        </Select>

                        <Input 
                            placeholder='검색어를 입력하세요' 
                            w="70%" mr={2} 
                            value=""
                        />

                        <IconButton
                            colorScheme='teal'
                            aria-label='Search database'
                            icon={<SearchIcon />}
                        />
                    </Flex>
                </FormControl>
            </Flex>

            <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" className='w-11/12 m-auto' marginTop="20px">
                {loading ? (
                    <Text textAlign="center">Loading...</Text>
                )

                :
                
                (
                    <TableContainer>
                        <Table variant='simple' colorScheme='blue'>
                            <Thead>
                                <Tr>
                                    <Th textAlign="center">글번호</Th>
                                    <Th textAlign="center">제목</Th>
                                    <Th textAlign="center">작성자</Th> {/* 작성자 열 추가 */}
                                    <Th textAlign="center">등록일</Th>
                                    <Th textAlign="center">조회수</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {(serverData.noticeList || []).map((notice) => (
                                    <Tr key={notice.id} _hover={{ bg: 'gray.100' }} >
                                        <Td textAlign="center">{notice.id}</Td>
                                        <Td textAlign="center" cursor='pointer' textColor="blue"
                                            _hover={{
                                                textDecoration: 'underline',
                                                transform: 'scale(1.05)',
                                                transition: 'transform 0.2s ease, text-decoration 0.2s ease'
                                            }}
                                        >
                                            {notice.noticeTitle}
                                        </Td>
                                        <Td textAlign="center">{notice.memberNickname}</Td> {/* 작성자 데이터 추가 */}
                                        <Td textAlign="center">날짜넣어야함</Td>
                                        <Td textAlign="center">{notice.viewCount || 0}회</Td> 
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
                </Flex>

                {isLogin ? 
                    <Flex justifyContent="flex-end">
                        <Button colorScheme='teal'>
                            글쓰기
                        </Button> 
                    </Flex> 
                    : 
                    <></>
                }
                </Box>
        </div>

    );
}

export default NoticeListComponent;