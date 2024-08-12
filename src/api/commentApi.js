import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';
const prefix = `${API_SERVER_HOST}/api/comment`;

//댓글 목록 가져오기
export const getCommentsByArticleId = async (articleID) => {
    const res = await axios.get(`${prefix}/article/${articleID}`);
    return res.data;
}

//댓글 추가하기
export const postComment = async (comment) => {
    const res = await axios.post(prefix, comment);
    return res.data;
}

//댓글 수정하기
export const putComment = async (commentId, comment) => {
    const res = await axios.put(`{prefix}/${commentId}`, comment);
    return res.data;
}

//댓글 삭제하기
export const deleteComment = async (commentId) => {
    await axios.delete(`${prefix}/${commentId}`);
}

//특정 댓글 가져오기
export const getCommentById = async (commentId) => {
    const res = await axios.get(`${prefix}/${commentId}`);
    return res.data;
}
