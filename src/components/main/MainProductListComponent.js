import { Image, SimpleGrid, Spinner, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductList } from "../../api/mainPageApi";


/* 초기값 설정 */
const initState = [];


const prefix = "https://elasticbeanstalk-ap-northeast-2-533267223550.s3.ap-northeast-2.amazonaws.com";

const MainProductList = () => {

  const navigate = useNavigate();

  const [serverData, setServerData] = useState(initState);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // 상품 목록 데이터 가져오기
        const data = await getProductList();
        setServerData(data);

      } catch (error) {
        // console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


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
                    src={product.uploadFileNames[0] ? `${prefix}/${product.uploadFileNames[0]}` : "/images/no_image.png"}
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = "/images/no_image.png";
                    }}
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
          <img src="/images/no_product.png" className="w-60" />
          <div>지금은 상품 준비중입니다</div>
        </div>
      )}
    </>

  );

}


export default MainProductList;