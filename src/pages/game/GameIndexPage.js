import BasicLayout from "../../layouts/BasicLayout";

const GameIndexPage = () => {

    return (
        <BasicLayout>
            <div className="bg-black">
                <iframe src="https://jcw87.github.io/c2-smb1/" 
                    className="w-[1350px] h-[800px] m-auto" />

                <div className="flex w-[750px] m-auto items-center justify-around pb-5 text-3xl text-white ">
                    <div className="">
                        조작키
                    </div>
                    <div>
                        이동 : ←↑↓→
                    </div>
                    <div>
                        점프 : 스페이스바
                    </div>
                </div>
            </div>

        </BasicLayout>
    );
}

export default GameIndexPage;