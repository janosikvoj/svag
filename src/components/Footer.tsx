import { Button } from './ui/button';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="p-3 mt-6 pb-12 text-primary-foreground bg-primary">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="font-pixel text-3xl font-black leading-[1em]">SVaG</h2>
          <small className="text-sm font-mono">made @ janosikvoj</small>
        </div>
        <Button className="text-primary-foreground" variant="link" asChild>
          <a href="https://github.com/janosikvoj" target="_blank">
            <Github />
            github.com/janosikvoj
          </a>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
