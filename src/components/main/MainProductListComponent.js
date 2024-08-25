import { ButtonGroup, Card, CardBody, Heading, Image, SimpleGrid, Spinner, Stack, Text } from "@chakra-ui/react";
import { postCartAdd } from "../../api/cartApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductList } from "../../api/mainPageApi";


/* 초기값 설정 */
const initState = [];

const MainProductList = () => {

  const navigate = useNavigate();

  const [serverData, setServerData] = useState(initState);
  const [images, setImages] = useState({}); // 이미지 URL을 저장할 상태
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {   // fetchData : 비동기 함수. 서버에서 데이터를 가져오고 이미지를 로드하는 작업 수행
      try {
        // 상품 목록 데이터 가져오기
        const data = await getProductList();
        setServerData(data);
        // console.log(data);   // 데이터 확인용

        // 이미지 URL 설정하기
        const imageUrls = {};   // 이미지 url을 저장할 빈 객체 생성
        for (const product of data) {   // 상품 목록 반복
          if (product.uploadFileNames.length > 0) {     // 상품이 이미지 파일을 가지고 있는지 확인
            const fileName = product.uploadFileNames[0];    // 첫 번쩨 이미지 파일 이름을 가져옴
            const url = `http://localhost:8080/api/product/view/${fileName}`;   // 이미지 url 만듦
            imageUrls[product.id] = url;    // 상품 id를 키로, 이미지 url을 값으로 설정
          }
        }
        setImages(imageUrls);   // 상태를 업데이트하여 이미지 url 저장
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


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
      uploadFileNames: product.uploadFileNames,
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
    alert("장바구니에 상품이 등록되었습니다");


    // 여유가 되면 모달창을 제작해서 바꿀예정
    // eslint-disable-next-line no-restricted-globals
    const goToCart = confirm("장바구니 페이지로 이동하시겠습니까?");

    if (goToCart) {

      navigate({ pathname: '/cart' });
    }
  }




  return (
    <>
      { isLoading ?

      <div className="flex flex-col items-center justify-center h-full">
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
          />
      </div>

      :
      
      serverData.length > 0 ? (
        <SimpleGrid columns={3} spacing={3} paddingX={3} height='100%'>
          {serverData.map((product, index) => (
            <div className={`h-full p-4`} key={product.id}>
              <div className="flex flex-col justify-between overflow-hidden">
                <div className="relative hover:scale-125 duration-300 cursor-pointer">
                  <Image
                    onClick={() => navigate({ pathname: `product/read/${product.id}` })}
                    src={images[product.id] || '/images/chi1.jpg'}
                    alt={product.productTitle}
                    className='mx-auto h-[10rem] object-contain'
                  />
                </div>
                <Stack mt='7' className="border-gray-300 z-10 bg-white">
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis ">
                    {product.productTitle}
                  </div>
                  <div className="text-2xl">
                    {product.productPrice.toLocaleString()}원
                  </div>
                </Stack>
              </div>
            </div>
          ))}
        </SimpleGrid>
      ) : (
        <div className="flex flex-col items-center justify-center text-2xl font-semibold h-full">
          <img src="/images/product_none.png" className="w-60" />
          <div>지금은 상품 준비중입니다</div>
        </div>
      )}
    </>

  );

}


export default MainProductList;