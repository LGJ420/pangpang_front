import BasicNoHeightLayout from "../../layouts/BasicNoHeightLayout";

const GameIndexPage = () => {

    return (
        <BasicNoHeightLayout>

            <iframe src="https://plicy.net/GameEmbed/181045"
                className="w-[1350px] h-[700px]"/>

            <div className="flex flex-col items-center justify-center p-3">
                <h3>조작키</h3>
                <p>이동 : WASD<br/>공격 : ←↑↓→</p>
            </div>

        </BasicNoHeightLayout>
    );
}

export default GameIndexPage;