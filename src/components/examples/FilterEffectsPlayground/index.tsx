import Section from '@/components/sections/Section';
import BlurExample from './BlurExample';
import NoiseExample from './NoiseExample';
import DistortionExample from './DistortionExample';

const FilterEffectsPlayground = () => {
  return (
    <Section
      title="Filter Effects Playground"
      description="Unlock Photoshop-grade effects directly in the browser. SVG Filters allow for non-destructive, resolution-independent post-processing. From organic textures to liquid distortion, these effects are generated mathematically on the fly, keeping your file sizes tiny."
    >
      <BlurExample />
      <NoiseExample />
      <DistortionExample />
    </Section>
  );
};

export default FilterEffectsPlayground;
