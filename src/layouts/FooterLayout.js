const FooterLayout = () => {

    return (
        <footer className="min-h-[300px] min-w-[1350px] bg-neutral-800 text-stone-500">
            <div className="w-[1350px] m-auto flex flex-col items-center py-10 text-lg whitespace-pre">

                <img src="/images/b_logo.png" className="w-20 mb-10"></img>
                
                <div className="flex my-2">
                    <div className="px-3 border-r border-r-stone-600">(주)팡팡게임즈</div>
                    <div className="px-3">공동 대표이사 3차 프로젝트 팀</div>
                </div>
                    
                <div className="flex my-2">
                    <div className="px-3 border-r border-r-stone-600">사업자등록번호: 123-45-67890</div>
                    <div className="px-3 border-r border-r-stone-600">통신판매업신고: 제 0000-서울중구-0000</div>
                    <div className="px-3">사업자정보확인</div>
                </div>

                <div className="flex my-2">
                    <div className="px-3 border-r border-r-stone-600">주소: 경기 성남시 분당구 돌마로 46 광천프라자</div>
                    <div className="px-3 border-r border-r-stone-600">전화: 1800-0000</div>
                    <div className="px-3 border-r border-r-stone-600">팩스: 02-123-4567</div>
                    <div className="px-3">이메일: leegj420@naver.com</div>
                </div>

                <div className="mt-10">© PANGPANG GAMES Published in Korea by 3rd Project CO., LTD.</div>
                
                <div>LOGO ILLUSTRATION: © GOOGLE</div>
            





            </div>
        </footer>
    );
}

export default FooterLayout;