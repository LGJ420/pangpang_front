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


    // // 프로필 사진 관련 코드

    // 비번확인하면 memberId, memberImage...등 보내주는데, memberImage 유무로 있는사진띄워줄건지 너굴맨띄워줄건지 구분하는 코드
    const [profileImage, setProfileImage] = useState(memberImage ? `http://localhost:8080/api/member/view/${memberImage}` : "/images/profile.png")
    
    // 사진 미리보기
    const [file, setFile] = useState(); 
    const saveFile = (e) => { 
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // 파일명을 공백을 '_'로 바꾼 새로운 파일명 생성
            const modifiedFileName = selectedFile.name.replace(/\s+/g, '_');
            
            // 새로운 File 객체 생성
            const modifiedFile = new File([selectedFile], modifiedFileName, { type: selectedFile.type });
    
            setFile(modifiedFile);
            setProfileImage(URL.createObjectURL(modifiedFile)); // 선택한 파일을 URL로 변환하여 미리보기에 사용
            console.log("선택된 파일:", modifiedFile); // 디버깅
        }
    }; 

    // 이거안하면 too many response? 이거생김
    useEffect(() => {
        if (memberImage) {
            setProfileImage(`http://localhost:8080/api/member/view/${memberImage}`);
        } else {
            setProfileImage("/images/profile.png");
        }
    }, [memberImage]);

    // 수정하기 버튼
    const clickModify = async()=>{

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
        if(!memberNickname && !modifyMemberNickname && !phone1 && !phone2 && !phone3 && !postcodeApi &&!postAddressApi && !detailAddressApi){
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

        try {
            // FormData 객체에 모든 데이터를 추가
            const formData = new FormData();
            formData.append('memberId', memberId);
            formData.append('memberNickname', modifyMemberNickname);
            formData.append('memberPhone', phone1 + "-" + phone2 + "-" + phone3);
            formData.append('postcode', postcodeApi);
            formData.append('postAddress', postAddressApi);
            formData.append('detailAddress', detailAddressApi);
            formData.append('extraAddress', extraAddressApi);
    
            // 사용자가 새 비밀번호를 입력한 경우에만 비밀번호를 추가
            if (modifyMemberPw) {
                formData.append('memberPw', modifyMemberPw);
            }
    
            // 사용자가 새 프로필 사진을 선택한 경우에만 파일 추가
            if (file) {
                formData.append('file', file);
            }

            console.log("file 출력")
            console.log(file)
    
            // 토큰 가져오기(프린시펄 하려면 토큰을 보내야함)
            const token = localStorage.getItem("token");
    
            // 회원 정보 및 프로필 사진 수정 API 호출
            const response = await axios.post("http://localhost:8080/api/member/mypage/modify", formData, {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            });
    
            console.log(response);
            localStorage.setItem("token", response.data); // 로컬스토리지에 바뀐 token 저장
            setToken(response.data); // useState에 바뀐 token 저장
            alert("수정이 완료되었습니다.");
            navigate('/');
        } catch (error) {
            console.error("내 정보 변경 요청 중 오류 발생", error);
            alert("수정 중 오류가 발생했습니다.");
        }

    }
    
    //프로필 사진 삭제
    const deleteImage = () => {
        axios.delete(`http://localhost:8080/api/member/${memberId}/image`)
        .then((response)=>{
            console.log(response.data);
            setProfileImage("/images/profile.png");
        })
        .catch((error)=>{
            console.log("프로필 사진 삭제 중 에러 발생 : " + error);
            alert("프로필 사진 삭제 중 오류가 발생했습니다.");
        })
    }

    return(
        <section>
            <div className="text-xl mb-3">

                <h3 className='text-xl font-bold'>내 정보 수정</h3>

                <div className="w-11/12 m-auto">
                    <div className="my-10 flex items-center">
                        <span className="w-32 inline-block">
                            프로필 사진
                        </span>
                        <div className="ml-4 flex flex-col items-end">
                            <div>
                                {/* 기정 여기야 여기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                ☆★☆★☆★☆ㅁ87ㅁ8ㅁ87ㅁ878
                                ☆ㅁ8☆ㅁ8ㅁ78ㅁ78ㅁ
                                ☆8☆8☆8 */}
                                <input 
                                type="file" 
                                id="file" 
                                name="file"
                                className="hidden"
                                onChange={saveFile} /> 
                                <button fortype="submit" 
                                className="w-24 h-6 mt-1 bg-slate-400 text-white rounded hover:opacity-80 text-sm"
                                onClick={()=>{
                                    document.getElementById('file').click();
                                }}>
                                    사진 등록하기
                                </button>
                                <button 
                                className="w-24 h-6 mt-1 bg-red-400 text-white rounded hover:opacity-80 text-sm"
                                onClick={deleteImage}>사진 삭제하기</button>
                                {/* 기정 여기야 여기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                ☆★☆★☆★☆ㅁ87ㅁ8ㅁ87ㅁ878
                                ☆ㅁ8☆ㅁ8ㅁ78ㅁ78ㅁ
                                ☆8☆8☆8 */}
                            </div> 
                        </div>
                        <img 
                            className="ml-7 border w-32 h-32 object-cover"
                            src={profileImage}/>
                    </div>
                    <div className="my-10">
                        <span className="w-32 inline-block">
                            아이디
                        </span>
                        <span className="ml-4 text-xl font-bold tracking-wide">
                            {memberId}
                        </span>
                    </div>
                    <div className="my-10">
                        <label className="w-32" htmlFor="nickname">
                            닉네임
                        </label>
                        <input
                            id="nickname"
                            className="p-2 ml-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                            maxLength={10}
                            value={modifyMemberNickname}
                            onChange={handleMemberNickname}/>
                    </div>
                    <div className="my-10">
                        <label className="w-32" htmlFor="password1">
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
                        <label className="w-32" htmlFor="password2">
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
                        <span className="w-32 inline-block">
                            핸드폰
                        </span>
                        <input
                            className="ml-4 w-16 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                            value={phone1}
                            type='text'
                            maxLength="3"
                            onChange={handlePhone1}/> 
                        - 
                        <input
                            className="w-20 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
                            value={phone2}
                            type='text'
                            maxLength="4"
                            onChange={handlePhone2}/> 
                        - 
                        <input
                            className="w-20 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-600"
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
            </div>

        </section>
    );
}

export default MemberProfileComponent;