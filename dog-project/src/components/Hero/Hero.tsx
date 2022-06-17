import React, { FC } from 'react';

interface HeroProps {}

const Hero: FC<HeroProps> = () => (
  <>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'wrap',
          flexWrap: 'wrap',
          textAlign: 'center'
        }}
      >
        <h1 style={{ fontSize: '10vh', color: '#FFF' }}>Infinite Dogs </h1>
        <div style={{ display: 'block', width: '100%', height: '0' }} />
        <p style={{ fontSize: '2rem', color: '#FFF' }}>
          Scroll to find dogs. Better than doom-scrolling.
        </p>
      </div>
    </div>
  </>
);

export default Hero;
