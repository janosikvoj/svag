import { useContext } from 'react';
import { SVGScaleContext } from '.';

export const useSVGScale = () => {
  const context = useContext(SVGScaleContext);
  if (context === undefined) {
    throw new Error('useSVGScale must be used within SVGScaleProvider');
  }
  return context;
};
