import { motion } from 'motion/react';
import { useId } from 'react';
import { useSVGScale } from './SVGScaleContext/useSVGScale';

interface GridProps {
  width: number;
  height: number;
  strokeWidth?: number;
}

const Grid: React.FC<GridProps> = ({ width, height, strokeWidth = 0.5 }) => {
  const uniqueId = useId();
  const xClipId = `cut-x-grid-lines-${uniqueId}`;
  const yClipId = `cut-y-grid-lines-${uniqueId}`;
  const { scaleFactor } = useSVGScale();

  // Calculate inverse scale for text
  const inverseScale = 1 / scaleFactor;
  // Base font size in viewBox units (you can adjust this)
  const baseFontSize = 14;
  // Scaled font size to match rem-like behavior
  const scaledFontSize = baseFontSize * inverseScale;

  return (
    <>
      <defs>
        <clipPath id={xClipId}>
          <motion.polygon
            initial={{ points: `0,0 ${width},0 ${width},${-height / 2} 0,0` }}
            animate={{
              points: `0,0 ${width},0 ${width},${height} 0,${height}`,
              transition: {
                ease: 'easeOut',
                duration: 0.6,
                type: 'tween',
              },
            }}
            exit={{
              points: `0,${height} ${width},${
                height * 1.5
              } ${width},${height} 0,${height}`,
              transition: {
                ease: 'easeIn',
                duration: 0.6,
                type: 'tween',
              },
            }}
          />
        </clipPath>
        <clipPath id={yClipId}>
          <motion.polygon
            initial={{ points: `0,0 0,0 ${-width / 2},${height} 0,${height}` }}
            animate={{
              points: `0,0 ${width},0 ${width},${height} 0,${height}`,
              transition: {
                ease: 'easeOut',
                duration: 0.6,
                type: 'tween',
                delay: 0.2,
              },
            }}
            exit={{
              points: `${width},0 ${width},0 ${width},${height} ${
                width * 1.5
              },${height}`,
              transition: {
                ease: 'easeIn',
                duration: 0.6,
                type: 'tween',
                delay: 0.2,
              },
            }}
          />
        </clipPath>
      </defs>
      <g // X grid lines
      >
        {Array.from({ length: width - 1 }).map((_, i) => (
          <line
            key={i}
            x1={i + 1}
            y1={0}
            x2={i + 1}
            y2={height}
            className="stroke-border/60"
            strokeWidth={(i + 1) % 5 === 0 ? strokeWidth * 2 : strokeWidth}
            vectorEffect="non-scaling-stroke"
            clipPath={`url(#${xClipId})`}
          />
        ))}
      </g>
      <g // Y grid lines
      >
        {Array.from({ length: height - 1 }).map((_, i) => (
          <line
            key={i}
            x1={0}
            y1={i + 1}
            x2={width}
            y2={i + 1}
            className="stroke-border/60"
            strokeWidth={(i + 1) % 5 === 0 ? strokeWidth * 2 : strokeWidth}
            vectorEffect="non-scaling-stroke"
            clipPath={`url(#${yClipId})`}
          />
        ))}
      </g>
      <motion.g
        initial={{ opacity: 0, filter: 'blur(1px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(1px)', transition: { delay: 0.8 } }}
      >
        <rect
          width={width}
          height={height}
          rx={16 * inverseScale}
          strokeWidth={strokeWidth * 2}
          vectorEffect="non-scaling-stroke"
          className="fill-none stroke-border"
        />
        <g // X coordinate numbers
          transform={`translate(0 ${12 * inverseScale})`}
        >
          {/* <text
            className="font-mono text-muted-foreground"
            fontSize={scaledFontSize}
            textAnchor="middle"
          >
            0
          </text> */}
          {Array.from({ length: width - 1 }).map((_, i) => {
            if ((i + 1) % 5 === 0)
              return (
                <motion.text
                  key={i}
                  className="font-mono text-muted-foreground transition-all"
                  fontSize={scaledFontSize}
                  x={i + 1}
                  textAnchor="middle"
                  alignmentBaseline="central"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * (4 / 1000) }}
                >
                  {i + 1}
                </motion.text>
              );
          })}
          {/* <text
            className="font-mono text-muted-foreground"
            fontSize={3}
            x={width}
            textAnchor="middle"
          >
            {width}
          </text> */}
        </g>
        <g // Y coordinate numbers
          transform={`translate(${8 * inverseScale} 0)`}
        >
          {/* <text
            className="font-mono text-muted-foreground"
            fontSize={3}
            textAnchor="end"
            alignmentBaseline="central"
          >
            0
          </text> */}
          {Array.from({ length: height - 1 }).map((_, i) => {
            if ((i + 1) % 5 === 0)
              return (
                <motion.text
                  key={i}
                  className="font-mono text-muted-foreground transition-all"
                  fontSize={scaledFontSize}
                  y={i + 1}
                  textAnchor="start"
                  alignmentBaseline="central"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * (4 / 1000) }}
                >
                  {i + 1}
                </motion.text>
              );
          })}
          {/* <text
            className="font-mono text-muted-foreground"
            fontSize={3}
            y={height}
            textAnchor="end"
            alignmentBaseline="central"
          >
            {height}
          </text> */}
        </g>
      </motion.g>
    </>
  );
};

export default Grid;
