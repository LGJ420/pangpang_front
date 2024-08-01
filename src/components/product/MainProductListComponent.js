import { Card, SimpleGrid } from "@chakra-ui/react";
import { Carousel } from "react-bootstrap";

const MainProductList = () => {

  return (
    <Carousel>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} className="pb-32">
        <Card maxW='sm'>

        </Card>
      </SimpleGrid>
    </Carousel>
  )

}


export default MainProductList;