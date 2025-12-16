import React from 'react';
import { motion, MotionValue } from 'motion/react';
import PointMarker from './PointMarker';

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

  return (
    <>
      <motion.g
        style={{
          rotate: groupRotate,
          scale: groupScale,
        }}
      >
        {/* Head */}
        <motion.circle
          cx={center}
          cy={center}
          r={40}
          vectorEffect="non-scaling-stroke"
          className="fill-primary/20 stroke-primary stroke-4"
        />

        {/* Left Eye */}
        <motion.circle
          cx={50}
          cy={40}
          r={5}
          className="fill-primary"
          style={{ x: eyeSpacing }} // Apply transform here
        />

        {/* Right Eye */}
        <motion.circle
          cx={50}
          cy={40}
          r={5}
          className="fill-primary rotate-180"
          style={{ x: eyeSpacing }}
        />

        {/* Mouth */}
        <motion.path
          d="M 35 65 Q 50 75 65 65"
          className="stroke-primary stroke-4 fill-none"
          strokeLinecap="round"
        />
      </motion.g>

      <PointMarker x={center} y={center} />
    </>
  );
};

export default FaceGroup;
