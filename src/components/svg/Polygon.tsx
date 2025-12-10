import React from 'react';
import Point from './Point';

interface PolygonProps extends React.SVGProps<SVGPolygonElement> {
  points: string;
  showPoints?: boolean;
}

const Polygon: React.FC<PolygonProps> = ({
  points,
  showPoints = true,
  ...props
}) => {
  const parsePoints = (
    pointsString: string
  ): Array<{ x: number; y: number }> => {
    return pointsString
      .trim()
      .split(/\s+/)
      .map((coord) => {
        const [x, y] = coord.split(',').map(Number);
        return { x, y };
      });
  };

  const coordinates = parsePoints(points);

  return (
    <>
      <polygon points={points} {...props} />
      {showPoints &&
        coordinates.map((coord, index) => (
          <Point key={`point-${index}`} x={coord.x} y={coord.y} />
        ))}
    </>
  );
};

export default Polygon;
