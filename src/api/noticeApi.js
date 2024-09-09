import axios from "axios"

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;
const prefix = `${API_SERVER_HOST}/api/notice`;


export const getNoticeList = async (pageParam) => {

  const { page, size } = pageParam;

  // 추후 search도 적용해야함
  const res = await axios.get(`${prefix}/list`, { params: { page: page, size: size } });

  return res.data;
}



export const getNoticeOne = async (id) => {

  const res = await axios.get(`${prefix}/${id}`);

  return res.data;
}



export const postNoticeOne = async (noticeDto) => {

  const token = localStorage.getItem("token");

  const res = await axios.post(`${prefix}`, noticeDto, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data;
}




export const putNotice = async (noticeDto) => {

  const token = localStorage.getItem("token");

  const res = await axios.put(`${prefix}`, noticeDto, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });

  return res.data;
}




export const deleteNotice = async (noticeId) => {

  const token = localStorage.getItem("token");

  const res = await axios.delete(`${prefix}/${noticeId}`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });

  return res.data;
}
