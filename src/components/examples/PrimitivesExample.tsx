import SVGDisplay from '@/components/svg/SVGDisplay';
import { Card } from '../ui/card';
import { useControl } from './ControlPanel/useControl';
import { ControlPanel } from './ControlPanel';
import { Control } from './ControlPanel/Control';
import SmartRect from '../svg/SmartRect';

const RECT_CONFIG = {
  x: { min: 0, initial: 30, max: 100 },
  y: { min: 0, initial: 10, max: 50 },
  width: { min: 10, initial: 20, max: 100 },
  height: { min: 10, initial: 25, max: 50 },
  rx: { min: 0, initial: 0, max: 50 },
};

const PrimitivesExample = () => {
  const x = useControl(RECT_CONFIG.x);
  const y = useControl(RECT_CONFIG.y);
  const width = useControl(RECT_CONFIG.width);
  const height = useControl(RECT_CONFIG.height);
  const rx = useControl(RECT_CONFIG.rx);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
        <ControlPanel
          title="Parametric Shapes"
          description="In vector design, shapes aren't just drawn; they are calculated. A rectangle isn't a grid of pixels—it's a set of live properties like 'Width', 'Height', and 'Corner Radius' that remain editable forever."
        >
          <div className="grid grid-cols-2 gap-6">
            <Control label="X Position" control={x} />
            <Control label="Y Position" control={y} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Control label="Width" control={width} />
            <Control label="Height" control={height} />
          </div>
          <Control label="Corner Radius" control={rx} />
        </ControlPanel>
        <Card className="py-0 h-fit overflow-hidden">
          <SVGDisplay height={50}>
            <SmartRect
              x={x.value}
              y={y.value}
              width={width.value}
              height={height.value}
              rx={rx.value}
              className="fill-primary"
            />
          </SVGDisplay>
        </Card>
      </div>
    </>
  );
};

export default PrimitivesExample;
