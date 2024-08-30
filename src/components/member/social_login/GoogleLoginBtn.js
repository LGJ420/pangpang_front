export default function GoogleLoginBtn() {

    const handleLogin = () => {
    //     const clientId = process.env.GOOGLE_CLIENT_ID;
    //     const redirectUri = window.location.href;
    //     const scope = 'https://www.googleapis.com/auth/userinfo.profile';

    //     const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${redirectUri}&client_id=${clientId}`

    //     window.location.href = authUrl;

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