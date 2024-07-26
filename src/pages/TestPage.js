import BasicWidthLimitLayout from "../layouts/BasicWidthLimitLayout";

const TestPage = () => {

    return (
        <BasicWidthLimitLayout>

        <section>

            <h1 className="text-5xl m-10">장바구니</h1>
            
            <div className="ml-20">
                <label className="flex items-center text-2xl">
                    <input type="checkbox" className="w-10 h-10 mr-4 appearance-none border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent focus:outline-none"></input>
                    전체선택
                </label>
            </div>

            <div className="flex justify-around w-11/12 mx-auto my-4 p-4 items-center border content-center">
                <input type="checkbox" className="w-10 h-10 mr-4 appearance-none border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent focus:outline-none"></input>
                <img src="/images/chi1.jpg" className="w-52 border rounded-xl"></img>
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
            <div className="flex justify-around w-11/12 mx-auto my-4 p-4 items-center border content-center">
                <input type="checkbox" className="w-10 h-10 mr-4 appearance-none border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent focus:outline-none"></input>
                <img src="/images/chi2.jpg" className="w-52 border rounded-xl"></img>
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
            <div className="flex justify-around w-11/12 mx-auto my-4 p-4 items-center border content-center">
                <input type="checkbox" className="w-10 h-10 mr-4 appearance-none border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent focus:outline-none"></input>
                <img src="/images/chi3.jpg" className="w-52 border rounded-xl"></img>
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
            
            
            


        </section>

        </BasicWidthLimitLayout>


    )
}

export default TestPage;