import { useSVGScale } from './SVGScaleContext/useSVGScale';

interface PointProps {
  x?: number;
  y?: number;
}

const Point: React.FC<PointProps> = ({ x = 0, y = 0 }) => {
  const { scaleFactor } = useSVGScale();

  // Calculate inverse scale for text
  const inverseScale = 1 / scaleFactor;
  // Base font size in viewBox units (you can adjust this)
  const baseFontSize = 14;
  // Scaled font size to match rem-like behavior
  const scaledFontSize = baseFontSize * inverseScale;

  return (
    <g className="fill-foreground">
      <circle cx={x} cy={y} r={2 * inverseScale} />
      <text
        transform={`translate(0 ${-8 * inverseScale})`}
        className="font-mono"
        fontSize={scaledFontSize}
        textAnchor="middle"
        x={x}
        y={y}
      >
        {Math.round(x * 100) / 100 + ' ' + Math.round(y * 100) / 100}
      </text>
    </g>
  );
};

export default Point;
