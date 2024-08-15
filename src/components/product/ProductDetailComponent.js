import { useEffect, useState } from "react"
import { Box, Button, ButtonGroup, Flex, Image, Spacer, Text } from '@chakra-ui/react'

import { getOne } from "../../api/productApi";
import { Link, useNavigate } from "react-router-dom";
import { postCartAdd } from "../../api/cartApi";
import { getReviewList } from "../../api/productReviewApi";

/* 초기값 설정 */
const initState = {
  id: 0,
  productTitle: '',
  productContent: '',
  productPrice: 0
}

const prefix = "http://localhost:8080/api/productreview/view";

const ProductDetailComponent = ({ num }) => {

  const [product, setProduct] = useState(initState);
  const [images, setImages] = useState({}); // 이미지 URL을 저장할 상태
  const [selectedTab, setSelectedTab] = useState('product');
  
  // 임시
  const [reviewData, setReviewData] = useState([1,2,3]);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOne(num);
        setProduct(data);

        // 이미지 URL 설정하기
        const imageUrls = {};
        // data.uploadFileNames 배열에서 첫 번째 이미지 파일을 가져와 URL을 설정합니다.
        if (data.uploadFileNames.length > 0) {
          const fileName = data.uploadFileNames[0];
          const url = `http://localhost:8080/api/product/view/${fileName}`;
          imageUrls[data.id] = url;
        }
        // console.log('Image URLs:', imageUrls); // URL 확인
        setImages(imageUrls);
      } catch (error) {
        console.error(error);
      }


      try {
        getReviewList(num).then(data=>{
          setReviewData(data);
        });
      }
      catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [num]);


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

    navigate("/orders/pay", { state: { order } });
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

  return (
    <section>
      <h1 className="text-5xl p-10 mb-10 border-b">상세 페이지</h1>

      <Flex justify="center" align="center" p={5} >

        <Box flex="1" align="center">
          <Image
            src={images[product.id] || '/images/chi1.jpg'}
            alt={product.productTitle}
            boxSize={{ base: '100%', md: '50%' }}
            className="mx-auto h-80 object-contain" />
        </Box>

        <Box flex="1" ml={5} textAlign="center" className='border-l'>
          <Text fontSize="4xl" fontWeight='bold' mb={4}>{product.productTitle}</Text>
          <Text fontSize='3xl' mb={4} >{product.productContent}</Text>
          <Text fontSize='3xl' mb={6}>{product.productPrice.toLocaleString()}원</Text>
          <ButtonGroup spacing='7' className='mx-auto mt-5'>
            <button className="text-white bg-[rgb(68,107,216)] text-xl font-extrabold hover:opacity-70 rounded-lg w-36 h-16"
              onClick={() => { handleClickBuy(product) }}>
              구매하기
            </button>
            <button className="text-[rgb(68,107,216)] border-[rgb(68,107,216)] text-xl border hover:opacity-70 rounded-lg w-36"
              onClick={() => { handleClickCart(product) }}>
              장바구니 담기
            </button>
          </ButtonGroup>
        </Box>
      </Flex>
      <h4 className="bg-red-50 p-3 text-center">
        판매자가 타 사이트 안내 및 현금 결제, 개인정보 유도 시 결제/입력 마시고 즉시 고객센터로 신고해주세요.
      </h4>
      <div className="border">


        <div className="flex text-center text-xl">
          <div className={`w-1/2 p-5 border-r cursor-pointer ${selectedTab === 'product' ? 'font-extrabold bg-orange-400 text-white' : 'bg-gray-200'}`} // 조건부 스타일 적용
            onClick={() => setSelectedTab('product')}>
            상품정보
          </div>
          <div className={`w-1/2 p-5 border-l cursor-pointer ${selectedTab === 'review' ? 'font-extrabold bg-orange-400 text-white' : 'bg-gray-200'}`} // 조건부 스타일 적용
            onClick={() => setSelectedTab('review')}>
            리뷰
          </div>
        </div>

        {selectedTab === 'product' && (

        <div className="h-screen p-10">
          여기는 상품정보라능
        </div>

        )}

        {selectedTab === 'review' && (
        
        <div className="min-h-screen p-10">
          <h3 className="text-xl font-semibold mb-5">총 {reviewData.length}개 리뷰</h3>
          
          {reviewData.map((review)=>
          
            <div className="h-52 p-5 mb-5 flex items-center justify-between border rounded-lg">
              <div className="h-full grow">
                <div className="flex items-center">
                  <img src="/images/profile.png" className="w-10 h-10 rounded-full border"/>
                  <div>
                    아이디입니당
                  </div>
                  <div>
                    {review.rating}
                  </div>
                </div>
                <div>
                  {review.reviewDate}
                </div>
                <p>
                  {review.reviewContent}
                </p>
              </div>
              <div className="ml-4">
                <img src={`${prefix}/${review.reviewFileName}`} className="w-60 h-40 object-cover"/>
              </div>
            </div>
          )}

        </div>

        )}

      </div>

    </section>
  )
}

export default ProductDetailComponent;