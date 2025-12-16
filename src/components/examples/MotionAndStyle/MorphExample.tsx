import SVGDisplay from '@/components/svg/SVGDisplay';
import { useControl } from '../ControlPanel/useControl';
import { ControlPanel } from '../ControlPanel';
import { Card } from '@/components/ui/card';
import MorphShape from '@/components/svg/MorphShape';
import { Control } from '../ControlPanel/Control';

const MORPH_CONFIG = {
  progress: { min: 0, initial: 0.5, max: 1, step: 0.01 },
};

const MorphExample = () => {
  const progress = useControl(MORPH_CONFIG.progress);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ControlPanel
        title="Shape Interpolation"
        description="Fluidly transitioning one vector path into another. Because SVGs are math-based, the browser can calculate the in-between states (tweens) automatically."
      >
        <Control label="Morph Progress" control={progress} />
      </ControlPanel>
      <Card className="py-0 h-fit overflow-hidden">
        <SVGDisplay height={50} width={50} defaultShowDetail={false}>
          <MorphShape progress={progress.value} />
        </SVGDisplay>
      </Card>
    </div>
  );
};

export default MorphExample;
