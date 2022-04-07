import React, { FC, useEffect, useState } from 'react';
import { Col, Container, Dropdown, Row, Spinner } from 'react-bootstrap';
import AnimalFrame from '../AnimalFrame/AnimalFrame';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getRandomDogs,
  getRandomDogsByBreed,
  getDogBreedList
} from '../../api/dog-api';
import { Dog, DogBreed } from '../../interfaces/dog';
import styles from './InfiniteDogs.module.scss';

interface InfiniteDogsProps {}
const INFINITE_DOG_LOAD_COUNT = 49;

const InfiniteDogs: FC<InfiniteDogsProps> = () => {
  const [infiniteDogs, setInfiniteDogs] = useState<Dog[]>([]);
  const [dogBreeds, setDogBreeds] = useState<DogBreed[]>([]);
  const [selectedDogBreed, setSelectedDogBreed] = useState<DogBreed>();

  useEffect(() => {
    if (selectedDogBreed) {
      getRandomDogsByBreed(selectedDogBreed.name, INFINITE_DOG_LOAD_COUNT).then(
        (dogs) => {
          setInfiniteDogs(dogs);
        }
      );
    } else {
      getRandomDogs(INFINITE_DOG_LOAD_COUNT).then((dogs) => {
        setInfiniteDogs(dogs);
      });
    }
  }, [selectedDogBreed]);

  useEffect(() => {
    getDogBreedList().then((dogBreeds) => {
      setDogBreeds(dogBreeds);
    });
  }, []);

  const fetchAdditionalDogs = () => {
    if (selectedDogBreed) {
      getRandomDogsByBreed(selectedDogBreed.name, INFINITE_DOG_LOAD_COUNT).then(
        (dogs) => {
          const temp = infiniteDogs.concat(dogs);
          setInfiniteDogs(temp);
        }
      );
    }
    getRandomDogs(INFINITE_DOG_LOAD_COUNT).then((dogs) => {
      const temp = infiniteDogs.concat(dogs);
      setInfiniteDogs(temp);
    });
  };

  return (
    <>
      {dogBreeds && (
        <Dropdown className={styles.breed_dropdown}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Sort by dog breed
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {dogBreeds.map((breed) => (
              <Dropdown.Item
                key={breed.name}
                onClick={() => {
                  setSelectedDogBreed(breed);
                }}
              >
                {breed.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
      <InfiniteScroll
        next={fetchAdditionalDogs}
        hasMore={true}
        loader={
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
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
