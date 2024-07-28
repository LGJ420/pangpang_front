const OrdersResultComponent = () => {

    return (
        <section className="w-[1350px] m-auto">

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
    
            <div className="flex justify-around w-11/12 mx-auto my-4 p-4 items-center border content-center">
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
                <div className="">주문완료</div>
            </div>
            <div className="flex justify-around w-11/12 mx-auto my-4 p-4 items-center border content-center">
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
                <div className="">주문완료</div>
            </div>
            <div className="flex justify-around w-11/12 mx-auto my-4 p-4 items-center border content-center">
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
                <div className="">주문완료</div>
            </div>

            
        </section>
    );
}

export default OrdersResultComponent;