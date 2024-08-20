import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, Input, Textarea, Text } from '@chakra-ui/react';
import useCustomMove from "../../hooks/useCustomMove"
import {postCreate} from "../../api/articleApi"
import useCustomToken from '../../hooks/useCustomToken';
import { useNavigate } from 'react-router-dom';

const initState ={
  articleTitle: '',
  articleContent: ''
}

const ArticleCreateComponent = () => {
  const [article, setArticle] = useState({...initState});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { isLogin } = useCustomToken();
  const {moveToList} = useCustomMove();


  useEffect(() => {
    if (!isLogin) {

      alert("잘못된 접근 방식입니다.");
      navigate(-1);
      return;
  }
  }, [])


  const handleChangeArticle = (e) => {
    article[e.target.name] = e.target.value;

    setArticle({...article});
  }

  const handleClickCreate = async () => {
    setLoading(true);
    try{
    const result = await postCreate(article);
    console.log(result);
    setArticle({...initState});
    alert('글이 성공적으로 작성되었습니다!');
    moveToList();
  }catch(e){
    alert('제목, 내용을 모두 작성하여 주십시오.')
    console.error(e);
  }finally{
    setLoading(false);
  }
};

if (!isLogin) {
  return null;
}

return (
  <Box 
    p={6} 
    maxW="lg" 
    borderWidth={1} 
    borderRadius="lg" 
    boxShadow="lg" 
    mx="auto" 
    bg="gray.50"
    mt={8}
  >
    <Text 
      fontSize="3xl" 
      fontWeight="bold" 
      mb={6} 
      textAlign="center" 
      color="teal.500"
    >
      새 글 작성
    </Text>
    <FormControl mb={4}>
      <Input
        name="articleTitle"
        placeholder="제목을 입력하세요"
        value={article.articleTitle}
        onChange={handleChangeArticle}
        variant="filled"
        bg="white"
        focusBorderColor="teal.400"
        borderRadius="md"
      />
    </FormControl>

    <FormControl mb={6}>
      <Textarea
        name="articleContent"
        placeholder="내용을 입력하세요"
        value={article.articleContent}
        onChange={handleChangeArticle}
        variant="filled"
        bg="white"
        focusBorderColor="teal.400"
        borderRadius="md"
        rows={8}
      />
    </FormControl>
    <Button 
      colorScheme="teal" 
      size="lg"
      width="full"
      onClick={handleClickCreate} 
      isLoading={loading} 
      loadingText="작성 중..."
      borderRadius="md"
      shadow="md"
    >
      작성하기
    </Button>
  </Box>
);
};

export default ArticleCreateComponent;