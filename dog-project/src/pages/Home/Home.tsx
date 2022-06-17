import { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from '../../components/Hero/Hero';
import InfiniteDogs from '../../components/InfiniteDogs/InfiniteDogs';
import styles from './Home.module.css';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className={styles.Home} data-testid="Home">
      <Hero />
      <Container fluid className={styles.carousel_spacing}>
        <Row>
          <Col xs="1" sm="2"></Col>
          <Col xs="10" sm="8"></Col>
        </Row>
        <Row>
          <Col className="d-none d-sm-block" sm="2"></Col>
          <Col xs="12" sm="8">
            {/* <FeaturedCarousel /> */}
          </Col>
        </Row>
        <Row>
          <Col xs="1" sm="2"></Col>
          <Col xs="10" sm="8">
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
