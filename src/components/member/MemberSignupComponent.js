import {
    Input,
    FormControl,
    FormLabel,
    } from '@chakra-ui/react'

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { checkMemberId, signupMember, loadPostcodeScript } from '../../api/memberApi';
import { Inko } from 'inko';

const MemberSignupComponent = () => {

    const [checkMemberIdStatus, setCheckMemberIdStatus] = useState("");
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const [memberPwConfirm, setMemberPwConfirm] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberNickname, setMemberNickname] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    const [memberRole, setMemberRole] = useState("User");

    const [idInputError, setIdInputError] = useState(''); // 아이디 인풋 빨갛게 체크함(seccess, error)
    const [pwInputError, setPwInputError] = useState('')  // 비번 인풋 빨갛게 체크함(seccess, error)

    const handleMemberId = (e)=>{
        setCheckMemberIdStatus(false) // 아이디 인풋 변경하면 false로 바뀌면서 중복확인 안한 것으로 간주
        let inko = new Inko();
        const validInputValue = inko.ko2en(e.target.value);
        setMemberId(validInputValue);
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
    const handleMemberNickname = (e)=>{
        setMemberNickname(e.target.value);
    }
    const handleMemberBirth = (e)=>{
        // 생년월일에 숫자만 허용하는 정규식 사용
        const validInputValue = e.target.value.replace(/[^0-9]/g, "");
        setMemberBirth(validInputValue);
    }
    const handlePhone1 =(e)=>{
        // 핸드폰 번호에 숫자만 허용하는 정규식 사용
        const validInputValue = e.target.value.replace(/[^0-9]/g, "");
        setPhone1(validInputValue);
    }
    const handlePhone2 =(e)=>{
        // 핸드폰 번호에 숫자만 허용하는 정규식 사용
        const validInputValue = e.target.value.replace(/[^0-9]/g, "");
        setPhone2(validInputValue);
    }
    const handlePhone3 =(e)=>{
        // 핸드폰 번호에 숫자만 허용하는 정규식 사용
        const validInputValue = e.target.value.replace(/[^0-9]/g, "");
        setPhone3(validInputValue);
    }
    const handleMemberRole = (e)=>{
        setMemberRole(e.target.value);
    }

    const navigate = useNavigate();

    // 컴포넌트가 마운트될 때 토큰 확인
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // 이미 로그인된 상태라면 홈으로 리다이렉트
            navigate("/");
        }
    }, [navigate]);

    // 아이디 중복확인 버튼
    const onClickCheckMemberId = async () => {

        // 아이디 길이 확인
        if(memberId.length >= 6 ){

            try {
                await checkMemberId(memberId);
                alert("사용 가능한 아이디입니다.");
                setCheckMemberIdStatus(true);
                setIdInputError('success');
            } catch (error) {
                alert("사용할 수 없는 아이디입니다.");
                setCheckMemberIdStatus(false);
                setIdInputError('error');
            }
        } else {
            alert("아이디는 6자리 이상 입력해주세요.");
            setCheckMemberIdStatus(false);
            setIdInputError('error');
        }
    };

    /* ====================== 다음 주소찾기 API 시작 ====================== */
    const [postcode, setPostcode] = useState('');
    const [postAddress, setPostAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const detailAddressRef = useRef(null);
  

    useEffect(() => {

        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.onload = () => console.log('Daum Postcode script loaded.');
        script.onerror = () => console.error(`Script load error`);
        document.head.appendChild(script);

        return () => {

            document.head.removeChild(script);
        };

    }, []);


    const handleClickPost = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                let addr = '';
                let extraAddr = '';
        
                if (data.userSelectedType === 'R') {
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }
        
                if(data.userSelectedType === 'R'){
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                    }
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                    }
                } else {
                    extraAddr = '';
                }
        
                setPostcode(data.zonecode);
                setPostAddress(addr);
                setExtraAddress(extraAddr);
                detailAddressRef.current.focus();
            }
        }).open();
    };
    /* ====================== 다음 주소찾기 API 끝 ====================== */

    // 회원가입 버튼
    const onClicksignup = async ()=>{
        console.log("click signup");
        console.log("ID : " + memberId);
        console.log("PW : " + memberPw);
        console.log("PWConfirm : " + memberPwConfirm);
        console.log("이름 : " + memberName);
        console.log("닉네임 : " + memberNickname);
        console.log("생년월일 : " + memberBirth);
        console.log("핸드폰 : " + phone1+"-"+phone2+"-"+phone3);
        console.log("우편번호 : " + postcode);
        console.log("주소 : " + postAddress);
        console.log("상세주소 : " + detailAddress);
        console.log("기타주소 : " + extraAddress);
        console.log("역할 : " + memberRole);

        // 안 채운 항목이 있는지 체크
        if([memberId, memberPw, memberPwConfirm, memberName, memberNickname, memberBirth, phone1, phone2, phone3, postcode, postAddress, detailAddress].includes('')){
            const errorMsg = "입력하지 않은 사항이 있습니다.";
            console.error(errorMsg)
            alert(errorMsg);

            return;
        }

        // 아이디 중복 확인 (false면 중복확인 안한 것으로 간주)
        if(checkMemberIdStatus == false){ // === 이걸로하면 안됨 // 해결-성빈240821
            const errorMsg = "아이디 중복 확인은 필수입니다.";
            console.error(errorMsg);
            alert("아이디 중복 확인은 필수입니다."); 
            setIdInputError('error'); // 아이디 에러나면 인풋창 빨갛게 하려고 만듦
            return;
        } else {
            setIdInputError('success');
        }

        // 비밀번호 8자리 이상인지 체크
        if(memberPw.length < 8 || memberPw.length > 20){
            alert("비밀번호는 8-20자리로 입력해주세요.");
            setPwInputError('error');
            return;
        }

        // 비밀번호 = 비밀번호 확인 체크
        if(memberPw !== memberPwConfirm ) {
            const errorMsg = "비밀번호가 일치하지 않습니다.";
            console.error(errorMsg);
            alert(errorMsg);
            setPwInputError('error');
            return;
        } else {
            setPwInputError('success');
        }
        
        // 생년월일이 6자리인지 체크
        if (memberBirth.length !== 6){
            alert("생년월일을 6자리 숫자로 입력해주세요.");
            return;
        } 

        // 닉네임 길이 10자리 체크
        if(memberNickname.length < 2 || memberNickname.length > 10){
            alert("닉네임은 2-10자리로 입력해주세요.");
            return
        }

        // 월을 추출하고 유효한 범위인지 확인 (01 ~ 12)
        const month = parseInt(memberBirth.substring(2, 4), 10);
        if (month < 1 || month > 12) {
            alert("1월에서 12월 사이로 숫자를 입력해주세요.");
            return;
        }

        // 일을 추출하고 유효한 범위인지 확인 (01 ~ 31)
        const day = parseInt(memberBirth.substring(4, 6), 10);
        if (day < 1 || day > 31) {
            alert("1일에서 31일 사이로 숫자를 입력해주세요.");
            return;
        }


        try {
            await signupMember({
                memberId,
                memberPw,
                memberName,
                memberNickname,
                memberBirth,
                memberPhone: `${phone1}-${phone2}-${phone3}`,
                postcode,
                postAddress,
                detailAddress,
                extraAddress,
                memberRole
            });
            navigate("/signup_confirm");
        } catch (error) {
            console.error("회원가입 요청 중 오류 발생", error);
        }
    }
        
    return (
    <section className="w-[550px] h-screen flex items-center m-auto">

        {/* 회원가입 폼 */}
        <div>
            {/* 회원가입 페이지 */}
            <div className='flex items-center'>
                <Link to={'/'}>
                    <img src="/images/logo.png" className="w-20 mb-3"/>
                </Link> 
                <h1 className='text-[2rem] ml-3'>
                    <span>
                    팡팡게임즈
                        <br></br>
                        <strong>회원가입</strong>
                    </span>
                </h1>
            </div>

            <hr className='my-2'/>

            {/* 개인정보 입력칸 */}
            <div>
                {/* 아이디 */}
                <FormControl isRequired className='flex items-center my-3'>
                    <FormLabel className="w-1/4">아이디</FormLabel>
                    <div className='flex w-3/4'>
                        <Input
                        type="text"
                        value={memberId}
                        onChange={handleMemberId}
                        className={idInputError === 'success' ? 'border-blue-500' : idInputError === 'error' ? 'border-red-500' : ''}
                        placeholder='6자리 이상 입력해주세요.'
                        minLength={6}
                        maxLength={20}/>
                        <button className="w-32 ml-3 bg-slate-400 rounded text-white hover:opacity-80"
                        onClick={onClickCheckMemberId}>
                            중복확인
                        </button>
                    </div>
                </FormControl>
                {/* <p>아이디는 4~12자의 영문, 숫자만 사용 가능합니다</p> */}

                {/* 비밀번호 */}
                <FormControl isRequired className='flex items-center my-3'>
                    <FormLabel className="w-1/4">비밀번호</FormLabel>
                    <Input
                        className={pwInputError === 'success' ? 'border-blue-500 w-3/4' : pwInputError === 'error' ? 'border-red-500 w-3/4' : 'w-3/4'}
                        type='password' 
                        value={memberPw}
                        onChange={handleMemberPw}
                        placeholder='8자리 이상 입력해주세요.'
                        minLength={8}
                        maxLength={20} />
                </FormControl>
                {/* <p>비밀번호는 4~20자의 영문, 숫자만 사용 가능합니다</p> */}

                {/* 비밀번호 확인 */}
                <FormControl isRequired className='flex items-center my-3'>
                    <FormLabel className="w-1/4">비밀번호 확인</FormLabel>
                    <Input
                        className={pwInputError === 'success' ? 'border-blue-500 w-3/4' : pwInputError === 'error' ? 'border-red-500 w-3/4' : 'w-3/4'}
                        type='password' 
                        value={memberPwConfirm}
                        onChange={handleMemberPwConfirm}
                        placeholder='비밀번호를 다시 입력해주세요.'
                        minLength={8}
                        maxLength={20} />
                </FormControl>

                {/* 이름 */}
                <FormControl isRequired className='flex items-center my-3'>
                    <FormLabel className="w-1/4">이름</FormLabel>
                    <Input
                        className='w-3/4'
                        value={memberName}
                        onChange={handleMemberName}
                        placeholder='이름을 입력해주세요.' />
                </FormControl>

                {/* 닉네임 */}
                <FormControl isRequired className='flex items-center my-3'>
                    <FormLabel className="w-1/4">닉네임</FormLabel>
                    <Input
                        maxLength={10}
                        className='w-3/4'
                        value={memberNickname}
                        onChange={handleMemberNickname}
                        placeholder='닉네임을 입력해주세요.' />
                </FormControl>

                {/* 생년월일 */}
                <FormControl isRequired className='flex items-center my-3'>
                    <FormLabel className="w-1/4">생년월일</FormLabel>
                    <Input 
                        className='w-3/4'
                        value={memberBirth}
                        onChange={handleMemberBirth}
                        maxLength="6"
                        placeholder='ex.881225' />
                </FormControl>

                {/* 핸드폰 */}
                <FormControl isRequired className='flex items-center my-3'>
                    <FormLabel className="w-1/4">
                        핸드폰
                    </FormLabel>
                    <div className='w-3/4'>
                        <Input 
                            className='w-16'
                            value={phone1}
                            onChange={handlePhone1}
                            maxLength="3"
                            placeholder='010' />
                        -
                        <Input 
                            className='w-20'
                            value={phone2}
                            onChange={handlePhone2}
                            maxLength="4"
                            placeholder='1234' />
                        -
                        <Input 
                            className='w-20'
                            value={phone3}
                            onChange={handlePhone3}
                            maxLength="4"
                            placeholder='5678' />
                    </div>
                </FormControl>
                {/* 주소 */}
                <FormControl isRequired className='flex flex-col'>
                    <FormLabel>주소</FormLabel>
                    <div className='flex'>
                        <Input
                            className='w-40'
                            type="text"
                            placeholder="우편번호"
                            value={postcode}
                            readOnly />
                        <button
                            className="w-28 ml-2 bg-slate-400 text-white rounded hover:opacity-80 text-sm"
                            onClick={handleClickPost}>
                            우편번호 찾기
                        </button>
                    </div>
                    <Input
                        className='my-1'
                        type="text"
                        placeholder="주소"
                        value={postAddress}
                        readOnly />
                    <div className='flex'>
                        <Input
                            className='w-2/3'
                            type="text"
                            placeholder="상세주소"
                            value={detailAddress}
                            ref={detailAddressRef}
                            onChange={e => setDetailAddress(e.target.value)} />
                        <Input
                            className='w-1/3'
                            type="text"
                            placeholder="참고항목"
                            value={extraAddress}
                            readOnly />
                    </div>
                </FormControl>

                {/* 역할 (Admin or User)*/}
                <FormControl isRequired>
                    <Input 
                    placeholder='User' 
                    value={memberRole}
                    onChange={handleMemberRole}
                    type='hidden'
                    />
                </FormControl>
                {/* 회원가입 버튼 */}
                <div className='flex mt-3'>
                    <button
                        className="w-full h-16 text-xl bg-[rgb(224,26,109)] text-white font-bold mt-1 px-4 py-2 rounded hover:opacity-80"
                        onClick={onClicksignup}>
                        회원가입
                    </button>
                </div>
            </div>


        </div>
    </section>

    );
}


export default MemberSignupComponent;