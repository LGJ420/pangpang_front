import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    } from '@chakra-ui/react'

const MemberLoginPage = () => {

    const navigate = useNavigate();

    // 아이디 찾기 버튼
    const handleFindId = () => {
        
        // 아이디 찾는 조건 작성
        // ex. 이름, 생년월일 적혀있는가?

        // post로 이름, 생년월일 제출 함수 작성
        
        navigate("/find_id");

    }

    // 비밀번호 찾기 버튼
    const handleFindPw = () => {
        
        // 비밀번호 찾는 조건 작성
        // ex. 아이디, 이름, 생년월일 적혀있는가?

        // post로 아이디, 이름, 생년월일 제출 함수 작성
        
        navigate("/find_pw");

    }

    return (
            <section className="account_management">

                {/* 아이디/비밀번호 찾기 페이지 */}
                <h1>
                    <span>
                        팡이널팡타지14
                        <br></br>
                        <strong>아이디, 비밀번호 찾기</strong>
                    </span>
                    <hr></hr>
                </h1>


                {/* 아이디, 비밀번호 찾기 컨테이너 */}
                <div className="form_container">

                    {/* 아이디 찾기 */}
                    <div>
                        
                        <div>
                            <FormControl isRequired>
                                <FormLabel>이름</FormLabel>
                                <Input placeholder='이름을 입력해주세요.' />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>생년월일</FormLabel>
                                <Input placeholder='ex.881225' />
                            </FormControl>
                        </div>

                        <button 
                        onClick={handleFindId}
                        className="button">
                            아이디 찾기
                        </button>

                    </div>

                    {/* 비밀번호 찾기 */}
                    <div>

                        <div>
                            <FormControl isRequired>
                                <FormLabel>아이디</FormLabel>
                                <Input placeholder='아이디를 입력해주세요.' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>이름</FormLabel>
                                <Input placeholder='이름을 입력해주세요.' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>생년월일</FormLabel>
                                <Input placeholder='ex.881225' />
                            </FormControl>
                        </div>

                        <button 
                        onClick={handleFindPw}
                        className="button">
                            비밀번호 찾기
                        </button>

                    </div>

                </div>

            </section>

    );
}

export default MemberLoginPage;