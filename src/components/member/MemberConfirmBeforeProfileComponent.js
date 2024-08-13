import styles from '../../css/memberPage.module.css';

const MemberConfirmBeforeProfileComponent = () => {
    return(
        <div className={styles.test}>
            <p>내 정보 수정</p>
            <p>회원님의 개인정보 보호를 위해 본인확인을 진행합니다.</p>
            <p><strong>팡팡게임즈 비밀번호</strong>를 입력해주세요.</p>

            <div>

                <span>
                    비밀번호
                </span>
                <input placeholder='비밀번호를 변경해주세요.'/>

            </div>
            <button>확인</button>

        </div>
    );
}

export default MemberConfirmBeforeProfileComponent;