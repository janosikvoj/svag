import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

interface MorphShapeProps {
  progress: MotionValue<number>;
}

const MorphShape: React.FC<MorphShapeProps> = ({ progress }) => {
  const pathD = useTransform(
    progress,
    [0, 1],
    [
      'M7.74049 25.5599C13.1421 25.2829 18.7962 27.0466 21.0366 34.701C24.3607 46.0582 35.9948 27.6375 39.7344 19.3274C42.9984 12.074 35.0253 11.1558 30.8703 11.9868C26.7152 12.8178 22.8372 10.1862 19.7901 4.36918C16.7431 -1.44788 8.71002 -0.478369 10.2335 5.7542C11.7571 11.9868 2.61584 14.6183 0.953826 18.4963C-0.708193 22.3744 2.33884 25.8369 7.74049 25.5599Z',
      'M12.9094 17.9542C16.3858 13.7172 22.7902 35.2407 25.2597 23.4276C27.7132 11.6904 36.2063 24.1293 39.9955 15.7088C43.3029 8.35902 29.1684 10.1835 31.7154 6.72682C33.6802 4.06026 30.9655 -1.88931 25.2597 1.53418C21.0494 4.06034 10.8044 -2.81645 10.8044 8.27061C10.8044 12.0598 2.38363 10.9371 0.699515 14.8667C-0.984596 18.7963 8.41856 23.4276 12.9094 17.9542Z',
    ],
    { clamp: false }
  );

  return (
    <motion.path
      d={pathD}
      strokeWidth="6"
      strokeLinecap="round"
      className="fill-primary translate-1 translate-y-2"
    />
  );
};

export default MorphShape;
