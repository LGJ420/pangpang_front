import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const getNum = (param, defaultValue) => {

    if (!param) {
        return defaultValue;
    }

    return parseInt(param);
}


/**
 * 
 * 훅 폴더에 있는 우리만의 훅이다
 * 훅이 대체 뭔지 잘 모르는 팀원을위해 써보면,
 * 졸라 많이 쓸거같은 기능을 만들어놓은 곳이다
 * 그니까 목록페이지로 가기, 상세페이지로 가기 이런거를
 * 상품에서도 쓸거같고, 자유게시판에서도 쓸거같고
 * 
 * 하여튼 개많이 쓸거같으니까
 * 그것들을 만들어놓은 곳이다
 * 
 * 
 * 예를들어
 * const {page, size, moveToList, moveToRead} = useCustomMove();
 * 
 * 이렇게 다른곳에서 사용하면
 * 
 * onClick={()=>moveToRead(글번호)}
 * 해서 이 글번호 상세보기로 가게하거나
 * 
 * 
 * 또다른예로
 * 페이지 네이션에서는 무조건 page, size가 필수인데
 * (3페이지 보고있냐? 몇개보여줄거냐? 같은거)
 * 그런것들을 page, size라고 여기 만들어 놓은것이다
 * 
 * 
 * 근데 이래도 감 안올거다.. 나도 써놓고도 외계어같음
 * 그래서 안써도된다
 * 
 * (근데 안써도 된다는말이
 * 안쓰니까 방법없네? 응애 하지말고
 * 안쓰면 안쓰는대로 노가다로 이동할방법을 잘 궁리해서 직접 구현하면 된다)
 * 
 * 쓰고싶은 사람은 꼭 책을보자
 * 138페이지부터 이걸 어떻게 쓰는건지 쭉 나온다
 * 
 */


const useCustomMove = () => {

    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false);

    const [queryParams] = useSearchParams();

    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 12);   // 상품 목록에서 한 페이지 당 데이터 12개씩 가져오기 위해 변경

    const queryDefault = createSearchParams({page, size}).toString();

    // 목록화면으로 이동하는 기능
    const moveToList = (pageParam) => {

        let queryStr = "";

        if (pageParam) {
            
            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 12); // 상품 목록에서 한 페이지 당 데이터 12개씩 가져오기 위해 변경

            queryStr = createSearchParams({page: pageNum, size: sizeNum}).toString();
        }
        else {
            queryStr = queryDefault;
        }

        setRefresh(!refresh);
        navigate({pathname: `../list`, search: queryStr});
    }

    // 수정화면으로 이동하는 기능
    const moveToModify = (num) => {

        console.log(queryDefault);

        navigate({pathname: `../modify/${num}`, search: queryDefault});
    }

    // 글을 누르면 읽기 화면으로 이동하는 기능
    const moveToRead = (num) => {

        console.log(queryDefault);

        navigate({pathname: `../read/${num}`, search: queryDefault});
    }

    return {moveToList, moveToModify, moveToRead, page, size, refresh}
}

export default useCustomMove;