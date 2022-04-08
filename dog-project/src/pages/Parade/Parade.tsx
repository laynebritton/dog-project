import React, { FC, useEffect, useState } from 'react';
import AnimalFrame from '../../components/AnimalFrame/AnimalFrame';
import { ParadeDog } from '../../interfaces/ParadeDog';
import useWindowDimensions from '../../util/WindowDimensions';
import styles from './Parade.module.css';

interface ParadeProps {}
const STATIC_DOG_URL = 'https://images.dog.ceo/breeds/shiba/shiba-15.jpg';

const Parade: FC<ParadeProps> = () => {
  const [paradeDogs, setParadeDogs] = useState<ParadeDog[]>([]);
  const { width, height } = useWindowDimensions();

  const moveVerticallyAcrossTheScreen = (paradeDog: ParadeDog) => {
    paradeDog.x += 1;
    paradeDog.y += 1;
    if (paradeDog.x > width) {
      paradeDog.x = 0;
    }
    if (paradeDog.y > height) {
      paradeDog.y = 100;
    }
  };

  useEffect(() => {
    const tempArray: ParadeDog[] = [];
    tempArray.push({
      x: 0,
      y: 100,
      movementFunction: moveVerticallyAcrossTheScreen,
      dog: { image_url: STATIC_DOG_URL }
    });
    tempArray.push({
      x: 200,
      y: 400,
      movementFunction: moveVerticallyAcrossTheScreen,
      dog: { image_url: STATIC_DOG_URL }
    });
    setParadeDogs(tempArray);
  }, []);

  useEffect(() => {
    const newIntervalId = window.setInterval(() => {
      if (paradeDogs.length <= 0) {
        return;
      }
      const tempArray = paradeDogs.slice();
      tempArray.forEach((paradeDog) => {
        paradeDog.movementFunction(paradeDog);
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
