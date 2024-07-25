import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';



/** 
 * 참고로 여긴 articleApi임
 * 이거 localhost:8080/api/article이랑 통신되는거임
 * 
 * 그니까 백에있는 컨트롤러 마다 Api 만들어야된다는 말이다
 * productApi, memberApi, cartApi, kakaoApi, cashApi ...........
 * 
 * 자기꺼 자기가 만들어서 써야된다는거임
 * 이 파일 참고해서 만들어보삼, 언제나 말하지만 리액트 책보면댐
 * 131페이지 253페이지 등등 계속해서 도메인마다 api 만들어 나가는거볼수있을거임
 */

const prefix = `${API_SERVER_HOST}/api/article`;



/**
 * 리스트 요청은 page, size가 필요하다는걸
 * 그냥 머리속에 달달 외우자
 * 
 *       page           size
 * 몇페이지 볼건데? 몇개필요한데?
 * 
 *       page           size
 * 몇페이지 볼건데? 몇개필요한데?
 * 
 *       page           size
 * 몇페이지 볼건데? 몇개필요한데?
 * 
*/
export const getList = async (pageParam) => {
    
    const {page, size} = pageParam;
    
    const res = await axios.get(`${prefix}/list`, {params: {page: page, size: size}});
    
    return res.data;
}




/**
 * 나머진 그냥 졸라쉽다
 * 이 글번호인거 하나 주세염
 */
export const getOne = async (ano) => {

    const res = await axios.get(`${prefix}/${ano}`);

    return res.data;
}


/**
 * 제가 만든거 저장해주세염
 */
export const postCreate = async (todoObj) => {
    
    const res = await axios.post(`${prefix}/`, todoObj);

    return res.data;
}


/**
 * 이 글번호인거 지워주세염
 */
export const deleteOne = async (ano) => {

    const res = await axios.delete(`${prefix}/${ano}`);

    return res.data;
}


/**
 * 원래 글 새로만든 이걸로 좀 바꿔주세염
 */
export const putOne = async (article) => {

    const res = await axios.put(`${prefix}/${article.ano}`, article);

    return res.data;
}

