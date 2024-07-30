import {
    Input,
    FormControl,
    FormLabel,
    } from '@chakra-ui/react'

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MemberSignupPage = () => {

    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const [memberPwConfirm, setMemberPwConfirm] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [memberRole, setMemberRole] = useState("User");

    const handleMemberId = (e)=>{
        setMemberId(e.target.value);
    }
    const handleMemberPw = (e)=>{
        setMemberPw(e.target.value);
    }
    const handleMemberPwConfirm = (e)=>{
        setMemberPwConfirm(e.target.value);
    }
    const handleMemberName = (e)=>{
        setMemberName(e.target.value);
    }
    const handleMemberBirth = (e)=>{
        setMemberBirth(e.target.value);
    }
    const handleMemberRole = (e)=>{
        setMemberRole(e.target.value);
    }

    const nevigate = useNavigate();

    const onClicksignup = ()=>{
        console.log("click signup");
        console.log("ID : " + memberId);
        console.log("PW : " + memberPw);
        console.log("PW : " + memberPwConfirm);
        console.log("PW : " + memberName);
        console.log("PW : " + memberBirth);
        console.log("PW : " + memberRole);

        if(memberPw != memberPwConfirm ) {
            alert("비밀번호가 일치하지 않습니다.");
        } else if (memberBirth.length != 6){
            alert("생년월일을 6자리 숫자로 입력해주세요.")
        }
        else {

            axios
            .post("http://localhost:8080/api/member/signup",{
                memberId : memberId,
                memberPw : memberPw,
                memberName : memberName,
                memberBirth : memberBirth,
                memberRole : memberRole
            })
            .then((response)=>{
                console.log(response)
                nevigate("/signup_confirm")
            })
            .catch((error)=>{
                console.error("회원가입 요청 중 오류 발생", error);
            });
        }
    }

    return (
        <section className="account_management">

        {/* 회원가입 폼 */}
        <div>

            {/* 회원가입 페이지 */}
            <h1>
                <span>
                    팡이널팡타지14
                    <br></br>
                    <strong>회원가입</strong>
                </span>
            </h1>

            <hr></hr>

            {/* 개인정보 입력칸 */}
            <div>
                {/* 아이디 */}
                <FormControl isRequired>
                    <FormLabel>아이디</FormLabel>
                    <Input 
                    value={memberId}
                    onChange={handleMemberId}
                    placeholder='아이디를 입력해주세요.' />
                </FormControl>

                {/* 비밀번호 */}
                <FormControl isRequired>
                    <FormLabel>비밀번호</FormLabel>
                    <Input 
                    type='password' 
                    value={memberPw}
                    onChange={handleMemberPw}
                    placeholder='비밀번호를 입력해주세요.' />
                </FormControl>

                {/* 비밀번호 확인 */}
                <FormControl isRequired>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <Input 
                    type='password' 
                    value={memberPwConfirm}
                    onChange={handleMemberPwConfirm}
                    placeholder='비밀번호를 입력해주세요.' />
                </FormControl>

                {/* 이름 */}
                <FormControl isRequired>
                    <FormLabel>이름</FormLabel>
                    <Input 
                    value={memberName}
                    onChange={handleMemberName}
                    placeholder='이름을 입력해주세요.' />
                </FormControl>

                {/* 생년월일 */}
                <FormControl isRequired>
                    <FormLabel>생년월일</FormLabel>
                    <Input 
                    value={memberBirth}
                    onChange={handleMemberBirth}
                    placeholder='ex.881225' />
                </FormControl>

                {/* 역할 */}
                <FormControl isRequired>
                    <Input 
                    placeholder='User' 
                    value={memberRole}
                    onChange={handleMemberRole}
                    // type='hidden'
                    />
                </FormControl>
            </div>

            <button onClick={onClicksignup}>회원가입</button>

        </div>
    </section>

    );
}

export default MemberSignupPage;