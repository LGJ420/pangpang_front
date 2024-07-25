/**
 * 지금은 몰라도 되는 UTIL, 지금 사용 안하는중
 * 쿠키 받아서 쿠키 처리방식을 개조한 파일
 */


import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, days) => {

    const expires = new Date();

    //보관기한
    expires.setUTCDate(expires.getUTCDate() + days);

    return cookies.set(name, value, {path:'/', expires: expires});
}

export const getCookie = (name) => {

    return cookies.get(name);
}

export const removeCookie = (name, path="/") => {

    cookies.remove(name, {path});
}