import axios from "axios"
import { API_SERVER_HOST } from "./serverHost";


const prefix = `${API_SERVER_HOST}/api/orders`;



export const getOrdersList = async (search) => {
    
    const token = localStorage.getItem("token");

    const res = await axios.get(`${prefix}/list`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: {search}
    });
    
    return res.data;
}



export const postOrdersAdd = async (ordersObj) => {

    const token = localStorage.getItem("token");
    
    const res = await axios.post(`${prefix}`, ordersObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
}

