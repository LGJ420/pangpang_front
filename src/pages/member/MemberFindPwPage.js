import {
    Input,
    FormControl,
    FormLabel,
    } from '@chakra-ui/react'

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MemberFindPwPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const {id} = location.state || {};

    const [memberPwInFindPwForReset, setMemberPwInFindPwForReset] = useState("");
    const [memberPwConfirmInFindPwForReset, setMemberPwConfirmInFindPwForReset] = useState("");

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
        }

        // 3. axios 포스트 하기
        axios
        .post("http://localhost:8080/api/member/find_pw/reset",{
            // 비밀번호만 보내려고 했는데 Repository.findByMemberId()<-이걸로 데이터 찾고 비번 바꿔야해서 회원번호(id)도 같이 전송해야됨
            idInFindPwForReset : id,
            memberPwInFindPwForReset : memberPwInFindPwForReset
        })

        .then((response)=>{
            console.log(response.data)
            navigate("/find_pw/confirm")
        })

        .catch((error)=>{
            console.error("비밀번호 변경 중 오류 발생", error);
        });
    }

    return (

        <section className="account_management">

        {/* 아이디 찾기 페이지 */}
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
            className="px-5 button"
            onClick={resetMemberPw}
            >
                비밀번호 변경
            </button>
        </div>

    </section>

    );
}

export default MemberFindPwPage;