import React, { useEffect, useReducer, useState } from 'react';
import {Box,Heading,Text,VStack,Flex, CloseButton,Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter,useDisclosure,Spinner,Alert,AlertIcon,ModalCloseButton,Button} from '@chakra-ui/react';
import { deleteComment, getMyComments } from '../../api/commentApi';
import useCustomToken from '../../hooks/useCustomToken';
import { useNavigate } from 'react-router-dom';
import MypageTitleComponent from '../common/MypageTitleComponent';
import { formatDateTime } from "../../util/dateUtil";
import { logout } from '../../hooks/logout';
import { formatContent } from '../../util/contentUtil';



const initState = {
    comments: [],
    loading: true,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    commentToDelete: null
}



// 리듀서 함수 정의
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_COMMENTS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_COMMENTS_SUCCESS':
            return {
                ...state,
                comments: action.payload.comments,
                totalPages: action.payload.totalPages,
                totalCount: action.payload.totalCount,
                currentPage: action.payload.currentPage,
                loading: false,
            };
        case 'FETCH_COMMENTS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'SET_COMMENT_TO_DELETE':
            return { ...state, commentToDelete: action.payload };
        case 'RESET_COMMENT_TO_DELETE':
            return { ...state, commentToDelete: null };
        default:
            return state;
    }
};


const MypageCommentComponent = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    const { isLogin, decodeToken } = useCustomToken();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const fetchComments = async (page = 1) => {
        if (!isLogin) return;
        dispatch({ type: 'FETCH_COMMENTS_REQUEST' });
        try {
            const memberId = decodeToken.id;
            const data = await getMyComments({ page, size: 5, memberId });
            dispatch({
                type: 'FETCH_COMMENTS_SUCCESS',
                payload: {
                    comments: data.dtoList || [],
                    totalPages: Math.ceil(data.totalCount / 5),
                    totalCount: data.totalCount,
                    currentPage: page,
                },
            });
        } catch (error) {
            if (error.response?.status === 401) {
                alert("토큰 유효 시간이 만료되었습니다.");
                logout();
            }
            dispatch({
                type: 'FETCH_COMMENTS_FAILURE',
                payload: 'Failed to fetch comments.',
            });
        }
    };



    useEffect(() => {
        if (isLogin) {
            fetchComments(state.currentPage);
        }
    }, [isLogin, state.currentPage]);



    const handlePageChange = (page) => {
        if (page >= 1 && page <= state.totalPages) {
            fetchComments(page);
        }
    };



    const handleClickDelete = (id) => {
        dispatch({ type: 'SET_COMMENT_TO_DELETE', payload: id });
        onOpen();
    };



    const confirmDelete = async () => {
        if (state.commentToDelete) {
            try {
                await deleteComment(state.commentToDelete);
                fetchComments(state.currentPage);
            } catch (error) {                
                // console.error('Error deleting comment:', error);                
                if (error.response.status === 401) {
                    alert("토큰 유효 시간이 만료되었습니다.")
                    logout(); 
                }                
            }
            dispatch({ type: 'RESET_COMMENT_TO_DELETE' });
            onClose();
        }
    };



    if (state.loading) return <Spinner size="xl" />;
    if (state.error) return (
        <Alert status="error" mb={4}>
            <AlertIcon />
            {state.error}
        </Alert>
    );



    return (
        <section>
            <MypageTitleComponent>
                내가 쓴 댓글
            </MypageTitleComponent>

            <h3 className="text-xl my-5 ml-4">
                총 댓글 개수: {state.totalCount}
            </h3>

            {state.comments.length > 0 ? (
                <VStack spacing={6} align="stretch">
                    {state.comments.map(comment => (
                        <Box
                            key={comment.id}
                            p={6}
                            shadow="lg"
                            borderWidth="1px"
                            borderRadius="md"
                            bg="white"
                        >
                            <Flex justifyContent="space-between">
                                <div className='cursor-pointer' 
                                onClick={() => navigate(`/article/read/${comment.articleId}`)}
                            >
                                <Flex direction="column" mb={4}>
                                    <Flex align="center" mb={2}>
                                        <Heading 
                                            className='cursor-pointer' 
                                            fontSize="xl" 
                                            mb={2} 
                                            _hover={{
                                            textDecoration: 'underline',
                                            transform: 'scale(1.05)',
                                            transition: 'transform 0.2s ease, text-decoration 0.2s ease',
                                            color: 'blue.600'
                                            }}
                                        >
                                            글제목: {comment.articleTitle}
                                        </Heading>
                                    </Flex>

                                    <Text fontSize="sm" color="gray.600" mb={2}>
                                        글번호: {comment.articleId}
                                    </Text>
                                        
                                    {/*댓글 내용*/}
                                    <Text 
                                        mb={4} 
                                        style={{ whiteSpace: 'pre-wrap' }} 
                                        dangerouslySetInnerHTML={{ __html: formatContent(comment.commentContent) }}
                                            sx={{
                                                '& a': {
                                                color: 'blue.500',
                                                textDecoration: 'underline',
                                                _hover: {
                                                color: 'blue.700'
                                                }
                                            }
                                        }}
                                    />

                                        <Flex justify="space-between" align="center" fontSize="sm"  color="gray.500">
                                            <Text>조회수: {comment.viewCount}</Text>
                                        </Flex>
                                    </Flex>
                                </div>

                                <div className='flex flex-col justify-between'>
                                    <CloseButton className='ml-auto' 
                                    onClick={() => handleClickDelete(comment.id)} 
                                    />
                                    <Text fontSize="sm" color="gray.500">
                                        작성일: {formatDateTime(comment.commentCreated)}
                                    </Text>
                                </div>
                            </Flex>
                        </Box>
                    ))}



                    {/* Pagination */}
                    <Flex justifyContent="center" alignItems="center" fontSize="25px" className="relative py-10 text-gray-700 mt-5">
                    {/* Previous Page */}
                    {state.currentPage > 1 && (
                        <Box cursor={"pointer"} marginRight={7} onClick={() => handlePageChange(state.currentPage - 1)}>
                            {'\u003c'}
                        </Box>
                    )}

                    {/* Page Numbers */}
                    {[...Array(state.totalPages).keys()].map(pageNum => (
                    <Box key={pageNum + 1}
                        marginRight={7}
                        cursor={"pointer"}
                        className={state.currentPage === pageNum + 1 ? 'text-[rgb(224,26,109)] border-b' : ''}
                        onClick={() => handlePageChange(pageNum + 1)}>
                        {pageNum + 1}
                    </Box>
                    ))}

                    {/* Next Page */}
                    {state.currentPage < state.totalPages && (
                    <Box cursor={"pointer"} onClick={() => handlePageChange(state.currentPage + 1)}>
                        {'\u003e'}
                    </Box>
                    )}
                </Flex>
                </VStack>
            ) : (
                <Text textAlign="center">아직 댓글이 없습니다.</Text>
            )}



            {/* Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={() => onClose()}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>정말로 댓글을 삭제하시겠습니까?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={confirmDelete}>
                            네
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            아니요
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    );
};

export default MypageCommentComponent;