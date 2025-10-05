import React from 'react';

const CircularFullness = ({ capacityLeft, capacity, size = 48, stroke = 6 }) => {
  if (!capacity || capacity <= 0) capacity = 1; // avoid division by zero

  const fullRatio = Math.max(0, Math.min(1, 1 - capacityLeft / capacity));
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashoffset = circumference * (1 - fullRatio); // smaller = more full

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label={`Fullness ${Math.round(fullRatio * 100)}%`}
    >
      {/* background ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#464646"
        strokeWidth={stroke}
      />
      {/* foreground ring (starts from top, goes clockwise) */}
      <g transform={`rotate(-90 ${cx} ${cy})`}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#9eff03"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashoffset}
        />
      </g>
      {/* percentage label */}
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size * 0.28}
        fill="white"
      >
        {Math.round(fullRatio * 100)}%
      </text>
    </svg>
  );
};

export default CircularFullness;

