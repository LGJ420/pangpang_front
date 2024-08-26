import axios from "axios"

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;


/* 상품 목록 가져오기 */
export const getProductList = async () => {
  const res = await axios.get(`${API_SERVER_HOST}/`);
  return res.data;
}


