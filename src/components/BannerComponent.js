import { useState } from "react";
import { Carousel } from "react-bootstrap";

const BannerComponent = () => {


    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

    return (

        <section>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item className="max-h-[400px]">
                    <img src="images/main1.jpg" text="main1"  className="w-full"/>
                    <Carousel.Caption className="max-w-[1350px] m-auto h-2/3 pl-16">
                    <h3 className="text-left text-4xl font-bold">팡팡 게임즈의 특별 혜택</h3>
                    <p className="text-left">팡팡게임즈에서는 여러가지 게임상품을<br />특별 할인 가격으로 구매가 가능합니다!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="max-h-[400px]">
                    <img src="images/main2.jpg" text="main2"  className="w-full"/>
                    <Carousel.Caption className="max-w-[1350px] m-auto h-2/3 pl-16">
                    <h3 className="text-left text-4xl font-bold">커뮤니티 오픈</h3>
                    <p className="text-left">자유게시판이 오픈하였습니다.<br />지금 바로 여러 유저들과 소통해보세요!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="max-h-[400px]">
                    <img src="images/main3.jpg" text="main3"  className="w-full"/>
                    <Carousel.Caption className="max-w-[1350px] m-auto h-2/3 pl-16">
                    <h3 className="text-left text-4xl font-bold">무료 플레이 이벤트</h3>
                    <p className="text-left">기간 제한 없이 70레벨까지!<br />무료 플레이 혜택과 함께 최고의 모험을 즐겨보세요.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </section>

    );
}

export default BannerComponent;