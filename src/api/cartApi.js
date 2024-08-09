import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/cart`;

const token = localStorage.getItem("token");


export const getCartList = async () => {
    
    const res = await axios.get(`${prefix}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return res.data;
}


export const postCartAdd = async (cartObj) => {
    
    console.log(token);

    const res = await axios.post(`${prefix}`, cartObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
}


export const putCartOne = async (cartObj) => {
    
    const res = await axios.put(`${prefix}`, cartObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
}


// 삭제는 설정칸에 data로 넣어줘야한다
export const deleteCartOne = async (cartObj) => {

    const res = await axios.delete(`${prefix}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: cartObj
    });

    return res.data;

}