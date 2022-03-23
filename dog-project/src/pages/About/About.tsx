import React, { FC, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomDog } from "../../api/dog-api";

import AnimalFrame from "../../components/AnimalFrame/AnimalFrame";
import { Dog } from "../../interfaces/dog";

interface AboutProps {}

const About: FC<AboutProps> = () => {
  const [dog, setDog] = useState<Dog>();

  useEffect(() => {
    getRandomDog().then((dog) => {
      setDog(dog);
    });
  }, []);

  return (
    <>
      <h1>About</h1>
      <Container>
        <Row>
          <Col xs="1" sm="2"></Col>
          <Col xs="10" sm="8">
            {dog && (
              <>
                <AnimalFrame imageUrl={dog.image_url}></AnimalFrame>
                <AnimalFrame imageUrl={dog.image_url}></AnimalFrame>
                <AnimalFrame imageUrl={dog.image_url}></AnimalFrame>
              </>
            )}
          </Col>
        </Row>
      </Container>{" "}
    </>
  );
};

export default About;
