import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/productreview`;


// 리뷰 등록
export const postReviewAdd = async (productReviewObj) => {

    const token = localStorage.getItem("token");
    
    const res = await axios.post(`${prefix}`, productReviewObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
}