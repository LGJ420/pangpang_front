import styles from '../../css/memberPage.module.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { findMemberId } from '../../api/memberApi'; // Updated import
import {
    Input,
    FormControl,
    FormLabel,
    } from '@chakra-ui/react'
import { useState } from "react";

const MemberFindIdComponent = () => {

    // ☆★☆★☆★☆★ 아이디 ☆★☆★☆★☆★

    // 아이디 찾기 관련 state, onchange 메소드
    const [memberNameInFindId, setMemberNameInFindId] = useState('');
    const [memberBirthInFindId, setMemberBirthInFindId] = useState('');
    
    const handleMemberNameInFindId = (e)=>{
        setMemberNameInFindId(e.target.value);
    }
    const handleMemberBirthInFindId = (e)=>{
        // 생년월일에 숫자만 허용하는 정규식 사용
        const validInputValue = e.target.value.replace(/[^0-9]/g, "");
        setMemberBirthInFindId(validInputValue);
    }
    
    const navigate = useNavigate();
    
    // 아이디 찾기 버튼
    const handleFindId = async () => {
        
        // 1. 제대로 입력되었는지 확인
        console.log("click find_id");
        console.log("이름 : " + memberNameInFindId);
        console.log("생년월일 : " + memberBirthInFindId);
        
        // 2. 아이디 찾는 조건 작성
        //    2-1. input에 빠짐없이 다 적혀있는가?
        if(!memberNameInFindId || !memberBirthInFindId){
            const errorMsg = "입력하지 않은 사항이 있습니다.";
            console.error(errorMsg);
            alert(errorMsg);
            return;
        }

        //    2-2. 생년월일이 6자리로 적혀있는가?
        if (memberBirthInFindId.length !== 6){
            alert("생년월일을 6자리 숫자로 입력해주세요.");
            return;
        }
        
        try {
            const response = await findMemberId(memberNameInFindId, memberBirthInFindId);
            console.log("response 이후 콘솔 내용");
            const { memberName, memberId } = response;
            console.log(response.data);
            console.log("이름 : " + memberName);
            console.log("ID : " + memberId);

            navigate("/find/id/confirm", { state: { memberName, memberId } });
        } catch (error) {
            const errorMsg = "회원이 존재하지 않습니다.";
            alert(errorMsg);
            console.error(errorMsg);
        }
    }

    
    return (
        <section className={styles.account_management}>
            <div>
                {/* 아이디 찾기 페이지 */}
                <Link to={'/'}>
                    <img src="/images/logo.png" className="w-20 mb-3"/>
                </Link>
                <h1>
                    <span>
                        팡팡게임즈
                        <br></br>
                        <strong>아이디 찾기</strong>
                    </span>
                    <hr></hr>
                </h1>

                <div>

                    <div>
                        <FormControl isRequired>
                            <FormLabel>이름</FormLabel>
                            <Input
                            value={memberNameInFindId} 
                            onChange={handleMemberNameInFindId}
                            placeholder='이름을 입력해주세요.' />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>생년월일</FormLabel>
                            <Input 
                            value={memberBirthInFindId}
                            onChange={handleMemberBirthInFindId}
                            maxLength={6}
                            placeholder='ex.881225' />
                        </FormControl>
                    </div>

                    <button 
                    onClick={handleFindId}
                    className={`${styles.button} px-5`}>
                        아이디 찾기
                    </button>
                </div>
            </div>
        </section>

    );
}

export default MemberFindIdComponent;