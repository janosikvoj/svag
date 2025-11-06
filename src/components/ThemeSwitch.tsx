import { useEffect, useState } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { MoonIcon, SunMediumIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemeSwitch = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      return stored === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    const theme = isDark ? 'dark' : 'light';

    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [isDark]);

  return (
    <SwitchPrimitive.Root
      checked={isDark}
      onCheckedChange={setIsDark}
      aria-label="Toggle dark mode"
      data-slot="switch"
      className={cn(
        'peer focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        // Colors
        'bg-input text-foreground'
      )}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'relative pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        )}
      >
        <SunMediumIcon
          size={16}
          className="dark:text-background rotate-0 transition-all dark:rotate-90 dark:blur-xs"
        />
        <MoonIcon
          size={16}
          className="not-dark:text-background absolute top-0 -rotate-90 dark:rotate-0 transition-all blur-xs dark:blur-none"
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
};

export default ThemeSwitch;
