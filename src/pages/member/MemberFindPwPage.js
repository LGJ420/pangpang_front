
const MemberFindPwPage = () => {

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
        <div>
            비밀번호 재설정
            비밀번호 <input></input>
            비밀번호 확인<input></input>
            <button onClick={resetMemberPw}> 비밀번호 변경</button>
        </div>
    );
}

export default MemberFindPwPage;