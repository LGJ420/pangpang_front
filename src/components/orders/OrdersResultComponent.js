import { useEffect, useState } from "react";
import { getOrdersList } from "../../api/ordersApi";
import { useNavigate } from "react-router-dom";

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


const OrdersResultComponent = () => {

    const [serverData, setServerData] = useState([]); // 데이터
    const [modal, setModal] = useState(null); // 모달창
    const [refresh, setRefresh] = useState(false); // 새로고침용
    const [word, setWord] = useState(""); // 검색창 글

    const navigate = useNavigate();


    useEffect(()=>{
        
        getOrdersList(word).then(data=>{

            setServerData(data);
            console.log(data);
        }).catch(e=>console.log(e));

    },[refresh]);


    const handleChangeSearch = (e) => {

        setWord(e.target.value);
    }


    /* 검색 인풋창 엔터키만 눌러도 검색 */
    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            handleClickSearch();
        }
    }


    const handleClickSearch = () => {

        setRefresh(!refresh);
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
                <div className="w-[720px] p-4 bg-white border rounded-lg shadow-md flex flex-col justify-center">

                    <div className="flex">
                        <img src="/images/chi1.jpg" className="w-56 border rounded m-3"></img>
                        <div className="flex flex-col flex-1 ml-7">
                            <button className="self-end m-3 bg-red-500 px-3 py-1 text-white rounded-sm close"
                                onClick={handleClickClose}>
                                X
                            </button>
                            <div className="w-4/5 text-3xl font-bold">{modal.productTitle}</div>
                            <div className="my-3">{modal.productContent}</div>
                            <div className="text-2xl mb-5">{modal.productPrice.toLocaleString()}원</div>
                        </div>
                    </div>
                    <div className="mx-3 mt-5 border rounded p-3">
                        <h3 className="text-xl font-extrabold mb-5">주문 정보</h3>
                        <div className="mb-1">이름 : {modal.name}</div>
                        <div className="mb-1">전화번호 : {modal.phone}</div>
                        <div>주소 : {modal.address}</div>
                    </div>
                    <div className="text-right my-2 mr-3">결제일자 : {modal.orderDate}</div>
                </div>
            </div>

        :

            <></>

        }

            <h1 className="text-xl ml-5 font-bold">구매내역</h1>

            <div className="flex justify-center">
                <div className="flex justify-around border-2 rounded-3xl w-3/4 overflow-hidden focus-within:border-blue-500 focus-within:shadow-outline">
                    <input className="px-4 py-2 w-11/12 focus:outline-none" type="text" placeholder="검색"
                        onChange={(e)=>handleChangeSearch(e)}
                        onKeyDown={handleKeyDown} />
                    <button className="flex items-center justify-center px-4 border-l"
                        onClick={handleClickSearch}>
                        <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
    

        {
            serverData.length > 0 ? 

            serverData.map(data=>

                data.dtoList.map(dto=>

                    <div className="bg-white flex justify-around w-11/12 mx-auto my-4 p-4 items-center border content-center">
                        <img src={`http://localhost:8080/api/product/view/${dto.uploadFileNames}` || '/images/chi1.jpg'}
                            alt={dto.productTitle} className="w-40 border rounded-xl"></img>
                        <div className="w-1/3">
                            <h3 className="font-extrabold text-2xl">{dto.productTitle}</h3>
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
                        <div className="text-2xl w-1/6 text-center">{(dto.cartCount * dto.productPrice).toLocaleString()} 원</div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="">주문완료</div>
                            <button className="bg-yellow-600 px-3 py-1 mt-3 text-white rounded-xl hover:opacity-90">리뷰 작성하기</button>
                        </div>
                    </div>
                )

            )

            :

            <div className="text-center m-32">
                주문 내역이 없습니다
            </div>
        }

        </section>
    );
}

export default OrdersResultComponent;