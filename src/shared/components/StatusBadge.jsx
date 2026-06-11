import React from 'react';
import { statusConfig } from '../data/queueLogic';

export default function StatusBadge({ status = 'EMPTY', showWait = false, waitMinutes = 0, size = 'md' }) {
  const config = statusConfig[status];
  const sizes = {
    sm: 'px-2 py-0.5 text-2xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${sizes[size]}`}
      style={{ backgroundColor: config.bgColor, color: config.textColor }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.textColor }} />
      {config.label}
      {showWait && waitMinutes > 0 && ` · ~${waitMinutes} min`}
    </span>
  );
}