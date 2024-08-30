export default function GoogleLoginBtn() {

    const handleLogin = () => {
        // console.log('클라이언트 ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);   // 확인용
        // console.log('리디렉션 URL:', process.env.REACT_APP_GOOGLE_REDIRECT_URL);  // 확인용

    
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID; // 클라이언트 ID
        const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URL; // 리디렉션 URI

        if (!clientId || !redirectUri) {
            console.error("클라이언트 ID 또는 리디렉션 URI가 환경 변수에서 설정되지 않았습니다.");
            return;
        }

        const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        url.searchParams.set('client_id', clientId);
        url.searchParams.set('redirect_uri', redirectUri);
        url.searchParams.set('response_type', 'code');
        url.searchParams.set('scope', 'email profile');

        window.location.href = url.toString();
    };

    // useEffect(() => {
    //         const urlParams = new URLSearchParams(window.location.search);
    //         const code = urlParams.get('code');
    //         console.log(code);
        
    // })

    return (
        <button onClick={handleLogin}>구글 아이디로 로그인</button>
    )
}