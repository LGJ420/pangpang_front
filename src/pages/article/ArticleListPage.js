import {Select,FormControl,Input,Flex,
    IconButton,Table,Thead,Tbody,Tr,Th,Td,
    TableContainer,Text,Box,Button,HStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getList } from '../../api/articleApi';

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
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const articlesPerPage = 2;
    
    useEffect(() => {
        const loadArticles = async () => {
            try {
                const data = await getList();
                setArticles(data);
            }catch(err){
                setError('글을 불러오는데 실패했습니다.')
            }finally{
                setLoading(false);
            }
        };
        loadArticles();
    }, []);

    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * articlesPerPage;
    const selectedArticles = articles.slice(startIndex, startIndex + articlesPerPage);

    const navigate = useNavigate();

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
                    <Button mt={4} p={4} colorScheme='twitter' variant="outline" onClick={() => navigate('../write')}>
                        글쓰기
                    </Button>
                </Flex>
            </Box>
        </>
    );
}


export default ArticleListPage;
