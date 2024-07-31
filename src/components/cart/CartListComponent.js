import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartList } from "../../api/cartApi";

const initState = [{
    productTitle: "",
    productContent: "",
    productPrice: 0,
    cartCount: 0
}]

const CratListComponent = () => {

    const [serverData, setServerData] = useState(initState);

    useEffect(()=>{

        getCartList()
            .then(data=>{
                setServerData(data)});
    },[]);


    const navigate = useNavigate();

    const handleClickPay = () => {

        navigate({pathname: `../../orders/pay`});
    }

    return (
        <>
        <section className="w-[1350px] m-auto">

            <h1 className="text-5xl m-10">장바구니</h1>
            
            <div className="ml-20 inline-block">
                <label class="flex items-center justify-between text-xl relative select-none w-32">
                    <input type="checkbox" class="sr-only peer" />
                    <div class="w-10 h-10 bg-white cursor-pointer border-2 border-gray-300 rounded peer-checked:bg-green-500 peer-focus:ring peer-focus:ring-green-500 peer-focus:ring-opacity-50"></div>
                    <svg class="hidden w-10 h-10 text-white pointer-events-none absolute top-0.5 left-0.5 peer-checked:block" fill="none" viewBox="0 0 80 80" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="M22,35 l10,10 l20,-20" />
                    </svg>
                    전체선택
                </label>
            </div>


        {
            serverData.map(data=>(
                <>
                    <div className="flex justify-around w-11/12 mx-auto my-4 p-4 items-center border content-center">
                        <label class="relative select-none">
                            <input type="checkbox" class="sr-only peer" />
                            <div class="w-10 h-10 bg-white cursor-pointer border-2 border-gray-300 rounded peer-checked:bg-green-500 peer-focus:ring peer-focus:ring-green-500 peer-focus:ring-opacity-50"></div>
                            <svg class="hidden w-10 h-10 text-white pointer-events-none absolute top-0.5 left-0.5 peer-checked:block" fill="none" viewBox="0 0 80 80" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="M22,35 l10,10 l20,-20" />
                            </svg>
                        </label>
                        <img src="/images/chi1.jpg" className="w-40 border rounded-xl"></img>
                        <div className="w-1/3">
                            <h3 className="font-extrabold text-2xl">개쩌는상품</h3>
                            <p className="mt-3">이거사세요제발사세요<br/>두번사세요 세번사세요</p>
                        </div>
                        <div className="text-center text-2xl">
                            <h3>수량</h3>
                            <div>1개</div>
                        </div>
                        <div className="text-3xl">50000원</div>
                        <div className="flex flex-col">
                            <button className="bg-blue-500 text-white w-32 h-10 m-1">이 상품 주문</button>
                            <button className="bg-rose-600 text-white w-32 h-10 m-1">이 상품 제거</button>
                        </div>
                    </div>
                </>
            ))
        }
            
            


        </section>

        <section className="bg-green-600 fixed bottom-0 w-screen h-28">
            <div className="max-w-[1350px] m-auto h-full flex items-center justify-end text-white">
                <div className="font-semibold text-3xl">
                    총 3건
                </div>
                <div className="mx-10 font-semibold text-3xl">
                    결제금액 : 150000원
                </div>
                <button className="bg-black px-10 py-5 text-xl"
                    onClick={handleClickPay}>
                    결제하러 가기
                </button>
            </div>
        </section>
        </>
    );
}

export default CratListComponent;