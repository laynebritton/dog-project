import React, { FC, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getRandomDogs } from "../../api/dog-api";
import AnimalFrame from "../../components/AnimalFrame/AnimalFrame";
import { Dog } from "../../interfaces/dog";
import styles from "./Home.module.css";

interface HomeProps {}

const ACCORDION_DOG_COUNT = 4;

const Home: FC<HomeProps> = () => {
  const [dogs, setDogs] = useState<Dog[]>();

  useEffect(() => {
    getRandomDogs(ACCORDION_DOG_COUNT).then((dogs) => {
      setDogs(dogs);
      console.log(dogs);
    });
  }, []);

  return (
    <div className={styles.Home} data-testid="Home">
      <Container>
        <Row>
          <Col xs="1" sm="2"></Col>
          <Col xs="10" sm="8"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
