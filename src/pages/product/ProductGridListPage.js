import { Link } from "react-router-dom";
import ProductDetailPage from "./ProductDetailPage";

const ProductGridListPage = () => {

  return (

    <section>
      <h1 className="text-5xl p-10 border-b">상점페이지</h1>

      {/* 상품 정렬 */}
      <ul className="flex text-2xl text-center pl-10 pt-5">
        <li className="m-2"><a href="추천순 정렬"><button>추천순</button></a></li>
        <li className="m-2"><a href="최신순 정렬">최신순</a></li>
      </ul>


      {/* 상품 목록 리스트 */}
      <ul className="grid grid-cols-3 gap-4">
        <li className="text-center">
          {/* <Link to={`/detail/${product.id}`}> */}
            <img src="/images/chi1.jpg" className="w-60 mx-auto"></img>
            <p className="">기여운 치이카와</p>
            <p>500,000원</p>
          {/* </Link> */}
            <span><a href="장바구니 페이지로 이동">장바구니 담기</a></span>
            <span><a href="구매 페이지로 이동">바로 구매하기</a></span>
        </li>

        <li className="text-center">
          {/* <Link to={`/detail/${product.id}`}>  */}
          <img src="/images/chi2.jpg" className="w-60 mx-auto"></img>
            <p>기여운 하치와레</p>
            <p>500,000원</p>
          {/* </Link> */}
            <span><a href="장바구니 페이지로 이동">장바구니 담기</a></span>
            <span><a href="구매 페이지로 이동">바로 구매하기</a></span>
        </li>

        <li className="text-center">
          {/* <Link to={`/detail/${product.id}`}>  */}
          <img src="/images/chi3.jpg" className="w-60 mx-auto"></img>
          <p>기여운 우사기</p>
          <p>500,000원</p>
          {/* </Link> */}
          <span><a href="장바구니 페이지로 이동">장바구니 담기</a></span>
          <span><a href="구매 페이지로 이동">바로 구매하기</a></span>
        </li>
      </ul>


    </section>
  );
}

export default ProductGridListPage;