import Section from '@/components/sections/Section';
import SelfDrawingExample from './SelfDrawingExample';
import MorphExample from './MorphExample';

const MotionAndStyle = () => {
  return (
    <Section
      title="Motion & Style"
      description="Static interfaces are a thing of the past. Scalable Vector Graphics were born to move. Because every coordinate is code, we can animate, morph, and evolve shapes with silky smooth 60fps performance."
    >
      <SelfDrawingExample />
      <MorphExample />
    </Section>
  );
};

export default MotionAndStyle;
