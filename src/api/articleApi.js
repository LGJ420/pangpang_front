import axios from "axios"


const prefix = `/api/article`;


//글 작성하기
export const postCreate = async (articleObj) => {
    const token = localStorage.getItem("token");
    
    try {
        
        const res = await axios.post(`${prefix}`, articleObj, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
        return res.data;
        
    } catch (error) {
        // console.log("Error fetching article:" ,error);
        throw error;
    }
}



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
        // console.log("Error fetching list:" ,err);
        throw err;
    }
}



// 글 상세 보기
export const getOne = async (id) => {
    try {
        const res = await axios.get(`${prefix}/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};



//글 삭제하기
export const deleteOne = async (id) => {
    const token = localStorage.getItem("token");

    try {
        
        const res = await axios.delete(`${prefix}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
        return res.data;

    } catch (error) {
        // console.log("Error deleting user's articles:" ,error);
        throw error;
    }
}



//글 수정하기
export const putOne = async (id, article) => {
    const token = localStorage.getItem("token");

    try {
        
        const res = await axios.put(`${prefix}/${id}`, article, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
        return res.data;

    } catch (error) {
        // console.log("Error modifying user's articles:" ,error);
        throw error;
    }
}



// 마이페이지 내가 쓴 글 조회
export const getMyArticles = async (pageParam) => {
    const {memberId, page, size} = pageParam;
    const token = localStorage.getItem('token');

    try {
        const res = await axios.get(`${prefix}/myArticles`, {
            params: { 
                memberId,
                page, 
                size 
            },
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });
        return res.data;
    } catch (err) {
        // console.error("Error fetching user's articles:", err);
        throw err;
    }
}
