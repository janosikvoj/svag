import Grid from './Grid';
import { Toggle } from '../ui/toggle';
import { GridIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { SVGScaleContext } from './SVGScaleContext';
import { cn } from '@/lib/utils';

interface SVGDisplayProps {
  width?: number;
  height?: number;
  className: string;
  children?: React.ReactNode;
}

const SVGDisplay: React.FC<SVGDisplayProps> = ({
  width = 100,
  height = 100,
  className,
  children,
}) => {
  const [showGrid, setShowGrid] = useState(true);
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

  return (
    <figure className={cn('flex gap-3', className)}>
      <div>
        <Toggle
          variant="outline"
          defaultPressed
          onPressedChange={(pressed) => {
            setShowGrid(pressed);
          }}
          aria-label="Toggle italic"
        >
          <GridIcon />
          Grid
        </Toggle>
      </div>
      <SVGScaleContext.Provider value={{ scaleFactor, svgRef }}>
        <svg
          ref={svgRef}
          className={cn(
            'overflow-visible',
            'transition-all delay-500 duration-500',
            showGrid && 'pl-8 pt-6 delay-0 duration-700'
          )}
          viewBox={`0 0 ${width} ${height}`}
          fill="currentColor"
        >
          <AnimatePresence>
            {showGrid && <Grid width={width} height={height} />}
          </AnimatePresence>
          {children}
        </svg>
      </SVGScaleContext.Provider>
    </figure>
  );
};

export default SVGDisplay;
