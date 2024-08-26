import { useEffect, useState } from "react";

// 빨간선때문에 import함 나중에 삭제하시길 ㅎㅎ
import styles from "../../css/memberPage.module.css"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import useCustomToken from "../../hooks/useCustomToken";
import { getList } from "../../api/productApi";
import { IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import MypageTitleComponent from "../common/MypageTitleComponent";
import SearchBarComponent from "../common/SearchBarComponent";


/* 초기값 설정 */
const initState = {
    dtoList: [{
        id: 0,
        productTitle: "",
        productContent: "",
        productPrice: 0,
        productDetailContent: null,
        productCategory: null,
        productCreated: "2024-08-19T11:12:08.57246",
        files: [],
        uploadFileNames: [
            ""
        ]
        }],    // 상품 데이터 리스트
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

  const getNum = (param, defaultValue) => {

      if (!param) {
          return defaultValue;
      }
  
      return parseInt(param);
  }   

  const getString = (param, defaultValue) => {

      if (!param) {
          return defaultValue;
      }
  
      return param;
  }


const ManagerProductComponent = () => {

    const [serverData, setServerData] = useState(initState);
    const [word, setWord] = useState("");   // 상품 검색용
    const [images, setImages] = useState({}); // 이미지 URL을 저장할 상태
    const [refresh, setRefresh] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [queryParams] = useSearchParams();
  
    const navigate = useNavigate();
    const {isLogin, decodeToken} = useCustomToken();


    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 12);   // 상품 목록에서 한 페이지 당 데이터 12개씩 가져오기 위해 변경
    const search = getString(queryParams.get('search'), '');   // 상품 목록에서 필요한 검색

    const queryDefault = createSearchParams({ search, page, size }).toString();





    const moveToList = (pageParam) => {

        let queryStr = "";

        if (pageParam) {

            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 12); // 상품 목록에서 한 페이지 당 데이터 12개씩 가져오기 위해 변경
            const searchStr = getString(pageParam.search, search);      // 상품 목록 - 검색에서 사용

            queryStr = createSearchParams({ search: searchStr, page: pageNum, size: sizeNum, }).toString();
        }
        else {
            queryStr = queryDefault;
        }

        setRefresh(!refresh);
        navigate({ pathname: `../product`, search: queryStr });
    }
  
  

    useEffect(() => {
      const fetchData = async () => {   // fetchData : 비동기 함수. 서버에서 데이터를 가져오고 이미지를 로드하는 작업 수행
        try {
          // 상품 목록 데이터 가져오기
          const data =  await getList({ search, page, size });
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
  
  

    const handleChangeSearch = (e) => {

        setWord(e.target.value);
    }

    const handleClickSearch = () => {

        moveToList({ search: word });
    }


    return(
        <div>
            <div className="flex items-center justify-between mb-5">
                <MypageTitleComponent>
                    상품 관리
                </MypageTitleComponent>

                <SearchBarComponent width="40%" changeFn={handleChangeSearch} clickFn={handleClickSearch}/>
            </div>
            <h3 className="text-xl my-5 ml-4">
                총 상품 수 : {serverData.totalCount}
            </h3>
            <div className={styles.productsHeader}>

                <div>상품번호</div>
                <div>카테고리</div>
                <div>상품명</div>
                <div>등록일</div>
                <div>판매량</div>
                <div>재고량</div>

            </div>

            {serverData.dtoList.map((data, index) => (

            <div className={styles.productsBody} key={index}>
                <div>{data.id}</div>
                <div>{data.productCategory}</div>
                <div>{data.productTitle}</div>
                <div>
                    {data.productCreated.substring(0,10)}
                </div>
                <div>
                    0개     
                </div>
                <div>
                    <div>
                        {data.productStock}개
                    </div>
                    <button className="text-white px-2 bg-[rgb(77,160,124)] ml-2">
                        변경
                    </button>
                </div>
            </div>

            ))}
            

            {/* 페이지네이션 */}

            <div className="py-10 text-gray-700 flex justify-center">
                {/* 이전 페이지 */}
                
                    <div className="cursor-pointer p-3"
                        onClick={() => moveToList({ page: serverData.current - 1 })}>
                            {'\u003c'}
                        </div>
   

                {/* 페이지 넘버 */}
                {serverData.pageNumList.map(pageNum => serverData.dtoList.length > 0 ?
                (<div key={pageNum}
                    className={`cursor-pointer p-3 ${serverData.current === pageNum ? 'text-[rgb(224,26,109)] border-b' : ''}`}
                    onClick={() => moveToList({ page: pageNum })}>{pageNum}</div>) : <></>)}


                {/* 다음 페이지 */}
                    <div className="cursor-pointer p-3"
                        onClick={() => moveToList({ page: serverData.current + 1 })}>
                            {'\u003e'}
                        </div>

            </div>

        </div>
    );

}

export default ManagerProductComponent;