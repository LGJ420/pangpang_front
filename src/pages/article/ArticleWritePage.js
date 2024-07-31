import React, { useState } from 'react';
import { Box, Button, FormControl, Input, Textarea, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ArticleWritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 여기에 API 요청을 추가하여 데이터를 서버에 전송합니다.

    // 예를 들어, console.log로 제목과 내용을 출력
    console.log('제목:', title);
    console.log('내용:', content);

    // 글쓰기 후 리스트 페이지로 이동
    navigate('/article/list');
  };

  return (
    <Box p={4} maxW="md" borderWidth={1} borderRadius="md" boxShadow="md" m="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>글쓰기</Text>
      <FormControl mb={4}>
        <Input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl mb={4}>
        <Textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSubmit}>
        작성하기
      </Button>
    </Box>
  );
};

export default ArticleWritePage;