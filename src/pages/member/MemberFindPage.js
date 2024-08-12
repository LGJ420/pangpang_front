import styles from '../../css/memberPage.module.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {
    Input,
    FormControl,
    FormLabel,
    } from '@chakra-ui/react'
import { useState } from "react";
import axios from 'axios';

const MemberLoginPage = () => {

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
    const handleFindId = () => {
        
        // 1. 제대로 입력되었는지 확인
        console.log("click find_id");
        console.log("이름 : " + memberNameInFindId);
        console.log("생년월일 : " + memberBirthInFindId);
        
        // 2. 아이디 찾는 조건 작성
        //    2-1. input에 빠짐없이 다 적혀있는가?
        if([memberNameInFindId, memberBirthInFindId].includes('')){
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
        
        // 3. post로 이름, 생년월일 제출 함수 작성
        axios
        .post("http://localhost:8080/api/member/find_id",{
                memberNameInFindId : memberNameInFindId,
                memberBirthInFindId : memberBirthInFindId
            })
            
            // 3-1. 제출한 이름, 생년월일이 있으면 콘솔창에 출력(확인) 및 아래 링크로 이동하면서 데이터 전달
            .then((response)=>{
                const {memberName, memberId} = response.data;
                // ▼▼▼ 출력 제대로 되는지 확인용 ▼▼▼
                console.log(response.data)
                console.log("이름 : " + memberName)
                console.log("ID : " + memberId)
                // ▲▲▲ 출력 제대로 되는지 확인용 ▲▲▲

                // 데이터 전달
                navigate("/find_id", {state : {memberName, memberId}});
            })
            
            // 3-2. 없으면 에러 발생
            .catch((error)=>{
                const errorMsg = "회원이 존재하지 않습니다.";
                alert(errorMsg);
                console.error(errorMsg);
            });
    }

    // =======================================================================

    // ☆★☆★☆★☆★ 비밀번호 ☆★☆★☆★☆★

    // 비밀번호 찾기 관련 state, onchange 메소드
    const [memberIdInFindPw, setMemberIdInFindPw] = useState('');
    const [memberNameInFindPw, setMemberNameInFindPw] = useState('');
    const [memberBirthInFindPw, setMemberBirthInFindPw] = useState('');
    
    const handleMemberIdInFindPw = (e)=>{
        setMemberIdInFindPw(e.target.value);
    }
    const handleMemberNameInFindPw = (e)=>{
        setMemberNameInFindPw(e.target.value);
    }
    const handleMemberBirthInFindPw = (e)=>{
        // 생년월일에 숫자만 허용하는 정규식 사용
        const validInputValue = e.target.value.replace(/[^0-9]/g, "");
        setMemberBirthInFindPw(validInputValue);
    }

    // 비밀번호 찾기 버튼
    const handleFindPw = () => {
        
        // 1. 제대로 입력되었는지 확인
        console.log("click find_pw");
        console.log("ID : " + memberIdInFindPw);
        console.log("이름 : " + memberNameInFindPw);
        console.log("생년월일 : " + memberBirthInFindPw);
        
        // 2. 비밀번호 찾는 조건 작성
        //    2-1. input에 빠짐없이 다 적혀있는가?
        if([memberIdInFindPw, memberNameInFindPw, memberBirthInFindPw].includes('')){
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
        axios
        .post("http://localhost:8080/api/member/find_pw",{
                memberIdInFindPw : memberIdInFindPw,
                memberNameInFindPw : memberNameInFindPw,
                memberBirthInFindPw : memberBirthInFindPw
            })
            
            // 3-1. 제출한 아이디, 이름, 생년월일이 있으면 아래 링크로 이동
            .then((response)=>{
                console.log("axios.post->response 데이터")
                console.log(response.data)

                // response 데이터 정리용
                const {id, memberId, memberName, memberBirth} = response.data;
                // ▼▼▼ 출력 제대로 되는지 확인용 ▼▼▼
                console.log("회원번호 : " + id)
                console.log("ID : " + memberId)
                console.log("이름 : " + memberName)
                console.log("생년월일 : " + memberBirth)
                // ▲▲▲ 출력 제대로 되는지 확인용 ▲▲▲

                // 데이터 전달
                navigate("/find_pw", {state : {id}})
            })
            
            // 3-2. 없으면 에러 발생
            .catch((error)=>{
                const errorMsg = "회원이 존재하지 않습니다.";
                alert(errorMsg);
                console.error(errorMsg);
            });
    }
                
    return (
        <section className={styles.account_management}>

            {/* 아이디/비밀번호 찾기 페이지 */}
            <Link to={'/'}>
                <img src="/images/logo.png" className="w-20 mb-3"/>
            </Link>
            <h1>
                <span>
                팡팡게임즈
                    <br></br>
                    <strong>아이디, 비밀번호 찾기</strong>
                </span>
                <hr></hr>
            </h1>


            {/* 아이디, 비밀번호 찾기 컨테이너 */}
            <div className={styles.form_container}>

                {/* 아이디 찾기 */}
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
                            placeholder='ex.881225' />
                        </FormControl>
                    </div>

                    <button 
                    onClick={handleFindId}
                    className={styles.button}>
                        아이디 찾기
                    </button>

                </div>

                {/* 비밀번호 찾기 */}
                <div>

                    <div>
                        <FormControl isRequired>
                            <FormLabel>아이디</FormLabel>
                            <Input 
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
                            placeholder='ex.881225' />
                        </FormControl>
                    </div>

                    <button 
                    onClick={handleFindPw}
                    className={styles.button}>
                        비밀번호 찾기
                    </button>

                </div>

            </div>

        </section>

    );
}

export default MemberLoginPage;