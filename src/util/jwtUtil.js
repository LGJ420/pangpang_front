/**
 * 지금은 몰라도 되는 UTIL, 지금 사용 안하는중
 * axios를 토큰과 함께주는 axios로 개조시킨 파일
 */


//Axios의 요청/응답 시에 동작할 함수들을 정의

import axios from "axios"
import { getCookie, setCookie } from "./cookieUtil";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {

    const header = {header: {"Authorization": `Bearer ${accessToken}`}};

    //POST방식이 낫긴하지만 예제에서는 눈에 보이도록 GET방식을 이용했음
    const res = await axios.get(`/api/member/refresh?refreshToken=${refreshToken}`, header);

    console.log("----------------------");
    console.log(res.data);

    return res.data;
}

const beforeReq = (config) => {

    console.log("before request.............");

    const memberInfo = getCookie("member");

    if(!memberInfo){
        console.log("Member NOT FOUND");

        return Promise.reject({
            response: {
                data:
                    {error: "REQUIRE_LOGIN"}
            }
        });
    }

    const {accessToken} = memberInfo;

    //Authorization 헤더 처리
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
}

const requestFail = (err) => {

    console.log("request error.............")

    return Promise.reject(err);
}

const beforeRes = async (res) => {

    console.log("before return response.............")

    const data = res.data;

    if(data && data.error === 'ERROR_ACCESS_TOKEN'){

        const memberCookieValue = getCookie("member");

        const result = await refreshJWT(memberCookieValue.accessToken,
            memberCookieValue.refreshToken);

        console.log("refreshJWT RESULT", result);

        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;

        setCookie("member", JSON.stringify(memberCookieValue), 1);


        // 원래 요청에 새로받은 accessToken을 넣어서 다시 요청
        const originalRequest = res.config;

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

        return await axios(originalRequest);
    }

    return res;
}

const responseFail = (err) => {

    console.log("response fail error.............")

    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail);

jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;