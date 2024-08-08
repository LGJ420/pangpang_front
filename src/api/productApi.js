import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/product`;

/* 상품 목록보기 */
export const getList = async (pageParam) => {

  const { search, page, size } = pageParam;

  const res = await axios.get(`${prefix}/list`, { params: { search, page, size } });

  return res.data;
}


/* 메인 페이지 상품 목록 보기 */
export const getMainList = async (size) => {
  const res = await axios.get(`${API_SERVER_HOST}/`, {params : {size}});
  return res.data
}


/* 상품 상세보기 */
export const getOne = async (id) => {

  const res = await axios.get(`${prefix}/read/${id}`);

  return res.data;
}



/* 이미지 조회 */
export const getImage = async (fileName) => {

  // 서버에서 이미지 파일 가져옴
  const res = await axios.get(`${prefix}/view/${fileName}`, { responseType: 'blob' });

  // 가져온 이미지 파일을 웹페이지에서 사용할 수 있는 URL로 변환
  return URL.createObjectURL(res.data);
};


