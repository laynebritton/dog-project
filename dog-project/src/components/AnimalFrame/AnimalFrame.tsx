import React, { FC } from "react";
import styles from "./AnimalFrame.module.css";

interface AnimalFrameProps {
  imageUrl: string;
}

const AnimalFrame: FC<AnimalFrameProps> = (props) => (
  <div className={styles.AnimalFrame} data-testid="AnimalFrame">
    <img src={props.imageUrl}></img>
  </div>
);

export default AnimalFrame;
