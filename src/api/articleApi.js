import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/article`;

export const getOne = async (article) => {

    const res = await jwtAxios.get(`${prefix}/${article}`);

    return res.data;
}

export const getList = async (pageParam) => {

    const {page, size} = pageParam;

    const res = await jwtAxios.get(`${prefix}/list`, {params: {page: page, size: size}});

    return res.data;
}

export const postAdd = async (articleObj) => {

    const res = await jwtAxios.post(`${prefix}/`, articleObj);

    return res.data;
}

export const deleteOne = async (ano) => {

    const res = await jwtAxios.delete(`${prefix}/${ano}`);

    return res.data;
}

export const putOne = async (article) => {

    const res = await jwtAxios.put(`${prefix}/${article.ano}`, article);

    return res.data;
}

