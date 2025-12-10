import SVGDisplay from '@/components/svg/SVGDisplay';
import { motion } from 'motion/react';
import Point from '@/components/svg/Point';
import Section from '../Section';

const Exploration1 = () => {
  return (
    <Section
      title="Initial exploration"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <SVGDisplay
        className="max-w-xl"
        figcaption="Debug grid display and transitions exercise"
      >
        <motion.text
          drag
          x={20}
          y={20}
          className="fill-muted-foreground font-pixel select-none"
        >
          Text
        </motion.text>
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

      <div className="grid grid-cols-2 mt-8">
        <SVGDisplay
          width={40}
          height={40}
          className="max-w-sm"
          figcaption="Blur, offset, blend filters"
        >
          <defs>
            <filter id="exp1-gaussianBlurFilter" width="200%" height="200%">
              <feOffset result="offOut" dx="1" dy="1" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
              <feBlend in="SourceGraphic" in2="blurOut" />
            </filter>
          </defs>
          <polygon
            points="15,7 8,31 27,24"
            className="fill-primary"
            filter="url(#exp1-gaussianBlurFilter)"
          />
          <Point x={15} y={7} />
          <Point x={8} y={31} />
          <Point x={27} y={24} />
        </SVGDisplay>
        <SVGDisplay
          width={40}
          height={40}
          className="max-w-sm"
          figcaption="Noise and displacement filters"
        >
          <defs>
            <filter id="exp1-displacementFilter">
              <feTurbulence baseFrequency="0.5" numOctaves="2" />
              <feDisplacementMap in="SourceGraphic" scale="4" />
              <feOffset dx="-2" dy="-2" />
            </filter>
          </defs>
          <polygon
            points="10,10 5,37 37,24"
            className="fill-primary"
            filter="url(#exp1-displacementFilter)"
          />
          <Point x={10} y={10} />
          <Point x={5} y={37} />
          <Point x={37} y={24} />
        </SVGDisplay>
      </div>
    </Section>
  );
};

export default Exploration1;
