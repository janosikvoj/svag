import SVGDisplay from '@/components/svg/SVGDisplay';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Control } from './ControlPanel/Control';
import { ControlPanel } from './ControlPanel';
import SmartPolygon from '../svg/SmartPolygon';
import { useControl } from './ControlPanel/useControl';

const DISTORTION_CONFIG = {
  baseFrequency: { min: 0, initial: 1, max: 10, step: 0.1 },
  displacementScale: { min: 0, initial: 30, max: 100 },
};

const DistortionExample = () => {
  const baseFrequency = useControl(DISTORTION_CONFIG.baseFrequency);
  const displacementScale = useControl(DISTORTION_CONFIG.displacementScale);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <Card className="py-0 h-fit overflow-hidden">
          <SVGDisplay height={50}>
            <defs>
              <filter
                id="exp2-displacementFilter"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <motion.feTurbulence
                  baseFrequency={baseFrequency.value}
                  type="fractalNoise"
                />
                <motion.feDisplacementMap
                  in="SourceGraphic"
                  scale={displacementScale.value}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
            <SmartPolygon
              points="15,9 38,46 78,22"
              className="fill-primary"
              filter="url(#exp2-displacementFilter)"
            />
          </SVGDisplay>
        </Card>

        <ControlPanel
          title="Liquid Distortion"
          description="Using noise maps to displace pixels. This creates glitch effects, water ripples, and heat waves that react to user input."
        >
          <Control label="Distortion Strength" control={displacementScale} />
          <Control label="Frequency" control={baseFrequency} />
        </ControlPanel>
      </div>
    </>
  );
};

export default DistortionExample;
