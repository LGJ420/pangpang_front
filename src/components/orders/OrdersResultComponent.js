import { useEffect, useState } from "react";
import { getOrdersList } from "../../api/ordersApi";

const initData = [{
    name: "",
    address: "",
    phone: "",
    memberId: 0,
    dtoList: [{
        productId: 0,
        productTitle: "",
        productContent: "",
        productPrice: 0,
        cartCount: 0
    }]
}]


const OrdersResultComponent = () => {

    const [serverData, setServerData] = useState(initData);

    useEffect(()=>{
        
        getOrdersList().then(data=>{

            setServerData(data);
        })
    },[]);


    return (
        <section className="w-[1350px] m-auto">

            <div className="fixed w-full h-full top-0 left-0 z-20 bg-white/90 flex justify-center items-center">
                <div className="w-1/2 h-1/2 min-w-[675px] bg-white border rounded-lg shadow-md flex flex-col justify-center">
                    <div className="flex justify-between">
                        <img src="/images/chi1.jpg" className="w-52"></img>
                        <div>
                            <div>{serverData[0].dtoList[0].productTitle}</div>
                            <div>{serverData[0].dtoList[0].productContent}</div>
                            <div>{serverData[0].dtoList[0].productPrice}</div>
                        </div>
                    </div>
                    <div>
                        <h3>주문 정보</h3>
                        <div>이름 : 개똥이</div>
                        <div>전화번호 : 01012341234</div>
                        <div>주소 : 개똥집에 삽니다</div>
                        <div>결제일자 : 2024-08-06</div>
                    </div>
                </div>
            </div>

            <h1 className="text-5xl m-10">주문내역</h1>

            <div className="flex justify-center">
                <div className="flex justify-around border-2 rounded-3xl w-3/4 overflow-hidden focus-within:border-blue-500 focus-within:shadow-outline">
                    <input className="px-4 py-2 w-11/12 focus:outline-none" type="text" placeholder="검색" />
                    <button className="flex items-center justify-center px-4 border-l">
                        <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
    

        {
            serverData ? 

            serverData.map(data=>

                data.dtoList.map(dto=>

                    <div className="flex justify-around w-11/12 mx-auto my-4 p-4 items-center border content-center shadow">
                        <img src="/images/chi1.jpg" className="w-40 border rounded-xl"></img>
                        <div className="w-1/3">
                            <h3 className="font-extrabold text-2xl">{dto.productTitle}</h3>
                            <p className="mt-3">{dto.productContent}</p>
                            <span className="text-blue-700 cursor-pointer hover:opacity-50">자세히보기</span>
                        </div>
                        <div className="text-center">
                            <h3 className="mb-3">수량</h3>
                            <div className="text-3xl">{dto.cartCount}개</div>
                        </div>
                        <div className="text-3xl w-1/6 text-center">{(dto.cartCount * dto.productPrice).toLocaleString()} 원</div>
                        <div className="">주문완료</div>
                    </div>
                )

            )

            :

            <>
            </>
        }

        </section>
    );
}

export default OrdersResultComponent;