import SVGDisplay from '@/components/svg/SVGDisplay';
import { Card } from '../ui/card';
import { useControl } from './ControlPanel/useControl';
import { ControlPanel } from './ControlPanel';
import { Control } from './ControlPanel/Control';
import FaceGroup from '../svg/FaceGroup';
import { motion } from 'motion/react';

const GROUP_CONFIG = {
  rotation: { min: -180, initial: 0, max: 180 },
  scale: { min: 0.5, initial: 1, max: 1.5, step: 0.1 },
  eyeSpacing: { min: 10, initial: 15, max: 30 },
};

const GroupExample = () => {
  const rotation = useControl(GROUP_CONFIG.rotation);
  const scale = useControl(GROUP_CONFIG.scale);
  const eyeSpacing = useControl(GROUP_CONFIG.eyeSpacing);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
      <Card className="py-0 h-fit overflow-hidden">
        <SVGDisplay height={60} defaultShowDetail={false}>
          <FaceGroup
            groupRotate={rotation.value}
            groupScale={scale.value}
            eyeSpacing={eyeSpacing.value}
          />

          <motion.line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            className="stroke-muted/20"
          />
          <motion.line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            className="stroke-muted/20"
          />
        </SVGDisplay>
      </Card>

      <ControlPanel
        title="Smart Grouping"
        description="Just like Cmd+G in Figma. Wrapping elements in a Group (<g>) lets you treat multiple layers as a single object. Transformations applied to the group affect everything inside, preserving their relative layout."
      >
        <Control label="Group Rotation" control={rotation} />
        <Control label="Group Scale" control={scale} />
        <Control label="Eye Spacing" control={eyeSpacing} />

        <div className="text-xs text-muted-foreground mt-4 italic bg-muted/50 p-3 rounded border">
          "Transforms stack. Rotating the group rotates the coordinate system
          for everything inside it."
        </div>
      </ControlPanel>
    </div>
  );
};

export default GroupExample;
