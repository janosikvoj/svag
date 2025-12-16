// components/svg/DownloadButton.tsx
import React from 'react';
import { motion, AnimatePresence, type Transition } from 'motion/react';

export type DownloadStatus = 'idle' | 'loading' | 'success';

interface DownloadButtonProps {
  status: DownloadStatus;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ status }) => {
  // Shared transition settings
  const transition: Transition = {
    type: 'spring',
    stiffness: 300,
    damping: 25,
  };

  // 1. Container Variants (Button <-> Circle)
  // We center everything at 50,50
  const containerVariants = {
    idle: {
      width: 140,
      height: 50,
      x: 30,
      rx: 8,
      fill: 'var(--primary)',
      opacity: 0.1,
    },
    loading: {
      width: 50,
      height: 50,
      x: 75,
      rx: 25,
      fill: 'var(--primary)',
      opacity: 0.1,
    }, // Circle centered
    success: {
      width: 50,
      height: 50,
      x: 75,
      rx: 25,
      fill: 'var(--primary)',
      opacity: 0.2,
    }, // Greenish tint? handled by CSS class or fill
  };

  return (
    <motion.g>
      {/* Background Shape */}
      {/* 
         Note: We use 'x' to center the rect. 
         Idle: Width 140. Center 100 (of 200 viewbox). X = 100 - 70 = 30.
         Loading: Width 50. Center 100. X = 100 - 25 = 75.
      */}
      <motion.rect
        y={75} // Center Y (100) - Height/2 (25) = 75
        variants={containerVariants}
        initial="idle"
        animate={status}
        transition={transition}
        className="fill-primary/20" // Base style
      />

      {/* Content Container (Centered at 100, 100) */}
      <g transform="translate(100, 100)">
        {/* ARROW (Idle Only) */}
        <AnimatePresence>
          {status === 'idle' && (
            <motion.g
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Arrow Line */}
              <motion.path
                d="M 0 -10 L 0 10"
                className="stroke-primary stroke-[3px]"
                strokeLinecap="round"
              />
              {/* Arrow Head */}
              <motion.path
                d="M -7 3 L 0 10 L 7 3"
                className="stroke-primary stroke-[3px] fill-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Base Line */}
              <motion.path
                d="M -10 15 L 10 15"
                className="stroke-primary stroke-[3px]"
                strokeLinecap="round"
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* SPINNER (Loading Only) */}
        <AnimatePresence>
          {status === 'loading' && (
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <motion.circle
                r="18"
                className="stroke-primary stroke-[3px] fill-none"
                strokeOpacity={0.2}
              />
              <motion.circle
                r="18"
                className="stroke-primary stroke-[3px] fill-none"
                strokeDasharray="113" // Circumference ~ 2*PI*18
                strokeDashoffset="80" // Partial segment
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* CHECKMARK (Success Only) */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.path
              d="M -8 2 L -2 8 L 8 -6" // Simple Check
              className="stroke-primary stroke-[4px] fill-none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, type: 'tween', ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </g>
    </motion.g>
  );
};

export default DownloadButton;
