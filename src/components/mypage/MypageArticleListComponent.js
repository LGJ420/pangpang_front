import { Box, Heading, Text, Button, Stack, Spinner, Alert, AlertIcon, Flex, CloseButton, useDisclosure, 
Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react';
import React, { useEffect, useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteOne, getMyArticles } from '../../api/articleApi';
import MypageTitleComponent from '../common/MypageTitleComponent';
import { formatDateTime } from "../../util/dateUtil";
import { logout } from '../../hooks/logout';
import { formatContent } from '../../util/contentUtil';


  
  // Define the initial state for the reducer
const initState = {
  articles: [],
  loading: true,
  error: null,
  page: 1,
  size: 10,
  totalPages: 0,
  currentPage: 1,
  totalCount: 0,
  refresh: false,
  selectedArticleId: null,
};



// Define the reducer function
const articleReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        articles: action.payload.dtoList,
        totalPages: action.payload.totalPage,
        currentPage: action.payload.current,
        totalCount: action.payload.totalCount,
        loading: false,
        error: null,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'TOGGLE_REFRESH':
      return {
        ...state,
        refresh: !state.refresh,
      };
    case 'SET_SELECTED_ARTICLE':
      return {
        ...state,
        selectedArticleId: action.payload,
      };
    case 'CLEAR_SELECTED_ARTICLE':
      return {
        ...state,
        selectedArticleId: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};



// ArticleItem 컴포넌트 정의
const ArticleItem = React.memo(({ article, onDelete, navigate }) => {
  const handleDeleteClick = useCallback(() => 
    onDelete(article.id), 
  [article.id, onDelete]);



  return (
    <Box
      key={article.id}
      p={6}
      shadow="lg"
      borderWidth="1px"
      borderRadius="md"
      bg="white"
    >
      <Flex justifyContent="space-between">
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/article/read/${article.id}`)}
        >
          <Flex direction="column" mb={4}>
            <Flex align="center" mb={2}>
              <Heading
                className="cursor-pointer"
                fontSize="xl"
                mb={2}
                _hover={{
                  textDecoration: 'underline',
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s ease, text-decoration 0.2s ease',
                  color: 'blue.600',
                }}
              >
                글제목: {article.articleTitle}
              </Heading>
            </Flex>

            <Text fontSize="sm" color="gray.600" mb={2}>
              글번호: {article.id}
            </Text>

            <Text
              mb={4}
              style={{ whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{
                __html: formatContent(article.articleContent),
              }}
              sx={{
                '& a': {
                  color: 'blue.500',
                  textDecoration: 'underline',
                  _hover: {
                    color: 'blue.700',
                  },
                },
              }}
            />

            <Flex justify="space-between" align="center" fontSize="sm" color="gray.500">
              <Text>조회수: {article.viewCount}</Text>
            </Flex>
          </Flex>
        </div>

        <div className="flex flex-col justify-between">
          <CloseButton
            className="ml-auto"
            onClick={handleDeleteClick}
          />
          <Text fontSize="sm" color="gray.500">
            작성일: {formatDateTime(article.articleCreated)}
          </Text>
        </div>
      </Flex>
    </Box>
  );
});



const MypageArticleListComponent = () => {
  const [state, dispatch] = useReducer(articleReducer, initState);
  const { articles, loading, error, page, totalPages, totalCount, refresh, selectedArticleId } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();



  useEffect(() => {
    const fetchMyArticles = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'FETCH_ERROR', payload: null });
      try {
        const response = await getMyArticles({ page, size: state.size });
        dispatch({ type: 'FETCH_SUCCESS', payload: response });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert('토큰 유효 시간이 만료되었습니다.');
          logout();
        }
        dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch your articles.' });
      }
    };

    fetchMyArticles();
  }, [page, state.size, refresh]);



  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch({ type: 'SET_PAGE', payload: newPage });
    }
  }, [totalPages]);



  const handleClickDelete = (id) => {
    dispatch({ type: 'SET_SELECTED_ARTICLE', payload: id });
    onOpen();
  };



  const handleConfirmDelete = async () => {
    try {
      await deleteOne(selectedArticleId);
      dispatch({ type: 'TOGGLE_REFRESH' });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('토큰 유효 시간이 만료되었습니다.');
        logout();
      }
    } finally {
      onClose();
    }
  };



  const handleCancelDelete = () => {
    dispatch({ type: 'CLEAR_SELECTED_ARTICLE' });
    onClose();
  };



  if (loading) return <Spinner size="xl" />;
  if (error) return (
    <Alert status="error" mb={4}>
      <AlertIcon />
      {error}
    </Alert>
  );
  
  

  return (
    <section>
      <MypageTitleComponent>
        내가 쓴 글
      </MypageTitleComponent>

      <h3 className="text-xl my-5 ml-4">
        총 글 개수: {totalCount}
      </h3>

      <Stack spacing={6}>
        {articles.map((article) => (
          <ArticleItem
            key={article.id}
            article={article}
            onDelete={handleClickDelete}
            navigate={navigate}
          />
        ))}

        {/* Pagination Controls */}
        <Flex justifyContent="center" alignItems="center" fontSize="25px" className="relative py-10 text-gray-700 mt-5">
          {/* Previous Page */}
          {page > 1 && (
            <Box cursor="pointer" marginRight={7} onClick={() => handlePageChange(page - 1)}>
              {'\u003c'}
            </Box>
          )}

          {/* Page Numbers */}
          {[...Array(totalPages).keys()].map((pageNum) => (
            <Box
              key={pageNum + 1}
              marginRight={7}
              cursor="pointer"
              className={state.currentPage === pageNum + 1 ? 'text-[rgb(224,26,109)] border-b' : ''}
              onClick={() => handlePageChange(pageNum + 1)}
            >
              {pageNum + 1}
            </Box>
          ))}

          {/* Next Page */}
          {page < totalPages && (
            <Box cursor="pointer" onClick={() => handlePageChange(page + 1)}>
              {'\u003e'}
            </Box>
          )}
        </Flex>
      </Stack>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={handleCancelDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>정말로 이 글을 삭제하시겠습니까?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
              네
            </Button>
            <Button variant="ghost" onClick={handleCancelDelete}>
              아니요
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default MypageArticleListComponent;