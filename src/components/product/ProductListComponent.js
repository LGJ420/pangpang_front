import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Stack, Image, Heading, Text, Divider, ButtonGroup, Button, SimpleGrid, Box, Flex, Input } from '@chakra-ui/react'

import useCustomMove from "../../hooks/useCustomMove"
import { getList } from "../../api/productApi";
import { Link } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";
import { SearchIcon } from "@chakra-ui/icons";

/* 초기값 설정 */
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

// 서버에서 데이터 가져오기
const ProductListComponent = () => {

  const { page, size, refresh, moveToRead, moveToList } = useCustomMove();

  const [serveData, setServerData] = useState(initState);

  /* serverData에 서버 데이터에서 가져온 상품 목록 데이터 저장 */
  useEffect(() => {
    getList({ page, size }).then(data => {
      console.log(data)
      setServerData(data)
    })
  }, [page, size, refresh])



  // 리턴값 맵으로 반복
  return (
    <section>
      <h1 className="text-5xl p-10 mb-10 border-b">상점 페이지</h1>

      {/* 검색 */}
      <div className="absolute right-20 top-44">
        <Input placeholder="검색어를 입력하세요" width={500} height={50} marginRight={5} />
        <SearchIcon fontSize="25px" width={50} height={25} bgColor={"lightgray"} />
      </div>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} className="pb-32">
        {serveData.dtoList.map(product =>
          <Card maxW='sm' key={product.id}>
            <CardBody>
              <div className="relative z-10 overflow-hidden">
                <Image onClick={() => moveToRead(product.id)} 
                  src='/images/chi1.jpg' 
                  borderRadius='lg' 
                  className='mx-auto w-80 cursor-pointer transition-transform duration-300 transform hover:scale-125' />
              </div>
              <Stack mt='5' spacing='3'>
                <Heading size='md' fontSize="2xl">{product.productTitle}</Heading>
                <Text fontSize='2xl'>{product.productPrice.toLocaleString()}원</Text>
              </Stack>
            </CardBody>
            <Divider borderColor='gray.400' />

            <CardFooter>
              <ButtonGroup spacing='8' className='mx-auto'>

                <button className="text-xl font-extrabold hover:opacity-70 bg-green-200 rounded-lg w-36 h-16">
                  구매하기
                </button>
                <button className="text-xl border hover:opacity-70 border-green-200 rounded-lg w-36">
                  장바구니 담기
                </button>

              </ButtonGroup>
            </CardFooter>
          </Card>
        )}
      </SimpleGrid>


      {/* 페이지네이션 */}

      <Flex justifyContent="center" fontSize="25px" className="pb-20 text-gray-700">
        {/* 이전 페이지 */}
        {serveData.current > 1 ? <Box cursor={"pointer"} marginRight={7} onClick={() => moveToList({ page: serveData.prevPage })}>{'\u003c'}</Box> :
          <></>}

        {/* 페이지 넘버 */}
        {serveData.pageNumList.map(pageNum => serveData.dtoList.length > 0 ?
          (<Box key={pageNum}
            marginRight={7} cursor={"pointer"}
            className={serveData.current === pageNum ? 'text-gray-500 border-b' : ''}
            onClick={() => moveToList({ page: pageNum })}>{pageNum}</Box>) : <></>)}

        {/* 다음 페이지 */}
        {serveData.next ? <Box cursor={"pointer"} onClick={() => moveToList({ page: serveData.nextPage })}>{'\u003e'}</Box> : <></>}
      </Flex>


    </section>
  )
}

export default ProductListComponent;
