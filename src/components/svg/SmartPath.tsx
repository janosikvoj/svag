import React from 'react';
import { motion, useTransform } from 'motion/react';
import type { MotionPoint } from './types';
import PointMarker from './PointMarker';

interface SmartPathProps extends React.ComponentProps<typeof motion.path> {
  startPoint: MotionPoint;
  controlPoint1: MotionPoint;
  controlPoint2: MotionPoint;
  endPoint: MotionPoint;
  showSkeleton?: boolean;
}

const SmartPath: React.FC<SmartPathProps> = ({
  startPoint,
  controlPoint1,
  controlPoint2,
  endPoint,
  showSkeleton = true,
  ...props
}) => {
  const d = useTransform(
    [
      startPoint.x,
      startPoint.y,
      controlPoint1.x,
      controlPoint1.y,
      controlPoint2.x,
      controlPoint2.y,
      endPoint.x,
      endPoint.y,
    ],
    ([sx, sy, c1x, c1y, c2x, c2y, ex, ey]) =>
      `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`
  );

  return (
    <>
      {showSkeleton && (
        <motion.g
          className="stroke-muted-foreground/50"
          strokeDasharray="10 10"
        >
          <motion.line
            vectorEffect="non-scaling-stroke"
            x1={startPoint.x}
            y1={startPoint.y}
            x2={controlPoint1.x}
            y2={controlPoint1.y}
          />
          <motion.line
            vectorEffect="non-scaling-stroke"
            x1={endPoint.x}
            y1={endPoint.y}
            x2={controlPoint2.x}
            y2={controlPoint2.y}
          />
        </motion.g>
      )}

      <motion.path vectorEffect="non-scaling-stroke" d={d} {...props} />

      <PointMarker x={startPoint.x.get()} y={startPoint.y.get()} />
      <PointMarker x={endPoint.x.get()} y={endPoint.y.get()} />

      {showSkeleton && (
        <>
          <PointMarker x={controlPoint1.x} y={controlPoint1.y} />
          <PointMarker x={controlPoint2.x} y={controlPoint2.y} />
        </>
      )}
    </>
  );
};

export default SmartPath;
