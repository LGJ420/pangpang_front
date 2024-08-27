import { useState } from "react";
import useCustomToken from "../../hooks/useCustomToken";
import { postNoticeOne } from "../../api/noticeApi";
import { useNavigate } from "react-router-dom";
import { logout } from '../../hooks/logout';

const initState = {

    noticeTitle: "",
    noticeContent: "",
}


const NoticeAddComponent = () => {

    const [noticeDto, setNoticeDto] = useState(initState);
    const {decodeToken} = useCustomToken();

    const navigate = useNavigate();


    const handleChangeNotice = (e) => {

        noticeDto[e.target.name] = e.target.value;

        setNoticeDto({...noticeDto});
    }


    const handleClickSubmit = () => {
        
        if(noticeDto.noticeTitle.length === 0){

            alert("제목을 입력해주세요");

            return;
        }
        else if (noticeDto.noticeContent.length === 0) {

            alert("내용을 입력해주세요");

            return;
        }

        postNoticeOne(noticeDto)
            .then(()=>navigate(`../list`, { replace: true }))
            .catch(error=>{

                alert("공지사항은 운영자만 등록할 수 있습니다.");
                
                if (error.response.status === 401) {
                    alert("토큰 유효 시간이 만료되었습니다.")
                    logout(); // import { logout } from '../../hooks/logout'; 추가 필요
                }

            });
    }


    return (

        <section>

            <div className="text-2xl my-10 m-auto">

                    <div>
                        {   decodeToken.memberRole === "Admin" ?

                            <>
                            </>
                            
                            :

                            <span className="text-sm text-red-600 font-extrabold">
                                (경고 : 공지사항은 운영자만 작성할 수 있습니다!)
                            </span>
                        }
                    </div>


                <div className="my-10 flex flex-col">
                    <label
                        className="m-3 font-extrabold"
                        htmlFor="noticeTitle">
                        제목
                    </label>
                    <input 
                        className="p-3 rounded border"
                        onChange={(e)=>handleChangeNotice(e)}
                        id="noticeTitle"
                        name="noticeTitle"
                        placeholder="제목을 적어주세요."
                        maxLength={50}/>
                </div>


                <div className="my-10 flex flex-col">
                    <label
                        className="m-3 font-extrabold"
                        htmlFor="noticeContent">
                        내용
                    </label>
                    <textarea 
                        className="p-3 rounded border h-[50rem]"
                        onChange={(e)=>handleChangeNotice(e)}
                        id="noticeContent"
                        name="noticeContent"
                        placeholder="자세한 설명을 적어주세요."
                        maxLength={2000}/>
                </div>

                <div className="flex justify-center">
                    <button
                        className="w-52 h-16 text-3xl bg-[rgb(77,160,124)] text-white hover:opacity-80"
                        onClick={handleClickSubmit}>
                        등록
                    </button>
                </div>
            </div>

        </section>

    );
}

export default NoticeAddComponent;