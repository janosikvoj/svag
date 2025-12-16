import SVGDisplay from '@/components/svg/SVGDisplay';
import { Card } from '../ui/card';
import { useControl } from './ControlPanel/useControl';
import { ControlPanel } from './ControlPanel';
import { Control } from './ControlPanel/Control';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useState } from 'react';
import SelfDrawingPath from '../svg/SelfDrawingPath';

const DRAW_CONFIG = {
  progress: { min: 0, initial: 1, max: 1, step: 0.01 }, // 0 to 100%
  weight: { min: 1, initial: 4, max: 20 },
};

const SelfDrawingExample = () => {
  const progress = useControl(DRAW_CONFIG.progress);
  const weight = useControl(DRAW_CONFIG.weight);
  const [roundCaps, setRoundCaps] = useState(true);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
      <Card className="py-0 h-fit overflow-hidden">
        <SVGDisplay width={150} height={80} defaultShowDetail={false}>
          <SelfDrawingPath
            progress={progress.value}
            strokeWidth={weight.value}
            roundCaps={roundCaps}
          />
        </SVGDisplay>
      </Card>

      <ControlPanel
        title='The "Self-Drawing" Effect'
        description="By manipulating the stroke's dash pattern, we can create the illusion of a shape tracing itself in real-time. It’s a trick of the eye that feels like magic."
      >
        <Control label="Draw Progress" control={progress} />
        <Control label="Line Weight" control={weight} />

        <div className="flex gap-3 items-center">
          <Label htmlFor="caps-mode" className="grow">
            Round Caps
          </Label>
          <Switch
            id="caps-mode"
            checked={roundCaps}
            onCheckedChange={setRoundCaps}
          />
        </div>
      </ControlPanel>
    </div>
  );
};

export default SelfDrawingExample;
