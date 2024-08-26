import axios from 'axios';

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;
const prefix = `${API_SERVER_HOST}/api/comment`;



// 댓글 추가하기
export const postComment = async (comment) => {
    const token = localStorage.getItem("token");

    const res = await axios.post(`${prefix}`, comment, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};



// 댓글 수정하기
export const putComment = async (id, comment) => {
    const token = localStorage.getItem("token");

    const res = await axios.put(`${prefix}/modify/${id}`, comment, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};



// 댓글 삭제하기
export const deleteComment = async (id) => {
    await axios.delete(`${prefix}/${id}`);
};



// 댓글 가져오기
export const getCommentById = async (id) => {
    const res = await axios.get(`${prefix}/${id}`);
    return res.data;
};



// 특정 게시글의 댓글 목록 조회
export const getCommentsByArticleId = async (articleId, pageParam) => {
    const {page, size} = pageParam;

    const res = await axios.get(`${prefix}/article/${articleId}`,
        {params: {
            page,
            size
        }
    });
    return res.data;
}



// 마이페이지 내가 쓴 댓글 목록 조회
export const getMyComments = async (pageParam) => {
    const {page, size, memberId} = pageParam;
    const token = localStorage.getItem("token");
    
    try{
    const res = await axios.get(`${prefix}/myComments`,{
        params: {
            page,
            size,
            memberId
        },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
    } catch (err){
        console.error(err);
        throw err;
    }
}