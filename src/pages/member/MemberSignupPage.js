import styles from '../../css/memberPage.module.css';
import {
    Input,
    FormControl,
    FormLabel,
    } from '@chakra-ui/react'

    import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const MemberSignupPage = () => {

    const [checkMemberId, setCheckMemberId] = useState("");
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const [memberPwConfirm, setMemberPwConfirm] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberNickname, setMemberNickname] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    const [memberAddress, setMemberAddress] = useState("");
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
    const handleMemberNickname = (e)=>{
        setMemberNickname(e.target.value);
    }
    const handleMemberBirth = (e)=>{
        setMemberBirth(e.target.value);
    }
    const handlePhone1 =(e)=>{
        setPhone1(e.target.value);
    }
    const handlePhone2 =(e)=>{
        setPhone2(e.target.value);
    }
    const handlePhone3 =(e)=>{
        setPhone3(e.target.value);
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
    const onClickCheckMemberId = () => {
        axios.post("http://localhost:8080/api/member/signup/checkMemberId",{memberId : memberId})
        .then((response)=>{
            console.log(response.data);
            setCheckMemberId(true);
            alert("사용 가능한 아이디입니다.")
        })
        .catch((error)=>{
            console.error(error);
            setCheckMemberId(false);
            alert("사용할 수 없는 아이디입니다.")
        })
    }

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
    const onClicksignup = ()=>{
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
        if([memberId, memberPw, memberPwConfirm, memberName, memberNickname, memberBirth, phone1, phone2, phone3, postcode, postAddress, detailAddress, extraAddress ].includes('')){
            const errorMsg = "입력하지 않은 사항이 있습니다.";
            console.error(errorMsg)
            alert(errorMsg);

            return;
        }

        // 아이디 중복 확인 (false면 중복확인 안한 것으로 간주)
        if(checkMemberId == false){
            const errorMsg = "아이디 중복 확인은 필수입니다.";
            console.error(errorMsg);
            alert("아이디 중복 확인은 필수입니다."); 

            return;
        }

        // 비밀번호 = 비밀번호 확인 체크
        if(memberPw !== memberPwConfirm ) {
            const errorMsg = "비밀번호가 일치하지 않습니다.";
            console.error(errorMsg);
            alert(errorMsg);

            return;
        }
        
        // 생년월일이 6자리인지 체크
        if (memberBirth.length !== 6){
            alert("생년월일을 6자리 숫자로 입력해주세요.");
            return;
        }


        axios
        .post("http://localhost:8080/api/member/signup",{
            memberId : memberId,
            memberPw : memberPw,
            memberName : memberName,
            memberNickname : memberNickname,
            memberBirth : memberBirth,
            memberPhone : phone1+"-"+phone2+"-"+phone3,
            postcode : postcode,
            postAddress : postAddress,
            detailAddress : detailAddress,
            extraAddress : extraAddress,
            memberRole : memberRole
        })
        .then((response)=>{
            console.log(response)
            navigate("/signup_confirm")
        })
        .catch((error)=>{
            console.error("회원가입 요청 중 오류 발생", error);
        });
    }
        
        return (
            <section className={styles.account_management}>

        {/* 회원가입 폼 */}
        <div>

            {/* 회원가입 페이지 */}
            <Link to={'/'}>
                <img src="/images/logo.png" className="w-20 mb-3"/>
            </Link> 
            <h1>
                <span>
                팡팡게임즈
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
                    <div className={styles.outer}>
                        <Input 
                        value={memberId}
                        onChange={handleMemberId}
                        placeholder='아이디를 입력해주세요.'/>
                        <button
                        className={styles.inner_button}
                        onClick={onClickCheckMemberId}>중복확인</button>
                    </div>
                </FormControl>
                {/* <p>아이디는 4~12자의 영문, 숫자만 사용 가능합니다</p> */}

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

                {/* 이름 */}
                <FormControl isRequired>
                    <FormLabel>이름</FormLabel>
                    <Input 
                    value={memberName}
                    onChange={handleMemberName}
                    placeholder='이름을 입력해주세요.' />
                </FormControl>

                {/* 닉네임 */}
                <FormControl isRequired>
                    <FormLabel>닉네임</FormLabel>
                    <Input 
                    value={memberNickname}
                    onChange={handleMemberNickname}
                    placeholder='닉네임을 입력해주세요.' />
                </FormControl>

                {/* 생년월일 */}
                <FormControl isRequired>
                    <FormLabel>생년월일</FormLabel>
                    <Input 
                    value={memberBirth}
                    onChange={handleMemberBirth}
                    placeholder='ex.881225' />
                </FormControl>

                {/* 핸드폰 */}
                <FormControl isRequired>
                    <FormLabel>핸드폰</FormLabel>
                    <Input 
                    value={phone1}
                    onChange={handlePhone1}
                    placeholder='010' />
                    <Input 
                    value={phone2}
                    onChange={handlePhone2}
                    placeholder='1234' />
                    <Input 
                    value={phone3}
                    onChange={handlePhone3}
                    placeholder='5678' />
                </FormControl>

                {/* 주소 */}
                <FormControl isRequired>
                    <FormLabel>주소</FormLabel>
                    <h5 className="block text-sm font-medium text-gray-700">주소</h5>
                            <input
                                className="mt-1 w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                type="text"
                                placeholder="우편번호"
                                value={postcode}
                                readOnly
                            />
                            <button
                                className="p-1 ml-2 bg-slate-400 text-white rounded hover:opacity-80 text-sm"
                                onClick={handleClickPost}>
                                우편번호 찾기
                            </button>
                            <input
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                type="text"
                                placeholder="주소"
                                value={postAddress}
                                readOnly
                            />
                            <input
                                className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                type="text"
                                placeholder="상세주소"
                                value={detailAddress}
                                ref={detailAddressRef}
                                onChange={e => setDetailAddress(e.target.value)}
                            />
                            <input
                                className="mt-1 w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                type="text"
                                placeholder="참고항목"
                                value={extraAddress}
                                readOnly
                            />
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
            </div>

            {/* 회원가입 버튼 */}
            <button
            className={styles.button}
            onClick={onClicksignup}>
                회원가입
            </button>

        </div>
    </section>

    );
}


export default MemberSignupPage;