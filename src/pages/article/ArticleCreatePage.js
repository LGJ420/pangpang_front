import React, { useState } from 'react';
import { Box, Button, FormControl, Input, Textarea, Text } from '@chakra-ui/react';
import useCustomMove from "../../hooks/useCustomMove"
import {postCreate} from "../../api/articleApi"

const initState ={
  articleTitle: '',
  articleContent: '',
  articleAuthor: ''
}

const ArticleCreatePage = () => {
  const [article, setArticle] = useState({...initState})
  const [result, setResult] = useState(null)
 
  const {moveToList} = useCustomMove()

  const handleChangeArticle = (e) => {
    article[e.target.name] = e.target.value

    setArticle({...article})
  }

  const handleClickCreate = () => {
    postCreate(article)
    .then(result => {
      setResult(result.id)
      setArticle({...initState})
      moveToList()
    }).catch(e => {
      console.error(e)
    })
  }

  return (
    <Box p={4} maxW="md" borderWidth={1} borderRadius="md" boxShadow="md" m="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>글쓰기</Text>
      <FormControl mb={4}>
        <Input
          name="articleTitle"
          placeholder="제목"
          value={article.articleTitle}
          onChange={handleChangeArticle}
        />
      </FormControl>
      <FormControl mb={4}>
      <FormControl mb={4}>
        <Input
          name="articleAuthor"
          placeholder="작성자"
          value={article.articleAuthor}
          onChange={handleChangeArticle}
        />
      </FormControl>
        <Textarea
          name="articleContent"
          placeholder="내용"
          value={article.articleContent}
          onChange={handleChangeArticle}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleClickCreate}>
        작성하기
      </Button>
      {result && (
        <Text mt={4} color="green.500">
          글이 성공적으로 작성되었습니다! ID: {result}
        </Text>
      )}
    </Box>
  );
};

export default ArticleCreatePage;