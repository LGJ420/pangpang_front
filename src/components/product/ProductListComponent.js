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

  const [serverData, setServerData] = useState(initState);
  const [word, setWord] = useState("");   // 상품 검색용
  const [images, setImages] = useState({}); // 이미지 URL을 저장할 상태

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {   // fetchData : 비동기 함수. 서버에서 데이터를 가져오고 이미지를 로드하는 작업 수행
      try {
        // 상품 목록 데이터 가져오기
        const data = search
          ? await getList({ search, page, size })
          : await getList({ page, size });
        setServerData(data);

        // 이미지 URL 설정하기
        const imageUrls = {};   // 이미지 url을 저장할 빈 객체 생성
        for (const product of data.dtoList) {   // 상품 목록 반복
          if (product.uploadFileNames[0]) {     // 상품이 이미지 파일을 가지고 있는지 확인
            const fileName = product.uploadFileNames[0];    // 첫 번쩨 이미지 파일 이름을 가져옴
            const url = `http://localhost:8080/api/product/view/${fileName}`;   // 이미지 url 만듦
            imageUrls[product.id] = url;    // 상품 id를 키로, 이미지 url을 값으로 설정
          }
        }
        setImages(imageUrls);   // 상태를 업데이트하여 이미지 url 저장
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [search, page, size, refresh]);



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

      {serverData.dtoList.length > 0 ?
      
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} className="pb-32">
          {serverData.dtoList.map(product =>
            <Card maxW='sm' key={product.id}>
              <CardBody>
                <div className="relative z-10 overflow-hidden">
                  <Image onClick={() => moveToRead(product.id)}
                    src={images[product.id] || '/images/chi1.jpg'}    // 저장된 이밎 url 또는 기본 이미지 사용
                    alt={product.productTitle}
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
        :
        <div className="p-4 flex flex-col items-center justify-center text-2xl font-semibold">
          <img src="/images/product_none.png"/>
          <div>
            지금은 상품 준비중입니다
          </div>
        </div>
      }


      {/* 페이지네이션 */}

      <Flex justifyContent="center" fontSize="25px" className="pb-20 text-gray-700">
        {/* 이전 페이지 */}
        {serverData.current > 1 ? <Box cursor={"pointer"} marginRight={7} onClick={() => moveToList({ page: serverData.prevPage })}>{'\u003c'}</Box> :
          <></>}

        {/* 페이지 넘버 */}
        {serverData.pageNumList.map(pageNum => serverData.dtoList.length > 0 ?
          (<Box key={pageNum}
            marginRight={7} cursor={"pointer"}
            className={serverData.current === pageNum ? 'text-gray-500 border-b' : ''}
            onClick={() => moveToList({ page: pageNum })}>{pageNum}</Box>) : <></>)}

        {/* 다음 페이지 */}
        {serverData.next ? <Box cursor={"pointer"} onClick={() => moveToList({ page: serverData.nextPage })}>{'\u003e'}</Box> : <></>}
      </Flex>


    </section>
  )
}

export default ProductListComponent;
