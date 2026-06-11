import React from 'react';

export default function RatingStars({ rating = 0, size = 'sm', showNumber = false }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3 && rating - fullStars < 0.7;
  const hasNearlyFull = rating - fullStars >= 0.7;
  const displayFull = hasNearlyFull ? fullStars + 1 : fullStars;
  const emptyStars = 5 - displayFull - (hasHalf ? 1 : 0);
  const starSize = size === 'sm' ? 14 : 18;

  return (
    <span className="inline-flex items-center gap-0.5">
      {[...Array(displayFull)].map((_, i) => (
        <svg key={`full-${i}`} width={starSize} height={starSize} viewBox="0 0 24 24" fill="#CB9A6E">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {hasHalf && (
        <svg width={starSize} height={starSize} viewBox="0 0 24 24">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="#CB9A6E" />
              <stop offset="50%" stopColor="#E5E5E5" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#halfGrad)" />
        </svg>
      )}
      {[...Array(Math.max(0, emptyStars))].map((_, i) => (
        <svg key={`empty-${i}`} width={starSize} height={starSize} viewBox="0 0 24 24" fill="#E5E5E5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {showNumber && <span className="ml-1 text-text-secondary text-sm font-medium">{rating}</span>}
    </span>
  );
}