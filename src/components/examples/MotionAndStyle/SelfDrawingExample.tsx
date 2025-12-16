import SVGDisplay from '@/components/svg/SVGDisplay';
import { useState } from 'react';
import { useControl } from '../ControlPanel/useControl';
import { Card } from '@/components/ui/card';
import SelfDrawingPath from '@/components/svg/SelfDrawingPath';
import { ControlPanel } from '../ControlPanel';
import { Control } from '../ControlPanel/Control';
import { SwitchControl } from '../ControlPanel/SwitchControl';

const DRAW_CONFIG = {
  progress: { min: 0, initial: 0.5, max: 1, step: 0.01 },
  weight: { min: 0.1, initial: 2, max: 6, step: 0.1 },
};

const SelfDrawingExample = () => {
  const progress = useControl(DRAW_CONFIG.progress);
  const weight = useControl(DRAW_CONFIG.weight);
  const [roundCaps, setRoundCaps] = useState(true);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
      <Card className="py-0 h-fit overflow-hidden">
        <SVGDisplay height={50} defaultShowDetail={false}>
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

        <SwitchControl
          label="Round Caps"
          checked={roundCaps}
          onCheckedChange={setRoundCaps}
        />
      </ControlPanel>
    </div>
  );
};

export default SelfDrawingExample;
