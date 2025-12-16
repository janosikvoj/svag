import { ReactLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { cancelFrame, frame } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/sections/HeroSection';
import TheFoundation from './components/examples/TheFoundation';
import MotionAndStyle from './components/examples/MotionAndStyle';
import FilterEffectsPlayground from './components/examples/FilterEffectsPlayground';
import InProduction from './components/examples/InProduction';

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
        <TheFoundation />
        <MotionAndStyle />
        <FilterEffectsPlayground />
        <InProduction />
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
