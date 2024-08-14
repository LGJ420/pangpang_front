import { useEffect, useState } from "react";

const initState = {
    id: "",
    memberName: "",
    memberRole: "",
    memberNickname: "",
    sub: "",
    iat: 0,
    exp: 0
}

// Base64 URL 디코딩 함수
const base64UrlDecode = (str) => {
    // 패딩 추가
    while (str.length % 4) {
        str += '=';
    }
    // URL 안전 문자를 일반 Base64로 변환
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    return atob(str);
}

const useCustomToken = () => {


    // 토큰 유(로그인O)무(로그인X) 따지는 state
    const [isLogin, setIsLogin] = useState(false);
    const [decodeToken, setDecodeToken] = useState(initState);


    useEffect(()=>{
        
            // 로그인해야 로컬스토리지에 토큰이 저장됨
            const token = localStorage.getItem("token");
        
            
            if (token) {
                // 토큰이 있으면 state를 true로 바꿈
                setIsLogin(true);
        
                // 토큰에서 페이로드 부분 추출
                const payload = token.split('.')[1];

                // Base64 URL 디코딩
                const base64Decoded = base64UrlDecode(payload);

                // UTF-8로 변환
                const decoder = new TextDecoder('utf-8');
                const jsonString = decoder.decode(new Uint8Array([...base64Decoded].map(char => char.charCodeAt(0))));

                // JSON 문자열로 변환
                const decodeToken = JSON.parse(jsonString);

                // 상태 업데이트
                setDecodeToken(decodeToken);
        
            } else {
        
                setIsLogin(false);
        
            }
    },
    [localStorage.getItem("token")] // 토큰 값이 변경될 때마다 useEffect 실행
);

    return { isLogin, decodeToken }

}

export default useCustomToken;