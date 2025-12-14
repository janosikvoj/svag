import React, { useMemo } from 'react';
import PointMarker from './PointMarker';
import type { Point } from './types';
import { parsePoints } from './utils';
import { motion } from 'motion/react';

interface SmartPolygonProps
  extends React.ComponentProps<typeof motion.polygon> {
  points?: string;
}

const SmartPolygon: React.FC<SmartPolygonProps> = ({
  points = '',
  ...props
}) => {
  const pointData: Point[] = useMemo(() => parsePoints(points), [points]);

  if (!points) return null;

  return (
    <>
      <motion.polygon points={points} {...props} />
      {pointData.map((coord, index) => (
        <PointMarker key={`point-${index}`} x={coord.x} y={coord.y} />
      ))}
    </>
  );
};

export default SmartPolygon;
