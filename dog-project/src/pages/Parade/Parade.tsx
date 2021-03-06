import React, { FC, useEffect, useState } from 'react';
import { getRandomDogs } from '../../api/dog-api';
import AnimalFrame from '../../components/AnimalFrame/AnimalFrame';
import { Dog } from '../../interfaces/dog';
import { ParadeDog } from '../../interfaces/ParadeDog';
import useWindowDimensions from '../../util/WindowDimensions';
import styles from './Parade.module.css';
import * as CONSTANTS from '../../util/Constants';

interface ParadeProps {}

const MAX_PARADE_DOGS_ON_SCREEN_AT_ONCE = 7;
const MINIMUM_DOGS_NEEDED_TO_LOAD_MORE = 10;

const Parade: FC<ParadeProps> = () => {
  const [paradeDogs, setParadeDogs] = useState<ParadeDog[]>([]);
  const [infiniteDogs, setInfiniteDogs] = useState<Dog[]>([]);
  const { width, height } = useWindowDimensions();

  const moveVerticallyAcrossTheScreen = (paradeDog: ParadeDog) => {
    paradeDog.x += paradeDog.speed;
  };

  const isOffScreen = (paradeDog: ParadeDog) => {
    if (paradeDog.x > width + 400) {
      return true;
    }
    return false;
  };

  const createParadeDog = (dog: Dog): ParadeDog => {
    const randomY = Math.random() * (height - 200);
    const paradeDog = {
      x: -width / 2,
      y: randomY,
      speed: Math.random() * 2.5,
      movementFunction: moveVerticallyAcrossTheScreen,
      dog: dog
    };
    return paradeDog;
  };

  const getNextDogFromStack = (): Dog | undefined => {
    const dog = infiniteDogs.pop();
    setInfiniteDogs(infiniteDogs);
    return dog;
  };

  const loadMoreDogsIfStackIsLow = () => {
    if (infiniteDogs.length <= MINIMUM_DOGS_NEEDED_TO_LOAD_MORE) {
      getRandomDogs(CONSTANTS.INFINITE_DOG_LOAD_COUNT).then((dogs) => {
        const temp = infiniteDogs.concat(dogs);
        setInfiniteDogs(temp);
      });
    }
  };

  const moveAllParadeDogs = (paradeDogs: ParadeDog[]) => {
    paradeDogs.forEach((paradeDog, index) => {
      paradeDog.movementFunction(paradeDog);
      if (isOffScreen(paradeDog)) {
        paradeDogs.splice(index, 1);
      }
    });
    setParadeDogs(paradeDogs);
  };

  const createAndPushNewParadeDog = () => {
    const dog = getNextDogFromStack();
    if (!dog) {
      return;
    }
    const tempArray = paradeDogs.slice();
    tempArray.push(createParadeDog(dog));
    setParadeDogs(tempArray);
  };

  useEffect(() => {
    getRandomDogs(CONSTANTS.INFINITE_DOG_LOAD_COUNT).then((dogs) => {
      setInfiniteDogs(dogs);
    });
  }, []);

  useEffect(() => {
    // Create first parade dog once dog data is loaded
    if (paradeDogs.length < 1) {
      createAndPushNewParadeDog();
    }
  }, [infiniteDogs]);

  useEffect(() => {
    const newIntervalId = window.setInterval(() => {
      loadMoreDogsIfStackIsLow();
      if (paradeDogs.length <= 0) {
        return;
      }

      const tempArray = paradeDogs.slice();

      if (paradeDogs.length < MAX_PARADE_DOGS_ON_SCREEN_AT_ONCE) {
        const dog = getNextDogFromStack();
        if (!dog) {
          return;
        }
        tempArray.push(createParadeDog(dog));
      }
      moveAllParadeDogs(tempArray);
    }, 4);

    return () => clearInterval(newIntervalId);
  }, [paradeDogs]);

  return (
    <div
      className={styles.parade_body}
      style={{ width: width + 'px', height: height - 56 + 'px' }}
    >
      {paradeDogs.map((paradeDog) => (
        <div
          style={{ left: paradeDog.x + 'px', top: paradeDog.y + 'px' }}
          key={paradeDog.x}
          className={styles.parade_animal}
        >
          <AnimalFrame imageUrl={paradeDog.dog.image_url} />
        </div>
      ))}
    </div>
  );
};

export default Parade;
