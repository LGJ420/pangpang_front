
const GameComponent = () => {

    return (


        <section>
            <div className="bg-black">
                <iframe src="https://jcw87.github.io/c2-smb1/" 
                    className="w-[1350px] h-[800px] m-auto"/>

                <div className="text-center mb-10 text-xl text-pink-200 animate-pulse">
                    화면을 클릭하면 게임이 시작됩니다!
                </div>
                <div className="font-poor-story flex w-[750px] m-auto items-center justify-around pb-16 text-3xl text-white ">
                    <div>
                        &lt;조작키&gt;
                    </div>
                    <div>
                        이동 : ←↑↓→
                    </div>
                    <div>
                        점프 : Space bar
                    </div>
                    <div>
                        달리기 : Shift
                    </div>
                </div>
            </div>
        </section>

    );
}

export default GameComponent;