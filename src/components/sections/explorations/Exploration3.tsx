import { motion, useSpring, useTransform } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Section from '../Section';

const SPRING_OPTIONS = { bounce: 0.05, visualDuration: 0.2 };

const Exploration3 = () => {
  const displacementScale = useSpring(10, SPRING_OPTIONS);
  const roundedDisplacementScale = useTransform(displacementScale, (latest) =>
    Math.round(latest)
  );
  const offsetScale = useTransform(displacementScale, (latest) => -latest / 2);

  return (
    <Section
      title="Distorted Text With SVG Filters"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut volutpat sapien, nec sodales magna."
    >
      <p className="filter-[url('#exp2-distortFilter')]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione cum
        inventore ea quaerat, maxime at! Debitis consequuntur reiciendis vero
        dolores, rem asperiores ut quo provident saepe ex ipsam sed culpa.
      </p>

      <svg className="hidden">
        <defs>
          <filter id="exp2-distortFilter">
            <feTurbulence baseFrequency="0.1 0.05" numOctaves="1" />
            <motion.feDisplacementMap
              in="SourceGraphic"
              scale={displacementScale}
            />
            <motion.feOffset dx={offsetScale} dy={offsetScale} />
          </filter>
        </defs>
      </svg>

      <div className="flex flex-col items-end gap-4 w-48 mt-8">
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <Label>Displacement Scale</Label>
            <motion.span className="text-xs text-muted-foreground font-mono">
              {roundedDisplacementScale}
            </motion.span>
          </div>
          <Slider
            defaultValue={[5]}
            min={-25}
            max={25}
            step={0.1}
            onValueChange={(value) => displacementScale.set(value[0])}
          />
        </div>
      </div>
    </Section>
  );
};

export default Exploration3;
