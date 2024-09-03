import { useEffect, useState } from "react";
import styles from "../../css/memberPage.module.css"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import useCustomToken from "../../hooks/useCustomToken";
import { getAllList, modifyProductStock } from "../../api/productApi";
import MypageTitleComponent from "../common/MypageTitleComponent";
import SearchBarComponent from "../common/SearchBarComponent";
import { logout } from '../../hooks/logout';


/* 초기값 설정 */
const initState = {
    dtoList: [],    // 상품 데이터 리스트
    pageNumList: [],    // 페이지 번호 리스트
    pageRequestDTO: null,   // 현재 페이지 요청 정보
    totalCount: 0,          // 전체 데이터 총 개수
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
    const [refresh, setRefresh] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(null); // 모달창
    const [queryParams] = useSearchParams();

    const navigate = useNavigate();
    const { isLogin, decodeToken } = useCustomToken();


    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 10);   // 상품 목록에서 한 페이지 당 데이터 12개씩 가져오기 위해 변경
    const search = getString(queryParams.get('search'), '');   // 상품 목록에서 필요한 검색

    const queryDefault = createSearchParams({ search, page, size }).toString();


    const moveToList = (pageParam) => {

        let queryStr = "";

        if (pageParam) {

            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10); // 상품 목록에서 한 페이지 당 데이터 12개씩 가져오기 위해 변경
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
        if (!isLogin) {
            alert("잘못된 접근 방식입니다.");
            navigate(-1);
            return;
        } else if (decodeToken.memberRole === "User") {
            alert("관리자만 접근 가능한 페이지입니다.");
            navigate(-1);
            return;
        }
    }, [isLogin, decodeToken, navigate])



    useEffect(() => {
        const fetchData = async () => {   // fetchData : 비동기 함수. 서버에서 데이터를 가져오고 이미지를 로드하는 작업 수행
            try {
                // 상품 목록 데이터 가져오기
                const data = await getAllList({ search, page, size });
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
    }, [search, page, size, refresh]);


    // 검색
    const handleChangeSearch = (e) => {

        setWord(e.target.value);
    }

    const handleClickSearch = () => {

        moveToList({ search: word });
    }


    // 상품 재고량 수정 모달
    const handleClickInfo = (data) => {

        const modalData = {
            ...data
        }

        setModal(modalData);
    }


    const handleClickClose = (e) => {
        setModal(null);

    }


    // 상품 정보 변경 처리
    const handleChangeStock = (e) => {
        const { name, value } = e.target;
        setModal((prev) => ({ ...prev, [name]: value }));
    };

    // 상품 수정 처리
    const handleStockModify = async (productId) => {

        if (modal.productStock < 0) {
            alert("재고량을 입력해주세요.");
            return;
        }

        if (isNaN(modal.productStock)) {
            alert("재고량을 입력해주세요. (숫자만 가능)");
            return;
        }

        if(modal.productStock >= 101) {
            alert("재고량은 100개까지 입력 가능합니다.");
            return;
        }



        modifyProductStock(productId, {productStock: modal.productStock})
            .then(()=>{
                alert('수정이 완료되었습니다!');
                moveToList();
            })
            .catch((error)=>{

                if (error.response.status === 401) {
                    alert("토큰 유효 시간이 만료되었습니다.")
                    logout(); // import { logout } from '../../hooks/logout'; 추가 필요
                }

                // console.error("수정에 실패했습니다.", error);
                alert("상품 수정에 실패했습니다.")
            })
            .finally(()=>{
                setIsLoading(false);
            })
        }

    if (!isLogin || decodeToken.memberRole === "User") {
        return null;
    }


    return (

        
        <div>

            {modal ?

                <div className="fixed w-full h-full top-0 left-0 z-20 bg-white/90 flex justify-center items-center close">
                    <div className="w-[745px] p-12 m-12 bg-white border shadow-md flex flex-col justify-center max-w-[90%] max-h-[90%] overflow-auto">
                        <div className="flex">
                            <div className="flex flex-col flex-1">
                                <div className="w-full text-4xl font-bold mb-7">{modal.productTitle}</div>
                                <div className="mr-7 mb-7 text-xl">{modal.productContent}</div>
                                <label className="mb-3 font-extrabold text-2xl" htmlFor="productStock">재고량</label>
                                <input
                                    className="rounded border text-xl w-20 h-12 p-3"
                                    id="productStock"
                                    name="productStock"
                                    value={modal.productStock}
                                    maxLength={50}
                                    onChange={handleChangeStock}
                                    onKeyDown={(e) => { if (e.key === "Enter") { handleStockModify(modal.id) } }}
                                />

                                <div className="flex text-xl mt-7 justify-end">
                                    <button className="mr-3 p-3 px-7 bg-[rgb(77,160,124)] text-white"
                                        onClick={() => handleStockModify(modal.id)}>
                                        수정
                                    </button>
                                    <button className="mr-3 p-3 px-7 bg-[rgb(240,113,113)] text-white"
                                        onClick={handleClickClose}>
                                        취소
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                :

                <></>

            }

            <div className="flex items-center justify-between mb-5">
                <MypageTitleComponent>
                    상품 재고 관리
                </MypageTitleComponent>

                <SearchBarComponent width="40%" changeFn={handleChangeSearch} clickFn={handleClickSearch} />
            </div>
            <h3 className="text-xl my-5 ml-4">
                총 상품 수 : {serverData.totalCount}
            </h3>
            <div className={styles.productsHeader}>

                <div>상품번호</div>
                <div>카테고리</div>
                <div className="pl-5">상품명</div>
                <div>등록일</div>
                <div>판매량</div>
                <div>재고량</div>

            </div>

            {serverData.dtoList.map((data, index) => (

                <div className={styles.productsBody} key={index}>
                    <div>{data.id}</div>
                    <div>{data.productCategory}</div>
                    <div className="hover:cursor-pointer hover:text-gray-500"
                        onClick={() => navigate(`/product/read/${data.id}`)}
                    >
                        <div className="pl-5 w-11/12">
                            {data.productTitle}
                        </div>
                    </div>
                    <div>
                        {data.productCreated.substring(0, 10)}
                    </div>
                    <div>
                        {data.productTotalSales}개
                    </div>
                    <div>
                        <div>
                            {data.productStock}개
                        </div>
                        <button onClick={() => handleClickInfo(data)}
                            className="text-white px-2 bg-[rgb(77,160,124)] ml-2">
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