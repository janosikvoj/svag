import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionTemplate,
} from 'motion/react';
import { useSVGDisplay } from './SVGDisplay/SVGDisplayContext/useSVGDisplay';
import type { MotionPoint } from './types';

const SmartPointMarker: React.FC<MotionPoint> = ({ x, y }) => {
  const { scaleFactor, showDetail } = useSVGDisplay();

  // Calculate inverse scale for text
  const inverseScale = 1 / scaleFactor;
  // Base font size in viewBox units (you can adjust this)
  const baseFontSize = 14;
  // Scaled font size to match rem-like behavior
  const scaledFontSize = baseFontSize * inverseScale;

  const roundedX = useTransform(x, (latest) => Math.round(latest));
  const roundedY = useTransform(y, (latest) => Math.round(latest));
  const label = useMotionTemplate`${roundedX} ${roundedY}`;

  return (
    <AnimatePresence>
      {showDetail && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fill-foreground"
        >
          <motion.circle cx={x} cy={y} r={2 * inverseScale} />
          <motion.text
            transform={`translate(0 ${-8 * inverseScale})`}
            className="font-mono"
            fontSize={scaledFontSize}
            textAnchor="middle"
            x={x}
            y={y}
          >
            {label}
          </motion.text>
        </motion.g>
      )}
    </AnimatePresence>
  );
};

export default SmartPointMarker;
