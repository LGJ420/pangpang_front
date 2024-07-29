import { Link } from "react-router-dom";
import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    } from '@chakra-ui/react'

const MemberLoginPage = () => {

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


                <div className="form_container">

                    {/* 아이디 찾기 폼 */}
                    <form action="아이디 찾기 url넣기" method="post">
                        
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

                        <button type="submit">아이디 찾기</button>

                    </form>

                    {/* 비밀번호 찾기 폼 */}
                    <form action="비밀번호 찾기 url넣기" method="post">

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
                                <FormLabel>이름</FormLabel>
                                <Input placeholder='이름을 입력해주세요.' />
                            </FormControl>
                        </div>

                        <button type="submit">비밀번호 찾기</button>

                    </form>

                </div>

            </section>

    );
}

export default MemberLoginPage;