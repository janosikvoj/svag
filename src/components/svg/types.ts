import type { MotionValue } from 'motion/react';

export type Point = {
  x: number;
  y: number;
};

export type MotionPoint = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};
