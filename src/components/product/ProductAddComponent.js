const ProductAddComponent = () => {

    return (
        <section>
            <div className="border-b p-10">
                <h1 className="text-5xl">상품 추가</h1>
            </div>
            <div className="text-2xl my-10 m-auto">
                <div>
                    <label
                        className="m-3 font-extrabold">
                        사진
                    </label>
                    <button
                        className="w-32 h-10 mt-1 bg-slate-400 text-white rounded hover:opacity-80 text-lg">
                        사진 등록하기
                    </button>
                </div>
                <div className="my-10 flex flex-col">
                    <label
                        className="m-3 font-extrabold"
                        htmlFor="productCategory">
                        카테고리
                    </label>
                    <select 
                        className="p-3 rounded border w-1/4"
                        id="productCategory"
                        name="productCategory">
                        <option value="Game">게임 / CD</option>
                        <option value="Console">게임기기</option>
                        <option value="Figure">피규어 / 굿즈</option>
                    </select>
                </div>
                <div className="my-10 flex flex-col">
                    <label
                        className="m-3 font-extrabold"
                        htmlFor="productTitle">
                        제목
                    </label>
                    <input 
                        className="p-3 rounded border w-4/5"
                        id="productTitle"
                        name="productTitle"
                        placeholder="제목을 적어주세요."
                        maxLength={50}/>
                </div>
                <div className="my-10 flex flex-col">
                    <label
                        className="m-3 font-extrabold"
                        htmlFor="productContent">
                        소제목
                    </label>
                    <input 
                        className="p-3 rounded border"
                        id="productContent"
                        name="productContent"
                        placeholder="간단한 설명을 적어주세요."
                        maxLength={70}/>
                </div>
                <div className="my-10 flex flex-col">
                    <label
                        className="m-3 font-extrabold"
                        htmlFor="productPrice">
                        가격
                    </label>
                    <input 
                        className="p-3 rounded border w-1/4"
                        id="productPrice"
                        name="productPrice"
                        placeholder="가격을 적어주세요."
                        maxLength={10}/>
                </div>
                <div className="my-10 flex flex-col">
                    <label
                        className="m-3 font-extrabold"
                        htmlFor="productDetailContent">
                        상세설명
                    </label>
                    <textarea 
                        className="p-3 rounded border h-96"
                        id="productDetailContent"
                        name="productDetailContent"
                        placeholder="자세한 설명을 적어주세요."
                        maxLength={500}/>
                </div>
                <div className="flex justify-center">
                    <button
                        className="w-52 h-16 text-3xl bg-orange-600 text-white rounded-2xl hover:opacity-80">
                        등록
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ProductAddComponent;