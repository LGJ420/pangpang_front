import styles from '../../css/memberPage.module.css';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const MemberProfileComponent = () => {

    const location = useLocation();
    const {memberImage, memberId, memberNickname, memberPw, memberPhone, postcode, postAddress, detailAddress, extraAddress} = location.state || {};

    // 닉네임
    const [chageMemberNickname, setChangeMemberNickname] = useState(memberNickname);

    const handleMemberNickname = (e) => {
        setChangeMemberNickname(e.target.value);
    }

    // 폰번호
    // memberPhone = "010-1234-5678"
    const [phone1, setPhone1] = useState(memberPhone.split('-')[0]); // 010
    const [phone2, setPhone2] = useState(memberPhone.split('-')[1]); // 1234
    const [phone3, setPhone3] = useState(memberPhone.split('-')[2]); // 5678

    const handlePhone1 = (e) => {
        setPhone1(e.target.value);
    }
    const handlePhone2 = (e) => {
        setPhone2(e.target.value);
    }
    const handlePhone3 = (e) => {
        setPhone3(e.target.value);
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
                        <input value={chageMemberNickname} onChange={handleMemberNickname}/>
                    </li>
                    <li>
                        <span>
                            비밀번호 변경
                        </span>
                        <input placeholder='비밀번호를 변경해주세요.'/>
                    </li>
                    <li>
                        <span>
                            비밀번호 확인
                        </span>
                        <input placeholder='비밀번호를 다시 입력해주세요.'/>
                    </li>
                    <li>
                        <span>
                            핸드폰
                        </span>
                        <input value={phone1} onChange={handlePhone1}/> 
                        - 
                        <input value={phone2} onChange={handlePhone2}/> 
                        - 
                        <input value={phone3} onChange={handlePhone3}/>
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
            <button>수정하기</button>

        </div>
    );
}

export default MemberProfileComponent;