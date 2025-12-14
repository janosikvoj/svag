import React, { useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from 'motion/react';
import { useSVGDisplay } from './SVGDisplay/SVGDisplayContext/useSVGDisplay';

type UnifiedPointProps = {
  x: number | MotionValue<number>;
  y: number | MotionValue<number>;
};

/**
 * Helper hook to normalize input into a MotionValue.
 * If the input is a number, it creates a MotionValue and keeps it synced.
 * If the input is already a MotionValue, it pipes it through.
 */
function useUnifiedMotionValue(value: number | MotionValue<number>) {
  const mv = useMotionValue(typeof value === 'number' ? value : value.get());

  useEffect(() => {
    if (typeof value === 'number') {
      mv.set(value);
    } else {
      mv.set(value.get());
      const unsubscribe = value.on('change', (latest) => mv.set(latest));
      return unsubscribe;
    }
  }, [value, mv]);

  return mv;
}

const PointMarker: React.FC<UnifiedPointProps> = ({ x, y }) => {
  const { scaleFactor, showDetail } = useSVGDisplay();

  const xMv = useUnifiedMotionValue(x);
  const yMv = useUnifiedMotionValue(y);

  const inverseScale = 1 / scaleFactor;
  const baseFontSize = 14;
  const scaledFontSize = baseFontSize * inverseScale;

  const roundedX = useTransform(xMv, (v) => Math.round(v * 100) / 100);
  const roundedY = useTransform(yMv, (v) => Math.round(v * 100) / 100);
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

export default PointMarker;
