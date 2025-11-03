'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './Carousel.module.scss';

export default function Carousel({ data = [] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = data.length;
  const intervalRef = useRef(null);

  const next = useCallback(() => {
    if (!len) return;
    setIndex((prev) => (prev + 1) % len);
  }, [len]);

  const prev = useCallback(() => {
    if (!len) return;
    setIndex((prev) => (prev - 1 + len) % len);
  }, [len]);

  useEffect(() => {
    if (!len) return;
    if (paused) return;
    intervalRef.current = setInterval(next, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [len, paused, next]);

  if (!len) return null;

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription='carousel'
    >
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {data.map((item, i) => (
            <div className={styles.slide} key={item.slug || i}>
              {/* Single child under Link: an <a> element via legacyBehavior */}
              <Link href={`/art/${item.slug}`} legacyBehavior prefetch={false}>
                <a
                  className={styles.slideLink}
                  aria-label={`View ${item.name}`}
                >
                  <div className={styles.imageWrap}>
                    <img
                      src={item.image}
                      alt={item.name || 'Artwork'}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className={styles.image}
                    />
                    <span className={styles.nameOverlay}>{item.name}</span>
                    <span className={styles.hoverShade} />
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={prev}
        aria-label='Previous slide'
        type='button'
      >
        ‹
      </button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={next}
        aria-label='Next slide'
        type='button'
      >
        ›
      </button>

      {/* Dots */}
      <div
        className={styles.dots}
        role='tablist'
        aria-label='Carousel pagination'
      >
        {data.map((_, i) => (
          <button
            type='button'
            key={i}
            className={`${styles.dot} ${i === index ? styles.activeDot : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === index}
            role='tab'
          />
        ))}
      </div>
    </div>
  );
}
