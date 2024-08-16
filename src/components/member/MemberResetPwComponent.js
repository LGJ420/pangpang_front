import styles from '../../css/memberPage.module.css';
import {
    Input,
    FormControl,
    FormLabel,
    } from '@chakra-ui/react'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MemberFindPwComponent = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const {memberId} = location.state || {};

    const [memberPwInFindPwForReset, setMemberPwInFindPwForReset] = useState("");
    const [memberPwConfirmInFindPwForReset, setMemberPwConfirmInFindPwForReset] = useState("");

    // 잠깐의 렌더링도 방지하기 위한 state
    // 초기값이 false여야 처음부터 방지가능
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {

        if (!location.state) {

            alert("잘못된 접근 방식입니다.");
            navigate(-1);
            return;
        }

        setIsValid(true);

    },[]);


    const handleMemberPwInFindPwForReset = (e)=>{
        setMemberPwInFindPwForReset(e.target.value);
    }
    const handleMemberPwConfirmInFindPwForReset = (e)=>{
        setMemberPwConfirmInFindPwForReset(e.target.value);
    }

    const resetMemberPw = () => {

        // 1. 안 채운 항목이 있는지 확인하기
        if([memberPwInFindPwForReset, memberPwConfirmInFindPwForReset].includes('')){
            const errorMsg = "입력하지 않은 사항이 있습니다.";
            console.error(errorMsg)
            alert(errorMsg);

            return;
        }

        // 2. 비밀번호 = 비밀번호확인 확인하기
        if(memberPwInFindPwForReset !== memberPwConfirmInFindPwForReset ) {
            const errorMsg = "비밀번호가 일치하지 않습니다.";
            console.error(errorMsg);
            alert(errorMsg);
            return;
        }

        // 3. axios 포스트 하기
        axios
        .post("http://localhost:8080/api/member/find_pw/reset",{
            // 비밀번호만 보내려고 했는데 Repository.findByMemberId()<-이걸로 데이터 찾고 비번 바꿔야해서 회원번호(id)도 같이 전송해야됨
            memberId : memberId,
            memberPw : memberPwInFindPwForReset
        })

        .then((response)=>{
            console.log(response.data)
            navigate("/reset/pw/confirm", { replace: true })
        })

        .catch((error)=>{
            console.error("비밀번호 변경 중 오류 발생", error);
        });
    }


    // 이 조건문은 반드시 리액트 훅보다
    // 그렇지 않으면 이조건이 통과되야 리액트가 발생하는 오류가 생겨
    // 리액트 자체가 작동하지 않는다
    // 그래서 최하단에 배치한다
    if (!isValid) {

        return null;
    }
    return (

        <section className={styles.account_management}>
        <div>
            {/* 비밀번호 변경 페이지 */}
            <Link to={'/'}>
                <img src="/images/logo.png" className="w-20 mb-3"/>
            </Link>
            <h1>
                <span>
                    팡팡게임즈
                    <br></br>
                    <strong>비밀번호 변경</strong>
                </span>
                <hr></hr>
            </h1>

            <div>

                <div>
                    {/* 비밀번호 */}
                    <FormControl isRequired>    
                        <FormLabel>비밀번호</FormLabel>
                        <Input 
                        type='password' 
                        value={memberPwInFindPwForReset}
                        onChange={handleMemberPwInFindPwForReset}
                        placeholder='비밀번호를 입력해주세요.' />
                    </FormControl>
                    {/* <p>비밀번호는 4~20자의 영문, 숫자만 사용 가능합니다</p> */}

                    {/* 비밀번호 확인 */}
                    <FormControl isRequired>
                        <FormLabel>비밀번호 확인</FormLabel>
                        <Input 
                        type='password' 
                        value={memberPwConfirmInFindPwForReset}
                        onChange={handleMemberPwConfirmInFindPwForReset}
                        placeholder='비밀번호를 입력해주세요.' />
                    </FormControl>
                </div>

                <button 
                className={`${styles.button} px-5`}
                onClick={resetMemberPw}
                >
                    비밀번호 변경
                </button>
            </div>
        </div>
    </section>

    );
}

export default MemberFindPwComponent;