import styles from '../../css/memberPage.module.css';
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MemberProfileComponent = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const {memberImage, memberId, memberNickname, memberPw, memberPhone, postcode, postAddress, detailAddress, extraAddress} = location.state || {};

    // 닉네임
    const [modifyMemberNickname, setModifyMemberNickname] = useState(memberNickname);

    const handleMemberNickname = (e) => {
        setModifyMemberNickname(e.target.value);
    }

    // 비밀번호
    const [modifyMemberPw, setModifyMemberPw] = useState('');
    const [modifyMemberPwConfirm, setModifyMemberPwConfirm] = useState('');

    const handleMemberPw=(e)=>{
        setModifyMemberPw(e.target.value);
    }
    const handleMemberPwConfirm=(e)=>{
        setModifyMemberPwConfirm(e.target.value);
    }

    // 폰번호
    // memberPhone = "010-1234-5678"
    const [phone1, setPhone1] = useState(memberPhone.split('-')[0]); // 010
    const [phone2, setPhone2] = useState(memberPhone.split('-')[1]); // 1234
    const [phone3, setPhone3] = useState(memberPhone.split('-')[2]); // 5678

    const handlePhone1 = (e) => {
        // 핸드폰 번호에 숫자만 허용하는 정규식 사용
        const validInputValue = e.target.value.replace(/[^0-9]/g, "");
        setPhone1(validInputValue);
    }
    const handlePhone2 = (e) => {
        // 핸드폰 번호에 숫자만 허용하는 정규식 사용
        const validInputValue = e.target.value.replace(/[^0-9]/g, "");
        setPhone2(validInputValue);
    }
    const handlePhone3 = (e) => {
        // 핸드폰 번호에 숫자만 허용하는 정규식 사용
        const validInputValue = e.target.value.replace(/[^0-9]/g, "");
        setPhone3(validInputValue);
    }

    /* ====================== 다음 주소찾기 API 시작 ====================== */
    const [postcodeApi, setPostcodeApi] = useState(postcode);
    const [postAddressApi, setPostAddressApi] = useState(postAddress);
    const [detailAddressApi, setDetailAddressApi] = useState(detailAddress);
    const [extraAddressApi, setExtraAddressApi] = useState(extraAddress);
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
        
                setPostcodeApi(data.zonecode);
                setPostAddressApi(addr);
                setExtraAddressApi(extraAddr);
                detailAddressRef.current.focus();
            }
        }).open();
    };
    /* ====================== 다음 주소찾기 API 끝 ====================== */

    // 수정하기 버튼
    const clickModify = ()=>{

        console.log("click modify");
        console.log("ID : " + memberId);
        console.log("PW : " + modifyMemberPw);
        console.log("닉네임 : " + modifyMemberNickname);
        console.log("핸드폰 : " + phone1+"-"+phone2+"-"+phone3);
        console.log("우편번호 : " + postcodeApi);
        console.log("주소 : " + postAddressApi);
        console.log("상세주소 : " + detailAddressApi);
        console.log("기타주소 : " + extraAddressApi);

        // 안 채운 항목이 있는지 체크
        if(!memberNickname && !modifyMemberNickname && !phone1 && !phone2 && !phone3 && !postcodeApi &&!postAddressApi && !detailAddressApi && !extraAddressApi){
            const errorMsg = "입력하지 않은 사항이 있습니다.";
            console.error(errorMsg)
            alert(errorMsg);

            return;
        }

        // 비밀번호 = 비밀번호 확인 체크
        if(modifyMemberPw !== modifyMemberPwConfirm ) {
            const errorMsg = "비밀번호가 일치하지 않습니다.";
            console.error(errorMsg);
            alert(errorMsg);

            return;
        }

        // 서버로 보낼 데이터 구성
        const updateData = {
            memberId: memberId,
            memberNickname: modifyMemberNickname,
            memberPhone: phone1 + "-" + phone2 + "-" + phone3,
            postcode: postcodeApi,
            postAddress: postAddressApi,
            detailAddress: detailAddressApi,
            extraAddress: extraAddressApi,
        };

        // 사용자가 새 비밀번호를 입력한 경우에만 비밀번호를 포함
        if (modifyMemberPw) {
            updateData.memberPw = modifyMemberPw;
        }

        console.log(updateData);

        // 토큰 가져오기(프린시펄 하려면 토큰을 보내야함)
        // 로컬스토리지에 토큰을 가져옴
        const token = localStorage.getItem("token");

        // axios 요청
        axios
            .post("http://localhost:8080/api/member/mypage/modify", updateData, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                console.log(response);
                localStorage.setItem("token", response.data)
                navigate("/mypage");
            })
            .catch((error) => {
                console.error("내 정보 변경 요청 중 오류 발생", error);
            });
    }


    return(
        <div className={styles.test}>
            <p>내 정보 수정</p>
            <p>팡팡게임즈 대표 프로필과 닉네임을 수정 하실 수 있습니다.</p>

            <div>
                <ul>
                    <li>
                        <span>
                            사진
                        </span>
                        <span>
                            사진등록하는곳^_^
                        </span>
                    </li>
                    <li>
                        <span>
                            아이디
                        </span>
                        <span>
                            {memberId}
                        </span>
                    </li>
                    <li>
                        <span>
                            닉네임
                        </span>
                        <input value={modifyMemberNickname} onChange={handleMemberNickname}/>
                    </li>
                    <li>
                        <span>
                            비밀번호 변경
                        </span>
                        <input 
                        placeholder='비밀번호를 변경해주세요.' 
                        value={modifyMemberPw} 
                        onChange={handleMemberPw}/>
                    </li>
                    <li>
                        <span>
                            비밀번호 확인
                        </span>
                        <input 
                        placeholder='비밀번호를 다시 입력해주세요.'
                        value={modifyMemberPwConfirm}
                        onChange={handleMemberPwConfirm}/>
                    </li>
                    <li>
                        <span>
                            핸드폰
                        </span>
                        <input value={phone1} type='text' maxLength="3" onChange={handlePhone1}/> 
                        - 
                        <input value={phone2} type='text' maxLength="4" onChange={handlePhone2}/> 
                        - 
                        <input value={phone3} type='text' maxLength="4" onChange={handlePhone3}/>
                    </li>
                    
                    <li>
                        <h5 className="block text-sm font-medium text-gray-700">주소</h5>
                            <input
                                className="mt-1 w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                type="text"
                                placeholder="우편번호"
                                value={postcodeApi}
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
                                value={postAddressApi}
                                readOnly
                            />
                            <input
                                className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                type="text"
                                placeholder="상세주소"
                                value={detailAddressApi}
                                ref={detailAddressRef}
                                onChange={e => setDetailAddressApi(e.target.value)}
                            />
                            <input
                                className="mt-1 w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                                type="text"
                                placeholder="참고항목"
                                value={extraAddressApi}
                                readOnly
                            />
                    </li>
                </ul>
            </div>
            <button onClick={clickModify}>수정하기</button>

        </div>
    );
}

export default MemberProfileComponent;