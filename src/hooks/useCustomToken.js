import { useEffect, useState } from "react";

const initState = {
    id: "",
    memberName: "",
    memberRole: "",
    sub: "",
    iat: 0,
    exp: 0
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
                const payload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
        
                // Base64를 디코딩하여 문자열을 얻음
                const base64Decoded = atob(payload);
        
                // UTF-8로 설정
                const uint8Array = new Uint8Array(base64Decoded.length);
        
                for (let i = 0; i < base64Decoded.length; i++) {
                    uint8Array[i] = base64Decoded.charCodeAt(i);
                }
        
                const decoder = new TextDecoder('utf-8');
                const jsonString = decoder.decode(uint8Array);
                const decodeToken = JSON.parse(jsonString);
        
                setDecodeToken(decodeToken);
        
            } else {
        
                setIsLogin(false);
        
            }
    },[]);

    return { isLogin, decodeToken }

}

export default useCustomToken;