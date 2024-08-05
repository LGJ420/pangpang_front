import { ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Carousel, CarouselItem } from "react-bootstrap";
import useCustomMove from "../../hooks/useCustomMove";
import { postCartAdd } from "../../api/cartApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductList } from "../../api/MainPageApi";


/* 초기값 설정 */
const initState = {
  dtoList: [],
};

const MainProductList = () => {

  const navigate = useNavigate();

  const [serverData, setServerData] = useState(initState);


  useEffect(() => {
    getProductList().then(data => {
      // console.log(data);
      setServerData(data);
    });
  }, [])



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

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} className="pb-32">

          {serverData.dtoList.map(product =>
            <Card maxW='sm' className="text-center" key={product.id}>
              <CardBody>
                <div className="relative z-10 overflow-hidden">
                  <Image onClick={() => navigate({pathname: `product/read/${product.id}`})}
                    src='/images/chi1.jpg'
                    className='mx-auto w-80 cursor-pointer transition-transform duration-300 transform hover:scale-125' />
                </div>
                <Stack mt='3' spacing='3' className="border-b border-gray-300">
                  <Heading size='md' fontSize="19px"> {product.productTitle.length > 8
                    ? product.productTitle.substring(0, 8) + '...'
                    : product.productTitle}</Heading>
                  <Text fontSize='20px'>{product.productPrice.toLocaleString()}원</Text>
                </Stack>
                {/* <Divider borderColor='gray.400' /> */}

                  <ButtonGroup spacing='5' className='mx-auto pt-3'>
                    <button className="text-xl font-extrabold hover:opacity-70 bg-stone-700 rounded-lg w-14 h-12">
                      <img src="/images/credit-card-regular.svg" className="w-8 h-8 mx-auto" />
                    </button>
                    <button className="text-xl border hover:opacity-70 border-stone-700 rounded-lg w-14 h-12"
                      onClick={() => { handleClickCart(product) }}>
                      <img src="/images/cart-shopping-solid.svg" className="w-8 h-8 mx-auto" />
                    </button>
                  </ButtonGroup>

              </CardBody>
            </Card>
          )}
        </SimpleGrid>

  )

}


export default MainProductList;