import Grid from './Grid';
import { Toggle } from '../../ui/toggle';
import { GridIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { SVGScaleContext } from './SVGScaleContext';
import { cn } from '@/lib/utils';

interface SVGDisplayProps {
  width?: number;
  height?: number;
  className?: string;
  children?: React.ReactNode;
  controlPanel?: boolean | React.ReactNode;
  figcaption?: React.ReactNode;
}

const SVGDisplay: React.FC<SVGDisplayProps> = ({
  width = 100,
  height = 100,
  className,
  children,
  controlPanel = true,
  figcaption,
}) => {
  const [showGrid, setShowGrid] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const updateScale = () => {
      const renderedWidth = svg.clientWidth;
      const scale = renderedWidth / width;
      setScaleFactor(scale);
    };

    const observer = new ResizeObserver(updateScale);
    observer.observe(svg);
    updateScale();

    return () => observer.disconnect();
  }, [width]);

  const ControlPanel = () => {
    if (controlPanel)
      return (
        <div className="absolute right-0 bottom-0 flex flex-col items-end gap-6 p-2">
          {controlPanel}
          <Toggle
            variant="outline"
            defaultPressed={showGrid}
            onPressedChange={(pressed) => {
              setShowGrid(pressed);
            }}
            aria-label="Toggle italic"
          >
            <GridIcon />
            Grid
          </Toggle>
        </div>
      );
  };

  return (
    <figure className={cn('flex flex-col gap-1.5', className)}>
      <div className="relative">
        <SVGScaleContext.Provider value={{ scaleFactor, svgRef }}>
          <svg
            ref={svgRef}
            className="overflow-visible"
            viewBox={`0 0 ${width} ${height}`}
            fill="currentColor"
          >
            <AnimatePresence>
              {showGrid && <Grid width={width} height={height} />}
            </AnimatePresence>
            {children}
          </svg>
        </SVGScaleContext.Provider>
        <ControlPanel />
      </div>
      {figcaption && (
        <figcaption className="text-sm px-3">{figcaption}</figcaption>
      )}
    </figure>
  );
};

export default SVGDisplay;
