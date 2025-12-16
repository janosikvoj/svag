import SVGDisplay from '@/components/svg/SVGDisplay';
import { Card } from '../ui/card';
import { ControlPanel } from './ControlPanel';
import { Button } from '../ui/button';
import { useState } from 'react';
import DownloadButton, { type DownloadStatus } from '../svg/DownloadButton';
import { RotateCcw } from 'lucide-react';

const FeedbackExample = () => {
  const [status, setStatus] = useState<DownloadStatus>('idle');

  const startSequence = () => {
    if (status !== 'idle') return;

    // 1. Start Loading
    setStatus('loading');

    // 2. Fake Network Request (1.5s)
    setTimeout(() => {
      setStatus('success');

      // 3. Reset after showing success (2s)
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
      <Card className="py-0 h-fit overflow-hidden">
        {/* ViewBox 200x200 to give room for the button centering */}
        <SVGDisplay
          height={100}
          defaultShowDetail={false}
          viewBox="0 0 200 200"
        >
          <DownloadButton status={status} />
        </SVGDisplay>
      </Card>

      <ControlPanel
        title="Delightful Feedback"
        description="Instead of jarring state changes, use vector motion to guide the user's eye. A 'Download' icon can morph into a 'Checkmark' to confirm an action seamlessly."
      >
        <div className="flex flex-col gap-4">
          <Button
            size="lg"
            onClick={startSequence}
            disabled={status !== 'idle'}
            className="w-full font-mono relative"
          >
            {status === 'idle' ? 'Trigger Action' : 'Processing...'}
          </Button>

          {/* Reset shortcut if stuck, just in case */}
          {status !== 'idle' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStatus('idle')}
              className="self-center text-muted-foreground"
            >
              <RotateCcw className="w-3 h-3 mr-2" /> Reset
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground mt-4 italic bg-muted/50 p-3 rounded border">
          "Motion distracts the user from waiting times."
        </div>
      </ControlPanel>
    </div>
  );
};

export default FeedbackExample;
