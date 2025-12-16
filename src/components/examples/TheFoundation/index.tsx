import Section from '@/components/sections/Section';
import ViewBoxExample from './ViewBoxExample';
import PrimitivesExample from './PrimitivesExample';
import PathExample from './PathExample';
import GroupExample from './GroupExample';

const TheFoundation = () => {
  return (
    <Section
      title="The Foundation"
      description="Break free from the pixel grid. In the world of vector graphics, every element is defined by mathematics rather than a static map of colored squares. This means your designs are resolution-independent, endlessly editable, and lightweight."
    >
      <ViewBoxExample />
      <PrimitivesExample />
      <PathExample />
      <GroupExample />
    </Section>
  );
};

export default TheFoundation;
