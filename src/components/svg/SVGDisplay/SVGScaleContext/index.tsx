import { createContext } from 'react';

interface SVGScaleContextType {
  scaleFactor: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
}

export const SVGScaleContext = createContext<SVGScaleContextType | undefined>(
  undefined
);
