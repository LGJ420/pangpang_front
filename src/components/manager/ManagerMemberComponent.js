import { useEffect, useState } from "react";
import { getMemberList, changeMemberRole, changeMemberActiveStatus } from "../../api/memberApi";

// 빨간선때문에 import함 나중에 삭제하시길 ㅎㅎ
import styles from "../../css/memberPage.module.css"
import MypageTitleComponent from "../common/MypageTitleComponent";
import SearchBarComponent from "../common/SearchBarComponent";

// const initData =     {
//     id: 0,
//     memberId: "",
//     memberName: "",
//     memberNickname: "",
//     memberSignupDate : "",
//     memberRole: "",
//     active: false
// }


const ManagerMemberComponent = () => {

    const [serverData, setServerData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{

        getMemberList()
            .then(data=>{
                setServerData(data);
                console.log(data);
            })
            .catch(e=>console.log(e));

    },[refresh]);

    // 회원등급 버튼 눌렀을 때, User<->Admin 됨
    // serverData 자체를 변경해야됨
    const clickMemberRole = (data) => {
        const newRole = data.memberRole === "User" ? "Admin" : "User";
        
        changeMemberRole(data.id, newRole)
            .then(response => {
                setRefresh(!refresh);
                console.log(response);
            })
            .catch(error => {
                console.log("Error changing member role: ", error);
            });
    };

    // 회원활동/활동정지 버튼 눌렀을 때, 활동<->활동정지 됨
    // serverData 자체를 변경해야됨
    const clickMemberActive = (data) => {
        const newActive = data.active===false ? true : false ; 
        // true = 활동정지 , false = 활동
        console.log("변경될 isActive 값:", newActive);
    
        changeMemberActiveStatus(data.id, newActive)
            .then(response => {
                setRefresh(!refresh);
                console.log(response);
            })
            .catch(error => {
                console.log("Error changing member active status: ", error);
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
                    // changeFn={handleChangeSearch} 
                    // clickFn={handleClickSearch}
                />
            </div>
            <h3 className="text-xl my-5 ml-4">
                총 회원 수 : {serverData.length}
            </h3>
                <div className={styles.membersHeader}>
                    <div>회원번호</div>
                    <div>회원 아이디</div>
                    <div>회원 닉네임</div>
                    <div>회원 등급</div>
                    <div>회원 가입 날짜</div>
                    <div>회원 활동 상태</div>
                </div>

                {serverData.slice().reverse().map((data, index) => (

                    <div className={styles.membersBody} key={index}>
                        <div>{data.id}</div>
                        <div>{data.memberId}</div>
                        <div>{data.memberNickname}</div>
                        <div>
                            {data.memberRole}
                            <button onClick={()=>clickMemberRole(data)}>
                                {data.memberRole === "User" ? "🔄️Admin" : "🔄️User"}
                            </button>
                        </div>
                        <div>{data.memberSignupDate.substr(0, 10)}</div>
                        <div>
                            {data.active === false ? "활동" : "활동정지"}
                            <button onClick={()=>clickMemberActive(data)}>
                                {data.active === false ? "🔄️활동정지" : "🔄️활동"}
                            </button>
                        </div>
                    </div>
                ))}

        </div>
    );

}

export default ManagerMemberComponent;