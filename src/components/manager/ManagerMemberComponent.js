import { useEffect, useState } from "react";
import { getMemberList } from "../../api/memberApi";
import styles from "../../css/memberPage.module.css"

const initData =     {
    id: 0,
    memberId: "",
    memberName: "",
    memberNickname: "",
    memberRole: "",
    active: false
}


const ManagerMemberComponent = () => {

    const [serverData, setServerData] = useState([initData]);

    useEffect(()=>{

        getMemberList().then(data=>{

            setServerData(data);
            console.log(data);
        }).catch(e=>console.log(e));

    },[]);

    return(
        // ▼이거 class는 그냥 빨간선때문에 한거임 나중에 알아서 바꾸세욤 ㅎㅁㅎ)>
        <div className={styles.test}> 
            <table>
                <tr>
                    <th>회원번호</th>
                    <th>회원 아이디</th>
                    <th>회원 닉네임</th>
                    <th>회원 등급</th>
                    <th>회원 가입 날짜</th>
                    <th>회원 활동 상태</th>
                </tr>
            {serverData.map(data=>
            <>

                <tr>
                    <td>{data.id}</td>
                    <td>{data.memberName}</td>
                    <td>{data.memberNickname}</td>
                    <td>{data.memberRole}</td>
                    <td>{data.memberSignupDate}</td>
                    <td>{data.active==0? "활동" : "활동정지"}</td>
                </tr>
            </>
            )}
            </table>
        </div>
    );

}

export default ManagerMemberComponent;