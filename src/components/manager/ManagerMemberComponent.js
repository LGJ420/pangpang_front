import { useState } from "react";

const initData =     {
    id: 0,
    memberId: "",
    memberName: "",
    memberNickname: "",
    memberRole: "",
    active: false
}


const ManagerMemberComponent = () => {

    const [serverData, setServerData] = useState(initData);

    return(
        <div>
            asdf
        </div>
    );

}

export default ManagerMemberComponent;