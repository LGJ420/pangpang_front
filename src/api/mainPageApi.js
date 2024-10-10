import axios from "axios"



const prefix = `${API_SERVER_HOST}`;


/* 상품 목록 가져오기 */
export const getProductList = async () => {
  const res = await axios.get(`${prefix}/`);
  return res.data;
}


