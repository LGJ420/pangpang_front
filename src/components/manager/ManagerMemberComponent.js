import { useEffect, useState } from "react";
import { getMemberList } from "../../api/memberApi";
import axios from "axios";

// 빨간선때문에 import함 나중에 삭제하시길 ㅎㅎ
import styles from "../../css/memberPage.module.css"

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

        getMemberList().then(data=>{

            setServerData(data);
            console.log(data);
        }).catch(e=>console.log(e));

    },[refresh]);

    // 회원등급 버튼 눌렀을 때, User<->Admin 됨
    // serverData 자체를 변경해야됨
    const clickMemberRole = (data) => {
        const newRole = data.memberRole === "User" ? "Admin" : "User";
        
        axios.post("http://localhost:8080/api/member/mypage/manager/change/role",{
            id : data.id,
            memberRole : newRole,
        })
        .then((response)=>{
            setRefresh(!refresh);
            console.log(response.data);
        })
        .catch((error)=>{
            console.log("에러메세지 : " + error);
        })
    }

    return(
        // ▼이거 class는 그냥 빨간선때문에 한거임 나중에 알아서 바꾸세욤 ㅎㅁㅎ)>
        <div className={styles.test}> 
            <div>총 회원 수 : {serverData.length}</div>
            <div className={styles.membersGrid}>
                <div className={styles.membersHeader}>
                    <div>회원번호</div>
                    <div>회원 아이디</div>
                    <div>회원 닉네임</div>
                    <div>회원 등급</div>
                    <div>회원 가입 날짜</div>
                    <div>회원 활동 상태</div>
                </div>
                {serverData.map(data => (
                    <div className={styles.memberRow} key={data.id}>
                        <div>{data.id}</div>
                        <div>{data.memberName}</div>
                        <div>{data.memberNickname}</div>
                        <div>
                            {data.memberRole}
                            <button onClick={()=>clickMemberRole(data)}>
                                {data.memberRole === "User" ? "🔄️Admin" : "🔄️User"}
                            </button>
                        </div>
                        <div>{data.memberSignupDate}</div>
                        <div>
                            {data.active == 0 ? "활동" : "활동정지"}
                            <button>
                                {data.active == 0 ? "🔄️활동정지" : "🔄️활동"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default ManagerMemberComponent;