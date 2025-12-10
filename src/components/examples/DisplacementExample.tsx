import SVGDisplay from '@/components/svg/SVGDisplay';
import { motion, useSpring, useTransform } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Polygon from '@/components/svg/Polygon';
import { Card } from '../ui/card';

const SPRING_OPTIONS = { bounce: 0.05, visualDuration: 0.2 };

const DisplacementExample = () => {
  const baseFrequency = useSpring(0.5, SPRING_OPTIONS);
  const roundedBaseFrequency = useTransform(
    () => Math.round(baseFrequency.get() * 100) / 100
  );

  const numOctaves = useSpring(2, SPRING_OPTIONS);
  const roundedOctaves = useTransform(numOctaves, (latest) =>
    Math.round(latest)
  );

  const displacementScale = useSpring(10, SPRING_OPTIONS);
  const roundedScale = useTransform(displacementScale, (latest) =>
    Math.round(latest)
  );

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-6">
      <Card className="py-0">
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
                baseFrequency={baseFrequency}
                numOctaves={numOctaves}
                type="fractalNoise"
              />
              <motion.feDisplacementMap
                in="SourceGraphic"
                scale={displacementScale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
          <Polygon
            points="15,9 38,46 78,22"
            className="fill-primary"
            filter="url(#exp2-displacementFilter)"
          />
        </SVGDisplay>
      </Card>
      <div>
        <div className="flex flex-col items-end gap-4 w-48">
          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <Label>Base Frequency</Label>
              <motion.span className="text-xs text-muted-foreground font-mono">
                {roundedBaseFrequency}
              </motion.span>
            </div>
            <Slider
              defaultValue={[0.5]}
              min={0}
              max={5}
              step={0.01}
              onValueChange={(value) => baseFrequency.set(value[0])}
            />
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <Label>Octaves</Label>
              <motion.span className="text-xs text-muted-foreground font-mono">
                {roundedOctaves}
              </motion.span>
            </div>
            <Slider
              defaultValue={[2]}
              min={1}
              max={8}
              step={1}
              onValueChange={(value) => numOctaves.set(value[0])}
            />
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <Label>Displacement</Label>
              <motion.span className="text-xs text-muted-foreground font-mono">
                {roundedScale}
              </motion.span>
            </div>
            <Slider
              defaultValue={[10]}
              min={0}
              max={50}
              step={1}
              onValueChange={(value) => displacementScale.set(value[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplacementExample;
