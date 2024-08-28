import { Box, Heading, Text, Button, Stack, Spinner, Alert, AlertIcon, Flex, CloseButton, useDisclosure, 
Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteOne, getMyArticles } from '../../api/articleApi';
import MypageTitleComponent from '../common/MypageTitleComponent';
import { formatDateTime } from "../../util/dateUtil";
import { logout } from '../../hooks/logout';
import { formatContent } from '../../util/contentUtil';



const MypageArticleListComponent = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10); // Number of posts per page
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState(null); // To store the article ID to delete
    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal controls
    const navigate = useNavigate();



    useEffect(() => {
        const fetchMyArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getMyArticles({ page, size });
                // console.log(response);
                setArticles(response.dtoList);
                setTotalPages(response.totalPage); // Set the total number of pages
                setCurrentPage(response.current); // Set the current page number
                setTotalCount(response.totalCount);
            } catch (err) {               
                if (err.response.status === 401) {
                    alert("토큰 유효 시간이 만료되었습니다.")
                    logout(); 
                }                
                setError('Failed to fetch your articles.');                
            } finally {
                setLoading(false);
            }
        };

        fetchMyArticles();
    }, [page, size, refresh]);



    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };



    const handleClickDelete = (id) => {
        setSelectedArticleId(id); // Set the article ID to delete
        onOpen(); // Open the confirmation modal
    };



    const handleConfirmDelete = async () => {
        try {
            await deleteOne(selectedArticleId); // Delete the article
            setRefresh(!refresh); // Refresh the list
        } catch (error) {           
            // console.error('Error deleting article:', error);
            if (error.response.status === 401) {
                alert("토큰 유효 시간이 만료되었습니다.")
                logout(); // import { logout } from '../../hooks/logout'; 추가 필요
            }
        } finally {
            onClose(); // Close the modal
        }
    };



    const handleCancelDelete = () => {
        setSelectedArticleId(null); // Clear the selected article ID
        onClose(); // Close the modal
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
                              textDecoration: "underline",
                              transform: "scale(1.05)",
                              transition: "transform 0.2s ease, text-decoration 0.2s ease",
                              color: "blue.600",
                            }}
                          >
                            글제목: {article.articleTitle}
                          </Heading>
                        </Flex>

                        <Text fontSize="sm" color="gray.600" mb={2}>
                          글번호: {article.id}
                        </Text>

                        {/* 내용 */}
                        <Text
                          mb={4}
                          style={{ whiteSpace: "pre-wrap" }}
                          dangerouslySetInnerHTML={{
                            __html: formatContent(article.articleContent),
                          }}
                          sx={{
                            "& a": {
                              color: "blue.500",
                              textDecoration: "underline",
                              _hover: {
                                color: "blue.700",
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
                        onClick={() => handleClickDelete(article.id)}
                      />
                      <Text fontSize="sm" color="gray.500">
                        작성일: {formatDateTime(article.articleCreated)}
                      </Text>
                    </div>
                  </Flex>
                </Box>
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
                    className={currentPage === pageNum + 1 ? 'text-[rgb(224,26,109)] border-b' : ''}
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