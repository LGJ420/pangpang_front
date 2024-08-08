const GameComponent = () => {

    return (
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
                    점프 : Space bar
                </div>
                <div>
                    공격 : Shift
                </div>
            </div>
        </div>
    );
}

export default GameComponent;