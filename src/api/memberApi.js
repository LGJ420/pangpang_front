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

// 비밀번호 찾기
export const findMemberPassword = async (id, name, birth) => {
    try {
        const res = await axios.post(`${prefix}/find/pw`, {
            memberId: id,
            memberName: name,
            memberBirth: birth
        });
        return res.data;
    } catch (err) {
        console.error("Error finding member password:", err);
        throw err;
    }
};

// 로그인
export const loginMember = async (id, password) => {
    try {
        const res = await axios.post(`${prefix}/login`, {
            memberId: id,
            memberPw: password
        });
        return res.data;
    } catch (err) {
        console.error("Error logging in member:", err);
        throw err;
    }
};

// 마이페이지 - 내 정보 변경
export const updateMemberProfile = async (formData) => {
    const token = localStorage.getItem("token");
    try {
        const res = await axios.post(`${prefix}/mypage/modify`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.error("Error updating member profile:", err);
        throw err;
    }
};

// 마이페이지 - 내 정보 변경 - 프로필 사진 삭제
export const deleteProfileImage = async (memberId) => {
    try {
        const res = await axios.delete(`${prefix}/${memberId}/image`);
        return res.data;
    } catch (err) {
        console.error("Error deleting profile image:", err);
        throw err;
    }
};

// 비밀번호 찾기->비밀번호 변경
export const resetMemberPassword = async (memberId, newPassword) => {
    try {
        const res = await axios.post(`${prefix}/find/pw/reset`, {
            memberId,
            memberPw: newPassword
        });
        return res;
    } catch (err) {
        console.error("Error resetting member password:", err);
        throw err;
    }
};

