import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useState } from "react";

const ProductAddComponent = () => {

    const [images, setImages] = useState([]);     // 이미지 저장할 곳

    // 이미지 저장할 함수
    const handleAddImages = (event) => {
        const fileList = event.target.files;
        let newImages = [...images];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const imageUrl = URL.createObjectURL(file); // 파일의 URL을 생성

            newImages.push({ url: imageUrl, name: file.name });
        }

        // 이미지 업로드 5개 제한
        if (newImages.length > 5) {
            newImages = newImages.slice(0, 5);
        }
        setImages(newImages);
    }

    // console.log(images);

    const handleDeleteImages = (index) => {
        setImages(images.filter((_, idx) => idx !== index));

    }

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
                    {/* 저장해둔 이미지들 순회하면서 화면에 이미지 출력 */}
                    <div className="flex flex-wrap">
                        {images.map((image, index) => (
                            <div key={index} className="flex flex-col items-center mt-1 mr-1">
                                <img src={image.url} className="w-28 h-28 object-cover" alt={image.name} />
                                <div className="flex items-center mt-1">
                                    <span className="text-base mr-2">{image.name}</span>
                                    <span
                                        className="text-base cursor-pointer text-red-500"
                                        onClick={() => handleDeleteImages(index)}
                                    >
                                        x
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

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
                        maxLength={50} />
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
                        maxLength={70} />
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
                        maxLength={10} />
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
                        maxLength={500} />
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