import { useContext } from 'react';
import { SVGDisplayContext } from '.';

export const useSVGDisplay = () => {
  const context = useContext(SVGDisplayContext);
  if (context === undefined) {
    throw new Error('useSVGScale must be used within SVGScaleProvider');
  }
  return context;
};
