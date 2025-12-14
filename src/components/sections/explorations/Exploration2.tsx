import SVGDisplay from '@/components/svg/SVGDisplay';
import { motion, useSpring, useTransform } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Polygon from '@/components/svg/SmartPolygon';
import Section from '../Section';

const SPRING_OPTIONS = { bounce: 0.05, visualDuration: 0.2 };

const Exploration2 = () => {
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

  const offsetX = useSpring(-5, SPRING_OPTIONS);
  const roundedOffsetX = useTransform(offsetX, (latest) => Math.round(latest));

  const offsetY = useSpring(-5, SPRING_OPTIONS);
  const roundedOffsetY = useTransform(offsetY, (latest) => Math.round(latest));

  return (
    <Section
      title="Control panel and effect animation"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut volutpat sapien, nec sodales magna. Praesent ut tortor lectus. Proin auctor varius egestas. Quisque gravida faucibus mi, a convallis felis vestibulum a."
    >
      <SVGDisplay
        width={100}
        height={50}
        className="mt-8"
        controlPanel={
          <>
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

              <div className="w-full space-y-2">
                <div className="flex justify-between">
                  <Label>Offset X</Label>
                  <motion.span className="text-xs text-muted-foreground font-mono">
                    {roundedOffsetX}
                  </motion.span>
                </div>
                <Slider
                  defaultValue={[-5]}
                  min={-20}
                  max={20}
                  step={1}
                  onValueChange={(value) => offsetX.set(value[0])}
                />
              </div>

              <div className="w-full space-y-2">
                <div className="flex justify-between">
                  <Label>Offset Y</Label>
                  <motion.span className="text-xs text-muted-foreground font-mono">
                    {roundedOffsetY}
                  </motion.span>
                </div>
                <Slider
                  defaultValue={[-5]}
                  min={-20}
                  max={20}
                  step={1}
                  onValueChange={(value) => offsetY.set(value[0])}
                />
              </div>
            </div>
          </>
        }
      >
        <defs>
          <filter id="exp2-displacementFilter" width="200%" height="200%">
            <motion.feTurbulence
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
            />
            <motion.feDisplacementMap
              in="SourceGraphic"
              scale={displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <motion.feOffset dx={offsetX} dy={offsetY} />
          </filter>
        </defs>
        <Polygon
          points="15,9 38,46 78,22"
          className="fill-primary"
          filter="url(#exp2-displacementFilter)"
        />
      </SVGDisplay>
    </Section>
  );
};

export default Exploration2;
