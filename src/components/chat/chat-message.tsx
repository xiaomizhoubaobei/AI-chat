import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Icons } from '@/components/icons';

interface ChatMessageProps {
  message: Message;
  showSentiment: boolean;
}

export function ChatMessage({ message, showSentiment }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  const avatarData = PlaceHolderImages.find(
    (img) => img.id === (isUser ? 'user-avatar' : 'bot-avatar')
  );
  const SentimentIcon = message.sentiment ? Icons[message.sentiment] : null;

  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 border">
          <AvatarImage src={avatarData?.imageUrl} alt="Bot" data-ai-hint={avatarData?.imageHint} />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      )}
      <div className="max-w-xs md:max-w-md lg:max-w-lg">
        <Card
          className={cn(
            'relative rounded-2xl',
            isUser
              ? 'bg-secondary text-secondary-foreground rounded-br-none'
              : 'bg-card rounded-bl-none'
          )}
        >
          <CardContent className="p-3 text-sm">{message.text}</CardContent>
        </Card>
        {isUser && SentimentIcon && showSentiment && (
           <div className="flex justify-end items-center gap-1 mt-1.5 mr-1 text-muted-foreground">
             <SentimentIcon className={cn("w-3.5 h-3.5", {
               'text-green-500': message.sentiment === 'positive',
               'text-red-500': message.sentiment === 'negative',
               'text-gray-500': message.sentiment === 'neutral',
             })} />
             <span className="text-xs capitalize">{message.sentiment}</span>
           </div>
        )}
      </div>
      {isUser && (
        <Avatar className="w-8 h-8 border">
          <AvatarImage src={avatarData?.imageUrl} alt="User" data-ai-hint={avatarData?.imageHint} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

function MessageSkeleton() {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="w-8 h-8 border">
        <Skeleton className="w-full h-full rounded-full" />
      </Avatar>
      <div className="max-w-xs md:max-w-md lg:max-w-lg space-y-2">
        <Skeleton className="h-10 w-48 rounded-2xl rounded-bl-none" />
        <Skeleton className="h-12 w-64 rounded-2xl rounded-bl-none" />
      </div>
    </div>
  );
}

ChatMessage.Skeleton = MessageSkeleton;
