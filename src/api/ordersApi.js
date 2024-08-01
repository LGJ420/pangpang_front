import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/orders`;


export const getOrdersList = async () => {
    
    const res = await axios.get(`${prefix}`);
    
    return res.data;
}


export const postOrdersAdd = async (ordersObj) => {
    
    const res = await axios.post(`${prefix}`, ordersObj);

    return res.data;
}

