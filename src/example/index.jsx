import React, { useState } from 'react';
import Swiper from '../components/Swiper';
import './style.scss';

export default function Example() {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Swiper pagination curIndex={currentIndex} onDotClick={setCurrentIndex}>
      <h2>Slide 1</h2>
      <h2>Slide 2</h2>
      <h2>Slide 3</h2>
      <h2>Slide 4</h2>
      <h2>Slide 5</h2>
    </Swiper>
  );
}
