import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { ControlPanel } from '../ControlPanel';

const ScanButtonExample = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
      <ControlPanel
        title="Micro-Interactions"
        description="Icons don't have to be static. By deconstructing an SVG icon into parts (Frame, Eye, Pupil), we can orchestrate a 'Scan' behavior that triggers purely on hover."
      />
      <Card className="py-0 h-fit min-h-[300px] flex items-center justify-center">
        <motion.button
          className="group bg-primary text-primary-foreground px-8 py-3 rounded-full font-mono text-lg font-semibold flex items-center gap-4 hover:cursor-pointer active:bg-primary/90 transition-all shadow-primary/20 shadow-lg active:shadow-md"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 1 }}
        >
          <motion.svg
            className="relative z-10 size-8 fill-none stroke-current stroke-2 overflow-visible"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* 1. The Frame Corners */}
            <motion.g
              variants={{
                idle: { scale: 1, opacity: 0.6 },
                hover: { scale: 1.2, opacity: 0.8, rotate: 45 },
              }}
              initial="idle"
              animate={isHovered ? 'hover' : 'idle'}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <path
                d="M3 7V5a2 2 0 0 1 2-2h2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M17 3h2a2 2 0 0 1 2 2v2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M21 17v2a2 2 0 0 1-2 2h-2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M7 21H5a2 2 0 0 1-2-2v-2"
                vectorEffect="non-scaling-stroke"
              />
            </motion.g>

            {/* 2. The Eye Group (Lids + Pupil) */}
            <motion.g initial={false} animate={isHovered ? 'hover' : 'idle'}>
              <motion.path
                className="stroke-[2.5]"
                vectorEffect="non-scaling-stroke"
                d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"
                variants={{
                  idle: { scaleY: 1 },
                  hover: {
                    scaleY: [1, 0.2, 1, 1, 1],
                    transition: {
                      duration: 2,
                      times: [0, 0.1, 0.2, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 1,
                    },
                  },
                }}
              />

              {/* The Pupil - Looking Around */}
              <motion.circle
                cx="12"
                cy="12"
                r="1"
                animate={{
                  x: [0, -2, 2, 0],
                }}
                transition={{
                  duration: 1.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
            </motion.g>
          </motion.svg>

          <span>Scan</span>
        </motion.button>
      </Card>
    </div>
  );
};

export default ScanButtonExample;
