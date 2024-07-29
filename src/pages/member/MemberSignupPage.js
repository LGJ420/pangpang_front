import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    } from '@chakra-ui/react'

const MemberSignupPage = () => {

    return (
        <section className="login">

        {/* 회원가입 폼 */}
        <form action="로그인url넣기" method="post">

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
                    <Input placeholder='아이디를 입력해주세요.' />
                </FormControl>

                {/* 비밀번호 */}
                <FormControl isRequired>
                    <FormLabel>비밀번호</FormLabel>
                    <Input type='password' placeholder='비밀번호를 입력해주세요.' />
                </FormControl>

                {/* 비밀번호 확인 */}
                <FormControl isRequired>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <Input type='password' placeholder='비밀번호를 입력해주세요.' />
                </FormControl>

                {/* 이름 */}
                <FormControl isRequired>
                    <FormLabel>이름</FormLabel>
                    <Input placeholder='이름을 입력해주세요.' />
                </FormControl>

                {/* 생년월일 */}
                <FormControl isRequired>
                    <FormLabel>생년월일</FormLabel>
                    <Input placeholder='980130' />
                </FormControl>
            </div>

            <button type="submit">회원가입</button>

        </form>
    </section>

    );
}

export default MemberSignupPage;