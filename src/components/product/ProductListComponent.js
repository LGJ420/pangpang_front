import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Stack, Image, Heading, Text, Divider, ButtonGroup, SimpleGrid, Box, Flex, Input, IconButton, Spinner } from '@chakra-ui/react'

import useCustomMove from "../../hooks/useCustomMove"
import useCustomToken from "../../hooks/useCustomToken";

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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {isLogin, decodeToken} = useCustomToken();


  useEffect(() => {
    const fetchData = async () => {   // fetchData : 비동기 함수. 서버에서 데이터를 가져오고 이미지를 로드하는 작업 수행
      try {
        // 상품 목록 데이터 가져오기
        const data = search
          ? await getList({ search, page, size })
          : await getList({ page, size });
        setServerData(data);
        // console.log(data);   // 데이터 확인용

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
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setIsLoading(true);
      }
    };

    fetchData();
  }, [search, page, size, refresh]);



  /* 구매하기 */
  const handleClickBuy = (product) => {

    if (!isLogin) {

      alert("로그인이 필요합니다");

      return;
    }

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
      uploadFileNames: product.uploadFileNames,
      cartCount: 1
    }

    navigate("/orders/pay", {state : {order}});
  }


  /* 장바구니 */
  const handleClickCart = (product) => {

    if (!isLogin) {

      alert("로그인이 필요합니다");

      return;
    }

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

      navigate({ pathname: '/cart' });
    }
  }


  /* 검색 인풋창 엔터키만 눌러도 검색 */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      moveToList({ search: word });
    }
  }


  const handleClickAdd = () => {

    navigate('../add');
  }



  return (
    <section>

      <div className="flex flex-row border-b pt-10 pl-10 pb-10 pr-3 mb-5">
        <h1 className="text-5xl mr-auto cursor-pointer"
          onClick={()=>navigate(`/product`)}>
          쇼핑
        </h1>
        <Input placeholder="검색어를 입력하세요" width={500} height={12} marginRight={3} marginLeft={20} fontSize="xl"
          onChange={(e) => { setWord(e.target.value); }}
          onKeyDown={handleKeyDown}
          value={word} />

        <IconButton height={12} width={14}
          className='bg-[rgb(49,49,49)]'
          aria-label='Search database'
          onClick={() => { moveToList({ search: word }); }}
          icon={<SearchIcon className='text-white text-2xl'/>}/>
      </div>

      { !isLoading ?
      <div className="h-96 flex items-center justify-center">
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
          />
      </div>
      
      :
      
      serverData.dtoList.length > 0 ?
      
        <SimpleGrid columns={ 4 } spacing={10}>
          {serverData.dtoList.map(product =>
            <div key={product.id} className="border p-5">
              <div className="flex flex-col justify-between overflow-hidden">
                <div className="relative hover:scale-125 duration-300 cursor-pointer"
                  onClick={() => moveToRead(product.id)}>
                  <Image
                    src={images[product.id] || '/images/chi1.jpg'}    // 저장된 이밎 url 또는 기본 이미지 사용
                    alt={product.productTitle}
                    borderRadius='lg'
                    className='mx-auto h-52 object-contain' />
                </div>
                <div className="py-5 pb-3 text-xl z-10 bg-white whitespace-nowrap overflow-hidden text-ellipsis">
                  {product.productTitle}
                </div>
                <div className="text-3xl font-bold">
                  {product.productPrice.toLocaleString()}원
                </div>
              </div> 
            </div>
          )}
        </SimpleGrid>
        :
        <div className="relative p-4 flex flex-col items-center justify-center text-2xl font-semibold">
          <img src="/images/product_none.png"/>
          <div>
            지금은 상품 준비중입니다
          </div>
        </div>
      }


      {/* 페이지네이션 */}

      <Flex justifyContent="center" alignItems="center" fontSize="25px" className="relative py-10 text-gray-700">
        {/* 이전 페이지 */}
        {serverData.current > 1 ? <Box cursor={"pointer"} marginRight={7} onClick={() => moveToList({ page: serverData.prevPage })}>{'\u003c'}</Box> :
          <></>}

        {/* 페이지 넘버 */}
        {serverData.pageNumList.map(pageNum => serverData.dtoList.length > 0 ?
          (<Box key={pageNum}
            marginRight={7} cursor={"pointer"}
            className={serverData.current === pageNum ? 'text-[rgb(224,26,109)] border-b' : ''}
            onClick={() => moveToList({ page: pageNum })}>{pageNum}</Box>) : <></>)}

        {/* 다음 페이지 */}
        {serverData.next ? <Box cursor={"pointer"} onClick={() => moveToList({ page: serverData.nextPage })}>{'\u003e'}</Box> : <></>}

        {
          decodeToken.memberRole === 'Admin' &&

          <button className="absolute right-0 bg-[rgb(77,160,124)] text-white w-40 h-16 hover:opacity-80 font-bold"
            onClick={handleClickAdd}>
            상품 추가
          </button>
        }

      </Flex>



    </section>
  )
}

export default ProductListComponent;
