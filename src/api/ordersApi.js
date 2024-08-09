import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/orders`;

const token = localStorage.getItem("token");


export const getOrdersList = async (search) => {
    
    const res = await axios.get(`${prefix}/list`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: {search}
    });
    
    return res.data;
}


export const postOrdersAdd = async (ordersObj) => {
    
    const res = await axios.post(`${prefix}`, ordersObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
}

