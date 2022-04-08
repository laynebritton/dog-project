import React, { FC, useEffect, useState } from 'react';
import { getRandomDogs } from '../../api/dog-api';
import AnimalFrame from '../../components/AnimalFrame/AnimalFrame';
import { Dog } from '../../interfaces/dog';
import { ParadeDog } from '../../interfaces/ParadeDog';
import useWindowDimensions from '../../util/WindowDimensions';
import styles from './Parade.module.css';
import * as CONSTANTS from '../../util/Constants';

interface ParadeProps {}

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

  useEffect(() => {
    getRandomDogs(CONSTANTS.INFINITE_DOG_LOAD_COUNT).then((dogs) => {
      setInfiniteDogs(dogs);
    });
  }, []);

  useEffect(() => {
    if (paradeDogs.length < 1) {
      const dog = infiniteDogs.pop();
      if (!dog) {
        return;
      }
      setInfiniteDogs(infiniteDogs);
      const tempArray: ParadeDog[] = paradeDogs.slice();
      const randomX = Math.random() * -width;
      const randomY = Math.random() * (height - 100);
      tempArray.push({
        x: randomX,
        y: randomY,
        speed: Math.random() * 2,
        movementFunction: moveVerticallyAcrossTheScreen,
        dog: dog
      });
      setParadeDogs(tempArray);
    }
  }, [infiniteDogs]);

  useEffect(() => {
    const newIntervalId = window.setInterval(() => {
      if (paradeDogs.length <= 0) {
        return;
      }
      const tempArray = paradeDogs.slice();

      if (paradeDogs.length < 5) {
        const dog = infiniteDogs.pop();
        setInfiniteDogs(infiniteDogs);
        if (!dog) {
          return;
        }
        const randomX = Math.random() * -width;
        const randomY = Math.random() * (height - 100);
        tempArray.push({
          x: randomX,
          y: randomY,
          speed: Math.random() * 2,
          movementFunction: moveVerticallyAcrossTheScreen,
          dog: dog
        });
      }

      tempArray.forEach((paradeDog, index) => {
        paradeDog.movementFunction(paradeDog);
        if (isOffScreen(paradeDog)) {
          tempArray.splice(index, 1);
          console.log(infiniteDogs.length);
        }
      });
      setParadeDogs(tempArray);
    }, 4);

    return () => clearInterval(newIntervalId);
  }, [paradeDogs]);

  return (
    <>
      {paradeDogs.map((paradeDog) => (
        <div
          style={{ left: paradeDog.x + 'px', top: paradeDog.y + 'px' }}
          key={paradeDog.x}
          className={styles.parade_animal}
        >
          <AnimalFrame imageUrl={paradeDog.dog.image_url} />
        </div>
      ))}
      <div className={styles.Parade}>
        width: {width} ~ height: {height}
      </div>
    </>
  );
};

export default Parade;
