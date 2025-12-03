import type { RefObject } from 'react';
import type { Message } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/components/chat/chat-message';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  scrollAreaRef: RefObject<HTMLDivElement>;
  showSentiment: boolean;
}

export function ChatMessages({ messages, isLoading, scrollAreaRef, showSentiment }: ChatMessagesProps) {
  return (
    <ScrollArea className="flex-1" viewportRef={scrollAreaRef}>
      <div className="p-4 md:p-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} showSentiment={showSentiment} />
        ))}
        {isLoading && <ChatMessage.Skeleton />}
      </div>
    </ScrollArea>
  );
}
