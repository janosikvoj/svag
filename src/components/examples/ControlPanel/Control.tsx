import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { motion, MotionValue } from 'motion/react';

interface ControlProps {
  label: string;
  control: {
    value: MotionValue<number>;
    displayValue: MotionValue<string>;
    config: { min: number; max: number; initial: number; step: number };
    set: (v: number) => void;
  };
}

export const Control = ({ label, control }: ControlProps) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <Label>{label}</Label>
      <motion.span className="text-xs text-muted-foreground font-mono">
        {control.displayValue}
      </motion.span>
    </div>
    <Slider
      defaultValue={[control.config.initial]}
      min={control.config.min}
      max={control.config.max}
      step={control.config.step}
      onValueChange={(val) => control.set(val[0])}
    />
  </div>
);
