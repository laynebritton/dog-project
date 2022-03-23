import React, { FC, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomDog } from "../../api/dog-api";
import AnimalFrame from "../../components/AnimalFrame/AnimalFrame";
import Navigation from "../../components/Navigation/Navigation";
import styles from "./Home.module.css";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    getRandomDog().then((dog) => {
      setImageUrl(dog);
    });
  }, []);

  return (
    <div className={styles.Home} data-testid="Home">
      <Container>
        <Row>
          <Col xs="1" sm="2"></Col>
          <Col xs="10" sm="8">
            <AnimalFrame imageUrl={imageUrl}></AnimalFrame>
            <AnimalFrame imageUrl={imageUrl}></AnimalFrame>
            <AnimalFrame imageUrl={imageUrl}></AnimalFrame>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
