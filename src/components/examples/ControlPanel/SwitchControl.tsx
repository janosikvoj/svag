import { useId } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface SwitchControlProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  /**
   * Optional mapping for the text displayed next to the label.
   * Defaults to { true: 'on', false: 'off' } if showState is true.
   */
  stateLabels?: { true: string; false: string };
  /**
   * Whether to show the mono-spaced state text.
   * Defaults to true.
   */
  showState?: boolean;
  className?: string;
  id?: string;
}

export const SwitchControl = ({
  label,
  checked,
  onCheckedChange,
  stateLabels = { true: 'on', false: 'off' },
  showState = true,
  className,
  id: providedId,
}: SwitchControlProps) => {
  const generatedId = useId();
  const id = providedId || generatedId;

  return (
    <div className={cn('flex gap-3 items-center', className)}>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label
        htmlFor={id}
        className="flex gap-3 items-baseline grow cursor-pointer select-none"
      >
        {label}
        {showState && (
          <span className="text-xs text-muted-foreground font-mono">
            {checked ? stateLabels.true : stateLabels.false}
          </span>
        )}
      </Label>
    </div>
  );
};
