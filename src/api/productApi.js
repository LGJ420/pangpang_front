import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/product`;

/* 상품 목록보기 */
export const getList = async (pageParam) => {

  const { page, size } = pageParam;

  const res = await axios.get(`${prefix}/list`, { params: { page: page, size: size } });

  return res.data;
}


export const getSearchList = async (pageParam) => {

  const { page, size, search } = pageParam;

  const res = await axios.post(`${prefix}/list`, { params: { search: search, page: page, size: size } });

  return res.data;
}



/* 상품 상세보기 */
export const getOne = async (id) => {

  const res = await axios.get(`${prefix}/read/${id}`);

  return res.data;
}

