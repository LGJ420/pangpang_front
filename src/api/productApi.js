import axios from "axios"

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;
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

  const { search, page, size, category } = pageParam;

  const res = await axios.get(`${prefix}/list`, { params: { search, page, size, category } });

  return res.data;
}


/* 상품 상세보기 */
export const getOne = async (id) => {

  const res = await axios.get(`${prefix}/read/${id}`);

  return res.data;
}