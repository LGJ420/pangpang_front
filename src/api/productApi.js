import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/product`;

// 상세 보기
export const getOne = async (pno) => {
  const res = await axios.get(`${prefix}/${pno}`);

  return res.data;
}


// 목록 보기
export const getList = async (pageParam) => {

  const {page, size} = pageParam;

  const res = await axios.get(`${prefix}/list`, {params: {page: page, size: size}});

  return res.data;
}