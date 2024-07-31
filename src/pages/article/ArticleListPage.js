import { SearchIcon } from '@chakra-ui/icons';
import {
    Select,
    FormControl,
    Input,
    Flex,
    IconButton,
    Table,
    Thead,
    Tbody,
    //  Tfoot,
    Tr,
    Th,
    Td,
    //  TableCaption,
    TableContainer,
    Text,
    //  useBreakpoint,
    Box,
    Button,
    HStack,
} from '@chakra-ui/react';

import React,{useState} from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    return (
      <HStack spacing={4} justify="center" mt={4}>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </Button>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            onClick={() => onPageChange(index + 1)}
            colorScheme={index + 1 === currentPage ? 'teal' : 'gray'}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </Button>
      </HStack>
    );
  };

  const ArticleListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 2;
    const articles = [
        { id: 1, title: '오버워치', author: '구인모', date: '2024.07.29', views: 5 },
        { id: 2, title: '리그 오브 레전드', author: '이기정', date: '2024.07.28', views: 3 },
        { id: 3, title: '사이퍼즈', author: '노성빈', date: '2024.07.16', views: 23 },
        { id: 4, title: '마마마', author: '조민지', date: '2024.05.25', views: 14 },
        // 더 많은 데이터를 추가할 수 있습니다.
    ];

    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * articlesPerPage;
    const selectedArticles = articles.slice(startIndex, startIndex + articlesPerPage);

    return (
        <>
            <Box p={4}>
                <Text fontSize="4xl" fontWeight="bold" lineHeight="short" textAlign="center">
                    자유게시판
                </Text>

                <Text fontSize="xl" fontWeight="medium" textAlign="center">
                    자유롭게 의견을 나누는 공간입니다!<br /> 
                    궁금한 점이나 자유로운 의견을 나눠보세요.
                </Text>
            </Box>

            <Flex display="flex" alignItems="center" justifyContent="center" p={4}>
                <FormControl >
                    <Flex alignItems="center" justifyContent="center" gap={1}>
                        <Select placeholder='제목' w={{ base: '120px', md: '150px' }}>
                            <option>내용</option>
                            <option>등록자명</option>
                        </Select>
                        <Input placeholder='검색어를 입력하세요' width='auto' />
                        <IconButton colorScheme='blue' aria-label='Search database'
                            icon={<SearchIcon />} />
                    </Flex>
                </FormControl>
            </Flex>

            <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" className='w-11/12 m-auto' >
                <TableContainer>
                    <Table variant='simple' colorScheme='blue'>
                        <Thead>
                            <Tr>
                                <Th textAlign="center" fontSize="large">글번호</Th>
                                <Th textAlign="center" className='w-7/12' fontSize="large">제목</Th>
                                <Th textAlign="center" fontSize="large">등록자명</Th>
                                <Th textAlign="center" fontSize="large">등록일</Th>
                                <Th textAlign="center" fontSize="large">조회수</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {selectedArticles.map(article => (
                                <Tr key={article.id}>
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

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />

                <Flex justifyContent="flex-end">
                    <Button mt={4} p={4} colorScheme='twitter' variant="outline">
                        글쓰기
                    </Button>
                </Flex>
            </Box>
        </>
    );
}


export default ArticleListPage;
