const ProductListGrid = () => {

  return (

    <section>
      <h1 className="text-5xl p-10">상점페이지</h1>

      {/* 상품 정렬 */}
      <ul className="flex text-2xl text-center">
        <li className="m-2">추천순</li>
        <li className="m-2">최신순</li>
      </ul>


      {/* 상품 목록 리스트 */}
      <ul className="flex">
        <li className="text-center">
          <a href="상세페이지로 이동">
            <img src="/images/chi1.jpg" className="w-60"></img>
            <p>기여운 치이카와</p>
            <p>500,000원</p>
          </a>
        </li>

        <li className="text-center">
          <a href="상세페이지로 이동">
            <img src="/images/chi2.jpg" className="w-60"></img>
            <p>기여운 하치와레</p>
            <p>500,000원</p>
          </a>
        </li>
      </ul>


    </section>
  );
}

export default ProductListGrid;