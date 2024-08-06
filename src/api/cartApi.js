import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/cart`;


export const getCartList = async () => {
    
    const res = await axios.get(`${prefix}`);
    
    return res.data;
}


export const postCartAdd = async (cartObj) => {
    
    const res = await axios.post(`${prefix}`, cartObj);

    return res.data;
}


// 지금은 사용자가 1번 고정 나중에 로그인한 사용자로 수정할 예정
export const deleteCartOne = async (cartObj) => {

    const res = await axios.delete(`${prefix}`, { data: cartObj });

    return res.data;

}

export const putCartOne = async (cartObj) => {

    const res = await axios.put(`${prefix}`, cartObj);

    return res.data;
}