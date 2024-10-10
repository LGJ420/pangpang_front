import { useEffect, useState } from "react";
import { Spinner } from '@chakra-ui/react'

import useCustomMove from "../../hooks/useCustomMove"
import useCustomToken from "../../hooks/useCustomToken";

import { API_SERVER_HOST, getList } from "../../api/productApi";
import { useNavigate } from "react-router-dom";
import SearchBarComponent from "../common/SearchBarComponent";

/* 초기값 설정 */
const initState = {
  dtoList: [],    // 상품 데이터 리스트
  pageNumList: [],    // 페이지 번호 리스트
  pageRequestDTO: null,   // 현재 페이지 요청 정보
  totalCount: 0,          // 전체 데이터 총 개수
  totalPage: 0,           // 전체 페이지 수
  current: 0              // 현재 페이지 번호
}

const prefix = `${API_SERVER_HOST}/api/product/view`;

// 서버에서 데이터 가져오기
const ProductListComponent = () => {

  const { search, page, size, category, refresh, moveToRead, moveToList } = useCustomMove();

  const [serverData, setServerData] = useState(initState);
  const [word, setWord] = useState("");   // 상품 검색용
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const navigate = useNavigate();
  const {isLogin, decodeToken} = useCustomToken();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // 상품 목록 데이터 가져오기
        const data = await getList({ search, page, size, category: selectedCategory });
        setServerData(data);
      }
      catch (error) {
        // console.error(error);
      }
      finally {
        setIsLoading(true);
      }
    };

    fetchData();
  }, [search, page, size, category, refresh]);


  // 상품 검색
  const handleChangeSearch = (e) => {

    setWord(e.target.value);
  }


  const handleClickSearch = () => {

    moveToList({ search: word });
  }


  // 상품 추가 페이지로 이동
  const handleClickAdd = () => {

    navigate('../add');
  }


  // 상품 카테고리 선택
  const handleClickCategory = (category) => {
    moveToList({category, search: ""});
  }



  return (
    <section>

      <div className="flex items-center border-b pt-10 pl-10 pb-10 pr-3 mb-5">
        <h1 className="text-5xl mr-auto cursor-pointer w-52"
          onClick={()=>navigate(`/product`)}>
          쇼핑
        </h1>

        <SearchBarComponent width="70%" changeFn={handleChangeSearch} clickFn={handleClickSearch}/>

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
      
      (serverData.dtoList && serverData.dtoList.length > 0) ?

      <>

      <div className="flex space-x-2 ml-3 mb-7">
        <button
          onClick={() => navigate('/product') }
          className={`px-4 py-2 rounded ${selectedCategory === "" ? "bg-[rgb(224,26,109)] text-white font-bold" : "bg-gray-200 text-gray-700"}`}
        >
          모두
        </button>
        <button
                onClick={() => handleClickCategory("게임")}
          className={`px-4 py-2 rounded ${selectedCategory === "게임" ? "bg-[rgb(224,26,109)] text-white font-bold" : "bg-gray-200 text-gray-700"}`}
        >
          게임
        </button>
        <button
                onClick={() => handleClickCategory("게임기기")}
          className={`px-4 py-2 rounded ${selectedCategory === "게임기기" ? "bg-[rgb(224,26,109)] text-white font-bold" : "bg-gray-200 text-gray-700"}`}
        >
          게임기기
        </button>
        <button
                onClick={() => handleClickCategory("굿즈")}
          className={`px-4 py-2 rounded ${selectedCategory === "굿즈" ? "bg-[rgb(224,26,109)] text-white font-bold" : "bg-gray-200 text-gray-700"}`}
        >
          굿즈
        </button>
      </div>
      
            <div className="grid grid-cols-4 gap-10">
              {serverData.dtoList.map(product => (
                <div key={product.id} className="border p-5">
                  <div className="flex flex-col justify-between overflow-hidden">
                    <div
                      className={`${product.productStock <= 0 ? "" : "relative hover:scale-125 duration-300 cursor-pointer"}`}
                      onClick={() => moveToRead(product.id)}
                    >
                      <img
                        src={product.uploadFileNames[0] ? `${prefix}/${product.uploadFileNames[0]}` : "/images/no_image.png"}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/no_image.png";
                        }}
                        className={`mx-auto h-52 object-contain rounded-lg ${product.productStock <= 0 ? "opacity-45" : ""}`}
                      />
                    </div>
                    {product.productStock <= 0 ? <div className="font-bold text-red-600">품절된 상품입니다.</div> : <div></div>}
                    <div className="py-5 pb-3 text-xl z-10 bg-white whitespace-nowrap overflow-hidden text-ellipsis">
                      {product.productTitle}
                    </div>
                    <div className="text-3xl font-bold">
                      {product.productPrice.toLocaleString()}원
                    </div>
                  </div>
                </div>
              ))}
            </div>


          </>
        :
        <div className="relative p-4 flex flex-col items-center justify-center text-2xl font-semibold">
          <img src="/images/no_product.png"/>
          <div>
            지금은 상품 준비중입니다
          </div>
        </div>
      }

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center text-[23px] relative py-10 text-gray-700 mb-10">

        {!isLoading ?

          <></>

          :

          serverData.dtoList.length > 0 ?

            <>
              {/* 이전 페이지 */}
              <div className="cursor-pointer mr-7" onClick={() => moveToList({ page: serverData - 1 })}>{'\u003c'}</div>

              {/* 페이지 넘버 */}
              {serverData.pageNumList.map(pageNum => serverData.dtoList.length > 0 ?
                (<div key={pageNum}
                  className={`mr-7 cursor-pointer ${serverData.current === pageNum ? 'text-[rgb(224,26,109)] border-b' : ''}`}
                  onClick={() => moveToList({ page: pageNum })}>{pageNum}</div>) : <></>)}

              {/* 다음 페이지 */}
              <div className="cursor-pointer" onClick={() => moveToList({ page: serverData.current + 1 })}>{'\u003e'}</div>
            </>

            :

            <>
            </>
        }


        {
          isLoading && decodeToken.memberRole === 'Admin' &&

          <button className="absolute right-0 bg-[rgb(77,160,124)] text-white w-40 h-16 hover:opacity-80 font-bold"
            onClick={handleClickAdd}>
            상품 추가
          </button>
        }

      </div>




    </section>
  )
}

export default ProductListComponent;
