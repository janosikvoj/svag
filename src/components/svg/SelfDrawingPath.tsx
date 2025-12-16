import React from 'react';
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useTransform,
} from 'motion/react';

interface SelfDrawingPathProps {
  progress: MotionValue<number>;
  strokeWidth: MotionValue<number>;
  roundCaps: boolean;
}

const SelfDrawingPath: React.FC<SelfDrawingPathProps> = ({
  progress,
  strokeWidth,
  roundCaps,
}) => {
  const dashLength = useTransform(progress, [0, 1], [1, 0.1]);
  const gapLength = useTransform(progress, [0, 1], [0, 0.9]);
  const dashArray = useMotionTemplate`${dashLength} ${gapLength}`;

  return (
    <motion.path
      pathLength={1}
      d="M 0 30 C 16.15 30, 19.23 10, 25.38 10 S 31.54 30, 37.69 30 S 46.92 50, 56.15 30 S 65.38 0, 71.54 20 S 83.85 40, 100 30"
      fill="none"
      className="stroke-primary"
      strokeWidth={strokeWidth}
      strokeDasharray={dashArray}
      animate={{ strokeDashoffset: [0, -1] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
      strokeLinecap={roundCaps ? 'round' : 'butt'}
      strokeLinejoin={roundCaps ? 'round' : 'miter'}
    />
  );
};

export default SelfDrawingPath;
