import type { Point } from './types';

/**
 * Converts an SVG points string into an array of point objects.
 * Example: "10,10 20,20" -> [{x: 10, y: 10}, {x: 20, y: 20}]
 */
export const parsePoints = (pointsString: string): Point[] => {
  if (!pointsString) return [];

  return pointsString
    .trim()
    .split(/\s+/) // Split by whitespace (spaces or tabs)
    .map((coord) => {
      const [x, y] = coord.split(',').map(Number);
      // Filter out invalid numbers just in case
      if (isNaN(x) || isNaN(y)) return null;
      return { x, y };
    })
    .filter((p): p is Point => p !== null);
};

/**
 * Converts an array of point objects back into an SVG points string.
 * Example: [{x: 10, y: 10}, {x: 20, y: 20}] -> "10,10 20,20"
 */
export const stringifyPoints = (points: Point[]): string => {
  return points.map((p) => `${p.x},${p.y}`).join(' ');
};

/**
 * Updates a single coordinate in a points string at a specific index.
 * Useful for dragging a specific point in a polygon.
 */
export const updatePointAtIndex = (
  pointsString: string,
  index: number,
  newPoint: Point
): string => {
  const points = parsePoints(pointsString);
  if (points[index]) {
    points[index] = newPoint;
  }
  return stringifyPoints(points);
};
