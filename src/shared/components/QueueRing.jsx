import React from 'react';
import { statusConfig } from '../data/queueLogic';

export default function QueueRing({ size = 48, status = 'EMPTY', animate = true }) {
  const config = statusConfig[status];
  const radius = (size / 2) - 4;
  const circumference = 2 * Math.PI * radius;
  const filled = (config.ringPercent / 100) * circumference;
  const center = size / 2;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }} className="queue-ring">
      {/* Background ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#E5E5E5"
        strokeWidth={3}
      />
      {/* Filled arc */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={config.textColor}
        strokeWidth={3}
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeLinecap="round"
        style={{
          transition: animate ? 'stroke-dasharray 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        }}
      />
      {/* Center dot */}
      <circle cx={center} cy={center} r={size * 0.12} fill={config.textColor} />
    </svg>
  );
}