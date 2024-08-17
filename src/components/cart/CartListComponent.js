import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCartOne, getCartList, putCartOne } from "../../api/cartApi";
import useCustomToken from "../../hooks/useCustomToken";

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
    const [images, setImages] = useState({}); // 이미지 URL을 저장할 상태
    const [isLoading, setIsLoading] = useState(false);

    
    const navigate = useNavigate();
    const {decodeToken} = useCustomToken();




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
                // console.log(newData);        // 데이터 확인용
                const imageUrls = {};       // 객체 생성해 각 제품의 이미지 url 저장
                for(const product of newData) {
                    if (product.uploadFileNames && product.uploadFileNames.length > 0) {
                        // uploadFiles 배열에서 첫번째 파일 이름 추출해 이미지 url 생성
                        const fileName = product.uploadFileNames[0];
                        const url = `http://localhost:8080/api/product/view/${fileName}`;
                        imageUrls[product.productId] = url;  // productId로 URL을 매핑
                    }
                }
                setImages(imageUrls);   // 이미지 url 저장
            }).catch(e=>console.log(e)).finally(()=>setIsLoading(true));
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
                }
    

                putCartOne({ ...item, cartCount: newCount }).then(() => {

                    const newServerData = serverData.map(subItem =>
                        subItem.productId === productId ? { ...subItem, cartCount: newCount } : subItem
                    );
    
                    setServerData(newServerData);
                    setOrderList(newServerData.filter(item => item.checked));
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


    const handleClickOrder = (order) => {

        console.log(order);
        navigate("/orders/pay", {state : {order}});
    }



    const handleClickAllOrder = () => {

        if(orderList.length === 0){
            
            alert("선택한 상품이 없습니다");
            return;
        }

        navigate("/orders/pay", {state : {orderList}});
    }



    // 이 조건문은 반드시 리액트 훅보다
    // 그렇지 않으면 이조건이 통과되야 리액트가 발생하는 오류가 생겨
    // 리액트 자체가 작동하지 않는다
    // 그래서 최하단에 배치한다
    if(!isLoading){

        return null;
    }
    return (
        <>
        <section className="w-[1350px] m-auto">

            <h1 className="text-5xl m-10">장바구니</h1>
            
        { serverData.length > 0 ?

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

            :

            <>
            </>

        }

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
                        <img src={images[data.productId] || '/images/chi1.jpg'}
                            alt={data.productTitle} 
                            className="mx-auto object-contain h-40"/>                        
                        <div className="w-1/3 mx-10">
                            <h3 className="font-extrabold text-2xl cursor-pointer"
                                onClick={()=>handleClickTitle(data.productId)}>
                                {data.productTitle}
                            </h3>
                            <p className="mt-3">{data.productContent}</p>
                        </div>
                        <div className="text-center text-2xl w-40">
                            <h3>수량</h3>
                            <div className="flex justify-between items-center">
                                <button className="w-10 h-10 pb-3 border-3 rounded-xl hover:opacity-30"
                                    onClick={()=>handleClickAmount(data.productId, -1)}>
                                    -
                                </button>
                                <div className="mx-2">{data.cartCount}개</div>
                                <button className="w-10 h-10 pb-3 border-3 rounded-xl hover:opacity-30"
                                    onClick={()=>handleClickAmount(data.productId, 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="text-3xl text-center w-52">
                            {(data.productPrice * data.cartCount).toLocaleString()}원
                        </div>
                        <div className="flex flex-col">
                            <button className="bg-blue-500 text-white w-32 h-10 m-1"
                                onClick={()=>{handleClickOrder(data)}}>
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
            
            <div className="flex flex-col w-11/12 text-2xl font-semibold mx-auto py-40 items-center">
                <img src="/images/no_cart.png" className="w-40" />
                <div className="m-10">
                    장바구니가 비어있습니다
                </div>
            </div>
        }
        <div className="h-72"></div>

        </section>
        
        { serverData.length > 0 ?

        <section className="bg-blue-600 fixed bottom-0 w-screen h-20">
            <div className="max-w-[1350px] m-auto h-full flex items-center justify-end text-white">
                <div className="font-semibold text-2xl">
                    총 {orderList.length}건
                </div>
                <div className="mx-10 font-semibold text-3xl">
                    결제금액 : {totalAmount.toLocaleString()}원
                </div>
                <button className="bg-slate-950 px-10 h-full text-xl hover:bg-neutral-700"
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