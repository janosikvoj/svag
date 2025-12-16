import SVGDisplay from '@/components/svg/SVGDisplay';
import { Card } from '../ui/card';
import { useControl } from './ControlPanel/useControl';
import { ControlPanel } from './ControlPanel';
import { Control } from './ControlPanel/Control';
import FaceGroup from '../svg/FaceGroup';

const GROUP_CONFIG = {
  rotation: { min: -180, initial: 0, max: 180 },
  scale: { min: 0.5, initial: 1, max: 2, step: 0.1 },
  eyeSpacing: { min: 0, initial: 15, max: 30 },
};

const GroupExample = () => {
  const rotation = useControl(GROUP_CONFIG.rotation);
  const scale = useControl(GROUP_CONFIG.scale);
  const eyeSpacing = useControl(GROUP_CONFIG.eyeSpacing);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ControlPanel
        title="Smart Grouping"
        description="Just like Cmd+G in Figma. Wrapping elements in a Group lets you treat multiple layers as a single object. Transformations applied to the group affect everything inside, preserving their relative layout."
      >
        <Control label="Group Rotation" control={rotation} />
        <Control label="Group Scale" control={scale} />
        <Control label="Eye Spacing" control={eyeSpacing} />
      </ControlPanel>
      <Card className="py-0 h-fit overflow-hidden">
        <SVGDisplay height={100} defaultShowDetail={false}>
          <FaceGroup
            groupRotate={rotation.value}
            groupScale={scale.value}
            eyeSpacing={eyeSpacing.value}
          />
        </SVGDisplay>
      </Card>
    </div>
  );
};

export default GroupExample;
