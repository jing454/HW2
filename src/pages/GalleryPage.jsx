import React, { useEffect, useState } from 'react';

const slides = [
  { src: '/assets/Menu/items/Cheeseburger.png', alt: 'Delicious Burger' },
  { src: '/assets/Menu/items/Pasta.png', alt: 'Fresh Pasta Dish' },
  { src: '/assets/Menu/items/Pizza.png', alt: 'Crispy Pizza' },
  { src: '/assets/Gallery/items/inside.png', alt: 'Restaurant Interior' },
  { src: '/assets/Gallery/items/fl2.png', alt: 'fl2' },
  { src: '/assets/Gallery/items/chill_area.png', alt: 'Chill area' },
];

export default function GalleryPage() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSlideIndex(currentIndex => (currentIndex + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main>
      <h1>Gallery</h1>

      <div className="slider-container">
        <div className="slider-wrapper">
          {slides.map((slide, index) => (
            <div
              key={slide.alt}
              className={`slide fade ${index === slideIndex ? 'active' : ''}`}
            >
              <img src={slide.src} alt={slide.alt} />
            </div>
          ))}
        </div>

        <button className="prev" type="button" onClick={() => setSlideIndex(currentIndex => (currentIndex - 1 + slides.length) % slides.length)}>
          &#10094;
        </button>
        <button className="next" type="button" onClick={() => setSlideIndex(currentIndex => (currentIndex + 1) % slides.length)}>
          &#10095;
        </button>
      </div>

      <div className="dots-container">
        {slides.map((slide, index) => (
          <button
            key={slide.alt}
            type="button"
            className={`dot ${index === slideIndex ? 'active' : ''}`}
            onClick={() => setSlideIndex(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </main>
  );
}
