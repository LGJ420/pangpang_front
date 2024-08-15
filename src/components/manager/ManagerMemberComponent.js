import { useEffect, useState } from "react";
import { getMemberList } from "../../api/memberApi";

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
        <div>
            {serverData.map(data=>

                <div>
                    {data.id}, {data.memberId}, {data.memberName}, {data.memberNickname}, {data.memberRole}, {data.active}
                </div>
            )}
        </div>
    );

}

export default ManagerMemberComponent;