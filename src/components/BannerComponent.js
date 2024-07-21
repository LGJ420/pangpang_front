const BannerComponent = () => {

    return (

        <section>
            <div className="flex relative h-[440px]">
                <div className="absolute inset-0"
                        style={{
                            backgroundImage: "url('/images/main1.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.9,
                            zIndex: -1
                        }}>
                </div>
                <div className="w-[1350px] m-auto">
                    <div className="text-white">
                        <h2 className="text-6xl">
                            우대 서버만의 특별한 혜택!
                        </h2>
                        <p>
                            빠른 성장과 기초 아이템 지원 혜택까지!
                            우대 서버에서만 누릴 수 있는 혜택을 확인해보세요!
                        </p>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default BannerComponent;