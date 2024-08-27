import styles from '../../css/memberPage.module.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { findMemberPassword } from '../../api/memberApi';
import {
    Input,
    FormControl,
    FormLabel,
    } from '@chakra-ui/react'
import { useState } from "react";
import { Inko } from 'inko';

const MemberFindPwComponent = () => {

    // ☆★☆★☆★☆★ 비밀번호 ☆★☆★☆★☆★
    
    // 비밀번호 찾기 관련 state, onchange 메소드
    const [memberIdInFindPw, setMemberIdInFindPw] = useState('');
    const [memberNameInFindPw, setMemberNameInFindPw] = useState('');
    const [memberBirthInFindPw, setMemberBirthInFindPw] = useState('');
    
    const handleMemberIdInFindPw = (e)=>{
        let inko = new Inko();
        const validInputValue = inko.ko2en(e.target.value);
        setMemberIdInFindPw(validInputValue);
    }
    const handleMemberNameInFindPw = (e)=>{
        setMemberNameInFindPw(e.target.value);
    }
    const handleMemberBirthInFindPw = (e)=>{
        // 생년월일에 숫자만 허용하는 정규식 사용
        const validInputValue = e.target.value.replace(/[^0-9]/g, "");
        setMemberBirthInFindPw(validInputValue);
    }
    
    const navigate = useNavigate();

    // 비밀번호 찾기 버튼
    const handleFindPw = async () => {
        
        // 1. 제대로 입력되었는지 확인
        console.log("click find_pw");
        console.log("ID : " + memberIdInFindPw);
        console.log("이름 : " + memberNameInFindPw);
        console.log("생년월일 : " + memberBirthInFindPw);
        
        // 2. 비밀번호 찾는 조건 작성
        //    2-1. input에 빠짐없이 다 적혀있는가?
        if(!memberIdInFindPw || !memberNameInFindPw || !memberBirthInFindPw){
            const errorMsg = "입력하지 않은 사항이 있습니다.";
            console.error(errorMsg);
            alert(errorMsg);
            return;
        }

        //    2-2. 생년월일이 6자리로 적혀있는가?
        if (memberBirthInFindPw.length !== 6){
            alert("생년월일을 6자리 숫자로 입력해주세요.");
            return;
        }
        
        // 3. post로 아이디, 이름, 생년월일 제출 함수 작성
        try {
            const response = await findMemberPassword(memberIdInFindPw, memberNameInFindPw, memberBirthInFindPw);
            console.log("axios.post->response 데이터");
            console.log(response);

            const { id, memberId, memberName, memberBirth } = response;
            console.log("회원번호 : " + id);
            console.log("ID : " + memberId);
            console.log("이름 : " + memberName);
            console.log("생년월일 : " + memberBirth);

            navigate("/reset/pw", { state: { memberId } });
        } catch (error) {
            const errorMsg = "회원이 존재하지 않습니다.";
            alert(errorMsg);
            console.error(errorMsg);
        }
    }
                
    return (
        <section className={styles.account_management}>
            <div>
                {/* 비밀번호 찾기 페이지 */}
                <Link to={'/'}>
                    <img src="/images/logo.png" className="w-20 mb-3"/>
                </Link>
                <h1>
                    <span>
                        팡팡게임즈
                        <br></br>
                        <strong>비밀번호 찾기</strong>
                    </span>
                    <hr></hr>
                </h1>

                <div>

                    <div>
                        <FormControl isRequired>
                            <FormLabel>아이디</FormLabel>
                            <Input 
                            maxLength={20}
                            value={memberIdInFindPw}
                            onChange={handleMemberIdInFindPw}
                            placeholder='아이디를 입력해주세요.' />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>이름</FormLabel>
                            <Input 
                            value={memberNameInFindPw}
                            onChange={handleMemberNameInFindPw}
                            placeholder='이름을 입력해주세요.' />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>생년월일</FormLabel>
                            <Input 
                            value={memberBirthInFindPw}
                            onChange={handleMemberBirthInFindPw}
                            maxLength={6}
                            placeholder='ex.881225' />
                        </FormControl>
                    </div>

                    <button 
                    onClick={handleFindPw}
                    className={`${styles.button} px-5`}>
                        비밀번호 찾기
                    </button>
                </div>
            </div>
        </section>

    );
}

export default MemberFindPwComponent;