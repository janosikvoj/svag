import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

interface FaceGroupProps {
  groupRotate: MotionValue<number>;
  groupScale: MotionValue<number>;
  eyeSpacing: MotionValue<number>;
}

const FaceGroup: React.FC<FaceGroupProps> = ({
  groupRotate,
  groupScale,
  eyeSpacing,
}) => {
  const center = 50;
  const eyeY = 40;

  const leftEyeX = useTransform(eyeSpacing, (s) => -s);
  const rightEyeX = eyeSpacing; // Positive value is fine directly

  return (
    <motion.g
      style={{
        rotate: groupRotate,
        scale: groupScale,
        originX: '50px',
        originY: '50px',
      }}
    >
      <motion.circle
        cx={center}
        cy={center}
        r={40}
        className="fill-primary/20 stroke-primary stroke-2"
      />

      {/* Left Eye */}
      <motion.circle
        cx={50}
        cy={eyeY}
        r={5}
        className="fill-primary"
        style={{ x: leftEyeX }} // Apply transform here
      />

      {/* Right Eye */}
      <motion.circle
        cx={50}
        cy={eyeY}
        r={5}
        className="fill-primary"
        style={{ x: rightEyeX }}
      />

      <motion.path
        d="M 35 65 Q 50 75 65 65"
        className="stroke-primary stroke-2 fill-none"
        strokeLinecap="round"
      />
    </motion.g>
  );
};

export default FaceGroup;
