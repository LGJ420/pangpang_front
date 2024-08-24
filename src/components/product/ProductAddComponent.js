import { PlusSquareIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { addProduct } from "../../api/productApi"; // API 호출 함수 임포트
import useCustomMove from "../../hooks/useCustomMove";
import useCustomToken from '../../hooks/useCustomToken';
import { useNavigate } from "react-router-dom";

// 초기 상태 설정
const initState = {
    productCategory: "게임 / CD",
    productTitle: "",
    productContent: "",
    productPrice: 0,
    productDetailContent: "",
    files: []
};

const ProductAddComponent = () => {

    const [product, setProduct] = useState(initState);  // 상품 정보 입력 필드
    const [images, setImages] = useState([]); // 이미지 저장할 곳
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { moveToList } = useCustomMove(); // 커스텀 훅 사용
    const { isLogin } = useCustomToken();


    useEffect(() => {
        if (!isLogin) {

            alert("잘못된 접근 방식입니다.");
            navigate(-1);
            return;
        }
    }, [])

    // 이미지 저장할 함수
    const handleAddImages = (event) => {
        const fileList = event.target.files;
        let newImages = [...images];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const imageUrl = URL.createObjectURL(file); // 파일의 URL을 생성

            newImages.push({ file, url: imageUrl, name: file.name });
        }

        // 이미지 업로드 5개 제한
        if (newImages.length > 5) {
            alert("상품 이미지는 최대 5개까지 등록 가능합니다.");
            newImages = newImages.slice(0, 5);
        }
        setImages(newImages);
    };


    // 이미지 삭제 함수
    const handleDeleteImages = (index) => {
        setImages(images.filter((_, idx) => idx !== index));
    };


    // 상품 정보 변경 처리
    const handleChangeProduct = (e) => {
        setProduct({
            ...product, // product 상태 복사해 새로운 값을 업데이트
            [e.target.name]: e.target.value     // 변경된 필드만 업데이트
            // e.target.name = productTitle,
            // e.target.value = "새로운 제목"
        });
    };

    console.log(product);
    console.log(images);

    // 상품 추가 처리
    const handleClickAdd = async () => {

        if(!product.productTitle.trim()) {
            alert("상품 제목을 입력해주세요.");
            return;
        }

        if (!product.productContent.trim()) {
            alert("상품 소제목을 입력해주세요.");
            return;
        }

        if (!product.productDetailContent.trim()) {
            alert("상품 상세설명을 입력해주세요.");
            return;
        }

        if(product.productPrice <= 0) {
            alert("상품 금액을 입력해주세요.");
            return;
        }

        if(isNaN(product.productPrice)) {
            alert("상품 금액을 입력해주세요. (숫자만 가능)");
            return;
        }

        if(images.length == 0) {
            alert("상품 이미지를 등록해주세요.");
            return;
        }




        const submit = window.confirm("상품을 등록하시겠습니까?");

        // 취소 클릭한 경우 그냥 종료
        if (!submit) {
            return;
        }

        const formData = new FormData();
        formData.append("productCategory", product.productCategory);
        formData.append("productTitle", product.productTitle);
        formData.append("productContent", product.productContent);
        formData.append("productPrice", product.productPrice);
        formData.append("productDetailContent", product.productDetailContent);

        // 이미지들 formData에 추가
        images.forEach((image) => {
            formData.append("files", image.file);
        });

        try {
            // formData 서버로 전송
            const response = await addProduct(formData);
            // console.log('상품이 성공적으로 추가되었습니다:', response);
            alert("상품이 성공적으로 추가되었습니다!")
            moveToList();  // 상품 등록 후 목록 페이지로 이동
        } catch (error) {
            alert("상품 추가 중 오류가 발생했습니다.")
            // console.error('상품 추가 중 오류가 발생했습니다:', error);
        }
    };

    if (!isLogin) {
        return null;
    }
    
    return (
        <section>
            <div className="border-b p-10">
                <h1 className="text-5xl">상품 추가</h1>
            </div>
            <div className="text-2xl my-10 m-auto">
                <div>
                    <label className="m-3 font-extrabold">사진</label>
                    <input
                        type="file"
                        id="input-file"
                        multiple
                        accept="image/*"
                        onChange={handleAddImages}
                        style={{ display: 'none' }}
                    />
                    <label
                        htmlFor="input-file"
                        className="flex items-center justify-center w-32 h-12 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 cursor-pointer"
                    >
                        <PlusSquareIcon className="w-6 h-6 mr-2" fill="#646F7C" />
                        <span className="text-lg font-semibold">사진 추가</span>
                    </label>
                    <div className="text-lg">(※ jpg, png 파일 등록)</div>

                    {/* 저장해둔 이미지들 순회하면서 화면에 이미지 출력 */}
                    <div className="flex flex-wrap">
                        {images.map((image, index) => (
                            <div key={index} className="flex flex-col items-center mt-1 mr-1">
                                <img src={image.url} className="w-36 h-32 object-contain" alt={image.name} />
                                <div className="flex items-center mt-1">
                                    <span
                                        className="text-xl cursor-pointer text-red-500"
                                        onClick={() => handleDeleteImages(index)}>
                                        x
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 기타 입력 필드들 */}
                <div className="my-10 flex flex-col">
                    <label className="m-3 font-extrabold" htmlFor="productCategory">카테고리</label>
                    <select
                        className="p-3 rounded border w-1/4"
                        id="productCategory"
                        name="productCategory"
                        onChange={handleChangeProduct}>
                        <option value="게임">게임 / CD</option>
                        <option value="게임기기">게임기기</option>
                        <option value="굿즈">피규어 / 굿즈</option>
                    </select>
                </div>
                <div className="my-10 flex flex-col">
                    <label className="m-3 font-extrabold" htmlFor="productTitle">제목</label>
                    <input
                        className="p-3 rounded border w-4/5"
                        id="productTitle"
                        name="productTitle"
                        placeholder="제목을 적어주세요."
                        maxLength={50}
                        onChange={handleChangeProduct} />
                </div>
                <div className="my-10 flex flex-col">
                    <label className="m-3 font-extrabold" htmlFor="productContent">소제목</label>
                    <input
                        className="p-3 rounded border"
                        id="productContent"
                        name="productContent"
                        placeholder="간단한 설명을 적어주세요."
                        maxLength={70}
                        onChange={handleChangeProduct} />
                </div>
                <div className="my-10 flex flex-col">
                    <label className="m-3 font-extrabold" htmlFor="productPrice">가격</label>
                    <input
                        className="p-3 rounded border w-1/4"
                        id="productPrice"
                        name="productPrice"
                        placeholder="가격을 적어주세요."
                        maxLength={10}
                        onChange={handleChangeProduct} />
                </div>
                <div className="my-10 flex flex-col">
                    <label className="m-3 font-extrabold" htmlFor="productDetailContent">상세설명</label>
                    <textarea
                        className="p-3 rounded border h-96"
                        id="productDetailContent"
                        name="productDetailContent"
                        placeholder="자세한 설명을 적어주세요."
                        maxLength={500}
                        onChange={handleChangeProduct} />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleClickAdd} // 함수 호출 시 () 제거
                        className="w-52 h-16 text-3xl bg-[rgb(77,160,124)] text-white rounded-2xl hover:opacity-80">
                        등록
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductAddComponent;
