import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

type FormData = {
  message: string;
};

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const messageValue = watch('message');

  const onSubmit = (data: FormData) => {
    if (data.message.trim()) {
      onSendMessage(data.message.trim());
      reset();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-start gap-2"
    >
      <Textarea
        {...register('message', { required: true })}
        ref={(e) => {
          register('message').ref(e);
          textAreaRef.current = e;
        }}
        placeholder="输入您的消息..."
        rows={1}
        className="flex-1 resize-none min-h-[40px] max-h-40"
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        className="h-10 w-10 shrink-0 bg-accent hover:bg-accent/90 text-accent-foreground"
        disabled={isLoading || !messageValue?.trim()}
        aria-label="发送消息"
      >
        <SendHorizonal className="w-5 h-5" />
      </Button>
    </form>
  );
}
