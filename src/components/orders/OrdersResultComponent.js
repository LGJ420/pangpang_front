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
    const [modal, setModal] = useState(null);

    useEffect(()=>{
        
        getOrdersList().then(data=>{

            setServerData(data);
        })
    },[]);


    const handleClickInfo = (data, dto) => {

        const modalData = {

            name: data.name,
            address: data.address,
            phone: data.phone,
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
        <section className="w-[1350px] m-auto">

        { modal ? 
        
            <div className="fixed w-full h-full top-0 left-0 z-20 bg-white/90 flex justify-center items-center close"
                onClick={handleClickClose}>
                <div className="w-[720px] bg-white border rounded-lg shadow-md flex flex-col justify-center">

                    <div className="flex">
                        <img src="/images/chi1.jpg" className="w-52 border rounded m-3"></img>
                        <div className="flex flex-col flex-1">
                            <button className="self-end m-3 bg-red-500 px-3 py-2 text-white rounded-sm close"
                                onClick={handleClickClose}>
                                X
                            </button>
                            <div className="text-3xl font-bold">{modal.productTitle}</div>
                            <div className="my-3">{modal.productContent}</div>
                            <div className="text-2xl">{modal.productPrice.toLocaleString()}원</div>
                        </div>
                    </div>
                    <div className="mx-3 border rounded p-3">
                        <h3 className="text-xl font-extrabold">주문 정보</h3>
                        <div className="mb-1">이름 : {modal.name}</div>
                        <div className="mb-1">전화번호 : {modal.phone}</div>
                        <div>주소 : {modal.address}</div>
                    </div>
                    <div className="text-right my-2 mr-3">2024-08-06</div>
                </div>
            </div>

        :

            <></>

        }

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
                            <span className="text-blue-700 cursor-pointer hover:opacity-50"
                                onClick={()=>handleClickInfo(data, dto)}>
                                자세히보기
                            </span>
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