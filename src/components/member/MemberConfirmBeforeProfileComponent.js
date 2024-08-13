import { useState } from 'react';
import styles from '../../css/memberPage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MemberConfirmBeforeProfileComponent = () => {

    // ⓐ 비밀번호  state
    const [memberPwInConfirmBeforeProfile, setMemberPwInConfirmBeforeProfile] = useState('');

    // ⓑ input에 작성한 비밀번호 실시간으로 저장하는 핸들러(ⓐ이랑 짝꿍)
    const handleMemberPwInConfirmBeforeProfile = (e) => {
        setMemberPwInConfirmBeforeProfile(e.target.value);
    }

    const navigate = useNavigate();
    
    // 토큰 가져오기(프린시펄 하려면 토큰을 보내야함)
    // 로컬스토리지에 토큰을 가져옴
    const token = localStorage.getItem("token");
    
    // 비밀번호 확인 버튼
    const clickConfirmBeforeProfile = () => {
        // 1. 제대로 입력되었는지 확인
        console.log("click confirm_bofore_profile");
        console.log("비밀번호 입력 완료");
        console.log(memberPwInConfirmBeforeProfile);

        // 2. 빈칸은 없는가?
        if(!memberPwInConfirmBeforeProfile){
            const errorMsg = "입력하지 않은 사항이 있습니다.";
            console.error(errorMsg);
            alert(errorMsg);
            return; 
        }

        // 3. post로 토큰(아이디), 비밀번호 전송
        axios
        .post("http://localhost:8080/api/member/confirm_before_profile",
            {memberPwInConfirmBeforeProfile : memberPwInConfirmBeforeProfile },
            {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
            })
            
            // 3-1. 토큰에 저장된 사용자의 비밀번호와 입력된 비밀번호가 같으면 아래 링크로 이동하면서 데이터 전달
            .then((response)=>{
                console.log("response 이후 콘솔 내용")
                // ▼▼▼ 출력 제대로 되는지 확인용 ▼▼▼
                console.log(response.data)
                const {memberImage, memberId, memberNickname, memberPw, memberPhone, memberAddress } = response.data;
                // 페이지 이동(프로필변경 전 확인->프로필변경) 및 데이터 전달
                navigate("/mypage/profile", {state : {memberImage, memberId, memberNickname, memberPw, memberPhone, memberAddress}});
            })
            
            // 3-2. 없으면 에러 발생
            .catch((error)=>{
                const errorMsg = "비밀번호가 일치하지 않습니다.";
                alert(errorMsg);
                console.error(errorMsg);
            });
    }

    /* 검색 인풋창 엔터키만 눌러도 검색 */
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            clickConfirmBeforeProfile();
        }
    }

    return(
        <div className={styles.test}>
            <p>내 정보 수정</p>
            <p>회원님의 개인정보 보호를 위해 본인확인을 진행합니다.</p>
            <p><strong>팡팡게임즈 비밀번호</strong>를 입력해주세요.</p>

            <div>

                <span>
                    비밀번호
                </span>
                <input 
                type='password'
                placeholder='비밀번호를 변경해주세요.' 
                onChange={handleMemberPwInConfirmBeforeProfile}
                value={memberPwInConfirmBeforeProfile}
                onKeyDown={handleKeyDown}/>

            </div>
            <button onClick={clickConfirmBeforeProfile}>확인</button>

        </div>
    );
}

export default MemberConfirmBeforeProfileComponent;