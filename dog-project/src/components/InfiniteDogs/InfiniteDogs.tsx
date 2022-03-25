import React, { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AnimalFrame from '../AnimalFrame/AnimalFrame';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getRandomDogs } from '../../api/dog-api';
import { Dog } from '../../interfaces/dog';
import styles from './InfiniteDogs.module.css';

interface InfiniteDogsProps {}
const INFINITE_DOG_LOAD_COUNT = 49;

const InfiniteDogs: FC<InfiniteDogsProps> = () => {
  const [infiniteDogs, setInfiniteDogs] = useState<Dog[]>([]);

  useEffect(() => {
    getRandomDogs(INFINITE_DOG_LOAD_COUNT).then((dogs) => {
      setInfiniteDogs(dogs);
    });
  }, []);

  const fetchAdditionalDogs = () => {
    getRandomDogs(INFINITE_DOG_LOAD_COUNT).then((dogs) => {
      const temp = infiniteDogs.concat(dogs);
      console.log(temp);
      setInfiniteDogs(temp);
    });
    console.log('fetching!');
  };

  return (
    <>
      <InfiniteScroll
        next={fetchAdditionalDogs}
        hasMore={true}
        loader={<h4>Loading ...</h4>}
        dataLength={infiniteDogs.length}
      >
        <Container fluid className={styles.inner_container}>
          <Row>
            {infiniteDogs &&
              infiniteDogs.map((dog) => (
                <Col key={dog.image_url} xs="12" sm="4">
                  <AnimalFrame imageUrl={dog.image_url} />
                </Col>
              ))}
          </Row>
        </Container>
      </InfiniteScroll>
    </>
  );
};

export default InfiniteDogs;
