// examples/PathExample.tsx
import SVGDisplay from '@/components/svg/SVGDisplay';
import { Card } from '../ui/card';
import { useControl } from './ControlPanel/useControl';
import { ControlPanel } from './ControlPanel';
import { Control } from './ControlPanel/Control';
import SmartPath from '../svg/SmartPath';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useState } from 'react';
import { useTransform } from 'motion/react';

const PATH_CONFIG = {
  tension: { min: -25, initial: 10, max: 25 },
  controlDisplacement: { min: -15, initial: 20, max: 75 },
};

const PathExample = () => {
  const tension = useControl(PATH_CONFIG.tension);
  const controlDisplacement = useControl(PATH_CONFIG.controlDisplacement);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [fillShape, setFillShape] = useState(false);

  const startPoint = {
    x: useTransform(() => 20),
    y: useTransform(() => 30),
  };

  const endPoint = {
    x: useTransform(() => 80),
    y: useTransform(() => 30),
  };

  const control1 = {
    x: useTransform(controlDisplacement.value, (d) => 20 + d),
    y: useTransform(tension.value, (t) => 30 - t),
  };

  const control2 = {
    x: useTransform(controlDisplacement.value, (d) => 80 - d),
    y: useTransform(tension.value, (t) => 30 - t),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
      <Card className="py-0 h-fit overflow-hidden">
        <SVGDisplay height={60} defaultShowGrid>
          <SmartPath
            strokeWidth={4}
            startPoint={startPoint}
            controlPoint1={control1}
            controlPoint2={control2}
            endPoint={endPoint}
            showSkeleton={showSkeleton}
            className="stroke-primary text-primary/20"
            fill={fillShape ? 'currentColor' : 'none'}
            style={{
              strokeLinecap: 'round',
            }}
          />
        </SVGDisplay>
      </Card>

      <ControlPanel
        title="The Pen Tool's DNA"
        description="The Path element is what happens under the hood when you click with the Pen tool. It connects Anchor Points with straight lines or flexible Bezier Curves to create any shape imaginable."
      >
        <Control label="Curve Tension" control={tension} />

        <Control label="Control Displacement" control={controlDisplacement} />

        <div className="flex gap-3 items-center">
          <Label htmlFor="skeleton-mode" className="grow">
            Show Skeleton
          </Label>
          <Switch
            id="skeleton-mode"
            checked={showSkeleton}
            onCheckedChange={setShowSkeleton}
          />
        </div>

        <div className="flex gap-3 items-center">
          <Label htmlFor="fill-mode" className="grow">
            Fill Shape
          </Label>
          <Switch
            id="fill-mode"
            checked={fillShape}
            onCheckedChange={setFillShape}
          />
        </div>
      </ControlPanel>
    </div>
  );
};

export default PathExample;
