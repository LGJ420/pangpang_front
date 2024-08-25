import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

// 기본 - 기정오빠가 만든 것
const getNum = (param, defaultValue) => {

    if (!param) {
        return defaultValue;
    }

    return parseInt(param);
}


// 상품 목록 - 검색에서 쓸 것 (문자열)
const getString = (param, defaultValue) => {

    if (!param) {
        return defaultValue;
    }

    return param;
}

const useCustomMove = () => {

    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false);

    const [queryParams] = useSearchParams();

    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 12);   // 상품 목록에서 한 페이지 당 데이터 12개씩 가져오기 위해 변경
    const search = getString(queryParams.get('search'), '');   // 상품 목록에서 필요한 검색
    const category = getString(queryParams.get('category'), '');

    const queryDefault = createSearchParams({ search, page, size }).toString();

    // 목록화면으로 이동하는 기능
    const moveToList = (pageParam) => {

        let queryStr = "";

        if (pageParam) {

            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 12); // 상품 목록에서 한 페이지 당 데이터 12개씩 가져오기 위해 변경
            const searchStr = getString(pageParam.search, search);      // 상품 목록 - 검색에서 사용
            const categoryStr = getString(pageParam?.category, category);

            queryStr = createSearchParams({ category: categoryStr, search: searchStr, page: pageNum, size: sizeNum, }).toString();
        }
        else {
            queryStr = queryDefault;
        }

        setRefresh(!refresh);
        navigate({ pathname: `../list`, search: queryStr });
    }



    // 수정화면으로 이동하는 기능
    const moveToModify = (num) => {

        console.log(queryDefault);

        navigate({ pathname: `../modify/${num}`, search: queryDefault });
    }



    // 글을 누르면 읽기 화면으로 이동하는 기능
    const moveToRead = (id) => {

        // console.log(queryDefault);

        navigate({ pathname: `../read/${id}`, search: queryDefault });
    }

    return { moveToList, moveToModify, moveToRead, page, size, search, category,refresh }
}

export default useCustomMove;