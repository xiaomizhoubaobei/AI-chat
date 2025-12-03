import { Button } from '@/components/ui/button';
import { WandSparkles } from 'lucide-react';

interface SuggestedRepliesProps {
  replies: string[];
  onSelect: (reply: string) => void;
}

export function SuggestedReplies({ replies, onSelect }: SuggestedRepliesProps) {
  return (
    <div className="mb-3 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 mb-2">
        <WandSparkles className="w-4 h-4 text-primary" />
        <p className="text-sm font-medium text-muted-foreground">建议的回复</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {replies.map((reply, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="h-auto py-1.5"
            onClick={() => onSelect(reply)}
          >
            {reply}
          </Button>
        ))}
      </div>
    </div>
  );
}
