import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Stack, Image, Heading, Text, Divider, ButtonGroup, SimpleGrid, Box, Flex, Input, IconButton } from '@chakra-ui/react'

import useCustomMove from "../../hooks/useCustomMove"
import { getList } from "../../api/productApi";
import { useNavigate } from "react-router-dom";
import { postCartAdd } from "../../api/cartApi";
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

  const { search, page, size, refresh, moveToRead, moveToList } = useCustomMove();

  const [serveData, setServerData] = useState(initState);
  const [word, setWord] = useState("");   // 상품 검색용

  const navigate = useNavigate();


  /* serverData에 서버 데이터에서 가져온 상품 목록 데이터 저장 */
  useEffect(() => {

    if (search) {    // search에 데이터 있으면 searh, page, size를 전달
      getList({ search, page, size }).then(data => {
        // console.log(data);
        setServerData(data);
      }).catch(e=>console.log(e));
    } else {        // search에 데이터 없으면 page, size를 전달
      getList({ page, size }).then(data => {
        // console.log(data);
        setServerData(data)
      }).catch(e=>console.log(e));
    }
  }, [search, page, size, refresh])



  /* 구매하기 */
  const handleClickBuy = (product) => {

    // eslint-disable-next-line no-restricted-globals
    const goBuy = confirm("구매하시겠습니까?");
  
    if (!goBuy) {
      
      return;
    }

    const order = {

      productId: product.id,
      productTitle: product.productTitle,
      productContent: product.productContent,
      productPrice: product.productPrice,
      cartCount: 1
    }

    navigate("/orders/pay", {state : {order}});
  }


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


  /* 검색 인풋창 엔터키만 눌러도 검색 */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      moveToList({ search: word });
    }
  }



  // 리턴값 맵으로 반복
  return (
    <section>

      <div className="flex flex-row border-b p-10 mb-10">
        <h1 className="text-5xl mr-auto">상점 페이지</h1>
        <Input placeholder="검색어를 입력하세요" width={500} height={12} marginRight={3} marginLeft={20} fontSize="xl"
          onChange={(e) => { setWord(e.target.value); console.log(word) }}
          onKeyDown={handleKeyDown}
          value={word} />
        <IconButton colorScheme='gray' aria-label='Search database' fontSize="25px" height={12} width={14}
          icon={<SearchIcon />}
          onClick={() => { moveToList({ search: word }); console.log(word); }}
        />
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

                <button className="text-xl font-extrabold hover:opacity-70 bg-green-200 rounded-lg w-36 h-16"
                  onClick={()=>{handleClickBuy(product)}}>
                  구매하기
                </button>
                <button className="text-xl border hover:opacity-70 border-green-200 rounded-lg w-36"
                  onClick={() => { handleClickCart(product) }}>
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
