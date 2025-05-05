import { useState, useCallback } from 'react';

interface CarouselItem {
  id: string;
  image: any;
  title: string;
  description: string;
  location: string;
  date: string;
}

export function useCarousel(items: CarouselItem[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  }, [items.length]);

  return {
    currentIndex,
    currentItem: items[currentIndex],
    nextSlide,
    prevSlide,
  };
} 