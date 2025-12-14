import Grid from './Grid';
import { Toggle } from '../../ui/toggle';
import { EyeIcon, GridIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SVGDisplayContext } from './SVGDisplayContext';
import { cn } from '@/lib/utils';

interface SVGDisplayProps
  extends Omit<
    React.ComponentProps<typeof motion.svg>,
    'width' | 'height' | 'children'
  > {
  width?: number;
  height?: number;
  children: React.ReactNode;
  defaultShowGrid?: boolean;
  defaultShowDetail?: boolean;
}

const SVGDisplay: React.FC<SVGDisplayProps> = ({
  width = 100,
  height = 100,
  className,
  children,

  defaultShowGrid = false,
  defaultShowDetail = true,

  ...props
}) => {
  const [showGrid, setShowGrid] = useState(defaultShowGrid);
  const [showDetail, setShowDetail] = useState(defaultShowDetail);
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
    <figure className={cn('relative', className)}>
      <SVGDisplayContext.Provider
        value={{ scaleFactor, svgRef, showDetail, showGrid }}
      >
        <motion.svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} {...props}>
          <AnimatePresence>
            {showGrid && <Grid width={width} height={height} />}
          </AnimatePresence>
          {children}
        </motion.svg>
      </SVGDisplayContext.Provider>

      <div className="absolute right-0 bottom-0 flex flex-row items-end gap-2 p-2">
        <Toggle
          size="sm"
          variant="outline"
          defaultPressed={showDetail}
          onPressedChange={(pressed) => {
            setShowDetail(pressed);
          }}
          aria-label="Toggle italic"
        >
          <EyeIcon />
        </Toggle>
        <Toggle
          size="sm"
          variant="outline"
          defaultPressed={showGrid}
          onPressedChange={(pressed) => {
            setShowGrid(pressed);
          }}
          aria-label="Toggle italic"
        >
          <GridIcon />
        </Toggle>
      </div>
    </figure>
  );
};

export default SVGDisplay;
