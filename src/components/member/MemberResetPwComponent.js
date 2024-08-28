import styles from '../../css/memberPage.module.css';
import { Input, FormControl, FormLabel } from '@chakra-ui/react'

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { resetMemberPassword } from '../../api/memberApi';

const MemberResetPwComponent = () => {
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

    const resetMemberPw = async () => {

        // 1. 안 채운 항목이 있는지 확인하기
        if([memberPwInFindPwForReset, memberPwConfirmInFindPwForReset].includes('')){
            const errorMsg = "입력하지 않은 사항이 있습니다.";
            // console.error(errorMsg)
            alert(errorMsg);

            return;
        }

        // 비밀번호 8-20자리인지 체크
        if(memberPwInFindPwForReset.length < 8 || memberPwInFindPwForReset.length > 20){
            alert("비밀번호는 8-20자리로 입력해주세요.");
            return
        }

        // 2. 비밀번호 = 비밀번호확인 확인하기
        if(memberPwInFindPwForReset !== memberPwConfirmInFindPwForReset ) {
            const errorMsg = "비밀번호가 일치하지 않습니다.";
            // console.error(errorMsg);
            alert(errorMsg);
            return;
        }

        // 3. axios 포스트 하기
        try {
            const response = await resetMemberPassword(memberId, memberPwInFindPwForReset);
            // console.log(response);
            navigate("/reset/pw/confirm", { replace: true });
        } catch (error) {
            // console.error("비밀번호 변경 중 오류 발생", error);
        }
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
                            maxLength={20}
                            type='password' 
                            value={memberPwInFindPwForReset}
                            onChange={handleMemberPwInFindPwForReset}
                            placeholder='8자리 이상 입력해주세요.' />
                        </FormControl>
                        {/* <p>비밀번호는 4~20자의 영문, 숫자만 사용 가능합니다</p> */}

                        {/* 비밀번호 확인 */}
                        <FormControl isRequired>
                            <FormLabel>비밀번호 확인</FormLabel>
                            <Input 
                            maxLength={20}
                            type='password' 
                            value={memberPwConfirmInFindPwForReset}
                            onChange={handleMemberPwConfirmInFindPwForReset}
                            placeholder='비밀번호를 다시 입력해주세요.' />
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

export default MemberResetPwComponent;