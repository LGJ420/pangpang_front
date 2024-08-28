import axios from "axios"

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;
const prefix = `${API_SERVER_HOST}/api/product`;


/* 상품 등록 */
export const addProduct = async (formData) => {

  const token = localStorage.getItem("token");

  try {

    const res = await axios.post(`${prefix}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    // console.log("Error fetching product:", error);
    throw error;
  }
}


/* 상품 수정 */
export const modifyProduct = async (id, formData) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.put(`${prefix}/${id}`, formData, {
      headers: {
        "Content-Type": 'multipart/form-data',    // 파일 데이터 (이미지), 폼 데이터 처리 위해
        'Authorization': `Bearer ${token}`
      },
    });
    return res.data;
  } catch (error) {
    // console.log("Error modifying product:", error);
    throw error;
  }
}


/* 상품 삭제하기 */
export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.delete(`${prefix}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return res.data;

  } catch (error) {
    // console.log("Error deleting product:", error);
    throw error;
  }
}



/* 상품 목록보기 */
export const getList = async (pageParam) => {

  const { search, page, size, category } = pageParam;

  const res = await axios.get(`${prefix}/list`, { params: { search, page, size, category } });

  return res.data;
}


/* 상품 상세보기 */
export const getOne = async (id) => {

  const res = await axios.get(`${prefix}/${id}`);

  return res.data;
}


/* 상품 재고량만 수정 */
export const modifyProductStock = async (productId, productDTO) => {

  const token = localStorage.getItem("token");

  const res = await axios.put(`${prefix}/stock/${productId}`, productDTO, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return res.data;
}