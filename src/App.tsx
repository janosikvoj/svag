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
import DisplacementExample from './components/examples/DisplacementExample';

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
      <main className="px-3">
        <HeroSection />
        <Section
          title="Building Blocks"
          description="SVG primitives form the basis of all vector graphics. These fundamental shapes combine to create complex visualizations."
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background h-6">svg</div>
            <div className="bg-background h-6">panel</div>
          </div>
        </Section>

        <Section
          title="Motion & Style"
          description="SVG elements respond to CSS and JavaScript, enabling smooth transitions and dynamic interactions."
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background h-6">svg</div>
            <div className="bg-background h-6">panel</div>
          </div>
        </Section>

        <Section
          title="Filter Effects Playground"
          description="SVG filters unlock powerful visual effects. Adjust parameters in real-time to understand how each filter works."
        >
          <DisplacementExample />
        </Section>

        <Section
          title="Practical Use Cases"
          description="See how these techniques apply to production design."
        >
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent>svg</CardContent>
            </Card>
            <div className="bg-background h-6">panel</div>
          </div>
        </Section>
      </main>

      <Exploration1 />
      <Exploration2 />
      <Exploration3 />

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
