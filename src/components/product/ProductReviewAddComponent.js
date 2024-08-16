import { useEffect, useState } from "react";
import "../../css/productReviewAddComponent.css";
import { useLocation, useNavigate } from "react-router-dom";
import { postReviewAdd } from "../../api/productReviewApi";

const initReview = {
    rating: 0,
    reviewContent: "",
    reviewFile: "",
    productId: 0
}

const ProductReviewAddComponent = ({productId}) => {

    const [productData, setProductData] = useState([]);
    const [uploadFile, setUploadFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [review, setReview] = useState(initReview);

    // 잠깐의 렌더링도 방지하기 위한 state
    // 초기값이 false여야 처음부터 방지가능
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {

        if (!location.state) {

            alert("잘못된 접근 방식입니다.");
            navigate(-1);
            return;
        }

        try{
            setProductData(location.state.dto);

            // useState는 비동기적으로 이루어지기 때문에
            // 함수형 업데이트를 사용한다!
            setReview(()=>({
                ...review,
                productId: location.state.dto.productId
            }));

            setIsValid(true);
        }
        catch(e){
            
            console.log(e);
        }

    }, []);


    const handleFileChange = event => {

        const file = event.target.files[0];
        if (!file) {
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드 가능합니다.');
            return;
        }

        // 파일크기 5MB 제한
        if (file.size > 5242880) {
            alert('파일 크기는 5MB를 초과할 수 없습니다.');
            return;
        }

        setUploadFile(file);
        previewFile(file);
    }


    const previewFile = file => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    }



    const handleClickSubmit = () => {

        // 여유가 되면 모달창을 제작해서 바꿀예정
        // eslint-disable-next-line no-restricted-globals
        const submit = confirm("리뷰를 등록하시겠습니까?");

        if (!submit) {

            return;
        }
        
        const formData = new FormData();
        formData.append("reviewContent", review.reviewContent);
        formData.append("rating", review.rating);
        formData.append("productId", review.productId);
        
        if (uploadFile) {
            
            formData.append("reviewFile", uploadFile);
        }

        postReviewAdd(formData).then(()=>{
            alert("등록이 완료되었습니다");
            navigate('/mypage/review', { replace: true });
        });
        
    }
    



    const handleChangeReview = (e) => {
        
        review[e.target.name] = e.target.value;
        
        setReview({...review});
    }



    // 이 조건문은 반드시 리액트 훅보다
    // 그렇지 않으면 이조건이 통과되야 리액트가 발생하는 오류가 생겨
    // 리액트 자체가 작동하지 않는다
    // 그래서 최하단에 배치한다
    if (!isValid) {

        return null;
    }
    return (

        <section className="my-10">
        <div className="flex border-b pl-10 pb-10 pr-3 mb-5">
            <h1 className="text-5xl mr-auto">리뷰 작성</h1>
        </div>
        <div className="flex">
            <div className="w-1/2 flex flex-col items-center">
                <img src="/images/pr_mario.png"
                    className="w-4/5 h-4/5 object-contain"/>
                <h2 className="mt-5 text-2xl font-extrabold">&lt;상품명&gt; {productData.productTitle}</h2>
            </div>
            <div className="w-1/2 flex flex-col items-center">
                <h3>
                    해당 상품의 평점을 매겨주세요
                </h3>
                <div>
                    <fieldset id="rate">
                        <input type="radio" id="rating10" name="rating" value="10"
                        onChange={handleChangeReview} />
                        <label htmlFor="rating10" title="5점"></label>
                        
                        <input type="radio" id="rating9" name="rating" value="9" 
                        onChange={handleChangeReview} />
                        <label className="half" htmlFor="rating9" title="4.5점"></label>
                        
                        <input type="radio" id="rating8" name="rating" value="8" 
                        onChange={handleChangeReview} />
                        <label htmlFor="rating8" title="4점"></label>
                        
                        <input type="radio" id="rating7" name="rating" value="7" 
                        onChange={handleChangeReview} />
                        <label className="half" htmlFor="rating7" title="3.5점"></label>
                        
                        <input type="radio" id="rating6" name="rating" value="6" 
                        onChange={handleChangeReview} />
                        <label htmlFor="rating6" title="3점"></label>
                        
                        <input type="radio" id="rating5" name="rating" value="5" 
                        onChange={handleChangeReview} />
                        <label className="half" htmlFor="rating5" title="2.5점"></label>
                        
                        <input type="radio" id="rating4" name="rating" value="4" 
                        onChange={handleChangeReview} />
                        <label htmlFor="rating4" title="2점"></label>
                        
                        <input type="radio" id="rating3" name="rating" value="3" 
                        onChange={handleChangeReview} />
                        <label className="half" htmlFor="rating3" title="1.5점"></label>
                        
                        <input type="radio" id="rating2" name="rating" value="2" 
                        onChange={handleChangeReview} />
                        <label htmlFor="rating2" title="1점"></label>
                        
                        <input type="radio" id="rating1" name="rating" value="1" 
                        onChange={handleChangeReview} />
                        <label className="half" htmlFor="rating1" title="0.5점"></label>
                    </fieldset>
                </div>

                <h3 className="mt-10">
                    자세한 평가를 적어주세요
                </h3>
                <textarea className="w-3/4 h-52 border p-4 m-4 resize-none"
                    maxLength={300}
                    name="reviewContent"
                    onChange={handleChangeReview}/>

                <div className="flex w-3/4">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-10 h-10 object-cover" />
                    )
                    :
                        <img className="w-10 h-10 object-cover" />    
                    }
                    <input
                        type="file"
                        className="ml-2 file:border file:border-gray-300 file:rounded file:px-4 file:py-2 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                        onChange={handleFileChange}
                        accept="image/*" />
                </div>
                
                <div className="w-3/4 flex justify-end">
                    <button className="text-white bg-[rgb(68,107,216)] text-2xl m-3 w-32 h-12 rounded-xl hover:opacity-90"
                        onClick={handleClickSubmit}>
                        등록
                    </button>
                </div>
                
            </div>

        </div>
        </section>

    );
}

export default ProductReviewAddComponent;