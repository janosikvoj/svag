import SVGDisplay from '@/components/svg/SVGDisplay';
import { motion, useMotionTemplate, useMotionValueEvent } from 'motion/react';
import { Label } from '@/components/ui/label';
import Polygon from '@/components/svg/SmartPolygon';
import { Card } from '../ui/card';
import { useState } from 'react';
import { Switch } from '../ui/switch';
import { useControl } from './ControlPanel/useControl';
import { ControlPanel } from './ControlPanel';
import { Control } from './ControlPanel/Control';

const VIEWBOX_CONFIG = {
  width: { min: 50, initial: 100, max: 150 },
  height: { min: 20, initial: 50, max: 80 },
};

const ViewBoxExample = () => {
  const viewBoxWidth = useControl(VIEWBOX_CONFIG.width);
  const viewBoxHeight = useControl(VIEWBOX_CONFIG.height);

  const viewBox = useMotionTemplate`0 0 ${viewBoxWidth.value} ${viewBoxHeight.value}`;

  const [currentWidth, setCurrentWidth] = useState(
    VIEWBOX_CONFIG.width.initial
  );
  const [currentHeight, setCurrentHeight] = useState(
    VIEWBOX_CONFIG.height.initial
  );

  const [overflowVisible, setOverflowVisible] = useState(false);

  useMotionValueEvent(viewBoxWidth.value, 'change', (latest) => {
    setCurrentWidth(latest);
  });
  useMotionValueEvent(viewBoxHeight.value, 'change', (latest) => {
    setCurrentHeight(latest);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
      <Card
        className="py-0 h-fit"
        style={{ overflow: overflowVisible ? 'visible' : 'hidden' }}
      >
        <SVGDisplay
          animate={{ overflow: overflowVisible ? 'visible' : 'hidden' }}
          width={currentWidth}
          height={currentHeight}
          defaultShowGrid
          defaultShowDetail={false}
          viewBox={viewBox}
        >
          <Polygon points="30,15 70,15 70,35 30,35" className="fill-primary" />
        </SVGDisplay>
      </Card>
      <ControlPanel
        title="The Infinite Canvas"
        description="SVG uses a unitless coordinate system. The viewBox attribute defines
          the visible area, allowing graphics to scale infinitely without
          pixelation."
      >
        <Control label="View Box Width" control={viewBoxWidth} />
        <Control label="View Box Height" control={viewBoxHeight} />

        <div className="flex gap-3 items-center">
          <Switch
            id="overflow-mode"
            checked={overflowVisible}
            onCheckedChange={setOverflowVisible}
          />
          <Label
            htmlFor="overflow-mode"
            className="flex gap-3 items-baseline grow"
          >
            Overflow
            <motion.span className="text-xs text-muted-foreground font-mono">
              {overflowVisible ? 'visible' : 'hidden'}
            </motion.span>
          </Label>
        </div>
      </ControlPanel>
    </div>
  );
};

export default ViewBoxExample;
