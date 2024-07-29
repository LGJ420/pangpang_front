import { Card, CardHeader, CardBody, CardFooter, Stack, Image, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const ProductListPage = () => {

  return (

    <section>
      <h1 className="text-5xl p-10 mb-10 border-b">상점 페이지</h1>
      <Card maxW='sm'>
        <CardBody className='text-center'>
          <Link to={'/product/detail'}>
            <Image src='/images/chi1.jpg' borderRadius='lg' className='mx-auto w-80' />
            <Stack mt='5' spacing='3'>
              <Heading size='md' fontSize="2xl">기여운 키이카와</Heading>
              <Text fontSize='2xl'>500,000원</Text>
            </Stack>
          </Link>
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


    </section>
  );
}

export default ProductListPage;