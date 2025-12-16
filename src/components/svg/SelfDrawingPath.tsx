import React, { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

interface SelfDrawingPathProps {
  progress: MotionValue<number>; // 0 to 1
  strokeWidth: MotionValue<number>;
  roundCaps: boolean;
}

const SelfDrawingPath: React.FC<SelfDrawingPathProps> = ({
  progress,
  strokeWidth,
  roundCaps,
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  // Measure path length on mount
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Map progress (0-1) to offset (Length -> 0)
  // Progress 0: Offset = Length (Hidden)
  // Progress 1: Offset = 0 (Visible)
  const strokeDashoffset = useTransform(progress, [0, 1], [pathLength, 0]);

  return (
    <motion.path
      ref={pathRef}
      d={
        'M 10 50 C 20 50, 25 30, 35 30 S 45 50, 55 50 S 70 70, 85 50 S 100 20, 110 40 S 130 60, 140 50'
      }
      fill="none"
      className="stroke-primary"
      strokeWidth={strokeWidth}
      strokeDasharray={pathLength}
      strokeDashoffset={strokeDashoffset}
      strokeLinecap={roundCaps ? 'round' : 'butt'}
      strokeLinejoin={roundCaps ? 'round' : 'miter'}
    />
  );
};

export default SelfDrawingPath;
