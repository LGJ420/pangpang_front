import { logoutMember } from "../api/memberApi";

// 로그아웃
export const logout = async () => {
    
    try {
        await logoutMember();
        console.log("로그아웃 성공");
        localStorage.removeItem("memberId");
        localStorage.removeItem("token");
        window.location.replace("/login");
    } catch (error) {
        // console.error("로그아웃 실패", error);
    }
}