import styles from '../../css/memberPage.module.css';

const MemberProfileComponent = () => {
    return(
        <div className={styles.test}>
            <p>내 정보 수정</p>
            <p>팡팡게임즈 대표 프로필과 닉네임을 수정 하실 수 있습니다.</p>

            <div>
                <ul>
                    <li>
                        <span>
                            사진
                        </span>
                        <span>
                            사진등록하는곳^_^
                        </span>
                    </li>
                    <li>
                        <span>
                            닉네임
                        </span>
                        <input placeholder='현재 닉네임 그대로 적혀있기' value={"현재 닉네임 그대로 적혀있기"}/>
                    </li>
                    <li>
                        <span>
                            비밀번호 변경
                        </span>
                        <input placeholder='비밀번호를 변경해주세요.'/>
                    </li>
                    <li>
                        <span>
                            비밀번호 확인
                        </span>
                        <input placeholder='비밀번호를 변경해주세요.'/>
                    </li>
                    <li>
                        <span>
                            핸드폰
                        </span>
                        <input value={"현재  번호 적혀있기"}/> - <input value={"현재  번호 적혀있기"}/> - <input value={"현재  번호 적혀있기"}/>
                    </li>
                    <li>
                        <span>
                            주소
                        </span>
                        <input value={"현재  주소 적혀있기"}/> 
                        <input value={"현재  주소 적혀있기"}/><input value={"현재  주소 적혀있기"}/>
                    </li>
                </ul>
            </div>
            <button>수정하기</button>

        </div>
    );
}

export default MemberProfileComponent;