import { useEffect, useState } from "react";
import useCustomToken from "../../hooks/useCustomToken";
import { getNoticeOne, putNotice } from "../../api/noticeApi";
import { useNavigate } from "react-router-dom";

const initData = {

    noticeTitle: "",
    noticeContent: "",
    
}


const NoticeModifyComponent = ({id}) => {

    const {decodeToken} = useCustomToken();
    const [serverData, setServerData] = useState(initData);

    const navigate = useNavigate();

    useEffect(()=>{

        getNoticeOne(id)
            .then((data)=>setServerData(data))
            .catch(error=>console.log(error));

    },[]);


    const handleChangeNotice = (e) => {

        serverData[e.target.name] = e.target.value;
        setServerData({...serverData});
    }

    
    const handleClickSubmit = () => {
        
        if(serverData.noticeTitle.length === 0){

            alert("제목을 입력해주세요");

            return;
        }
        else if (serverData.noticeContent.length === 0) {

            alert("내용을 입력해주세요");

            return;
        }

        putNotice(serverData)
            .then(()=>navigate(`../list`, { replace: true }))
            .catch(error=>{
                alert("공지사항은 운영자만 등록할 수 있습니다.");
            });
    }

    return (

        <section>
            <div className="pb-10 text-2xl m-auto">

                <div className="flex flex-col">
                    <div>
                        <span className="m-3 font-extrabold">
                            관리자
                        </span>
                        <span className="px-3">
                            {decodeToken.memberNickname}
                        </span>
                        {   decodeToken.memberRole === "Admin" ?

                            <>
                            </>
                            
                            :

                            <span className="text-sm text-red-600 font-extrabold">
                                (경고 : 공지사항은 운영자만 작성할 수 있습니다!)
                            </span>
                        }
                    </div>
                </div>

                <div className="my-10 flex flex-col">
                    <label
                        className="m-3 font-extrabold"
                        htmlFor="noticeTitle">
                        제목
                    </label>
                    <input 
                        className="p-3 rounded border"
                        id="noticeTitle"
                        name="noticeTitle"
                        placeholder="제목을 적어주세요."
                        value={serverData.noticeTitle}
                        onChange={handleChangeNotice}
                        maxLength={100}/>
                </div>


                <div className="my-10 flex flex-col">
                    <label
                        className="m-3 font-extrabold"
                        htmlFor="noticeContent">
                        내용
                    </label>
                    <textarea 
                        className="p-3 rounded border h-[50rem]"
                        id="noticeContent"
                        name="noticeContent"
                        placeholder="자세한 설명을 적어주세요."
                        value={serverData.noticeContent}
                        onChange={handleChangeNotice}
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

export default NoticeModifyComponent;