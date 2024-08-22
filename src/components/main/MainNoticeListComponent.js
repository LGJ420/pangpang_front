import { useEffect, useState } from "react";
import { getNoticeList } from "../../api/noticeApi";
import { Spinner } from "@chakra-ui/react";


const MainNoticeListComponent = () => {

    const [serverData, setServerData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{

        getNoticeList({page:1, size:10})
            .then(data=>setServerData(data))
            .catch(error=>console.log(error))
            .finally(()=>setIsLoading(false));
        
    },[]);

    return (
        
        <div className="p-10 border-3 border-stone-900/30 rounded-md h-[50rem]">

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
                
                serverData.dtoList.map((dto)=>

                    <div className="text-xl py-5 border-b">
                        <span className="cursor-pointer rainbow-text">
                            {dto.noticeTitle}
                        </span>
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