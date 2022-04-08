import { Dog } from './dog';

export interface ParadeDog {
  dog: Dog;
  x: number;
  y: number;
  movementFunction: (paradeDog: ParadeDog) => void;
}
