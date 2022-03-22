import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AnimalFrame from './AnimalFrame';

describe('<AnimalFrame />', () => {
  test('it should mount', () => {
    render(<AnimalFrame imageUrl=''/>);
    
    const animalFrame = screen.getByTestId('AnimalFrame');

    expect(animalFrame).toBeInTheDocument();
  });
});