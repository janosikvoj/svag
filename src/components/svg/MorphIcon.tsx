// components/svg/MorphIcon.tsx
import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

// Define Easing Functions manually for transforms
// Motion's 'easeOut', 'circIn' etc are usually strings for animations,
// but for useTransform mapping we need math functions.
const EASINGS: Record<string, (v: number) => number> = {
  linear: (t) => t,
  // Simple cubic-bezier approximations
  easeOut: (t) => 1 - Math.pow(1 - t, 3),
  backOut: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  elastic: (t) => {
    if (t === 0 || t === 1) return t;
    return (
      Math.pow(2, -10 * t) * Math.sin(((t * 10 - 0.75) * (2 * Math.PI)) / 3) + 1
    );
  },
};

interface MorphIconProps {
  progress: MotionValue<number>;
}

const MorphIcon: React.FC<MorphIconProps> = ({ progress }) => {
  // 1. Apply Easing to the linear 0-1 progress
  const easedProgress = useTransform(progress, (t) => {
    const fn = EASINGS.linear;
    // We map 0-100 input to 0-1
    return fn(t / 100);
  });

  // 2. Interpolate Path Data
  // Since we have compatible commands, useTransform handles the string interpolation!
  // Note: For string interpolation, useTransform needs distinct input/output ranges.
  const pathD = useTransform(
    easedProgress,
    [0, 1],
    [
      // Hamburger (3 parallel lines)
      'M 20 30 L 80 30 M 20 50 L 80 50 M 20 70 L 80 70',
      // Close X (Cross + collapsed middle)
      'M 30 30 L 70 70 M 50 50 L 50 50 M 30 70 L 70 30',
    ],
    { clamp: false }
  );

  return (
    <motion.path
      d={pathD}
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      className="stroke-primary"
    />
  );
};

export default MorphIcon;
