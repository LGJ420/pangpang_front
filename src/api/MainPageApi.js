import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

/* 상품 목록 가져오기 */
export const getProductList = async () => {
  const res = await axios.get(`${API_SERVER_HOST}/`);
  return res.data;
}



/* 이미지 조회 */
export const getProductImage = async (fileName) => {

  // 서버에서 이미지 파일 가져옴
  const res = await axios.get(`${API_SERVER_HOST}/view/${fileName}`, { responseType: 'blob' });

  // 가져온 이미지 파일을 웹페이지에서 사용할 수 있는 URL로 변환
  return URL.createObjectURL(res.data);
};


