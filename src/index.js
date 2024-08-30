import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


// 카카오 SDK를 초기화하는 함수
const initializeKakao = () => {
    const kakaoApiKey = process.env.REACT_APP_KAKAO_API_KEY;

    if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoApiKey);
        }
    } else {
        console.error("Kakao SDK is not loaded.");
    }
};

// 카카오 SDK 로딩 후 초기화
if (window.Kakao) {
    initializeKakao();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <RecoilRoot>
            <App />  
        </RecoilRoot>
    </ChakraProvider>
);   

reportWebVitals();
