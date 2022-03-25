import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import styles from './AnimalFrame.module.css';

interface AnimalFrameProps {
  imageUrl: string;
}

const AnimalFrame: FC<AnimalFrameProps> = (props) => (
  <div className={styles.AnimalFrame} data-testid="AnimalFrame">
    <Card body>
      <Card.Img variant="top" src={props.imageUrl} />
    </Card>
  </div>
);

export default AnimalFrame;
