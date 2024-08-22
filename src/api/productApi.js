import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/product`;

/* 상품 등록 */
export const addProduct = async (formData) => {   // formData : 상품 정보를 담은 FormData 객체

  const res = await axios.post(`${prefix}/add`, formData);
  return res.data;
}


/* 상품 수정 */
export const modifyProduct = async (id, formData) => {
  const res = await axios.put(`${prefix}/modify/${id}`, formData, {
    headers: {
      "Content-Type": 'multipart/form-data',    // 파일 데이터 (이미지), 폼 데이터 처리 위해
    },
  });
  return res.data;
}


/* 상품 삭제하기 */
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${prefix}/read/${id}`);

  return res.data;
}



/* 상품 목록보기 */
export const getList = async (pageParam) => {

  const { search, page, size } = pageParam;

  const res = await axios.get(`${prefix}/list`, { params: { search, page, size } });

  return res.data;
}


/* 상품 상세보기 */
export const getOne = async (id) => {

  const res = await axios.get(`${prefix}/read/${id}`);

  return res.data;
}



/* 이미지 조회 */
// export const getImage = async (fileName) => {

//   // 서버에서 이미지 파일 가져옴
//   const res = await axios.get(`${prefix}/view/${fileName}`, { responseType: 'blob' });

//   // 가져온 이미지 파일을 웹페이지에서 사용할 수 있는 URL로 변환
//   return URL.createObjectURL(res.data);
// };


