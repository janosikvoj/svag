import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import type { MotionPoint } from './types';
import PointMarker from './PointMarker';

interface SmartRectProps extends React.ComponentProps<typeof motion.rect> {
  x: MotionValue<number>;
  y: MotionValue<number>;
  width: MotionValue<number>;
  height: MotionValue<number>;
}

const SmartRect: React.FC<SmartRectProps> = ({
  x,
  y,
  width,
  height,
  ...props
}) => {
  const x2 = useTransform(() => x.get() + width.get());
  const y2 = useTransform(() => y.get() + height.get());

  const corners: MotionPoint[] = [
    { x: x, y: y },
    { x: x2, y: y },
    { x: x2, y: y2 },
    { x: x, y: y2 },
  ];

  return (
    <>
      <motion.rect x={x} y={y} width={width} height={height} {...props} />

      {corners.map((corner, index) => (
        <PointMarker key={`corner-${index}`} x={corner.x} y={corner.y} />
      ))}
    </>
  );
};

export default SmartRect;
