import React, { FC, useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Card, Image } from "react-bootstrap";
import { getRandomDogs } from "../../api/dog-api";
import AnimalFrame from "../../components/AnimalFrame/AnimalFrame";
import InfiniteDogs from "../../components/InfiniteDogs/InfiniteDogs";
import { Dog } from "../../interfaces/dog";
import styles from "./Home.module.css";

interface HomeProps {}

const ACCORDION_DOG_COUNT = 4;

const Home: FC<HomeProps> = () => {
  const [featuredDogs, setFeaturedDogs] = useState<Dog[]>();

  useEffect(() => {
    getRandomDogs(ACCORDION_DOG_COUNT).then((dogs) => {
      setFeaturedDogs(dogs);
    });
  }, []);

  return (
    <div className={styles.Home} data-testid="Home">
      <Container fluid className={styles.carousel_spacing}>
        <Row>
          <Col xs="1" sm="2"></Col>
          <Col xs="10" sm="8">
            <Card>
              <Card.Body>
                <Card.Title>Watch an endless stream of dogs</Card.Title>
                <Card.Subtitle>Featured Dogs Below</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="d-none d-sm-block" sm="2"></Col>
          <Col xs="12" sm="8">
            <Carousel variant="dark">
              {featuredDogs &&
                featuredDogs.map((dog) => (
                  <Carousel.Item>
                    <img
                      className={styles.carousel_image}
                      src={dog.image_url}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </Col>
        </Row>
        <Row>
          <Col xs="1" sm="2"></Col>
          <Col xs="10" sm="8">
            <h1>Scroll for infinite dogs</h1>
            <Row>
              <InfiniteDogs />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
