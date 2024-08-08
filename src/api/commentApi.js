import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';
const prefix = `${API_SERVER_HOST}/api/comment`;

export const getCommentsByArticleId = async (articleID) => {
    const res = await axios.get(`${prefix}/article/${articleID}`);
    return res.data;
}

export const postComment = async (comment) => {
    const res = await axios.post(prefix, comment);
    return res.data;
}

export const putComment = async (id, comment) => {
    const res = await axios.put(`{prefix}/${id}`, comment);
    return res.data;
}

export const deleteComment = async (id) => {
    await axios.delete(`${prefix}/${id}`);
}
