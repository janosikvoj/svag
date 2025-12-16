import { useSpring, useTransform } from 'motion/react';

interface ControlConfig {
  min: number;
  max: number;
  initial: number;
  step?: number;
}

const SPRING_OPTIONS = { bounce: 0.05, visualDuration: 0.2 };

export function useControl(config: ControlConfig) {
  const step = config.step ?? 1;

  const value = useSpring(config.initial, SPRING_OPTIONS);

  const displayValue = useTransform(value, (latest) => {
    const rounded = Math.round(latest / step) * step;
    const decimals = (step.toString().split('.')[1] || '').length;
    return rounded.toFixed(decimals);
  });

  return {
    value,
    displayValue,
    config: { ...config, step: config.step ?? 1 },
    set: (v: number) => value.set(v),
  };
}
