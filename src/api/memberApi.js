import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/member`;



export const getMemberList = async () => {

    const res = await axios.get(`${prefix}`);
    
    return res.data;
}


