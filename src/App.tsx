import { ReactLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { cancelFrame, frame } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/sections/HeroSection';
import { Card, CardContent } from './components/ui/card';
import Section from './components/sections/Section';
import Exploration1 from './components/sections/explorations/Exploration1';
import Exploration2 from './components/sections/explorations/Exploration2';
import Exploration3 from './components/sections/explorations/Exploration3';
import ViewBoxExample from './components/examples/ViewBoxExample';
import PrimitivesExample from './components/examples/PrimitivesExample';
import { Separator } from './components/ui/separator';
import DistortionExample from './components/examples/DistortionExample';
import PathExample from './components/examples/PathExample';
import GroupExample from './components/examples/GroupExample';

function App() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <>
      <Header />
      <main className="px-3 max-w-7xl mx-auto">
        <HeroSection />
        <Section
          title="The Foundation"
          description="Break free from the pixel grid. In the world of vector graphics, every element is defined by mathematics rather than a static map of colored squares. This means your designs are resolution-independent, endlessly editable, and lightweight."
        >
          <ViewBoxExample />
          <Separator />
          <PrimitivesExample />
          <Separator />
          <PathExample />
          <GroupExample />
        </Section>

        <Section
          title="Motion & Style"
          description="Static interfaces are a thing of the past. Scalable Vector Graphics were born to move. Because every coordinate is code, we can animate, morph, and evolve shapes with silky smooth 60fps performance."
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background h-6">svg</div>
            <div className="bg-background h-6">panel</div>
          </div>
        </Section>

        <Section
          title="Filter Effects Playground"
          description="Unlock Photoshop-grade effects directly in the browser. SVG Filters allow for non-destructive, resolution-independent post-processing. From organic textures to liquid distortion, these effects are generated mathematically on the fly, keeping your file sizes tiny."
        >
          <DistortionExample />
        </Section>

        <Section
          title="In Production"
          description="Theory is useful, but application is vital. Why do modern product teams choose SVG over PNG or JPG? It comes down to flexibility. A single SVG asset can adapt to dark mode, different screen sizes, and user interactions without ever needing to export a new file."
        >
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent>svg</CardContent>
            </Card>
            <div className="bg-background h-6">panel</div>
          </div>
        </Section>

        <Exploration1 />
        <Exploration2 />
        <Exploration3 />
      </main>

      <Footer />
      <ReactLenis
        root
        options={{ autoRaf: false, anchors: true }}
        ref={lenisRef}
      />
    </>
  );
}

export default App;
