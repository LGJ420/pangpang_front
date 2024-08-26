import axios from "axios"

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;
const prefix = `${API_SERVER_HOST}/api/productreview`;


// 리뷰 등록
export const postReviewAdd = async (formData) => {

    const token = localStorage.getItem("token");
    
    const res = await axios.post(`${prefix}`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    return res.data;
}


// 해당 글 리뷰 불러오기
export const getReviewList = async (id) => {

    const res =  await axios.get(`${prefix}/${id}`);

    return res.data;
}


// 내가 쓴 리뷰 불러오기
export const getMyReview = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(`${prefix}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return res.data;
}