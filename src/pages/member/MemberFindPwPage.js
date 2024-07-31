import { Link } from "react-router-dom";
import {
    Input,
    FormControl,
    FormLabel,
    } from '@chakra-ui/react'

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MemberFindPwPage = () => {

    const [memberPw, setMemberPw] = useState("");
    const [memberPwConfirm, setMemberPwConfirm] = useState("");

    const handleMemberPw = (e)=>{
        setMemberPw(e.target.value);
    }
    const handleMemberPwConfirm = (e)=>{
        setMemberPwConfirm(e.target.value);
    }

    const resetMemberPw = () => {

        // 1. 비밀번호 = 비밀번호확인 확인하기
        // 2. axios 포스트 하기(memberPw, memberPwConfirm)
        // 3. 스프링에 포스트 매핑 만들기
        // 4. 비밀번호 리셋 메소드 만들기 
        //      -1. findByMemberId(memberId) 해서
        //      -2. 비밀번호 암호화 하고
        //      -3. member.build()
        //           .memberPw(암호화한 비번)
        //           .build()
        //      -4. memberRepository.save(member)
    }

    return (

        <section className="account_management">

        {/* 아이디 찾기 페이지 */}
        <h1>
            <span>
                팡팡게임즈
                <br></br>
                <strong>비밀번호 찾기</strong>
            </span>
            <hr></hr>
        </h1>

        <div>
            비밀번호를 재설정해주세요

            <div>
                {/* 비밀번호 */}
                <FormControl isRequired>    
                    <FormLabel>비밀번호</FormLabel>
                    <Input 
                    type='password' 
                    value={memberPw}
                    onChange={handleMemberPw}
                    placeholder='비밀번호를 입력해주세요.' />
                </FormControl>
                {/* <p>비밀번호는 4~20자의 영문, 숫자만 사용 가능합니다</p> */}

                {/* 비밀번호 확인 */}
                <FormControl isRequired>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <Input 
                    type='password' 
                    value={memberPwConfirm}
                    onChange={handleMemberPwConfirm}
                    placeholder='비밀번호를 입력해주세요.' />
                </FormControl>
            </div>
        </div>

        <div>
            <Link to={'/'} className="px-5 button m-10">
                홈으로
            </Link>

            <Link to={'/login'} className="px-5 button m-10">
                로그인
            </Link>
        </div>
    </section>

    );
}

export default MemberFindPwPage;