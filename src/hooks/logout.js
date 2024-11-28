// 로그아웃
export const logout = async () => {
    

    localStorage.removeItem("memberId");
    localStorage.removeItem("token");
    console.log("로그아웃 성공");
    window.location.replace("/login");

}