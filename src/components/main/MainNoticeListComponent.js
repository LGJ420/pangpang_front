import { useEffect, useState } from "react";
import { getNoticeList } from "../../api/noticeApi";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const MainNoticeListComponent = () => {

    const [serverData, setServerData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(()=>{

        getNoticeList({page:1, size:10})
            .then(data=>setServerData(data))
            .catch(error=>console.log(error))
            .finally(()=>setIsLoading(false));
        
    },[]);


    const handleClickTitle = (id) => {

        navigate(`/notice/read/${id}`);
    }

    return (
        
        <div className="border h-[50rem]">

            <div className="h-14 flex items-center pl-7 pt-5 text-3xl font-bold mb-5 bg-[rgb(255,255,255)]">
                공지사항
            </div>
            { isLoading ?

            <div className="h-full flex items-center justify-center">
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    />
            </div>

            :

                serverData ?
                
                serverData.dtoList.map((dto, index)=>
                    <div className="px-5">
                        {/* {console.log(dto)} */}

                    <div className={`flex justify-between text-xl px-2 py-5 ${index === serverData.dtoList.length - 1 ? "" : "border-b"}`}>
                        <div className="w-4/5 cursor-pointer rainbow-text truncate"
                            onClick={()=>handleClickTitle(dto.id)}>
                            {dto.noticeTitle}
                        </div>
                        <div>
                            {dto.noticeCreated.substring(0,10)}
                        </div>    
                    </div>

                    </div>
                )
                :

                <div className="flex flex-col items-center justify-center text-2xl font-semibold h-full">
                    <img src="/images/no_notice.png" className="w-60" />
                    <div className="mt-10">현재 공지사항이 없습니다</div>
                </div>
                
            }

        </div>
    );

}

export default MainNoticeListComponent;