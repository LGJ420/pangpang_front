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
                <Carousel.Item>
                    <img src="images/main1.jpg" text="main1"  className="w-full"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="images/main2.jpg" text="main2"  className="w-full"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="images/main3.jpg" text="main3"  className="w-full"/>
                </Carousel.Item>
            </Carousel>
        </section>

    );
}

export default BannerComponent;