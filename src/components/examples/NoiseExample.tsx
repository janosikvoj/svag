import SVGDisplay from '@/components/svg/SVGDisplay';
import { Card } from '../ui/card';
import { useControl } from './ControlPanel/useControl';
import { ControlPanel } from './ControlPanel';
import { Control } from './ControlPanel/Control';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useId, useState } from 'react';
import { motion } from 'motion/react';

const NOISE_CONFIG = {
  roughness: { min: 0.05, initial: 0.2, max: 0.5, step: 0.01 }, // Base Frequency
  detail: { min: 1, initial: 1, max: 5, step: 1 }, // Octaves
};

const NoiseExample = () => {
  const roughness = useControl(NOISE_CONFIG.roughness);
  const detail = useControl(NOISE_CONFIG.detail);
  const [isFractal, setIsFractal] = useState(true);

  const filterId = useId();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="py-0 h-fit overflow-hidden">
        <SVGDisplay height={60} width={60} defaultShowDetail={false}>
          <defs>
            <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
              {/* 1. Generate Noise */}
              <motion.feTurbulence
                type={isFractal ? 'fractalNoise' : 'turbulence'}
                baseFrequency={roughness.value}
                numOctaves={detail.value}
                result="noise"
              />

              {/* 2. Remove Color (Make it grayscale texture) */}
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 1 0"
                in="noise"
                result="monoNoise"
              />

              {/* 3. The Source Graphic (The Rect's Fill Color) */}
              <feFlood
                floodColor="currentColor"
                className="text-primary"
                result="color"
              />

              {/* 4. Composite: Blend Noise onto Color */}
              {/* 'multiply' or 'overlay' logic using feComposite or feBlend */}
              <feBlend
                in="monoNoise"
                in2="color"
                mode="multiply"
                result="blended"
              />

              {/* 5. Composite entire thing into the source shape's alpha (clipping) */}
              <feComposite in="blended" in2="SourceGraphic" operator="in" />
            </filter>
          </defs>

          {/* The visible rect calls the filter */}
          <motion.rect
            x="10"
            y="10"
            width="80"
            height="80"
            className="fill-primary rotate-3 origin-center"
            style={{ filter: `url(#${filterId})` }}
          />
        </SVGDisplay>
      </Card>

      <ControlPanel
        title="Organic Noise"
        description="Ditch the massive texture image files. SVG can generate fractal noise and grain mathematically, keeping your file size tiny while adding analog warmth."
      >
        <Control label="Roughness" control={roughness} />
        <Control label="Detail" control={detail} />

        <div className="flex gap-3 items-center">
          <Label
            htmlFor="noise-type"
            className="flex gap-3 items-baseline grow"
          >
            Mode
            <motion.span className="text-xs text-muted-foreground font-mono">
              {isFractal ? 'fractal' : 'turbulence'}
            </motion.span>
          </Label>
          <Switch
            id="noise-type"
            checked={isFractal}
            onCheckedChange={setIsFractal}
          />
        </div>
      </ControlPanel>
    </div>
  );
};

export default NoiseExample;
