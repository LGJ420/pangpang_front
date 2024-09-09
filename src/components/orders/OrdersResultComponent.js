import { useEffect, useState } from "react";
import { getOrdersList } from "../../api/ordersApi";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import MypageTitleComponent from "../common/MypageTitleComponent";
import SearchBarComponent from "../common/SearchBarComponent";
import { logout } from '../../hooks/logout';

// const initData = [{
//     name: "",
//     address: "",
//     phone: "",
//     memberId: 0,
//     dtoList: [{
//         productId: 0,
//         productTitle: "",
//         productContent: "",
//         productPrice: 0,
//         cartCount: 0
//     }]
// }]


const prefix = "https://elasticbeanstalk-ap-northeast-2-533267223550.s3.ap-northeast-2.amazonaws.com";


const OrdersResultComponent = () => {

    const [serverData, setServerData] = useState([]); // 데이터
    const [modal, setModal] = useState(null); // 모달창
    const [refresh, setRefresh] = useState(false); // 새로고침용
    const [word, setWord] = useState(""); // 검색창 글
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();


    useEffect(()=>{
        
        getOrdersList(word).then(data=>{

            setServerData(data);
            // console.log(data);   // 데이터 확인용
        })
        .catch(e=>{
            
            // console.log(e)
        
            if (e.response.status === 401) {
                alert("토큰 유효 시간이 만료되었습니다.")
                logout(); // import { logout } from '../../hooks/logout'; 추가 필요
            }
        })
        .finally(()=>setIsLoading(true));

    },[refresh]);


    const handleChangeSearch = (e) => {

        setWord(e.target.value);
    }

    const handleClickSearch = () => {

        setRefresh(!refresh);
    }

    const handleClickTitle = (id) => {

        navigate(`/product/read/${id}`);
    }


    const handleClickReview = (dto) => {

        navigate(`/review/add`, {state: {dto}});
    }


    const handleClickInfo = (data, dto) => {

        const modalData = {

            name: data.name,
            address: data.address,
            phone: data.phone,
            orderDate: data.orderDate,
            ...dto
        }

        setModal(modalData);
    }


    const handleClickClose = (e) => {

        if (e.target.className.includes("close")){
            
            setModal(null);
        }
    }


    return (
        <section className="w-full m-auto">

        { modal ? 
        
            <div className="fixed w-full h-full top-0 left-0 z-20 bg-white/90 flex justify-center items-center close"
                onClick={handleClickClose}>
                <div className="w-[720px] p-4 bg-white border shadow-md flex flex-col justify-center">

                    <div className="flex">
                            <img src={`${prefix}/${modal.uploadFileNames[0]}`}
                                alt={modal.productTitle} className="w-56 m-3"
                                onError={(e) => {
                                    e.target.onerror = null; // 무한 루프 방지
                                    e.target.src = "/images/no_image.png"; // 대체 이미지 경로
                                }} />
                        <div className="flex flex-col flex-1 ml-7">
                            <button className="self-end m-3 px-3 py-1 text-2xl font-bold rounded-sm hover:opacity-80 close"
                                onClick={handleClickClose}>
                                ×
                            </button>
                            <div className="w-4/5 text-3xl font-bold">{modal.productTitle}</div>
                            <div className="my-3">{modal.productContent}</div>
                            <div className="text-2xl mb-5">{modal.productPrice.toLocaleString()}원</div>
                        </div>
                    </div>
                    <div className="mx-3 mt-5 p-3">
                        <h3 className="text-xl font-extrabold mb-5">주문 정보</h3>
                        <div className="mb-2">
                            <span className="w-32 inline-block">
                                이름
                            </span>
                            <span>
                                {modal.name}
                            </span>
                        </div>
                        <div className="mb-2">
                            <span className="w-32 inline-block">
                                전화번호
                            </span>
                            <span>
                                {modal.phone}
                            </span>
                        </div>
                        <div className="mb-2">
                            <span className="w-32 inline-block">
                                주소
                            </span>
                            <span>
                                {modal.address}
                            </span>
                        </div>
                        <div className="mb-2">
                            <span className="w-32 inline-block">
                                결제일자
                            </span>
                            <span>
                                {modal.orderDate}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        :

            <></>

        }


            <div className="flex justify-between items-center pb-5">
                <MypageTitleComponent>구매내역</MypageTitleComponent>
                <SearchBarComponent
                    width="40%"
                    changeFn={handleChangeSearch} clickFn={handleClickSearch}/>
            </div>
    

        {!isLoading ?

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

        serverData.length > 0 ? 

        serverData.map((data, index)=>

            data.dtoList.map((dto, dtoIndex)=>

                <>
                <div className=" bg-white ml-3 flex justify-around mx-auto my-4 p-4 items-center content-center"
                    key={`${data.memberId}-${dto.productId}`}>
                        <img src={dto.uploadFileNames[0] ? `${prefix}/${dto.uploadFileNames[0]}` : "/images/no_image.png"}
                        alt={dto.productTitle} className="w-40 h-40 object-contain"></img>
                    <div className="w-1/3">
                        <h3 className="font-extrabold text-2xl cursor-pointer truncate"
                            onClick={()=>handleClickTitle(dto.productId)}>
                            {dto.productTitle}
                        </h3>
                        <p className="mt-3">{dto.productContent}</p>
                        <span className="text-blue-700 cursor-pointer hover:opacity-50"
                            onClick={()=>handleClickInfo(data, dto)}>
                            자세히보기
                        </span>
                    </div>
                    <div className="text-center">
                        <h3 className="mb-3">수량</h3>
                        <div className="text-2xl">{dto.cartCount}개</div>
                    </div>
                    <div className="text-2xl w-1/6 text-center">
                        {(dto.cartCount * dto.productPrice).toLocaleString()} 원
                    </div>
                    <div className="w-1/6 flex flex-col justify-center items-center">
                        <div className="text-center text-2xl">
                            주문완료
                        </div>
                        {!dto.reviewExist && 
                            <button className="bg-[rgb(224,26,109)] px-2 py-1 mt-3 text-white hover:opacity-80 text-xl font-bold"
                                onClick={()=>handleClickReview(dto)}>
                                리뷰 작성하기
                            </button>
                        }
                    </div>
                </div>
                { (serverData.length - 1 !== index || data.dtoList.length - 1 !== dtoIndex) && <hr className="text-gray-400 ml-3"></hr> }
                </>
                )

            )

            :

            <div className="text-xl text-center p-32">
                구매내역이 없습니다
            </div>
        }

        </section>
    );
}

export default OrdersResultComponent;