import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../atoms/tokenState';

const MemberProfileComponent = () => {
    const navigate = useNavigate();

    const [token, setToken] = useRecoilState(tokenState);

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
                localStorage.setItem("token", response.data);
                setToken(response.data);
                alert("수정이 완료되었습니다.");
                navigate('/');
            })
            .catch((error) => {
                console.error("내 정보 변경 요청 중 오류 발생", error);
            });
    }


    return(
        <section>
            <h3 className='text-xl font-bold'>내 정보 수정</h3>

            <div className="w-11/12 m-auto">
                <div className="my-10 flex items-center">
                    <span>
                        프로필 사진
                    </span>
                    <div className="ml-7 flex flex-col items-end">
                        <div>
                            jpg, png 어쩌구저쩌구 설명써야함 어쩌구저쩌구
                        </div>
                        <button className="w-24 h-6 mt-1 bg-slate-400 text-white rounded hover:opacity-80 text-sm">
                            사진 등록하기
                        </button>
                    </div>
                    <img 
                        className="ml-7 border w-32 h-32 object-cover"
                        src="/images/profile.png"/>
                </div>
                <div className="my-10">
                    <span>
                        아이디
                    </span>
                    <span className="ml-4 text-xl font-bold tracking-wide">
                        xtcsense
                    </span>
                </div>
                <div className="my-10">
                    <label>
                        닉네임
                    </label>
                    <input
                        className="p-2 ml-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                        maxLength={10}
                        value={modifyMemberNickname}
                        onChange={handleMemberNickname}/>
                </div>
                <div className="my-10">
                    <label htmlFor="password1">
                        비밀번호 변경
                    </label>
                    <input
                        className="p-2 ml-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                        maxLength={24}
                        id='password1'
                        placeholder='비밀번호를 변경해주세요.' 
                        type='password'
                        value={modifyMemberPw} 
                        onChange={handleMemberPw}/>
                </div>
                <div className="my-10">
                    <label htmlFor="password2">
                        비밀번호 확인
                    </label>
                    <input
                        className="p-2 ml-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                        maxLength={24}
                        id='password2'
                        type='password'
                        placeholder='비밀번호를 다시 입력해주세요.'
                        value={modifyMemberPwConfirm}
                        onChange={handleMemberPwConfirm}/>
                </div>
                <div className="my-10">
                    <span>
                        핸드폰
                    </span>
                    <input
                        className="ml-4 w-12 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                        value={phone1}
                        type='text'
                        maxLength="3"
                        onChange={handlePhone1}/> 
                    - 
                    <input
                        className="w-14 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                        value={phone2}
                        type='text'
                        maxLength="4"
                        onChange={handlePhone2}/> 
                    - 
                    <input
                        className="w-14 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                        value={phone3}
                        type='text'
                        maxLength="4"
                        onChange={handlePhone3}/>
                </div>
                
                <div>
                    <h5 className="block font-medium text-gray-700 mb-3">주소</h5>
                        <input
                            className="mt-1 w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
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
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
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
                            className="mt-1 w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            type="text"
                            placeholder="참고항목"
                            value={extraAddressApi}
                            readOnly
                        />
                </div>
                <div className="flex justify-center mt-10">
                    <button
                        className="text-white bg-[rgb(68,107,216)] text-lg font-extrabold hover:opacity-70 rounded-lg w-28 h-12"
                        onClick={clickModify}>
                        수정하기
                    </button>
                </div>
            </div>

        </section>
    );
}

export default MemberProfileComponent;