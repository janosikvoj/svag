import { Item, ItemActions, ItemHeader } from '@/components/ui/item';
import { cn } from '@/lib/utils';
import React from 'react';

interface ControlPanelProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export const ControlPanel = ({
  title,
  description,
  children,
  className,
}: ControlPanelProps) => {
  return (
    <div className={cn('max-w-md', className)}>
      <h3 className="font-mono font-medium text-xl">{title}</h3>
      <p className="text-muted-foreground text-balance mt-3">{description}</p>

      {children && (
        <Item variant="outline" className="pt-2 mt-6">
          <ItemHeader className="font-medium text-muted-foreground">
            Control Panel
          </ItemHeader>

          <ItemActions className="flex flex-col items-stretch gap-4 w-full">
            {children}
          </ItemActions>
        </Item>
      )}
    </div>
  );
};
