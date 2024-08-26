import axios from "axios"

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;
const prefix = `${API_SERVER_HOST}/api/member`;



export const getMemberList = async () => {

    const res = await axios.get(`${prefix}`);
    
    return res.data;
}


