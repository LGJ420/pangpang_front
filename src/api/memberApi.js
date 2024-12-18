import axios from "axios"


const prefix = `/api/member`;


// ============ 회원가입 관련 api ============
// 회원가입 - 아이디 중복 확인
export const checkMemberId = async (memberId) => {
    try {
        const res = await axios.post(`${prefix}/signup/checkMemberId`, { memberId });
        return res;
    } catch (err) {
        // console.error("Error checking member ID:", err);
        throw err;
    }
};

// 회원가입
export const signupMember = async (formData) => {
    try {
        const res = await axios.post(`${prefix}/signup`, formData);
        return res.data;
    } catch (err) {
        // console.error("Error signing up member:", err);
        throw err;
    }
};




// ============ 아이디, 비밀번호 찾기 관련 api ============
// 아이디 찾기
export const findMemberId = async (name, birth) => {
    try {
        const res = await axios.post(`${prefix}/id`, {
            memberName: name,
            memberBirth: birth
        });
        return res.data;
    } catch (err) {
        // console.error("Error finding member ID:", err);
        throw err;
    }
};


// 비밀번호 찾기
export const findMemberPassword = async (id, name, birth) => {
    try {
        const res = await axios.post(`${prefix}/password`, {
            memberId: id,
            memberName: name,
            memberBirth: birth
        });
        return res.data;
    } catch (err) {
        // console.error("Error finding member password:", err);
        throw err;
    }
};

// 비밀번호 찾기->비밀번호 변경
export const resetMemberPassword = async (memberId, newPassword) => {
    try {
        const res = await axios.put(`${prefix}/password`, {
            memberId,
            memberPw: newPassword
        });
        return res;
    } catch (err) {
        // console.error("Error resetting member password:", err);
        throw err;
    }
};




// ============ 로그인 관련 api============
// 로그인
export const loginMember = async (id, password) => {
    try {
        const res = await axios.post(`${prefix}/login`, {
            memberId: id,
            memberPw: password
        });
        return res.data;
    } catch (err) {
        // console.error("Error logging in member:", err);
        throw err;
    }
};


// ============ 마이페이지 관련 api ============
// navBar, 마이페이지 레이아웃 프로필사진 불러오기
export const getMemberProfileImage = async (memberId) => {
    try {
        const response = await axios.get(`http://15.165.219.211:8080/api/productreview/view/${memberId}/image`);
        return response.data;
    } catch (error) {
        // console.error('Failed to fetch member profile image:', error);
        return null;
    }
};

// 마이페이지- 내 정보 변경 전 비밀번호 확인하기
export const confirmMemberPassword = async (password) => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.post(`${prefix}/mypage/confirm_before_profile`, { memberPw: password }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        // console.error("Error confirming member password:", err);
        throw err;
    }
};

// 마이페이지 - 내 정보 변경
export const updateMemberProfile = async (formData) => {
    const token = localStorage.getItem("token");
    try {
        const res = await axios.put(`${prefix}/mypage/profile`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        // console.error("Error updating member profile:", err);
        throw err;
    }
};

// 마이페이지 - 내 정보 변경 - 프로필 사진 삭제
export const deleteProfileImage = async (memberId) => {
    try {
        const res = await axios.delete(`${prefix}/${memberId}/image`);
        return res.data;
    } catch (err) {
        // console.error("Error deleting profile image:", err);
        throw err;
    }
};




// ============ 관리자 관련 api============
// 관리자 - 회원 정보 리스트 불러오기
export const getMemberList = async (pageParam) => {
    const { search, page, size } = pageParam;
    try {
        const response = await axios.get(`${prefix}`, { params: { search, page, size } });
        return response.data;
    } catch (error) {
        // console.error('Failed to fetch member list:', error);
        return [];
    }
}



// 관리자 - 회원 등급 변경(관리자<->유저)
export const changeMemberRole = async (id, newRole) => {
    try {
        const response = await axios.put(`${prefix}/mypage/manager/role`, {
            id: id,
            memberRole: newRole,
        });
        return response.data;
    } catch (error) {
        // console.error('Failed to change member role:', error);
        throw error;
    }
};

// 관리자 - 회원 활동 상태 변경(활성화<->비활성화)
export const changeMemberActiveStatus = async (id, newActive) => {
    try {
        const response = await axios.put(`${prefix}/mypage/manager/isActive`, {
            id: id,
            active: newActive,
        });
        return response.data;
    } catch (error) {
        // console.error('Failed to change member active status:', error);
        throw error;
    }
};