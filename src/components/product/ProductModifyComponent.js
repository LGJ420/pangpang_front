import { PlusSquareIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { useNavigate, useParams } from "react-router-dom";
import { getOne, modifyProduct } from "../../api/productApi";
import useCustomToken from "../../hooks/useCustomToken";


const initState = {
  productTitle: "",
  productContent: "",
  productDetailContent: "",
  productPrice: 0,
  productCategory: "",
  files: []
}


const ProductModifyComponent = () => {

  const [product, setProduct] = useState(initState);  
  const [images, setImages] = useState([]);       // 기존 이미지
  const [newImages, setNewImages] = useState([]); // 새로 추가할 이미지
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const { moveToRead } = useCustomMove();
  const { isLogin } = useCustomToken();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOne(id);
        setProduct(data);
        setImages(data.uploadFileNames);    // 서버에서 가져온 이미지
      } catch (error) {
        console.error("상품을 불러오는데 실패했습니다.", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);


  // console.log(product);
  // console.log(images);


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
    let updatedImages = [...newImages];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const imageUrl = URL.createObjectURL(file); // 파일의 URL을 생성

      updatedImages.push({ file, url: imageUrl, name: file.name });
    }

    // 이미지 업로드 5개 제한
    if (updatedImages.length > 5) {
      updatedImages = updatedImages.slice(0, 5);
    }
    setNewImages(updatedImages);
  };


  // 새로운 이미지 삭제 함수
  const handleDeleteNewImages = (index) => {
    setNewImages(newImages.filter((_, idx) => idx !== index));
  };


  // 상품 정보 변경 처리
  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };


  // 상품 수정 처리
  const handleClickModify = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('productTitle', product.productTitle);
      formData.append('productContent', product.productContent);
      formData.append('productPrice', product.productPrice);
      formData.append('productDetailContent', product.productDetailContent);
      formData.append('productCategory', product.productCategory);

      // 기존 이미지
      // images.forEach(fileName => formData.append('existingImages', fileName));

      // 새로운 이미지
      newImages.forEach(image => formData.append('files', image.file));

      await modifyProduct(id, formData);
      alert('수정이 완료되었습니다!');
      moveToRead(id);
    } catch (error) {
      // console.error("수정에 실패했습니다.", error);
      alert("상품 수정에 실패했습니다.")
    } finally {
      setLoading(false);
    }
  };




  if (!isLogin) {
    return null;
  }

  return (

    <section>
      <div className="border-b p-10">
        <h1 className="text-5xl">상품 수정</h1>
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

          <div className="flex flex-wrap">
            {images.map((fileName, index) => (
              <div key={index} className="flex flex-col items-center mt-1 mr-1">
                <img
                  src={`http://localhost:8080/api/product/view/${fileName}`}
                  className="w-36 h-32 object-contain"
                  alt={`기존 이미지 ${index}`}
                />
              </div>
            ))}

            {newImages.map((image, index) => (
              <div key={index} className="flex flex-col items-center mt-1 mr-1">
                <img
                  src={image.url}
                  className="w-36 h-32 object-contain"
                  alt={image.name}
                />
                <div className="flex items-center mt-1">
                  <span
                    className="text-xl cursor-pointer text-red-500"
                    onClick={() => handleDeleteNewImages(index)}
                  >
                    x
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 flex flex-col">
          <label className="m-3 font-extrabold" htmlFor="productCategory">카테고리</label>
          <select
            className="p-3 rounded border w-1/4"
            id="productCategory"
            name="productCategory"
            value={product.productCategory}
            onChange={handleChangeProduct}
          >
            <option value="게임 / CD">게임 / CD</option>
            <option value="게임기기">게임기기</option>
            <option value="피규어/굿즈">피규어 / 굿즈</option>
          </select>
        </div>
        <div className="my-10 flex flex-col">
          <label className="m-3 font-extrabold" htmlFor="productTitle">제목</label>
          <input
            className="p-3 rounded border w-4/5"
            id="productTitle"
            name="productTitle"
            placeholder="제목을 적어주세요."
            value={product.productTitle}
            maxLength={50}
            onChange={handleChangeProduct}
          />
        </div>
        <div className="my-10 flex flex-col">
          <label className="m-3 font-extrabold" htmlFor="productContent">소제목</label>
          <input
            className="p-3 rounded border"
            id="productContent"
            name="productContent"
            placeholder="간단한 설명을 적어주세요."
            maxLength={70}
            value={product.productContent}
            onChange={handleChangeProduct}
          />
        </div>
        <div className="my-10 flex flex-col">
          <label className="m-3 font-extrabold" htmlFor="productPrice">가격</label>
          <input
            className="p-3 rounded border w-1/4"
            id="productPrice"
            name="productPrice"
            value={product.productPrice}
            placeholder="가격을 적어주세요."
            maxLength={10}
            onChange={handleChangeProduct}
          />
        </div>
        <div className="my-10 flex flex-col">
          <label className="m-3 font-extrabold" htmlFor="productDetailContent">상세설명</label>
          <textarea
            className="p-3 rounded border h-96"
            id="productDetailContent"
            name="productDetailContent"
            value={product.productDetailContent}
              placeholder="자세한 설명을 적어주세요."
              maxLength={500}
              onChange={handleChangeProduct} />
          </div>
          <div className="flex justify-center">
            <button onClick={handleClickModify}
              className="w-52 h-16 text-3xl bg-orange-600 text-white rounded-2xl hover:opacity-80">
              등록
            </button>
          </div>

        </div>


    </section>

  )

}

export default ProductModifyComponent;