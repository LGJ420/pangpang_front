import { useEffect, useState } from 'react';
import useCustomToken from "../../hooks/useCustomToken";
import { useNavigate } from 'react-router-dom';
import { confirmMemberPassword } from '../../api/memberApi'; // Updated import
import MypageTitleComponent from '../common/MypageTitleComponent';

const MemberConfirmBeforeProfileComponent = () => {

    // ⓐ 비밀번호  state
    const [memberPwInConfirmBeforeProfile, setMemberPwInConfirmBeforeProfile] = useState('');

    // ⓑ input에 작성한 비밀번호 실시간으로 저장하는 핸들러(ⓐ이랑 짝꿍)
    const handleMemberPwInConfirmBeforeProfile = (e) => {
        setMemberPwInConfirmBeforeProfile(e.target.value);
    }

    const {isLogin, decodeToken} = useCustomToken();

    useEffect(()=>{

        // useEffect에도 이렇게 두번에 걸쳐 작업하는이유는
        // 리액트의 비동기 특성때문
        if(!isLogin){

            alert("잘못된 접근 방식입니다.");
            navigate(-1);
            return; // 로그인하지 않은 경우, 나머지 코드 실행 방지
        }

        },[isLogin, decodeToken]);

    const navigate = useNavigate();
    
    // 비밀번호 확인 버튼
    const clickConfirmBeforeProfile = async () => {
        // 1. 제대로 입력되었는지 확인
        console.log("click confirm_bofore_profile");
        console.log("비밀번호 입력 완료");
        console.log(memberPwInConfirmBeforeProfile);

        // 2. 빈칸은 없는가?
        if(!memberPwInConfirmBeforeProfile){
            const errorMsg = "입력하지 않은 사항이 있습니다.";
            console.error(errorMsg);
            alert(errorMsg);
            return; 
        }

        try {
            const response = await confirmMemberPassword(memberPwInConfirmBeforeProfile);

            const { memberImage, memberId, memberNickname, memberPw, memberPhone, postcode, postAddress, detailAddress, extraAddress } = response;
            navigate("/mypage/profile/modify", {
                state: { memberImage, memberId, memberNickname, memberPw, memberPhone, postcode, postAddress, detailAddress, extraAddress }
            });

        } catch (error) {
            const errorMsg = "비밀번호가 일치하지 않습니다.";
            alert(errorMsg);
            console.error(errorMsg);
        }
    }

    /* 검색 인풋창 엔터키만 눌러도 검색 */
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            clickConfirmBeforeProfile();
        }
    }

    // 이 조건문은 반드시 리액트 훅보다
    // 그렇지 않으면 이조건이 통과되야 리액트가 발생하는 오류가 생겨
    // 리액트 자체가 작동하지 않는다
    // 그래서 최하단에 배치한다
    if(!isLogin){

        return null;
    }

    return(
        <section className='text-xl'>
            <MypageTitleComponent>
                내 정보 변경
            </MypageTitleComponent>
            <div className='flex flex-col items-center'>
                <p className='my-16 font-semibold'>회원님의 개인정보 보호를 위해 본인확인을 진행합니다.</p>
                <p className='mb-5'>비밀번호를 입력해주세요.</p>
                <div className='flex items-center my-7'>
                    <label htmlFor='password'>
                        비밀번호
                    </label>
                    <input
                        className='ml-2 py-1 px-3 w-60 border rounded'
                        id='password'
                        type='password'
                        placeholder='비밀번호를 입력해주세요.'
                        maxLength={24}
                        onChange={handleMemberPwInConfirmBeforeProfile}
                        value={memberPwInConfirmBeforeProfile}
                        onKeyDown={handleKeyDown}/>
                </div>
                <button
                    className='bg-gray-500 text-white px-3 py-1 rounded hover:opacity-80'
                    onClick={clickConfirmBeforeProfile}>
                    확인
                </button>
            </div>

        </section>
    );
}

export default MemberConfirmBeforeProfileComponent;