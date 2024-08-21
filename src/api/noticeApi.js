import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/notice`;


export const getNoticeList = async (pageParam) => {

  const { page, size } = pageParam;

  // 추후 search도 적용해야함
  const res = await axios.get(`${prefix}/list`, { params: { page: page, size: size } });

  return res.data;
}
