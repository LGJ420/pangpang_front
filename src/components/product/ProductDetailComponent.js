import { useEffect, useState } from "react"
import { Box, Button, ButtonGroup, Flex, Image, Spacer, Text } from '@chakra-ui/react'

import { getOne } from "../../api/productApi";
import { Link } from "react-router-dom";

/* 초기값 설정 */
const initState = {
  id: 0,
  productTitle: '',
  productContent: '',
  productPrice: 0
}

const ProductDetailComponent = ({num}) => {

  const [product, setProduct] = useState(initState);

  useEffect(() => {
    getOne(num).then(data => {
      console.log(data)
      setProduct(data)
    })
  }, [num])


  return (
    <section>
      <h1 className="text-5xl p-10 mb-10 border-b">상세 페이지</h1>

      <Flex justify="center" align="center" p={5} >

        <Box flex="1" align="center"><Image src='/images/chi1.jpg' boxSize={{ base: '100%', md: '50%' }}></Image></Box>

        <Box flex="1" ml={5} textAlign="center" className='border-l'>
          <Text fontSize="4xl" fontWeight='bold' mb={4}>{product.productTitle}</Text>
          <Text fontSize='3xl' mb={4}>{product.productContent}</Text>
          <Text fontSize='3xl' mb={6}>{product.productPrice.toLocaleString()}원</Text>
          <ButtonGroup spacing='7' className='mx-auto mt-5'>
            <Button variant='solid' colorScheme='gray' fontSize="xl" size="lg">
              {/* 구매 페이지로 이동하는 링크 */}
              바로 구매하기
            </Button>
            <Button variant='solid' colorScheme='gray' fontSize="xl" size="lg">
              <Link to={'/cart/list'}>
                장바구니에 담기
              </Link>
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </section>
  )
}

export default ProductDetailComponent;