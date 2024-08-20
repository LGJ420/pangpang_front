import axios from 'axios';

export const API_SERVER_HOST = 'http://localhost:8080';
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

// 특정 게시글의 댓글 목록 가져오기
export const getCommentsByArticleId = async (articleId) => {
    const res = await axios.get(`${prefix}/article/${articleId}`);
    return res.data;
}