const CashWalletComponent = () => {

    return (
        <section className="h-[500px]">
            <h1 className="text-5xl m-10">골드 충전소</h1>
            <div className="flex flex-col items-center justify-center mt-32">

                <img src="/images/cash.png" className="w-52"></img>

                <div className="text-3xl my-7">
                    현재 나의 잔고 : 5000 골드
                </div>

                <p className="text-center">
                    사이트를 이용하면 골드를 획득할 수 있습니다<br />
                    로그인 : 500 골드<br />
                    글쓰기 : 500 골드<br />
                    댓글 : 1000 골드
                </p>
            </div>
        </section>
    );
}

export default CashWalletComponent;