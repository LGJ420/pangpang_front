import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Stack, Image, Heading, Text, Divider, ButtonGroup, Button, SimpleGrid } from '@chakra-ui/react'

import useCustomMove from "../../hooks/useCustomMove"
import { getList } from "../../api/productApi";
import { Link, useNavigate } from "react-router-dom";

/* 초기값 설정 */
const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
}

// 서버에서 데이터 가져오기
const ProductListComponent = () => {

  const { page, size, refresh, moveToRead } = useCustomMove();

  const [serveData, setServerData] = useState(initState);

  /* serverData에 서버 데이터에서 가져온 상품 목록 데이터 저장 */
  useEffect(() => {
    getList({ page, size }).then(data => {
      // console.log(data)
      setServerData(data)
    })
  }, [page, size, refresh])

  
  // const navigate = useNavigate();

  // const moveToDetail = (num) => {
  //   navigate({pathname: `../detail/${num}`})
  // }


  // 리턴값 맵으로 반복
  return (
    <section>
      <h1 className="text-5xl p-10 mb-10 border-b">상점 페이지</h1>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} className="pb-32">
        {serveData.dtoList.map(product =>
          <Card maxW='sm' key={product.id}>
            <CardBody className='text-center' onClick={() => moveToRead(product.id)}>
              <Image src='/images/chi1.jpg' borderRadius='lg' className='mx-auto w-80' />
              <Stack mt='5' spacing='3'>
                <Heading size='md' fontSize="2xl">{product.productTitle}</Heading>
                <Text fontSize='2xl'>{product.productPrice.toLocaleString()}원</Text>
              </Stack>
            </CardBody>
            <Divider borderColor='gray.400' />

            <CardFooter>
              <ButtonGroup spacing='8' className='mx-auto'>
                <Button variant='solid' colorScheme='gray' fontSize="lg">
                  {/* 구매 페이지로 이동하는 링크 */}
                  바로 구매하기
                </Button>
                <Button variant='solid' colorScheme='gray' fontSize="lg">
                  <Link to={'/cart/list'}>장바구니에 담기</Link>
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        )}
      </SimpleGrid>



    </section>
  )
}

export default ProductListComponent;