import React, { FC } from 'react';
import { motion } from 'framer-motion';

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
        <motion.div
          initial={{ opacity: 0.8, marginTop: 80 }}
          animate={{ opacity: 1, marginTop: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ fontSize: '10vh', color: '#FFF' }}>Infinite Dogs </h1>
        </motion.div>
        <div style={{ display: 'block', width: '100%', height: '0' }} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <p style={{ fontSize: '2rem', color: '#FFF' }}>
            Scroll for more dogs.
          </p>
        </motion.div>
      </div>
    </div>
  </>
);

export default Hero;
