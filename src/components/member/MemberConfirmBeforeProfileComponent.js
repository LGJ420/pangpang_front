import { useState } from 'react';
import styles from '../../css/memberPage.module.css';

const MemberConfirmBeforeProfileComponent = () => {

    const [memberPwInConfirmBeforeProfile, setMemberPwInConfirmBeforeProfile] = useState('');

    const handleMemberPwInConfirmBeforeProfile = (e) => {
        setMemberPwInConfirmBeforeProfile(e.target.value);
    }
    
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

        // 3. post로 비밀번호 전송
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
                onChange={handleMemberPwInConfirmBeforeProfile}/>

            </div>
            <button onClick={clickConfirmBeforeProfile}>확인</button>

        </div>
    );
}

export default MemberConfirmBeforeProfileComponent;