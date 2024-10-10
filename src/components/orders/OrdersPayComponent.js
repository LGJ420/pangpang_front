import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postOrdersAdd } from "../../api/ordersApi";
import { logout } from '../../hooks/logout';


const initState = {

    name: "",
    phone: "",
    address: ""
}   

const prefix = `/api/productreview/view`;

const OrdersPayComponent = () => {

    const [userData, setUserData] = useState(initState);
    const [productData, setProductData] = useState([]);

    // 잠깐의 렌더링도 방지하기 위한 state
    // 초기값이 false여야 처음부터 방지가능
    const [isValid, setIsValid] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {

        if (!location.state) {

            alert("잘못된 접근 방식입니다.");
            navigate(-1);
            return;
        }
            
        // 데이터를 가져올때 오더가 리스트 형태로 되있으면 리스들을 데이터에 넣기
        if (location.state.orderList) {

            setProductData(location.state.orderList);
            setIsValid(true);
        }
        // 리스트가 아니라 단일객체면 배열로 만들어서 데이터에 넣기
        else if (location.state.order) {
            
            setProductData([location.state.order]);
            setIsValid(true);
        }
        else {
            
            alert("잘못된 접근방식 입니다.");
            navigate(-1);
        }

    }, [location.state]);

    // console.log(productData);

    

    const handleChangeUserData = (e) => {
        
        userData[e.target.name] = e.target.value;
        
        setUserData({...userData});
    }
            


       
    /* ====================== 다음 주소찾기 API 시작 ====================== */
    const [postcode, setPostcode] = useState('');
    const [postAddress, setPostAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const detailAddressRef = useRef(null);
  

    useEffect(() => {

        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        document.head.appendChild(script);

        return () => {

            document.head.removeChild(script);
        };

    }, []);


    const handleClickPost = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
              let addr = '';
              let extraAddr = '';
      
              if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
              } else {
                addr = data.jibunAddress;
              }
      
              if(data.userSelectedType === 'R'){
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                  extraAddr += data.bname;
                }
                if(data.buildingName !== '' && data.apartment === 'Y'){
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if(extraAddr !== ''){
                  extraAddr = ' (' + extraAddr + ')';
                }
              } else {
                extraAddr = '';
              }
      
              setPostcode(data.zonecode);
              setPostAddress(addr);
              setExtraAddress(extraAddr);
              detailAddressRef.current.focus();
            }
          }).open();
    };
    /* ====================== 다음 주소찾기 API 끝 ====================== */

    


    // 값 검증 메서드
    const validateInputs = () => {

        const { name, phone1, phone2, phone3 } = userData;

        const regexName = /^[가-힣]+$/;  // 한글 이름 검증
        const regexPhone23 = /^\d{2,3}$/; // 숫자 3자리 검증
        const regexPhone34 = /^\d{3,4}$/; // 숫자 4자리 검증

        if (!regexName.test(name)) {
            alert("이름이 올바르지 않습니다.");
            return false;
        }
        if (!(regexPhone23.test(phone1))) {
            alert("전화번호가 올바르지 않습니다.");
            return false;
        }
        if (!(regexPhone34.test(phone2) && regexPhone34.test(phone3))) {
            alert("전화번호가 올바르지 않습니다.");
            return false;
        }
        if (postAddress < 2 || detailAddress.length < 2) {
            alert("주소가 올바르지 않습니다.");
            return false;
        }
        return true;

    }




    const handleClickPay = () => {

        if (!validateInputs()) {

            return;
        }


        // 여유가 되면 모달창을 제작해서 바꿀예정
        // eslint-disable-next-line no-restricted-globals
        const payConfirm = confirm("정말로 결제하시겠습니까?");
    
        if (payConfirm) {
            
            userData.phone = userData.phone1 + userData.phone2 + userData.phone3;

            userData.address = postcode + " " + postAddress + " " + detailAddress + " " + extraAddress;
    
            // console.log({...userData, dtoList: productData});    // 데이터 확인용
    
            postOrdersAdd({...userData, dtoList: productData})
                .then(()=>navigate(`/mypage/orders/result`, { replace: true }))
                .catch(error => {
                    if (error.response.status === 401) {
                        alert("토큰 유효 시간이 만료되었습니다.")
                        logout(); // import { logout } from '../../hooks/logout'; 추가 필요
                    }
                });
        }
    }



    // 이 조건문은 반드시 리액트 훅보다
    // 그렇지 않으면 이조건이 통과되야 리액트가 발생하는 오류가 생겨
    // 리액트 자체가 작동하지 않는다
    // 그래서 최하단에 배치한다
    if (!isValid) {

        return null;
    }
    return (

        <div className="bg-slate-50 min-w-[768px] min-h-screen">
            <div className="max-w-[1350px] min-w-[768px] m-auto">
                <div className="pt-10 pl-10 pb-4">
                    <Link to={'/'}>
                        <img src="/images/logo_r2.png" className="w-56"></img>
                    </Link>
                    <h1 className=" text-4xl font-bold mt-4">결제</h1>
                </div>

                <div className="flex">

                    <div className="w-2/3 flex flex-col items-center">

                    <div className="bg-white w-11/12 my-2 p-7 rounded-lg shadow">
                        <h3 className="text-xl font-bold">배송지</h3>
                        <hr className="my-3"/>
                        <div className="mb-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                className="mt-1 block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                placeholder="이름을 입력하세요" 
                                maxLength={10}
                                onChange={handleChangeUserData}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="phone1" className="block text-sm font-medium text-gray-700">전화번호</label>
                            <div className="flex">
                                <input 
                                    type="text" 
                                    id="phone1" 
                                    name="phone1" 
                                    className="mt-1 mr-2 w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                    placeholder="010" 
                                    maxLength="3"
                                    onChange={handleChangeUserData}
                                />
                                <input 
                                    type="text" 
                                    id="phone2" 
                                    name="phone2" 
                                    className="mt-1 mr-2 w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                    placeholder="1234" 
                                    maxLength="4"
                                    onChange={handleChangeUserData}
                                />
                                <input 
                                    type="text" 
                                    id="phone3" 
                                    name="phone3" 
                                    className="mt-1 w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                    placeholder="5678" 
                                    maxLength="4"
                                    onChange={handleChangeUserData}
                                />
                            </div>
                        </div>
                        <div>
                            <h5 className="block text-sm font-medium text-gray-700">주소</h5>
                            <input
                                className="mt-1 w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                type="text"
                                placeholder="우편번호"
                                value={postcode}
                                readOnly
                            />
                            <button
                                className="p-1 ml-2 bg-slate-400 text-white rounded hover:opacity-80 text-sm"
                                onClick={handleClickPost}>
                                우편번호 찾기
                            </button>
                            <input
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                type="text"
                                placeholder="주소"
                                value={postAddress}
                                readOnly
                            />
                            <input
                                className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                type="text"
                                placeholder="상세주소"
                                value={detailAddress}
                                ref={detailAddressRef}
                                onChange={e => setDetailAddress(e.target.value)}
                            />
                            <input
                                className="mt-1 w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                type="text"
                                placeholder="참고항목"
                                value={extraAddress}
                                readOnly
                            />
                        </div>
                    </div>

                        <div className="bg-white w-11/12 my-2 p-7 rounded-lg shadow">
                            <h3 className="text-xl font-bold">주문상품</h3>


                            { productData ? 

                                productData.map((product, index)=>

                                <>
                                <hr className="my-3"/>
                                <div key={index} className="flex items-center">
                                            <img src={product.uploadFileNames[0] ? `${prefix}/${product.uploadFileNames[0]}` : "/images/no_image.png"}
                                                alt={product.productTitle} 
                                                className="w-24 h-24 border rounded object-contain"></img>
                                    <div className="ml-5 w-1/2">
                                        <h3 className="text-lg font-extrabold">{product.productTitle}</h3>
                                        <p className="text-xs">{product.productContent}</p>
                                        <div className="font-bold mt-3">{product.cartCount}개</div>
                                    </div>
                                    <div className="ml-auto text-3xl font-semibold">
                                        {(product.productPrice * product.cartCount).toLocaleString()}원
                                    </div>
                                </div>
                                </>

                                )

                            :
                                <>
                                </>
                        
                            }
                        </div>

                        <div className="bg-white w-11/12 my-2 p-7 rounded-lg shadow">
                            <h3 className="text-xl font-bold">결제수단</h3>
                            <hr className="my-3"/>
                            <div className="flex items-center my-7">
                                <input 
                                    type="radio" 
                                    id="payment-card" 
                                    name="payment" 
                                    value="card" 
                                    className="mr-2"
                                    checked
                                />
                                <label htmlFor="payment-card" className="cursor-pointer">
                                    카드결제
                                </label>
                            </div>
                            <div className="flex items-center my-7">
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
                    
                        <div className="bg-white w-11/12 rounded-lg mt-2 p-7 sticky top-3 shadow">
                            <h3 className="text-xl font-bold">총 결제금액</h3>
                            <hr className="my-3"/>

                            { productData ? 

                            productData.map((product, index)=>

                            <div key={index} className="text-right text-sm mb-2 text-gray-400">
                                <div>
                                    {product.productTitle}
                                </div>
                                <div>
                                    {product.productPrice.toLocaleString()}원 x {product.cartCount}개 = {(product.productPrice * product.cartCount).toLocaleString()}원
                                </div>
                            </div>
                            

                            )

                            :
                            <>
                            </>

                            }

                            <div className="pt-[40px] h-[180px] text-right text-4xl font-extrabold">
                                총 {productData.reduce((acc, item) => acc + item.productPrice * item.cartCount, 0).toLocaleString()}원
                            </div>

                            <button className="bg-[rgb(224,26,109)] text-2xl font-bold text-white h-14 w-52 absolute bottom-7 right-1/2 translate-x-1/2 hover:opacity-80"
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