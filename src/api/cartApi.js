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


//변경해야함
export const deleteOne = async (ano) => {

    const res = await axios.delete(`${prefix}/${ano}`);

    return res.data;
}
