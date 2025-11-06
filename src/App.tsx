import { ReactLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { cancelFrame, frame } from 'motion/react';
import SVGDisplay from './components/svg/SVGDisplay';
import { motion } from 'motion/react';
import Point from './components/svg/Point';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/sections/HeroSection';

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
        <section className="mt-6">
          <SVGDisplay className="max-w-xl">
            <text x={20} y={20} className="fill-muted-foreground font-pixel">
              Text
            </text>
            <motion.circle
              cx={75}
              cy={50}
              initial={{ r: 10 }}
              animate={{ r: [15, 10] }}
              transition={{
                type: 'spring',
                bounce: 0.7,
                visualDuration: 0.4,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
              className="fill-primary"
            />
            <polygon points="10,20 5,65 40,80" className="fill-primary" />
            <Point x={75} y={50} />
            <Point x={10} y={20} />
            <Point x={5} y={65} />
            <Point x={40} y={80} />
          </SVGDisplay>
        </section>

        <section className="mt-6">
          <SVGDisplay width={40} height={40} className="max-w-sm">
            <defs>
              {/* <filter id="f2" width="200%" height="200%">
                <feOffset result="offOut" dx="1" dy="1" />
                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
                <feBlend in="SourceGraphic" in2="blurOut" />
              </filter> */}
              <filter id="displacementFilter">
                <feTurbulence baseFrequency="0.5" numOctaves="2" />
                <feDisplacementMap in="SourceGraphic" scale="4" />
              </filter>
            </defs>
            <polygon
              points="3,3 5,37 37,24"
              className="fill-primary"
              filter="url(#displacementFilter)"
            />
            <Point x={3} y={3} />
            <Point x={5} y={37} />
            <Point x={37} y={24} />
          </SVGDisplay>
        </section>
      </main>
      <Footer />
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
    </>
  );
}

export default App;
