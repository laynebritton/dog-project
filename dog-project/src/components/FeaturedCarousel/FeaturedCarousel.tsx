import React, { FC, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { getRandomDogs } from '../../api/dog-api';
import { Dog } from '../../interfaces/dog';
import styles from './FeaturedCarousel.module.css';

interface FeaturedCarouselProps {}

const ACCORDION_DOG_COUNT = 4;

const FeaturedCarousel: FC<FeaturedCarouselProps> = () => {
  const [featuredDogs, setFeaturedDogs] = useState<Dog[]>();

  useEffect(() => {
    getRandomDogs(ACCORDION_DOG_COUNT).then((dogs) => {
      setFeaturedDogs(dogs);
    });
  }, []);

  return (
    <Carousel variant="dark">
      {featuredDogs &&
        featuredDogs.map((dog) => (
          <Carousel.Item>
            <img className={styles.carousel_image} src={dog.image_url} />
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default FeaturedCarousel;
