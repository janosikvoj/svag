import { createContext } from 'react';

interface SVGDisplayContextType {
  scaleFactor: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
  showGrid: boolean;
  showDetail: boolean;
}

export const SVGDisplayContext = createContext<
  SVGDisplayContextType | undefined
>(undefined);
