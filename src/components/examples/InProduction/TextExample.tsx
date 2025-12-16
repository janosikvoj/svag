import { motion, useTransform } from 'motion/react';
import { useId } from 'react';
import { useControl } from '../ControlPanel/useControl';
import { Card } from '@/components/ui/card';
import { ControlPanel } from '../ControlPanel';
import { Control } from '../ControlPanel/Control';

const TEXT_CONFIG = {
  distortion: { min: 0, initial: 25, max: 100 },
  scale: { min: 0, initial: 0.02, max: 0.15, step: 0.001 },
};

const TextExample = () => {
  const distortion = useControl(TEXT_CONFIG.distortion);
  const scale = useControl(TEXT_CONFIG.scale);

  const filterId = useId();
  const baseFrequency = useTransform(scale.value, (s) => `${s} ${s / 2}`);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
      <Card className="py-0 h-fit overflow-hidden relative min-h-80 flex items-center justify-center">
        <motion.div
          className="p-12 max-w-lg text-center"
          style={{
            filter: `url(#${filterId})`,
          }}
        >
          <h2 className="text-4xl font-bold tracking-tighter mb-4 text-foreground">
            Distorted Reality
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            SVG filters aren't just for shapes. You can apply them to
            <span className="text-primary font-semibold">
              {' '}
              standard DOM text{' '}
            </span>
            to create glitches, liquid effects, or heat haze distortion in
            real-time.
          </p>
        </motion.div>

        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <motion.feTurbulence
                type="fractalNoise"
                baseFrequency={baseFrequency}
                numOctaves="1"
                result="noise"
              />
              <motion.feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={distortion.value}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      </Card>

      <ControlPanel
        title="Text Distortion"
        description="Apply SVG filters to standard HTML text. This technique is perfect for hover effects, glitch transitions, or 'redacted' text styles."
      >
        <Control label="Distortion Power" control={distortion} />
        <Control label="Noise Scale" control={scale} />
      </ControlPanel>
    </div>
  );
};

export default TextExample;
