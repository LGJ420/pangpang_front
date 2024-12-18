import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCartOne, getCartList, putCartOne } from "../../api/cartApi";
import useCustomToken from "../../hooks/useCustomToken";
import { CloseButton, Spinner } from "@chakra-ui/react";
import { logout } from '../../hooks/logout';


// const initState = [{
//     productId: 0,
//     productTitle: "",
//     productContent: "",
//     productPrice: 0,
//     cartCount: 0
// }]

const prefix = `/api/productreview/view`;

const CratListComponent = () => {

    const [orderList, setOrderList] = useState([]);
    const [selectAll, setSelectAll] = useState(true);
    const [serverData, setServerData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    const navigate = useNavigate();


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
            })
            .catch(e => {
                console.log(e)
                if (e.response.status === 401) {
                    alert("토큰 유효 시간이 만료되었습니다.")
                    logout(); // import { logout } from '../../hooks/logout'; 추가 필요
                }
            })
            .finally(() => setIsLoading(true));
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



    const handleClickTitle = (id) => {

        navigate(`/product/read/${id}`);
    }



    const handleClickAmount = (productId, delta) => {

        serverData.map(item => {
            if (item.productId === productId) {
                const newCount = item.cartCount + delta;

                if (newCount < 1) {
                    return item;
                } else if (newCount > 10) {
                    alert("상품의 최대 수량은 10개입니다.");
                    return item;
                } else if(newCount > item.productStock) {
                    alert("상품의 재고가 모자랍니다.");
                    return item;
                }


                putCartOne({ ...item, cartCount: newCount })
                    .then(() => {

                        const newServerData = serverData.map(subItem =>
                            subItem.productId === productId ? { ...subItem, cartCount: newCount } : subItem
                        );

                        setServerData(newServerData);
                        setOrderList(newServerData.filter(item => item.checked));
                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            alert("토큰 유효 시간이 만료되었습니다.")
                            logout(); // import { logout } from '../../hooks/logout'; 추가 필요
                        }
                    });

                return;
            }
            return;
        });
    };


    const handleClickDelete = (cartListObj) => {

        // 여유가 되면 모달창을 제작해서 바꿀예정
        // eslint-disable-next-line no-restricted-globals
        const ifDel = confirm("정말로 장바구니에서 삭제하시겠습니까?");
        if (ifDel) {
            deleteCartOne(cartListObj)
                .then(() => {
                    getCartList().then(data => {
                        const newData = data.map(item => ({
                            ...item,
                            checked: true
                        }));
                        setServerData(newData);
                        setOrderList(newData);
                    });
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        alert("토큰 유효 시간이 만료되었습니다.")
                        logout(); // import { logout } from '../../hooks/logout'; 추가 필요
                    }
                });
        }
    }


    const handleClickOrder = (order) => {

        console.log(order);
        navigate("/orders/pay", { state: { order } });
    }



    const handleClickAllOrder = () => {

        if (orderList.length === 0) {

            alert("선택한 상품이 없습니다");
            return;
        }

        navigate("/orders/pay", { state: { orderList } });
    }



    return (
        <>
            <section className="w-[1350px] m-auto">

                <h1 className="text-5xl m-10">장바구니</h1>

                {serverData.length > 0 ?

                    <div className="ml-20 inline-block">
                        <label className="flex items-center justify-between text-xl relative select-none w-32">
                            <input type="checkbox"
                                className="sr-only peer"
                                checked={selectAll}
                                onChange={(e) => handleClickAllCheck(e.target.checked)} />
                            <div className="w-10 h-10 bg-white cursor-pointer border-2 border-gray-300 rounded peer-checked:bg-[rgb(224,26,109)] peer-focus:ring peer-focus:ring-[rgb(224,26,109)] peer-focus:ring-opacity-50"></div>
                            <svg className="hidden w-10 h-10 text-white pointer-events-none absolute top-0.5 left-0.5 peer-checked:block" fill="none" viewBox="0 0 80 80" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M22,35 l10,10 l20,-20" />
                            </svg>
                            전체선택
                        </label>
                    </div>

                    :

                    <>
                    </>

                }

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

                        serverData.map((data, index) => (
                            <div key={index} className="flex justify-around w-11/12 mx-auto my-4 p-4 items-center border content-center shadow ">
                                <label className="relative select-none">
                                    <input type="checkbox"
                                        className="sr-only peer"
                                        checked={data.checked}
                                        onChange={() => handleClickCheck(data.productId)} />
                                    <div className="w-10 h-10 bg-white cursor-pointer border-2 border-gray-300 rounded peer-checked:bg-[rgb(224,26,109)] peer-focus:ring peer-focus:ring-[rgb(224,26,109)] peer-focus:ring-opacity-50"></div>
                                    <svg className="hidden w-10 h-10 text-white pointer-events-none absolute top-0.5 left-0.5 peer-checked:block" fill="none" viewBox="0 0 80 80" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M22,35 l10,10 l20,-20" />
                                    </svg>
                                </label>
                                <img src={data.uploadFileNames[0] ? `${prefix}/${data.uploadFileNames[0]}` : "/images/no_image.png"}
                                    onError={(e) => {
                                        e.target.onError = null;
                                        e.target.src = "/images/no_image.png";
                                    }}
                                    className="ml-5 object-contain h-40 w-40" />
                                <div className="w-1/3 mx-10">
                                    <h3 className="font-extrabold text-2xl cursor-pointer"
                                        onClick={() => handleClickTitle(data.productId)}>
                                        {data.productTitle}
                                    </h3>
                                    <p className="mt-3">{data.productContent}</p>
                                </div>
                                <div className="text-center text-2xl w-40">
                                    <h3 className="mb-3">수량</h3>
                                    <div className="flex justify-between items-center border-3">



                                        <button className="w-10 h-10 text-sm font-semibold hover:opacity-30"
                                            onClick={() => handleClickAmount(data.productId, -1)}>
                                            ㅡ
                                        </button>
                                        <div className="mx-2 font-bold">{data.cartCount}</div>
                                        <button className="w-10 h-10 hover:opacity-30"
                                            onClick={() => handleClickAmount(data.productId, 1)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="text-3xl text-center w-52">
                                    {(data.productPrice * data.cartCount).toLocaleString()}원
                                </div>
                                <div className="flex flex-col">
                                    {/* <button className="bg-[rgb(224,26,109)] text-white w-32 h-10 m-1"
                                onClick={()=>{handleClickOrder(data)}}>
                                이 상품 주문
                            </button> */}
                                    <CloseButton className="mb-28" onClick={() => { handleClickDelete(data) }} />
                                </div>
                            </div>



                        ))

                        :

                        <div className="flex flex-col w-11/12 text-2xl font-semibold mx-auto py-40 items-center">
                            <img src="/images/no_cart.png" className="w-40" />
                            <div className="m-10">
                                장바구니가 비어있습니다
                            </div>
                        </div>
                }
                <div className="h-72"></div>

            </section>

            {serverData.length > 0 ?

                <section className="border-t bg-white fixed bottom-0 w-screen h-20">
                    <div className="max-w-[1350px] m-auto h-full flex items-center justify-end text-[rgb(224,26,109)]">
                        <div className="font-semibold text-3xl">
                            총 {orderList.length}건
                        </div>
                        <div className="mx-10 font-semibold text-3xl">
                            결제금액 : {totalAmount.toLocaleString()}원
                        </div>
                        <button className="bg-[rgb(224,26,109)] text-white px-10 h-full text-3xl font-bold hover:bg-indigo-500"
                            onClick={handleClickAllOrder}>
                            결제하러 가기
                        </button>
                    </div>
                </section>

                :

                <></>

            }

        </>
    );
}

export default CratListComponent;