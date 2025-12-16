import Section from '@/components/sections/Section';
import TextExample from './TextExample';
import ScanButtonExample from './ScanButtonExample';
import SpotlightExample from './SpotlightExample';

const InProduction = () => {
  return (
    <Section
      title="In Production"
      description="Theory is useful, but application is vital. Why do modern product teams choose SVG over PNG or JPG? It comes down to flexibility. A single SVG asset can adapt to dark mode, different screen sizes, and user interactions without ever needing to export a new file."
    >
      <ScanButtonExample />
      <TextExample />
      <SpotlightExample />
    </Section>
  );
};

export default InProduction;
