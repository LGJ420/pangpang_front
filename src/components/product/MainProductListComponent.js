import { ButtonGroup, Card, CardBody, CardFooter, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Carousel } from "react-bootstrap";
import useCustomMove from "../../hooks/useCustomMove";
import { postCartAdd } from "../../api/cartApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


/* 초기값 설정 */
const initState = {
  id: 0,
  productTitle: '',
  productPrice: 0
}


const MainProductList = () => {

  const { moveToRead } = useCustomMove();
  const navigate = useNavigate();

  const [serverData, setServerData] = useState("");
  /* 장바구니 */
  const handleClickCart = (product) => {

    const cartObj = {

      // 멤버는 나중에 로그인한 사람으로 바꿀 예정
      memberId: 1,
      productId: product.id,
      cartCount: 1,
    }

    postCartAdd(cartObj);
    alert("장바구니에 상품이 등록되었습니다")


    // 여유가 되면 모달창을 제작해서 바꿀예정
    // eslint-disable-next-line no-restricted-globals
    const goToCart = confirm("장바구니 페이지로 이동하시겠습니까?");

    if (goToCart) {

      navigate({ pathname: '../../cart' });
    }
  }




  return (
    <Carousel>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} className="pb-32">
        <Card maxW='sm'>
          <CardBody>
            <div className="relative z-10 overflow-hidden">
              <Image onClick={() => moveToRead()}
                src='/images/chi1.jpg'
                className='mx-auto w-80 cursor-pointer transition-transform duration-300 transform hover:scale-125' />
            </div>
            <Stack mt='5' spacing='3'>
              <Heading size='md' fontSize="xl">상품명</Heading>
              <Text fontSize='2xl'>가격</Text>
            </Stack>

            <CardFooter>
              <ButtonGroup spacing='8' className='mx-auto'>
                <button className="text-xl font-extrabold hover:opacity-70 bg-green-200 rounded-lg w-10 h-10"></button>
                <button className="text-xl border hover:opacity-70 border-green-200 rounded-lg w-36"
                  onClick={() => { handleClickCart() }}></button>
              </ButtonGroup>
            </CardFooter>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Carousel>
  )

}


export default MainProductList;