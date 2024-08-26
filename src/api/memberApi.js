import axios from "axios"

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;
const prefix = `${API_SERVER_HOST}/api/member`;



export const getMemberList = async () => {

    const res = await axios.get(`${prefix}`);
    
    return res.data;
}

// 마이페이지- 내 정보 변경 전 비밀번호 확인하기
export const confirmMemberPassword = async (password) => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.post(`${prefix}/confirm_before_profile`, { memberPw: password }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.error("Error confirming member password:", err);
        throw err;
    }
};

// 아이디 찾기
export const findMemberId = async (name, birth) => {
    try {
        const res = await axios.post(`${prefix}/find/id`, {
            memberName: name,
            memberBirth: birth
        });
        return res.data;
    } catch (err) {
        console.error("Error finding member ID:", err);
        throw err;
    }
};