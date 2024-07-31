import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCartOne, getCartList } from "../../api/cartApi";

const initState = [{
    productId: 0,
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



    const handleClickOrder = () => {


    }

    const handleClickDelete = (cartListObj) => {

        // 지금은 사용자가 1번으로 고정되있음
        // 프론트에서할지 백에서 할지 고민중
        // 백이 맞는거같긴함
        // 일단 지금은 사용자도 보내는중

        // 여유가 되면 모달창을 제작해서 바꿀예정
        // eslint-disable-next-line no-restricted-globals
        const ifDel = confirm("정말로 장바구니에서 삭제하시겠습니까?");
  
        if (ifDel) {
        
            deleteCartOne(cartListObj).then(data => {
    
                getCartList().then(data => {
                    setServerData(data);
                });
            });
        }

    }



    const handleClickAllOrder = () => {

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
                            <h3 className="font-extrabold text-2xl">{data.productTitle}</h3>
                            <p className="mt-3">{data.productContent}</p>
                        </div>
                        <div className="text-center text-2xl">
                            <h3>수량</h3>
                            <div>{data.cartCount}개</div>
                        </div>
                        <div className="text-3xl">{data.productPrice}원</div>
                        <div className="flex flex-col">
                            <button className="bg-blue-500 text-white w-32 h-10 m-1">
                                이 상품 주문
                            </button>
                            <button className="bg-rose-600 text-white w-32 h-10 m-1"
                                onClick={()=>{handleClickDelete(data)}}>
                                이 상품 제거
                            </button>
                        </div>
                    </div>
                </>
            ))
        }
        <div className="h-72"></div>
            
            


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
                    onClick={handleClickAllOrder}>
                    결제하러 가기
                </button>
            </div>
        </section>
        </>
    );
}

export default CratListComponent;