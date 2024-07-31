import { Box, Button, Flex, Heading, HStack, IconButton, Input, Select, Text, VStack, useColorMode, useColorModeValue, Switch } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getList } from '../../api/articleApi';

const Pagination = ({ totalPages, currentPage, onPageChange }) => (
  <HStack spacing={2} justify="center" mt={6}>
    <Button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      variant="outline"
      colorScheme="teal"
      size="sm"
    >
      이전
    </Button>
    {[...Array(totalPages)].map((_, index) => (
      <Button
        key={index}
        onClick={() => onPageChange(index + 1)}
        variant={index + 1 === currentPage ? "solid" : "outline"}
        colorScheme="teal"
        size="sm"
      >
        {index + 1}
      </Button>
    ))}
    <Button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      variant="outline"
      colorScheme="teal"
      size="sm"
    >
      다음
    </Button>
  </HStack>
);

const ArticleCard = ({ article }) => {
  const cardBg = useColorModeValue('white', 'gray.800'); // 라이트 모드에서는 흰색, 다크 모드에서는 회색
  const cardBorder = useColorModeValue('gray.200', 'gray.700'); // 라이트 모드에서는 밝은 회색, 다크 모드에서는 짙은 회색

  return (
    <Box
      bg={cardBg}
      p={4}
      borderWidth={1}
      borderRadius="lg"
      borderColor={cardBorder}
      boxShadow="sm"
      w="full"
    >
      <Heading size="md" mb={2}>{article.title}</Heading>
      <Text fontSize="sm" color="gray.500">
        {article.author} - {article.date}
      </Text>
      <Text mt={2} noOfLines={2}>{article.content}</Text>
      <Text mt={2} fontSize="sm" color="gray.600">조회수: {article.views}</Text>
    </Box>
  );
};

const ArticleListPage = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // 현재 모드와 토글 함수 가져오기
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const articlesPerPage = 5;

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getList();
        setArticles(data);
      } catch (err) {
        setError('글을 불러오는데 실패했습니다.');
      } finally {
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
    <VStack spacing={8} p={8} bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Flex
        w="full"
        justify="center"
        align="center"
        mb={6}
        position="relative"
      >
        <Box textAlign="center" flex="1">
          <Heading color="teal.500" mb={2}>자유게시판</Heading>
          <Text color="gray.600">자유롭게 의견을 나누는 공간입니다!</Text>
        </Box>
        <Box position="absolute" right={4}>
          <Switch
            isChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
            size="lg"
            colorScheme="teal"
            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          />
        </Box>
      </Flex>

      <Flex justify="center" w="full">
        <Box as="form" display="flex" gap={4} w="full" maxW="800px">
          <Select placeholder='제목' flex="1" size="sm">
            <option>내용</option>
            <option>등록자명</option>
          </Select>
          <Input placeholder='검색어를 입력하세요' flex="2" size="sm" />
          <IconButton
            colorScheme='teal'
            aria-label='Search database'
            icon={<SearchIcon />}
            size="sm"
            type="submit"
          />
        </Box>
      </Flex>

      <VStack spacing={4} w="full" maxW="800px" align="center">
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          selectedArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))
        )}
      </VStack>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <Button colorScheme='teal' size="sm" onClick={() => navigate('../write')}>
        글쓰기
      </Button>
    </VStack>
  );
}

export default ArticleListPage;