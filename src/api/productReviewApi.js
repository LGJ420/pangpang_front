import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

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