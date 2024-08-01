import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

/* 상품 목록 가져오기 */
export const getProductList = async () => {
  const res = await axios.get(`${API_SERVER_HOST}/`);
  return res.data;
}