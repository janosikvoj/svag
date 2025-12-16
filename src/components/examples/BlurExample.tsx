import SVGDisplay from '@/components/svg/SVGDisplay';
import { Card } from '../ui/card';
import { useControl } from './ControlPanel/useControl';
import { ControlPanel } from './ControlPanel';
import { Control } from './ControlPanel/Control';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useId, useState } from 'react';
import { motion, useTransform } from 'motion/react';

const BLUR_CONFIG = {
  amount: { min: 0, initial: 5, max: 20, step: 0.5 },
  opacity: { min: 0, initial: 1, max: 1, step: 0.05 }, // 0 to 1
};

const BlurExample = () => {
  const blurAmount = useControl(BLUR_CONFIG.amount);
  const opacity = useControl(BLUR_CONFIG.opacity);
  const [motionBlurMode, setMotionBlurMode] = useState(false);

  const filterId = useId();
  const stdDevString = useTransform(blurAmount.value, (v) => {
    return motionBlurMode ? `${v} 0` : `${v}`;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
      <ControlPanel
        title="Gaussian Blur"
        description="A real-time, programmable blur. Unlike a static PNG shadow, this effect can breathe—expanding and contracting to simulate depth of field or focus shifts."
      >
        <Control label="Blur Amount" control={blurAmount} />
        <Control label="Opacity" control={opacity} />

        <div className="flex gap-3 items-center">
          <Label className="grow" htmlFor="motion-blur">
            Motion Blur Mode
          </Label>
          <Switch
            id="motion-blur"
            checked={motionBlurMode}
            onCheckedChange={setMotionBlurMode}
          />
        </div>
      </ControlPanel>

      <Card className="py-0 h-fit overflow-hidden">
        <SVGDisplay height={40} defaultShowDetail={false}>
          <defs>
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <motion.feGaussianBlur
                stdDeviation={stdDevString}
                result="blur"
              />
            </filter>
          </defs>

          <motion.circle
            cx="50"
            cy="40"
            r="30"
            className="fill-primary"
            style={{
              filter: `url(#${filterId})`,
              opacity: opacity.value,
            }}
          />
        </SVGDisplay>
      </Card>
    </div>
  );
};

export default BlurExample;
