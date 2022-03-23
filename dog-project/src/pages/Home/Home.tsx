import React, { FC, useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Card, Image } from "react-bootstrap";
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
      <Container fluid className={styles.carousel_spacing}>
        <Carousel variant="dark">
          {dogs &&
            dogs.map((dog) => (
              <Carousel.Item>
                {/* <Image src={dog.image_url} fluid></Image> */}
                <img className={styles.carousel_image} src={dog.image_url} />
              </Carousel.Item>
            ))}
        </Carousel>
        <Row>
          <Col xs="1" sm="2"></Col>
          <Col xs="10" sm="8">
            <Card>
              <Card.Body>
                <Card.Title>Watch an endless stream of dogs</Card.Title>
                <Card.Subtitle>Infinitely scrolling pups</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
