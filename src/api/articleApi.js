import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080';
const prefix = `${API_SERVER_HOST}/api/article`;

// 글 목록 보기
export const getList = async (pageParam) => { 
    const {search, page, size, searchBy} = pageParam;
    
    try{
        const res = await axios.get(`${prefix}/list`, 
            {params: {
                search, 
                page, 
                size,
                searchBy
            }
        });
        return res.data;
    }catch(err){
        console.log("Error fetching list:" ,err);
        throw err;
    }
}

// 글 상세 보기
export const getOne = async (id) => {

    const res = await axios.get(`${prefix}/read/${id}`);

    return res.data;
}

//글 작성하기
export const postCreate = async (articleObj) => {
    const token = localStorage.getItem("token");
    
    const res = await axios.post(`${prefix}/create`, articleObj, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
}

//글 삭제하기
export const deleteOne = async (id) => {

    const res = await axios.delete(`${prefix}/list/${id}`);

    return res.data;
}

//글 수정하기
export const putOne = async (id, article) => {
    const token = localStorage.getItem("token");

    const res = await axios.put(`${prefix}/modify/${id}`, article, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return res.data;
}

