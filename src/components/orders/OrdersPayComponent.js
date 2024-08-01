import { Link, useLocation, useNavigate } from "react-router-dom";

const OrdersPayComponent = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleClickPay = () => {

        navigate({pathname: `../result`});
    }
    

    return (

        <div className="bg-green-700 min-w-[768px] min-h-screen">
            <div className="max-w-[1350px] min-w-[768px] m-auto">
                <div className="pt-10 pl-10 pb-4">
                    <Link to={'/'}>
                        <img src="/images/b_logo_r2.png" className="w-56"></img>
                    </Link>
                    <h1 className="text-white text-4xl font-bold mt-4">결제</h1>
                </div>
{console.log(location.state.orderList)}
                <div className="flex">

                    <div className="w-2/3 flex flex-col items-center">

                    <div className="bg-white w-11/12 my-2 p-4 rounded-lg">
                        <h3 className="text-xl font-bold">배송지</h3>
                        <hr className="my-3"/>
                        <div className="mb-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                className="mt-1 block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-emerald-500"
                                placeholder="이름을 입력하세요" 
                                maxLength={10}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="phone1" className="block text-sm font-medium text-gray-700">전화번호</label>
                            <div className="flex">
                                <input 
                                    type="text" 
                                    id="phone1" 
                                    name="phone1" 
                                    className="mt-1 mr-2 w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-emerald-500"
                                    placeholder="010" 
                                    maxLength="3"
                                />
                                <input 
                                    type="text" 
                                    id="phone2" 
                                    name="phone2" 
                                    className="mt-1 mr-2 w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-emerald-500"
                                    placeholder="1234" 
                                    maxLength="4"
                                />
                                <input 
                                    type="text" 
                                    id="phone3" 
                                    name="phone3" 
                                    className="mt-1 w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-emerald-500"
                                    placeholder="5678" 
                                    maxLength="4"
                                />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">주소</label>
                            <input 
                                type="text" 
                                id="address" 
                                name="address" 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-emerald-500"
                                placeholder="주소를 입력하세요" 
                            />
                        </div>
                    </div>

                        <div className="bg-white w-11/12 my-2 p-4 rounded-lg">
                            <h3 className="text-xl font-bold">주문상품</h3>


                            { location.state ? 

                                location.state.orderList.map(order=>

                                <>
                                <hr className="my-3"/>
                                <div className="flex items-center">
                                    <img src="/images/chi1.jpg" className="w-24 h-24 border rounded"></img>
                                    <div className="ml-5">
                                        <h3 className="text-lg font-extrabold">{order.productTitle}</h3>
                                        <p className="text-xs">{order.productContent}</p>
                                        <div className="font-bold mt-3">{order.cartCount}개</div>
                                    </div>
                                    <div className="ml-auto text-3xl font-semibold">
                                        {order.productPrice}원
                                    </div>
                                </div>
                                </>

                                )

                            :
                                <>
                                </>
                        
                            }
                        </div>

                        <div className="bg-white w-11/12 my-2 p-4 rounded-lg">
                            <h3 className="text-xl font-bold">결제수단</h3>
                            <hr className="my-3"/>
                            <div className="flex items-center mb-4">
                                <input 
                                    type="radio" 
                                    id="payment-card" 
                                    name="payment" 
                                    value="card" 
                                    className="mr-2"
                                />
                                <label htmlFor="payment-card" className="cursor-pointer">
                                    카드결제
                                </label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input 
                                    type="radio" 
                                    id="payment-account" 
                                    name="payment" 
                                    value="account" 
                                    className="mr-2"
                                />
                                <label htmlFor="payment-account" className="cursor-pointer">
                                    계좌이체
                                </label>
                            </div>

                        </div>

                    </div>



                    <div className="w-1/3 mr-2 flex flex-col items-center">
                    
                        <div className="bg-white w-11/12 rounded-lg mt-2 p-4 sticky top-3">
                            <h3 className="text-xl font-bold">총 결제금액</h3>
                            <hr className="my-3"/>

                            { location.state ? 

                            location.state.orderList.map(order=>

                            <div className="text-right mb-5 text-gray-400">
                                <div>
                                    {order.productTitle}
                                </div>
                                <div>
                                    {order.productPrice}원 x {order.cartCount}개 = {order.productPrice * order.cartCount}원
                                </div>
                            </div>
                            

                            )

                            :
                            <>
                            </>

                            }

                            <div className="h-[120px] text-right text-4xl font-extrabold">
                                총 {location.state.orderList.reduce((acc, item) => acc + item.productPrice * item.cartCount, 0)}원
                            </div>

                            <button className="bg-green-600 rounded-md text-white h-14 w-52 absolute bottom-3 right-1/2 translate-x-1/2 hover:opacity-80"
                                onClick={handleClickPay}>
                                결제하기
                            </button>
                        </div>


                    </div>



                </div>
            </div>

        </div>
        
    );
}

export default OrdersPayComponent;