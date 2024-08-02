import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCartOne, getCartList } from "../../api/cartApi";

// const initState = [{
//     productId: 0,
//     productTitle: "",
//     productContent: "",
//     productPrice: 0,
//     cartCount: 0
// }]

const CratListComponent = () => {

    const [orderList, setOrderList] = useState([]);
    const [selectAll, setSelectAll] = useState(true);
    const [serverData, setServerData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();




    useEffect(()=>{
        console.log(orderList);
    }, [orderList]);




    useEffect(() => {
        const total = orderList.reduce((acc, item) => acc + item.productPrice * item.cartCount, 0);
        setTotalAmount(total);

    }, [orderList]);




    useEffect(() => {
        getCartList()
            .then(data => {
                const newData = data.map(item => ({
                    ...item,
                    checked: true  // 모든 항목을 체크된 상태로 초기화
                }));
                setServerData(newData);
                setOrderList(newData);  // 주문 목록도 모든 항목으로 초기화
            });
    }, []);


    const handleClickAllCheck = (checked) => {
        setSelectAll(checked);
        const updatedData = serverData.map(item => ({
            ...item,
            checked: checked
        }));
        setServerData(updatedData);
        setOrderList(updatedData.filter(item => item.checked));
    };

    const handleClickCheck = (id) => {
        const updatedData = serverData.map(item => {
            if (item.productId === id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });

        setServerData(updatedData);
        const newOrderList = updatedData.filter(item => item.checked);
        setOrderList(newOrderList);
        setSelectAll(updatedData.every(item => item.checked));
    };

    const handleClickDelete = (cartListObj) => {

        // 지금은 사용자가 1번으로 고정되있음
        // 프론트에서할지 백에서 할지 고민중
        // 백이 맞는거같긴함
        // 일단 지금은 사용자도 보내는중

        // 여유가 되면 모달창을 제작해서 바꿀예정
        // eslint-disable-next-line no-restricted-globals
        const ifDel = confirm("정말로 장바구니에서 삭제하시겠습니까?");
        if (ifDel) {
            deleteCartOne(cartListObj).then(() => {
                getCartList().then(data => {
                    const newData = data.map(item => ({
                        ...item,
                        checked: true
                    }));
                    setServerData(newData);
                    setOrderList(newData);
                });
            });
        }
    }

    const handleClickAllOrder = () => {
        navigate("/orders/pay", {state : {orderList}});
    }

    return (
        <>
        <section className="w-[1350px] m-auto">

            <h1 className="text-5xl m-10">장바구니</h1>
            
            <div className="ml-20 inline-block">
                <label className="flex items-center justify-between text-xl relative select-none w-32">
                    <input type="checkbox"
                        className="sr-only peer"
                        checked={selectAll}
                        onChange={(e)=>handleClickAllCheck(e.target.checked)} />
                    <div className="w-10 h-10 bg-white cursor-pointer border-2 border-gray-300 rounded peer-checked:bg-blue-500 peer-focus:ring peer-focus:ring-blbg-blue-500 peer-focus:ring-opacity-50"></div>
                    <svg className="hidden w-10 h-10 text-white pointer-events-none absolute top-0.5 left-0.5 peer-checked:block" fill="none" viewBox="0 0 80 80" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M22,35 l10,10 l20,-20" />
                    </svg>
                    전체선택
                </label>
            </div>


        { serverData.length > 0 ?

            serverData.map((data, index)=>(
                    <div key={index} className="flex justify-around w-11/12 mx-auto my-4 p-4 items-center border content-center shadow ">
                        <label className="relative select-none">
                            <input type="checkbox"
                                className="sr-only peer"
                                checked={data.checked}
                                onChange={()=>handleClickCheck(data.productId)} />
                            <div className="w-10 h-10 bg-white cursor-pointer border-2 border-gray-300 rounded peer-checked:bg-blue-500 peer-focus:ring peer-focus:ring-blbg-blue-500 peer-focus:ring-opacity-50"></div>
                            <svg className="hidden w-10 h-10 text-white pointer-events-none absolute top-0.5 left-0.5 peer-checked:block" fill="none" viewBox="0 0 80 80" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M22,35 l10,10 l20,-20" />
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
                        <div className="text-3xl">{data.productPrice.toLocaleString()}원</div>
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

            

            ))

            :
            
            <div className="flex justify-around w-11/12 text-2xl font-semibold mx-auto my-4 py-52 items-center content-center">
                장바구니가 비어있습니다
            </div>
        }
        <div className="h-72"></div>
            
            


        </section>
        

        <section className="bg-black fixed bottom-0 w-screen h-28">
            <div className="max-w-[1350px] m-auto h-full flex items-center justify-end text-white">
                <div className="font-semibold text-3xl">
                    총 {orderList.length}건
                </div>
                <div className="mx-10 font-semibold text-3xl">
                    결제금액 : {totalAmount.toLocaleString()}원
                </div>
                <button className="bg-zinc-400 px-10 py-5 text-xl hover:bg-blue-500"
                    onClick={handleClickAllOrder}>
                    결제하러 가기
                </button>
            </div>
        </section>
        </>
    );
}

export default CratListComponent;