import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Card } from '@/components/ui/card';
import { ControlPanel } from '../ControlPanel';

const SpotlightExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { bounce: 0.05, visualDuration: 0.2 });
  const springY = useSpring(y, { bounce: 0.05, visualDuration: 0.2 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
      <ControlPanel
        title="Spotlight Mask Reveal"
        description="A 'Flashlight' effect created using SVG Masks. We layer two versions of the content (Dim vs. Vibrant) and use a mouse-controlled SVG circle to cut a hole through to the vibrant layer."
      />
      <Card
        ref={containerRef}
        className="py-0 h-fit min-h-80 relative bg-slate-950 border-slate-800"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          x.set((containerRef.current?.clientWidth ?? 0) / 2);
          y.set(-(containerRef.current?.clientHeight ?? 0) / 2);
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-12 select-none pointer-events-none">
          <div className="text-center opacity-20">
            <h2 className="text-5xl sm:text-7xl font-bold text-slate-100 mb-4 blur-xs">
              THE END
            </h2>
            Move cursor to reveal
          </div>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center p-12 select-none pointer-events-none"
          style={{
            maskImage: `url(#spotlight-mask)`,
            WebkitMaskImage: `url(#spotlight-mask)`,
          }}
        >
          <div className="text-center">
            <h2 className="text-6xl sm:text-8xl font-bold tracking-tighter text-primary">
              JUST THE BEGINNING
            </h2>
          </div>
        </div>

        <svg className="absolute w-0 h-0">
          <defs>
            <mask id="spotlight-mask">
              <motion.circle
                className="blur-sm"
                cx={springX}
                cy={springY}
                r="80"
                fill="white"
              />
            </mask>
          </defs>
        </svg>

        <svg className="absolute inset-0 pointer-events-none w-full h-full">
          <motion.circle
            cx={springX}
            cy={springY}
            r="82"
            className="stroke-primary/40 stroke-1 fill-none"
            strokeDasharray="4 4"
          />
        </svg>
      </Card>
    </div>
  );
};

export default SpotlightExample;
