import { CornerLeftUpIcon, SplinePointerIcon } from 'lucide-react';
import ThemeSwitch from './ThemeSwitch';
import { Button } from './ui/button';
import { motion, type Variants } from 'motion/react';

const hoverVariantsParent: Variants = {
  initial: {},
  hover: {},
};

const hoverVariantsChildren: Variants = {
  initial: { width: 0 },
  hover: { width: 'auto' },
};

const hoverVariantsChildrenInverted: Variants = {
  initial: { width: 'auto' },
  hover: { width: 0 },
};

const Header = () => {
  return (
    <header className="fixed top-0 right-0 w-full z-50 flex p-3 items-center gap-3">
      <Button
        asChild
        size="sm"
        variant="link"
        className="group font-pixel text-2xl font-bold hover:font-medium text-foreground decoration-1 gap-0 transition-all"
      >
        <motion.a
          href="#top"
          variants={hoverVariantsParent}
          whileHover={'hover'}
          initial={'initial'}
        >
          <div className="mr-1.5 relative">
            <SplinePointerIcon className="opacity-100 group-hover:opacity-0 group-hover:blur-xs group-hover:-translate-y-1.5 transition-all" />
            <CornerLeftUpIcon className="absolute top-0 opacity-0 translate-y-1.5 group-hover:opacity-100 blur-xs group-hover:blur-none group-hover:translate-y-0 transition-all" />
          </div>
          S
          <motion.span
            variants={hoverVariantsChildren}
            className="inline-block overflow-hidden"
          >
            calable&nbsp;
          </motion.span>
          V
          <motion.span
            variants={hoverVariantsChildren}
            className="inline-block overflow-hidden"
          >
            ector&nbsp;
          </motion.span>
          <motion.span
            variants={hoverVariantsChildrenInverted}
            className="inline-block overflow-hidden"
          >
            a
          </motion.span>
          G
          <motion.span
            variants={hoverVariantsChildren}
            className="inline-block overflow-hidden"
          >
            raphics
          </motion.span>
        </motion.a>
      </Button>
      <ThemeSwitch />
    </header>
  );
};

export default Header;
