import { useEffect, useState } from "react"
import { Box, ButtonGroup, Flex, Image, Text } from '@chakra-ui/react'

import { deleteProduct, getOne } from "../../api/productApi";
import { useNavigate } from "react-router-dom";
import { postCartAdd } from "../../api/cartApi";
import { getReviewList } from "../../api/productReviewApi";
import RatingStarCompoent from "../common/RatingStarComponent";
import useCustomToken from "../../hooks/useCustomToken";
import useCustomMove from "../../hooks/useCustomMove"
import { logout } from '../../hooks/logout';

/* 초기값 설정 */
const initState = {
  id: 0,
  productTitle: '',
  productContent: '',
  productPrice: 0,
  productDetailContent: ''
}

const prefix = "http://localhost:8080/api/productreview/view";

const ProductDetailComponent = ({ num }) => {

  const [product, setProduct] = useState(initState);
  const [selectedImages, setSelectedImages] = useState('');
  const [selectedTab, setSelectedTab] = useState('product');
  const { isLogin, decodeToken } = useCustomToken();
  const { moveToList } = useCustomMove();

  // 임시
  const [reviewData, setReviewData] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOne(num);
        setProduct(data);

        // 첫 번째 이미지를 초기 대표 이미지로 설정
        if (data.uploadFileNames && data.uploadFileNames.length > 0) {
          setSelectedImages(`${prefix}/${data.uploadFileNames[0]}`);
        } 

        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
        }
        
      } catch (error) {
        // console.error(error);
      }


      try {
        getReviewList(num).then(data => {
          setReviewData(data);
        });
      }
      catch (error) {
        // console.error(error);
      }
    };

    if (num) {
      fetchData();
    }
  }, [num]);


  // 상품 삭제
  const handleClickDelete = async () => {

    // 여유가 되면 모달창을 제작해서 바꿀예정
    // eslint-disable-next-line no-restricted-globals
    const ifDel = confirm("정말로 삭제하시겠습니까?");

    if (ifDel) {

      try {
        // 상품 삭제 요청
        const response = await deleteProduct(num);
        // 삭제가 성공한 경우 목록 페이지로 이동
        alert("상품이 삭제되었습니다.");
        moveToList();
      } catch (e) {
        // console.error('삭제 오류:', e);
        if (e.response.status === 401) {
          alert("토큰 유효 시간이 만료되었습니다.");
          logout();

        } else {
          alert(`상품 삭제에 실패했습니다: ${e.message}`);
        }
      }

    }
  }


  /* 이미지 클릭 시 대표 이미지 변경 */
  const handleClickImage = (fileName) => {
    setSelectedImages(`${prefix}/${fileName}`);
  }


  /* 구매하기 */
  const handleClickBuy = (product) => {

    if (!isLogin) {
      alert("로그인이 필요합니다");
      return navigate('/login');
    }


    if (product.productStock <= 0) {
      alert("품절된 상품입니다");
      return navigate('/product/list');
    }


    // eslint-disable-next-line no-restricted-globals
    const goBuy = confirm("구매하시겠습니까?");

    if (!goBuy) {

      return;
    }

    const order = {

      productId: product.id,
      productTitle: product.productTitle,
      productContent: product.productContent,
      productPrice: product.productPrice,
      uploadFileNames: product.uploadFileNames,
      cartCount: 1,
    }

    navigate("/orders/pay", { state: { order } });
  }


  /* 장바구니 */
  const handleClickCart = (product) => {

    if (!isLogin) {
      alert("로그인이 필요합니다");
      return navigate('/login');
    }

    if (product.productStock <= 0) {
      alert("품절된 상품입니다");
      return navigate('/product/list');
    }

    const cartObj = {

      productId: product.id,
      cartCount: 1,
    }

    postCartAdd(cartObj)
      .then(() => {

        alert("장바구니에 상품이 등록되었습니다")


        // 여유가 되면 모달창을 제작해서 바꿀예정
        // eslint-disable-next-line no-restricted-globals
        const goToCart = confirm("장바구니 페이지로 이동하시겠습니까?");

        if (goToCart) {

          navigate({ pathname: '../../cart' });
        }

      })
      .catch(error => {
        if (error.response.status === 401) {
          alert("토큰 유효 시간이 만료되었습니다.")
          logout(); // import { logout } from '../../hooks/logout'; 추가 필요
        }
      });
  }

  // 상품 수정 페이지로 이동
  const handleClickModify = () => {

    navigate(`../modify/${product.id}`);
  }


  // 상품 카톡 공유하기
  const handleKakaoShare = () => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
      }

      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: product.productTitle,
          description: product.productContent,
          imageUrl: selectedImages,
          link: {
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 공유 중 오류가 발생했습니다.");
      // console.error("Kakao SDK is not loaded or initialized.");
    }
  }



  return (
    <section>
      <div className="flex p-10 mb-10 border-b justify-between">
        <h1 className="text-5xl cursor-pointer"
          onClick={() => navigate(`/product`)}>
          쇼핑
        </h1>

        {
          decodeToken.memberRole === 'Admin' &&
          <div className="flex">
            <button className="mr-5 border border-[rgb(77,160,124)] text-[rgb(77,160,124)] w-20 h-16 hover:opacity-80 font-bold text-xl"
              onClick={handleClickModify}>
              수정
            </button>

            <button className="border border-[rgb(166,23,45)] text-[rgb(166,23,45)] w-20 h-16 hover:opacity-80 font-bold text-xl"
              onClick={handleClickDelete}>
              삭제
            </button>
          </div>
        }
      </div>

      <div className="flex justify-center items-center p-5">

        <div className="flex-1 text-center">
          <img
            src={selectedImages}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/no_image.png";
            }}
            alt={product.productTitle}
            className="mx-auto h-80 object-contain"
          />

          <div className="flex flex-wrap items-center justify-center">
            {product.uploadFileNames && product.uploadFileNames.length > 0 ? (
              product.uploadFileNames.map((fileName, index) => (
                <img
                  key={index}
                  src={`${prefix}/s_${fileName}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/no_image.png";
                  }}
                  className={`w-24 h-24 object-contain m-2 ${selectedImages?.includes(fileName) ? 'border-2 border-[#ff6347]' : 'border border-[#ccc]'}`}
                  onClick={() => handleClickImage(fileName)}
                  style={{ cursor: 'pointer' }}
                  alt="Product Thumbnail"
                />
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className="flex-1 ml-5 text-center border-l pl-7">
          <h1 className="text-4xl font-bold mb-4">{product.productTitle}</h1>
          <p className="text-2xl mb-4">{product.productContent}</p>
          <p className="text-3xl mb-6">{product.productPrice.toLocaleString()}원</p>
          <div className="flex space-x-7 mx-auto mt-5 justify-center">
            <button
              className="text-white bg-[#e01a6d] text-xl font-extrabold hover:opacity-70 w-36 h-16"
              onClick={() => { handleClickBuy(product) }}
            >
              구매하기
            </button>
            <button
              className="text-[#e01a6d] border-[#e01a6d] text-xl border hover:opacity-70 w-36"
              onClick={() => { handleClickCart(product) }}
            >
              장바구니
            </button>
            <div className="w-16 h-16">
              <img
                onClick={handleKakaoShare}
                src="/images/kakao_logo.png"
                alt="Kakao Logo"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      
      <h4 className="bg-red-50 p-3 text-center">
        판매자가 타 사이트 안내 및 현금 결제, 개인정보 유도 시 결제/입력 마시고 즉시 고객센터로 신고해주세요.
      </h4>
      <div className="border mb-10">


        <div className="flex text-center text-xl">
          <div className={`w-1/2 p-5 border-r cursor-pointer ${selectedTab === 'product' ? 'font-extrabold  text-[rgb(224,26,109)]' : 'bg-gray-200'}`} // 조건부 스타일 적용
            onClick={() => setSelectedTab('product')}>
            상품정보
          </div>
          <div className={`w-1/2 p-5 border-l cursor-pointer ${selectedTab === 'review' ? 'font-extrabold  text-[rgb(224,26,109)]' : 'bg-gray-200'}`} // 조건부 스타일 적용
            onClick={() => setSelectedTab('review')}>
            리뷰
          </div>
        </div>

        {selectedTab === 'product' && (

          <div className=" p-10 whitespace-pre-line text-md">
            <div className="mb-16">
              {product.productDetailContent}
            </div>

            <div className="mt-16 text-center">
              <div className="mb-5 text-left font-semibold text-lg">
                상품 정보
              </div>

              <div className="flex items-center border">
                <div className="w-1/3 py-2 font-semibold text-gray-700 bg-slate-100">상품 번호</div>
                <div className="w-2/3 text-gray-900">{product.id}</div>


                <div className="w-1/3 py-2 font-semibold text-gray-700 bg-slate-100">카테고리</div>
                <div className="w-2/3 text-gray-900">{product.productCategory}</div>
              </div>


              <div className="flex items-center border border-y-0">
                <div className="w-1/3 py-2 font-semibold text-gray-700 bg-slate-100">제조사</div>
                <div className="w-2/3 text-gray-900">팡팡 게임즈</div>

                <div className="w-1/3 py-2 font-semibold text-gray-700 bg-slate-100">원산지</div>
                <div className="w-2/3 text-gray-900">한국</div>
              </div>

              <div className="flex items-center border">
                <div className="w-1/3 py-2 font-semibold text-gray-700 bg-slate-100">영수증 발급</div>
                <div className="w-2/3 text-gray-900">신용 카드 전표, 현금 영수증 발급</div>

                <div className="w-1/3 py-2 font-semibold text-gray-700 bg-slate-100">A/S 안내</div>
                <div className="w-2/3 text-gray-900">상담사 문의</div>
              </div>
            </div>


            <div className="mt-16 text-center">

              <div className="mb-5 text-left font-semibold text-lg">
                반품/교환 정보
              </div>
              {/* <!-- 지정 택배사 --> */}
              <div className="flex border">
                <div className="w-1/4 font-bold bg-slate-100 flex items-center justify-center">지정 택배사</div>
                <div className="w-2/3 p-3">한진 택배</div>

              </div>

              {/* <!-- 반품 배송비 및 교환 배송비 --> */}
              <div className="flex flex-wrap border border-y-0">
                <div className="w-1/4 font-bold bg-slate-100 flex items-center justify-center">반품 배송비</div>
                <div className="w-1/4 p-3">편도 3,000원</div>
                <div className="w-1/4 font-bold bg-slate-100 flex items-center justify-center">교환 배송비</div>
                <div className="w-1/4 p-3">6,000원</div>
              </div>

              {/* <!-- 보내실 곳 --> */}
              <div className="flex border">
                <div className="w-1/4 font-bold bg-slate-100 flex justify-center items-center">보내실 곳</div>
                <div className="w-2/3 p-5">경기 성남시 분당구 돌마로 46 광천프라자</div>
              </div>

              {/* <!-- 반품/교환 사유에 따른 요청 가능 기간 --> */}
              <div className="flex border border-y-0">
                <div className="w-1/4 font-bold bg-slate-100 flex items-center justify-center">반품/교환 사유에 따른 요청 가능 기간</div>
                <div className="w-2/3 space-y-2 p-5 text-left">
                  <div>구매자 단순 변심은 상품 수령 후 7일 이내 (구매자 반품 배송비 부담)</div>
                  <div>표시/광고와 상이, 계약 내용과 다르게 진행된 경우 상품 수령 후 3개월 이내 혹은 표시/광고와 다른 사실을 안 날로부터 30일 이내 (판매자 반품 배송비 부담)</div>
                  <div>둘 중 하나 경과 시 반품/교환 불가</div>
                </div>
              </div>

              {/* <!-- 반품/교환 불가능 사유 --> */}
              <div className="flex border">
                <div className="w-1/4 font-bold bg-slate-100 flex items-center justify-center">반품/교환 불가능 사유</div>
                <div className="w-2/3 space-y-2 p-5 text-left">
                  <div>1. 반품 요청 기간이 지난 이후</div>
                  <div>2. 구매자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우 (단, 상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외)</div>
                  <div>3. 구매자의 책임 있는 사유로 포장이 훼손되어 상품 가치가 현저히 상실된 경우</div>
                  <div>4. 구매자의 사용 또는 일부 소비에 의해 상품의 가치가 현저히 감소한 경우</div>
                  <div>5. 시간의 경과에 의하여 재판매가 곤란할 정도로 상품의 가치가 감소한 경우</div>
                  <div>6. 고객의 요청 사항에 맞춰 제작에 들어가는 맞춤 제작 상품의 경우 (판매자에게 회복 불가능한 손해가 예상되고, 그러한 예정으로 청약철회권 행사가 불가하다는 사실을 서면 동의받은 경우)</div>
                  <div>7. 복제가 가능한 상품 등의 포장을 훼손한 경우 (CD/DVD/GAME/도서의 경우 포장 개봉 시)</div>
                </div>
              </div>
            </div>

          </div>

        )}

        {selectedTab === 'review' && (

          <div className="min-h-[70rem] p-10">
            <h3 className="text-xl font-semibold mb-5">총 {reviewData.length}개 리뷰</h3>

            {reviewData.length === 0 &&
              <div className="mt-32 flex flex-col items-center justify-center text-3xl font-semibold">
                <img src="/images/no_review.png" className="w-60" />
                <div className="mt-10">이 상품의 리뷰가 아직 없습니다</div>
              </div>
            }

            {reviewData.map((review) =>

              <div className="py-5 pl-6 mb-5 flex items-center justify-between border">
                <div className="w-5/6 min-h-40">
                  <div className="flex items-center">
                    <img
                      className="w-10 h-10 mr-2 rounded-full border"
                      src={review.memberImage != null ? `${prefix}/${review.memberImage}` : '/images/profile.png'} />
                    <div className="mr-2">
                      {review.memberNickName}
                    </div>
                    <div>
                      <RatingStarCompoent score={review.rating} />
                    </div>
                  </div>
                  <div>
                    {review.reviewDate}
                  </div>
                  <p className="mt-3">
                    {review.reviewContent}
                  </p>
                </div>
                <img
                  className="w-40 h-40 mx-auto object-contain"
                  src={review.reviewFileName.length > 0 ? `${prefix}/${review.reviewFileName}` : `/images/no_image.png`} />

              </div>
            )}

          </div>

        )}

      </div>

    </section>
  )
}

export default ProductDetailComponent;