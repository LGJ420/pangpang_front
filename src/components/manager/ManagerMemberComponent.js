import { useEffect, useState } from "react";
import { getMemberList, changeMemberRole, changeMemberActiveStatus } from "../../api/memberApi";
import styles from "../../css/memberPage.module.css"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import MypageTitleComponent from "../common/MypageTitleComponent";
import SearchBarComponent from "../common/SearchBarComponent";

/* 초기값 설정 */
const initData =     {
    dtoList: [
            {
                id: 0,
                memberId: "",
                memberName: "",
                memberNickname: "",
                memberRole: "",
                memberSignupDate: "",
                active: true
            },
        ], // 회원 데이터 리스트
        pageNumList: [], // 페이지 번호 리스트
        pageRequestDTO: null, // 현재 페이지 요청 정보
        // { 
        //     page: 1,
        //     size: 12,
        //     search: null,
        //     searchBy: null
        //     null
        // },
        prev: false, // 이전 페이지 존재 여부
        next: false, // 다음 페이지 존재 여부
        totalCount: 0, // 전체 데이터 총 개수
        prevPage: 0, // 이전 페이지 번호, 존재하지 않으면 0 또는 null
        nextPage: 0, // 다음 페이지 번호, 존재하지 않으면 0 또는 null
        totalPage: 0, // 전체 페이지 수
        current: 0 // 현재 페이지 번호
}

    // 페이지네이션 관련 코드
    const getNum = (param, defaultValue) => {
        if (!param) {
            return defaultValue;
        }
        return parseInt(param);
    }   

    const getString = (param, defaultValue) => {
        if (!param) {
            return defaultValue;
        }
        return param;
    }

const ManagerMemberComponent = () => {

    const [serverData, setServerData] = useState(initData);
    const [word, setWord] = useState("");   // 회원 검색용
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [queryParams] = useSearchParams();

    const navigate = useNavigate();



    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 12);   // 상품 목록에서 한 페이지 당 데이터 12개씩 가져오기 위해 변경
    const search = getString(queryParams.get('search'), '');    // 상품 목록에서 필요한 검색

    const queryDefault = createSearchParams({ search, page, size }).toString();



    const moveToList = (pageParam) => {

        let queryStr = "";

        if (pageParam) {

            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 12); // 회원 목록에서 한 페이지 당 데이터 12개씩 가져오기 위해 변경
            const searchStr = getString(pageParam.search, search);      // 회원 목록 - 검색에서 사용

            queryStr = createSearchParams({ search: searchStr, page: pageNum, size: sizeNum, }).toString();
        }
        else {
            queryStr = queryDefault;
        }

        setRefresh(!refresh);
        navigate({ pathname: `../member`, search: queryStr });
    }




    useEffect(() => {
        const fetchData = async () => {   // fetchData : 비동기 함수. 서버에서 데이터를 가져오고 이미지를 로드하는 작업 수행
            try {
                // 상품 목록 데이터 가져오기
                const data = search
                ? await getMemberList({ search, page, size })
                : await getMemberList({ page, size });
                setServerData(data);
                // console.log(data);   // 데이터 확인용
        
            }
            catch (error) {
                // console.error(error);
            }
            finally {
                setIsLoading(true);
            }
        };
    
        fetchData();
    }, [search, page, size, refresh]);


    const handleChangeSearch = (e) => {
        setWord(e.target.value);
    }

    const handleClickSearch = () => {
        moveToList({ search: word });
    }



    // 회원등급 버튼 눌렀을 때, User<->Admin 됨
    // serverData 자체를 변경해야됨
    const clickMemberRole = (data) => {
        const newRole = data.memberRole === "User" ? "Admin" : "User";
        
        changeMemberRole(data.id, newRole)
            .then(response => {
                setRefresh(!refresh);
                // console.log(response);
            })
            .catch(error => {
                // console.log("Error changing member role: ", error);
            });
    };




    // 회원활동/활동정지 버튼 눌렀을 때, 활동<->활동정지 됨
    // serverData 자체를 변경해야됨
    const clickMemberActive = (data) => {
        const newActive = data.active===false ? true : false ; 
        // true = 활동정지 , false = 활동
        // console.log("변경될 isActive 값:", newActive);
    
        changeMemberActiveStatus(data.id, newActive)
            .then(response => {
                setRefresh(!refresh);
                // console.log(response);
            })
            .catch(error => {
                // console.log("Error changing member active status: ", error);
            });
    }



    return(
        <div>
            <div className="flex items-center justify-between mb-5">
                <MypageTitleComponent>
                    회원 관리
                </MypageTitleComponent>

                <SearchBarComponent 
                    width="40%" 
                    changeFn={handleChangeSearch} 
                    clickFn={handleClickSearch}
                />
            </div>
            <h3 className="text-xl my-5 ml-4">
                총 회원 수 : {serverData.totalCount}
            </h3>
                <div className={styles.membersHeader}>
                    <div>회원번호</div>
                    <div>회원 아이디</div>
                    {/* <div>회원 닉네임</div> */}
                    <div>회원 등급</div>
                    <div>회원 가입 날짜</div>
                    <div>회원 활동 상태</div>
                </div>

                {serverData.dtoList.map((data, index) => (

                    <div className={styles.membersBody} key={index}>
                        <div>{data.id}</div>
                        <div>{data.memberId}</div>
                        <div>
                            {data.memberRole}
                            <button 
                                className="text-white px-2 bg-[rgb(77,160,124)] ml-2" 
                                onClick={()=>clickMemberRole(data)}>
                                {/* {data.memberRole === "User" ? "Admin으로 변경" : "User으로 변경"} */}
                                변경
                            </button>
                        </div>
                        <div>{data.memberSignupDate.substr(0, 10)}</div>
                        <div>
                            {data.active === false ? "활동" : "활동정지"}
                            <button 
                                className="text-white px-2 bg-[rgb(77,160,124)] ml-2"
                                onClick={()=>clickMemberActive(data)}>
                                {/* {data.active === false ? "활동정지로 변경" : "활동으로 변경"} */}
                                변경
                            </button>
                        </div>
                    </div>
                ))}


            {/* 페이지네이션 */}

            <div className="py-10 text-gray-700 flex justify-center">
                {/* 이전 페이지 */}
                {serverData.current > 1 ?
                    <div className="cursor-pointer p-3"
                        onClick={() => moveToList({ page: serverData.prevPage })}>
                            {'\u003c'}
                        </div>
                    :

                    <></>
                }

                {/* 페이지 넘버 */}
                {serverData.pageNumList.map(pageNum => serverData.dtoList.length > 0 ?
                (<div key={pageNum}
                    className={`cursor-pointer p-3 ${serverData.current === pageNum ? 'text-[rgb(224,26,109)] border-b' : ''}`}
                    onClick={() => moveToList({ page: pageNum })}>{pageNum}</div>) : <></>)}


                {/* 다음 페이지 */}
                {serverData.next ?
                    <div className="cursor-pointer p-3"
                        onClick={() => moveToList({ page: serverData.nextPage })}>
                            {'\u003e'}
                        </div>
                    :
                    
                    <></>
                }

            </div>


        </div>
    );

}

export default ManagerMemberComponent;