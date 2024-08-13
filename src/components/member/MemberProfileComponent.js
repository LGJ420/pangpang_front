import styles from '../../css/memberPage.module.css';
import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';

const MemberProfileComponent = () => {

    const location = useLocation();
    const {memberImage, memberId, memberNickname, memberPw, memberPhone, memberAddress} = location.state || {};

    // 닉네임
    const [chageMemberNickname, setChangeMemberNickname] = useState(memberNickname);

    const handleMemberNickname = (e) => {
        setChangeMemberNickname(e.target.value);
    }

    // 폰번호
    // memberPhone = "010-1234-5678"
    const [phone1, setPhone1] = useState(memberPhone.split('-')[0]); // 010
    const [phone2, setPhone2] = useState(memberPhone.split('-')[1]); // 1234
    const [phone3, setPhone3] = useState(memberPhone.split('-')[2]); // 5678

    const handlePhone1 = (e) => {
        setPhone1(e.target.value);
    }
    const handlePhone2 = (e) => {
        setPhone2(e.target.value);
    }
    const handlePhone3 = (e) => {
        setPhone3(e.target.value);
    }

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
                            아이디
                        </span>
                        <span>
                            {memberId}
                        </span>
                    </li>
                    <li>
                        <span>
                            닉네임
                        </span>
                        <input value={chageMemberNickname} onChange={handleMemberNickname}/>
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
                        <input placeholder='비밀번호를 다시 입력해주세요.'/>
                    </li>
                    <li>
                        <span>
                            핸드폰
                        </span>
                        <input value={phone1} onChange={handlePhone1}/> 
                        - 
                        <input value={phone2} onChange={handlePhone2}/> 
                        - 
                        <input value={phone3} onChange={handlePhone3}/>
                    </li>
                    {/* 
                    <li>
                        <span>
                            주소
                        </span>
                        <input value={"현재  주소 적혀있기"}/> 
                        <input value={"현재  주소 적혀있기"}/><input value={"현재  주소 적혀있기"}/>
                    </li> */}
                </ul>
            </div>
            <button>수정하기</button>

        </div>
    );
}

export default MemberProfileComponent;